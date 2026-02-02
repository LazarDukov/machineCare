package ate.technical.api;

import ate.technical.api.requests.CreateMachineRequest;
import ate.technical.api.requests.GetMachinesRequest;
import ate.technical.model.entities.Machine;
import ate.technical.model.enums.TypeEnum;
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

    @GetMapping("/api/machines/{machineType}")
    @ResponseBody
    public ResponseEntity<List<GetMachinesRequest>> getAllMachinesWithGivenType(@PathVariable String machineType) {
        System.out.println("Retrieving all machines");
        TypeEnum typeEnum = TypeEnum.valueOf(machineType.toUpperCase());
        return ResponseEntity.ok(machineService.findAllByType(typeEnum));
    }

    @PostMapping("/api/machines")
    public ResponseEntity<Void> createMachine(@RequestBody CreateMachineRequest request) {
        machineService.createMachine(request);
        System.out.println("Created machine: " + request.getName());
        System.out.println(request.getManufacturer());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/machines/{name}")
    public ResponseEntity<Void> updateMachine(@PathVariable String name, @RequestBody CreateMachineRequest request) {
        // Implement update logic here
        System.out.println("Updated machine: " + name);
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
