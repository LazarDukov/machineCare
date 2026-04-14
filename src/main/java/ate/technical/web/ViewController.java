package ate.technical.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {
    @GetMapping("/login")
    public String loginView() {
        return "forward:/login.html";
    }

    @GetMapping("/register")
    public String registerView() {
        return "forward:/register.html";
    }

    @GetMapping("/machines")
    public String machinesView() {
        return "forward:/machines.html";
    }

    @GetMapping("/machines/extruders")
    public String extrudersView() {
        return "forward:/extruders.html";
    }

    @GetMapping("/machines/extruders/add")
    public String addMachineView() {
        return "forward:/add-machine.html";
    }

    @GetMapping("/tasks/add")
    public String addTaskView() {
        return "forward:/add-task.html";
    }

    @GetMapping("/tasks/all")
    public String allTasksView() {
        return "forward:/tasks.html";
    }

    @GetMapping("/machines/extruders/machine-details.html")
    public String machineDetails() {
        return "forward:/machine-details.html";
    }

}
