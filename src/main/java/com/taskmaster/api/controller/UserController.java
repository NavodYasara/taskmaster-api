package com.taskmaster.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import com.taskmaster.api.service.UserService;
import jakarta.validation.Valid;
import com.taskmaster.api.dto.UserResponseDTO;
import com.taskmaster.api.dto.LoginResponseDTO;
import com.taskmaster.api.dto.UserLoginDTO;
import com.taskmaster.api.dto.UserRegistrationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRegistrationDTO request) {
        UserResponseDTO userResponse = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody UserLoginDTO inputData) {
        LoginResponseDTO userToken = userService.loginUser(inputData);
        return ResponseEntity.status(HttpStatus.OK).body(userToken);
    }
}
