package com.taskmaster.api.dto;

import java.time.LocalDate;

public record TaskResponseDTO(
        Long id,
        String title,
        String description,
        String status,
        LocalDate dueDate,
        String quadrant
) {}
