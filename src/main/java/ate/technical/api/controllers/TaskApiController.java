package ate.technical.api.controllers;

import ate.technical.api.requests.task.ChangeTaskRequest;
import ate.technical.api.requests.task.CreateTaskRequest;
import ate.technical.api.requests.task.DeleteTaskRequest;
import ate.technical.api.response.task.ViewAllTasksResponse;
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

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<Void> updateTask(@RequestBody ChangeTaskRequest request) {
taskService.updateTask(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteTask(@RequestBody DeleteTaskRequest request) {
        System.out.println("Deleting task with id: " + request.getId());
        taskService.deleteTask(request.getId());
        return ResponseEntity.ok().build();
    }

}
