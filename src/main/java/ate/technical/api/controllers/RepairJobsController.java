package ate.technical.api.controllers;

import ate.technical.api.requests.repairJobs.RepairJobsCreateRequest;
import ate.technical.api.response.repairJobs.RepairJobsViewAllResponse;
import ate.technical.services.MachineService;
import ate.technical.services.RepairJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repair-jobs")
public class RepairJobsController {
    private RepairJobService repairJobService;
    private MachineService machineService;

    public RepairJobsController(RepairJobService repairJobService, MachineService machineService) {
        this.repairJobService = repairJobService;
        this.machineService = machineService;
    }

    @PostMapping("/add")
    private ResponseEntity<Void> addRepairJob(@RequestBody RepairJobsCreateRequest request) {
        repairJobService.addRepairJob(request);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/view-all/{machineName}")
    private ResponseEntity<List<RepairJobsViewAllResponse>> viewAllRepairJobs(@PathVariable String machineName) {
        return ResponseEntity.ok(machineService.findAllRepairJobByMachineId(machineName));
    }
}
