package ate.technical.services;

import ate.technical.api.requests.task.CreateTaskRequest;
import ate.technical.model.entities.Machine;
import ate.technical.model.entities.Material;
import ate.technical.model.entities.Task;
import ate.technical.model.entities.User;
import ate.technical.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final MachineService machineService;

    private final MaterialService materialService;

    private final UserService userService;

    public TaskService(TaskRepository taskRepository, MachineService machineService, MaterialService materialService, UserService userService) {
        this.taskRepository = taskRepository;
        this.machineService = machineService;
        this.materialService = materialService;
        this.userService = userService;
    }

    public void createTask(CreateTaskRequest request) {
        // TODO: Should check if this method works correctly!
        Machine machine = machineService.getMachineByName(request.getMachineName());
        User user = userService.getUserByUsername(request.getUser());
        Material material = materialService.getMaterialBySapNumber(request.getMaterial());
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAdditionalInfo(request.getAdditionalInfo());
        task.setMachine(machineService.getMachineByName(request.getMachineName()));
        task.setMaterials(new ArrayList<>());
        task.getMaterials().add(material);
        task.setActive(true);
        task.setPeriod(request.getPeriodEnum());
        task.setRepeatedAfter(request.getRepeatedAfter());
        task.setUser(user);
        taskRepository.save(task);
        machine.getTasks().add(task);
        user.getTasks().add(task);

    }
}
