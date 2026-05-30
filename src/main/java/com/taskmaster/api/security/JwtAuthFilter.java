package com.taskmaster.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 2. If there is no header, or it doesn't start with "Bearer ", just continue without authenticating
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extract the token string (remove "Bearer " from the beginning)
        jwt = authHeader.substring(7);

        // Use your jwtUtil to extract the username (email) from the 'jwt' string.
        userEmail = jwtUtil.extractUsername(jwt);

        // 4. If we found an email, and the user is not already authenticated in this context...
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // For now, we assume if the token parses successfully, they are valid.
            // In a real app, we might check if the user is still active in the DB here.
            
            // Tell Spring Security: "This user is authenticated!"
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userEmail, 
                    null, 
                    new ArrayList<>() // Empty list of roles/authorities for now
            );
            
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            
            // Put the authentication into the Security Context (the "clipboard")
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // 5. Pass the request along to the next filter/controller
        filterChain.doFilter(request, response);
    }
}
