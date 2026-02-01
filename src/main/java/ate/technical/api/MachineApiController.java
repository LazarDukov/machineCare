package ate.technical.api;

import ate.technical.api.requests.CreateMachineRequest;
import ate.technical.model.entities.Machine;
import ate.technical.services.MachineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping
public class MachineApiController {
    private final MachineService machineService;

    public MachineApiController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping("/api/machines/all")
    public ResponseEntity<List<Machine>> getAllMachines() {
        System.out.println("Retrieving all machines");
        return ResponseEntity.ok(machineService.getAllMachines());
    }

    @PostMapping("/api/machines")
    public ResponseEntity<Void> createMachine(@RequestBody CreateMachineRequest request) {
        machineService.createMachine(request);
        System.out.println("Created machine: " + request.getName());
        System.out.println(request.getManufacturer());
        return ResponseEntity.ok().build();
    }

//    @DeleteMapping("/api/machines/{name}")
//    public ResponseEntity<Void> deleteMachine(@PathVariable String name) {
//        // Implement deletion logic here
//        System.out.println("Deleted machine: " + name);
//        return ResponseEntity.ok().build();
//    }
//
}
