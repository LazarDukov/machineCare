package ate.technical.services;

import ate.technical.model.entities.Task;
import ate.technical.model.entities.TaskHistory;
import ate.technical.model.entities.User;
import ate.technical.repositories.TaskHistoryRepository;
import ate.technical.repositories.TaskRepository;
import ate.technical.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskHistoryService {
    private TaskHistoryRepository taskHistoryRepository;
    private TaskRepository taskRepository;

    private UserRepository userRepository;

    public TaskHistoryService(TaskHistoryRepository taskHistoryRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.taskHistoryRepository = taskHistoryRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public void completeTask(Long taskId, List<Long> employees, String note) {
        TaskHistory newTaskHistory = new TaskHistory();
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        List<User> users = new ArrayList<>();
        for (Long employeeId : employees) {
            User user = userRepository.findById(employeeId).orElseThrow();
            users.add(user);
        }
        newTaskHistory.setTask(task);
        newTaskHistory.setEmployees(users);
        newTaskHistory.setEndedAt(LocalDate.now());
        newTaskHistory.setNote(note);
        taskHistoryRepository.save(newTaskHistory);
    }
}
