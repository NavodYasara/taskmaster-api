package com.taskmaster.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmaster.api.dto.TaskRequestDTO;
import com.taskmaster.api.dto.TaskResponseDTO;
import com.taskmaster.api.dto.UpdateTaskDTO;
import com.taskmaster.api.entity.TaskEntity;
import com.taskmaster.api.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<TaskResponseDTO> addTask(@Valid @RequestBody TaskRequestDTO request) {
        TaskResponseDTO taskResponse = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskResponse);
    }

    @GetMapping
    public ResponseEntity <List<TaskResponseDTO>> getTasks(){
        List<TaskResponseDTO>response = taskService.getUserTask();
        return ResponseEntity.ok(response);            
    }

    @PutMapping("/updateTasks/{taskId}")
    public ResponseEntity<UpdateTaskDTO> updateTask(@PathVariable Long taskId, @RequestBody UpdateTaskDTO updateRequest){
        UpdateTaskDTO response = taskService.UpdateTask(taskId, updateRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteTask/{taskId")
    public ResponseEntity deleteTask(@PathVariable Long taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Success");
    }
}