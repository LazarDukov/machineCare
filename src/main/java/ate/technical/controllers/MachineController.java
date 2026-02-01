package ate.technical.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/machines")
public class MachineController {


    @GetMapping()
    public String showMachinesPage() {
        return "machines";
    }

    @GetMapping("/add")
    public String showAddMachineForm() {
        return "add-machine";
    }
}
