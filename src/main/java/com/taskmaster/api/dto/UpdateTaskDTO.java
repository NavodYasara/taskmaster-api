package com.taskmaster.api.dto;

import java.time.LocalDate;

public record UpdateTaskDTO(
        String title,
        String description,
        String status,
        LocalDate dueDate,
        String quadrant
) {}
