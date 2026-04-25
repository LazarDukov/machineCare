package ate.technical.api.controllers;

import ate.technical.api.requests.task.CreateTaskRequest;
import ate.technical.api.response.user.ViewAllTasksResponse;
import ate.technical.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskApiController {
    private TaskService taskService;

    public TaskApiController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createTask(@RequestBody CreateTaskRequest request) {
        taskService.createTask(request);
        return ResponseEntity.ok().build();

    }


    @GetMapping("/all/{machineName}")
    @ResponseBody
    public ResponseEntity<List<ViewAllTasksResponse>> getAllTasks(@PathVariable String machineName) {
        System.out.println("Retrieving all tasks for machine: " + machineName);
        return ResponseEntity.ok(taskService.getAllTasks(machineName));
    }

    @PostMapping("/complete-task/{taskId}/{userId}")
    public ResponseEntity<Void> completeTask(@PathVariable Long taskId, @PathVariable Long userId) {
        taskService.completeTask(taskId, userId);
        return ResponseEntity.ok().build();
    }


}
