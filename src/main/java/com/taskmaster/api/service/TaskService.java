package com.taskmaster.api.service;

import com.taskmaster.api.dto.TaskRegistrationDTO;
import com.taskmaster.api.dto.TaskResponseDTO;
import com.taskmaster.api.entity.TaskEntity;
import com.taskmaster.api.entity.UserEntity;
import com.taskmaster.api.exception.ResourceNotFoundException;
import com.taskmaster.api.repository.TaskRepository;
import com.taskmaster.api.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponseDTO createTask(TaskRegistrationDTO taskData) {

        // Find User by ID using userRepository. Throw ResourceNotFoundException if empty.
        UserEntity user = userRepository.findById(taskData.userId())
        .orElseThrow(() -> new ResourceNotFoundException("User with ID " + taskData.userId() + " not found"));

        // Map TaskRegistrationDTO properties to a new TaskEntity.
        TaskEntity task = new TaskEntity();
        task.setTitle(taskData.title());
        task.setDescription(taskData.description());
        task.setStatus(taskData.status());
        task.setDueDate(taskData.dueDate());

        // Set the UserEntity into the TaskEntity.
        task.setUser(user); // ← pass the whole UserEntity object (not just the ID number)

        // Save TaskEntity via taskRepository.
        TaskEntity savedTask = taskRepository.save(task);

        // Map the saved TaskEntity back to a TaskResponseDTO and return it.
        return new TaskResponseDTO(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getStatus(),
                savedTask.getDueDate(),
                savedTask.getUser().getUserId()); // ← go through getUser() first, then getId()
    }

}
