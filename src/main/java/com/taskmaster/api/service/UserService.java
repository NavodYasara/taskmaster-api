package com.taskmaster.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.taskmaster.api.dto.UserRegistrationDTO;
import com.taskmaster.api.dto.UserResponseDTO;
import com.taskmaster.api.entity.UserEntity;
import com.taskmaster.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor // generates the constructor for final fields
public class UserService {
    private final UserRepository userRepository; // this is a field declaration
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDTO registerUser(UserRegistrationDTO registrationData) {
        // validation logic
        if (userRepository.findByEmail(registrationData.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // Maping DTO to Entity
        UserEntity user = new UserEntity();
        user.setEmail(registrationData.email());
        user.setUserName(registrationData.userName());

        // hashing the password
        String hashedPassword = passwordEncoder.encode(registrationData.password());
        user.setPassword(hashedPassword);

        // Ensure this is a new entity (id must be null before saving)
        if (user.getUserId() != null) {
            throw new IllegalStateException("New user must not have an existing ID");
        }

        UserEntity savedUser = userRepository.save(user);

        // Mapping Entity to Response DTO for sending response back to client
        return new UserResponseDTO(
            savedUser.getUserId(),
            savedUser.getUserName(),
            user.getEmail()
        );

    }
}
