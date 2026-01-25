package ate.technical.services;

import ate.technical.api.requests.CreateTaskRequest;
import ate.technical.model.entities.Task;
import ate.technical.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final MachineService machineService;

    private final MaterialService materialService;

    public TaskService(TaskRepository taskRepository, MachineService machineService, MaterialService materialService) {
        this.taskRepository = taskRepository;
        this.machineService = machineService;
        this.materialService = materialService;
    }

    public void createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAdditionalInfo(request.getAdditionalInfo());
        task.setMachine(machineService.getMachineByName(request.getMachineName()));
        task.setMaterials(new ArrayList<>());
        task.getMaterials().add(materialService.getMaterialByName(request.getMaterial()).orElseThrow());
        task.setActive(true);
        task.setPeriod(request.getPeriodEnum());
        task.setRepeatedAfter(request.getRepeatedAfter());
        task.setUserTask(new ArrayList<>());
        taskRepository.save(task);
    }
}
