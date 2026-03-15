package ate.technical.api;

import ate.technical.api.requests.machine.CreateMachineRequest;
import ate.technical.api.requests.machine.GetMachinesRequest;
import ate.technical.api.response.ViewMachineResponse;
import ate.technical.model.enums.TypeEnum;
import ate.technical.services.MachineService;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/type/{machineType}")
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



    @PostMapping
    public ResponseEntity<Void> createMachine(@RequestBody CreateMachineRequest request) {
        machineService.createMachine(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
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
