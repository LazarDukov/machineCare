package ate.technical.web;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {
    @GetMapping("/")
    public String homeView(Authentication authentication) {
        boolean isLogged = authentication != null && authentication.isAuthenticated();
        if (isLogged) {
            return "forward:/machines.html";
        }
        return "forward:/index.html";
    }

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

    @GetMapping("/full-structure")
    public String viewMachineStructure() {
        return "forward:/full-machine-structure.html";
    }

    @GetMapping("/change-structure")
    public String viewChangeMachineStructure() {
        return "forward:/change-structure.html";
    }

    @GetMapping("/repair-jobs")
    public String viewRepairJobs() {
        return "forward:/repair-jobs.html";
    }

    @GetMapping("/api/repairs-job/add")
    public String addRepairJob() {
        return "forward:/add-repairs-job.html";
    }

    @GetMapping("/machines/extruders/machine-details.html")
    public String machineDetails() {
        return "forward:/machine-details.html";
    }

    @GetMapping("/profile")
    public String profileView() {
        return "forward:/profile.html";
    }

}
