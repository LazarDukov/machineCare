package ate.technical.api;

import ate.technical.api.requests.CreateTaskRequest;
import ate.technical.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskApiController {
    private TaskService taskService;

    public TaskApiController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Void> createTask(@RequestBody CreateTaskRequest request) {
    taskService.createTask(request);
        return ResponseEntity.ok().build();

//TODO: SHOULD CREATE JS FILE AND THEN CHECK IF THE METHOD WORKS!
    }

}
