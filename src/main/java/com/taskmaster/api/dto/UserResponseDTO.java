package com.taskmaster.api.dto;

public record UserResponseDTO(
    Long userId,
    String email,
    String userName
){}
