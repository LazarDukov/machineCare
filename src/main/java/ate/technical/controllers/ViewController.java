package ate.technical.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
}
