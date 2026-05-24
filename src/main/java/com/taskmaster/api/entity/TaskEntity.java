package com.taskmaster.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate; // Use proper date types

@Entity
@Table(name = "tasks")
@Getter // Replaced @Data to prevent StackOverflowError
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Clean naming: title is cleaner than taskName inside a Task class
    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status", nullable = false, length = 20)
    private String status; // Senior Note: Ideally, this should be an Enum, not a plain String

    @Column(name = "due_date")
    private LocalDate dueDate; // Replaced 'int' with Java 8 Time API

    // The Foreign Key Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Maps to the users table primary key
    private UserEntity user;
}