package ate.technical.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/tasks")
public class TaskController {
    @GetMapping("/new")
    public String getTasksPage(@RequestParam Long machineId, Model model) {
        model.addAttribute("machineId", machineId);
        return "new-task";
    }
}
