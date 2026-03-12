package ate.technical.api;

import ate.technical.api.requests.CreateMachineRequest;
import ate.technical.api.requests.GetMachinesRequest;
import ate.technical.api.response.ViewMachineResponse;
import ate.technical.model.entities.Machine;
import ate.technical.model.enums.TypeEnum;
import ate.technical.services.MachineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/machines")
public class MachineApiController {
    private final MachineService machineService;

    public MachineApiController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping("/{machineType}")
    @ResponseBody
    public ResponseEntity<List<GetMachinesRequest>> getAllMachinesWithGivenType(@PathVariable String machineType) {
        System.out.println("Retrieving all machines");
        TypeEnum typeEnum = TypeEnum.valueOf(machineType.toUpperCase());
        return ResponseEntity.ok(machineService.findAllByType(typeEnum));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ViewMachineResponse> getMachineByName(@PathVariable String name) {
        Optional<ViewMachineResponse> machine = machineService.optionalGetMachineByName(name);
        return machine.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .build());

    }

    @PostMapping("/add")
    public ResponseEntity<Void> createMachine(@RequestBody CreateMachineRequest request) {
        machineService.createMachine(request);
        System.out.println("Created machine: " + request.getName());
        System.out.println(request.getManufacturer());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMachine(@PathVariable Long id, @RequestBody CreateMachineRequest request) {
        machineService.updateMachine(id, request);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMachine(@PathVariable Long id) {
        machineService.deleteMachine(id);
        return ResponseEntity.noContent().build();
    }

}
