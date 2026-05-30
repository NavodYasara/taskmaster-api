package com.taskmaster.api.service;

import com.taskmaster.api.dto.TaskRequestDTO;
import com.taskmaster.api.dto.TaskResponseDTO;
import com.taskmaster.api.dto.UpdateTaskDTO;
import com.taskmaster.api.entity.TaskEntity;
import com.taskmaster.api.entity.UserEntity;
import com.taskmaster.api.exception.ResourceNotFoundException;
import com.taskmaster.api.repository.TaskRepository;
import com.taskmaster.api.repository.UserRepository;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService {

    /*
     * JAVA වලදී, int, boolean වගේ පොඩි දේවල් (Primitive types) කෙලින්ම variable
     * එකක් ඇතුලේ තියාගන්න පුළුවන්
     * වුණාට, TaskRepository වගේ ලොකු දේවල් (Objects) කෙලින්ම ඒක අස්සේ ඔබලා තියන්න
     * බැහැ. ඒ වෙනුවට
     * මේ variables කරන්නේ අර හැදුණු ඔරිජිනල් ගබඩාව තියෙන්නේ කොහෙද කියලා පෙන්වන එකයි
     * (Refer කරන එකයි).
     */
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    // constructor (Dependency injection)
    /*
     * හිතන්න අපේ TaskService කියන්නේ ආපනශාලාවක ඉන්න ප්‍රධාන කෝකියා (Head Chef)
     * කියලා.
     * එයාගේ ප්‍රධාන වැඩේ තමයි ඔර්ඩර්ස් (Tasks) කළමනාකරණය කරන එක.
     * හැබැයි කෝකියාට මේ වැඩේ තනියම කරන්න බැහැ. එයාට උදව්වට ප්‍රධාන දේවල් දෙකක් ඕනේ
     * වෙනවා:
     * TaskRepository - කෑම බඩු තියෙන ප්‍රධාන ගබඩාව (Database එකේ Tasks තියාගන්න
     * තැන).
     * UserRepository - පාරිභෝගිකයින්ගේ විස්තර තියෙන පොත (Database එකේ Users ලා ඉන්න
     * තැන).
     * කෝකියා මේ ගබඩාවයි, පොතයි තනියම හදාගන්නේ නැහැ. ආපනශාලාවේ මැනේජර් (ඒ කියන්නේ
     * අපේ Spring Boot එක)
     * කෝකියාව වැඩට බඳවා ගන්නකොටම, මේ ගබඩාවේ යතුරයි, පොතයි කෝකියාගේ අතට දෙනවා.
     * "මෙන්න ඔයාට වැඩ කරන්න ඕනේ කරන දේවල් ටික" කියලා.
     * 
     * ඇත්තටම මේකෙන් කරන්නේ මොකක්ද? (Why do we do this?)
     * අපේ Spring Boot program එක start වෙනකොට, එයා ඉබේම මේ TaskService එකක් හදනවා.
     * එහෙම හදනකොට, Spring Boot විසින්ම මේ කියන TaskRepository එකකුත්,
     * UserRepository එකකුත් හදලා මේ Constructor එක හරහා TaskService එක ඇතුළට දාලා
     * දෙනවා.
     * ඊට පස්සේ TaskService එක ඇතුළේ වෙනත් තැන් වලදී (උදාහරණයක් විදිහට අලුත් task
     * එකක් database එකට save කරන්න වගේ ඕනෙම වෙලාවක), කිසිම ප්‍රශ්නයක් නැතුව අර
     * Spring Boot එකෙන් දීපු Repository දෙක පාවිච්චි කරලා ඒ වැඩේ කරගන්න පුළුවන්.
     * මේකට Programing වලදී කියන නම තමයි Dependency Injection. ඒ කියන්නේ අපිට ඕනේ
     * කරන දේවල් (Dependencies) වෙනත් කෙනෙකුට කියලා (Spring Boot) අපේ ඇතුළට දාගන්න
     * (Inject කරගන්න) එකයි.
     */

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponseDTO createTask(TaskRequestDTO taskRequest) {
        // Fetch the currently authenticated user from SecurityContextHolder.
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        /*
         * Now we have know who is requesting to create a task, so we should create a
         * task for that userId
         * We will use that useremail to find that user in our database and fetch the
         * user id So ,
         * there will be no chance of creating a task for wrong userId If user is not
         * found , then throw an exception.
         * For that we will use ResourceNotFoundException. If user is found , then
         * create a task for that user
         */
        UserEntity userObject = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        /*
         * Created an object from the TaskEntity.
         * Now test the incoming taskRequest details to the newly created object.
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
                savedTask.getDueDate());
    }

    public List<TaskResponseDTO> getUserTask() {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userObject = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        List<TaskEntity> userTasks = taskRepository.findAllByUser(userObject);

        return userTasks.stream().map(task -> new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getDueDate())).toList();
    }

    public UpdateTaskDTO UpdateTask(Long taskId, UpdateTaskDTO updateRequest) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userObject = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        TaskEntity existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("No such task found!"));

        if (!existingTask.getUser().getUserId().equals(userObject.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to eidt this task");
        }

        existingTask.setTitle(updateRequest.title());
        existingTask.setDescription(updateRequest.description());
        existingTask.setDueDate(updateRequest.dueDate());
        existingTask.setStatus(updateRequest.status());

        taskRepository.save(existingTask);

        return new UpdateTaskDTO(
                existingTask.getTitle(),
                existingTask.getDescription(),
                existingTask.getStatus(),
                existingTask.getDueDate());
    }
}
