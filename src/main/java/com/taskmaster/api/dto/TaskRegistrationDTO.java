package com.taskmaster.api.dto;

import java.time.LocalDate;

public record TaskRegistrationDTO(
    String title,
    String description,
    String status,
    LocalDate dueDate,
    Long userId
) {}

