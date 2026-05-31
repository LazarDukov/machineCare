package ate.technical.api.controllers;

import ate.technical.api.requests.taskHistory.EndTaskRequest;
import ate.technical.services.TaskHistoryService;
import ate.technical.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task-history")
public class TaskHistoryApiController {
    private TaskHistoryService taskHistoryService;



    public TaskHistoryApiController(TaskHistoryService taskHistoryService){
        this.taskHistoryService = taskHistoryService;

    }

    @PostMapping("/complete-task")
    public ResponseEntity<Void> completeTask(@RequestBody EndTaskRequest request) {
        taskHistoryService.completeTask(request.getTaskId(), request.getEmployees(), request.getNote());
        return ResponseEntity.ok().build();
    }

}
