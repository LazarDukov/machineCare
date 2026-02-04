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

    @GetMapping("/{id}")
    public String updateMachine(@PathVariable Long id, Model model) {
        model.addAttribute("machineId", id);
        model.addAttribute("machineName", machineService.findMachineById(id).getName());
        model.addAttribute("identificationNumber", machineService.findMachineById(id).getIdentificationNumber());
        model.addAttribute("manufacturer", machineService.findMachineById(id).getManufacturer());
        model.addAttribute("type", machineService.findMachineById(id).getType());
        model.addAttribute("model", machineService.findMachineById(id).getModel());

        return "add-machine";
    }

}
