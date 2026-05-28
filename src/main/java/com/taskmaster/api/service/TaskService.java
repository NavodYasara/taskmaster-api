package com.taskmaster.api.service;

import com.taskmaster.api.dto.TaskRequestDTO;
import com.taskmaster.api.dto.TaskResponseDTO;
import com.taskmaster.api.entity.TaskEntity;
import com.taskmaster.api.entity.UserEntity;
import com.taskmaster.api.exception.ResourceNotFoundException;
import com.taskmaster.api.repository.TaskRepository;
import com.taskmaster.api.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponseDTO createTask(TaskRequestDTO taskRequest) {
        //Fetch the currently authenticated user from SecurityContextHolder.
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        
        /*
            Now we have know who is requesting to create a task, so we should create a task for that userId
            We will use that useremail to find that user in our database and fetch the user id So , 
            there will be no chance of creating a task for wrong userId If user is not found , then throw an exception.
            For that we will use ResourceNotFoundException. If user is found , then create a task for that user
        */

        UserEntity userObject = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        
        /*
            Created an object from the TaskEntity.
            Now test the incoming taskRequest details to the newly created object.
        */
        TaskEntity newTask = new TaskEntity();
        newTask.setTitle(taskRequest.title());
        newTask.setDescription(taskRequest.description());
        newTask.setDueDate(taskRequest.dueDate());
        newTask.setStatus("TODO");
        newTask.setUser(userObject);

        TaskEntity savedTask = taskRepository.save(newTask);

    
        return new TaskResponseDTO(
            savedTask.getId(),
            savedTask.getTitle(),
            savedTask.getDescription(),
            savedTask.getStatus(),
            savedTask.getDueDate()
        );
    }

}
