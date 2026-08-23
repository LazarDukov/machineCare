package ate.technical.services;

import ate.technical.api.requests.repairJobs.ChangeRepairJobsRequest;
import ate.technical.api.requests.repairJobs.RepairJobsCreateRequest;
import ate.technical.model.entities.Machine;
import ate.technical.model.entities.RepairJob;
import ate.technical.model.entities.User;
import ate.technical.model.enums.DepartmentEnum;
import ate.technical.repositories.MachineRepository;
import ate.technical.repositories.RepairJobRepository;
import ate.technical.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        System.out.println(request.getMachineName() + " " + request.getDescription() + " " + request.getTechnicianIds());
        Optional<Machine> machine = Optional.ofNullable(machineRepository.findMachineByName(request.getMachineName()).orElseThrow(() -> new RuntimeException("Machine not found")));
        System.out.println("first id: " + request.getTechnicianIds().get(0));
        List<User> technicians = userRepository.findAllById(request.getTechnicianIds()).stream().toList();


        RepairJob repairJob = new RepairJob();
        repairJob.setMachine(machine.get());
        repairJob.setName(request.getName());
        repairJob.setStartDate(request.getStartDate());
        repairJob.setEndDate(request.getEndDate());
        repairJob.setEmployees(technicians);

        repairJob.setDescription(request.getDescription());
        repairJobRepository.save(repairJob);
    }

    public void changeRepairJob(ChangeRepairJobsRequest request) {
        System.out.println(request.getId());
        RepairJob repairJob = repairJobRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("Repair job not found"));;
        System.out.print(request.getName() + " " + request.getTechnicianIds());
        repairJob.setName(request.getName());
        repairJob.setStartDate(request.getStartDate());
        repairJob.setEndDate(request.getEndDate());
        repairJob.setDescription(request.getDescription());
        List<User> allTechnicians = userRepository.findAllByDepartmentEnum(DepartmentEnum.TECHNICAL_DEPARTMENT).stream().toList();
        System.out.println("allTechnicians: " + allTechnicians.stream().map(User::getId).toList());
        List<User> newTechnicians = allTechnicians.stream().filter(technician -> request.getTechnicianIds().contains(technician.getId())).toList();
        System.out.println("newTechnicians: " + newTechnicians.stream().map(User::getId).toList());
        repairJob.getEmployees().clear();
        // TODO: here should put less acts for better performance!
        repairJob.getEmployees().addAll(newTechnicians);

        repairJobRepository.save(repairJob);

    }
}
