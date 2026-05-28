package com.taskmaster.api.dto;
import java.time.LocalDate;

public record TaskRequestDTO(
    String title, 
    String description, 
    LocalDate dueDate
) {}
