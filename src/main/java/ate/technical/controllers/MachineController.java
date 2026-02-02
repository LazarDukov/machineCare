package ate.technical.controllers;

import ate.technical.services.MachineService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/machines")
public class MachineController {

    private final MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping()
    public String showMachinesPage() {
        return "machines";
    }

    @GetMapping("/add")
    public String showAddMachineForm() {
        return "add-machine";
    }

    @GetMapping("/update/{name}")
    public String updateMachine(@PathVariable String name, Model model) {
        model.addAttribute("machineName", machineService.getMachineByName(name));

        return "add-machine";
    }

}
