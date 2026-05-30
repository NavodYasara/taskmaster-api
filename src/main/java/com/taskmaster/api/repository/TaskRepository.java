package com.taskmaster.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmaster.api.entity.TaskEntity;
import com.taskmaster.api.entity.UserEntity;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findAllById(Long id);
    List<TaskEntity> findByUserUserId(Long userId);
    List<TaskEntity> findAllByUser(UserEntity user);
}


