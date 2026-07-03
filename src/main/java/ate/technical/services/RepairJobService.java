package ate.technical.services;

import ate.technical.api.requests.repairJobs.RepairJobsCreateRequest;
import ate.technical.model.entities.Machine;
import ate.technical.model.entities.RepairJob;
import ate.technical.model.entities.User;
import ate.technical.repositories.MachineRepository;
import ate.technical.repositories.RepairJobRepository;
import ate.technical.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepairJobService {
    private RepairJobRepository repairJobRepository;
    private MachineRepository machineRepository;
    private UserRepository userRepository;

    public RepairJobService(RepairJobRepository repairJobRepository, MachineRepository machineRepository, UserRepository userRepository) {
        this.repairJobRepository = repairJobRepository;
        this.machineRepository = machineRepository;
        this.userRepository = userRepository;
    }

    public void addRepairJob(RepairJobsCreateRequest request) {
        System.out.println(request.getMachineName() + " " + request.getRepairDate() + " " + request.getDescription() + " " + request.getTechnicianIds());
        Optional<Machine> machine = Optional.ofNullable(machineRepository.findMachineByName(request.getMachineName()).orElseThrow(() -> new RuntimeException("Machine not found")));
        System.out.println("first id: " + request.getTechnicianIds().get(0));
        List<User> technicians = userRepository.findAllById(request.getTechnicianIds()).stream().toList();


        RepairJob repairJob = new RepairJob();
        repairJob.setMachine(machine.get());
        repairJob.setStartDate(request.getRepairDate());
        repairJob.setEmployees(technicians);
        repairJob.setDescription(request.getDescription());
        repairJobRepository.save(repairJob);
    }
}
