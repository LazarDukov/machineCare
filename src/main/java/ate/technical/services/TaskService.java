package ate.technical.services;

import ate.technical.api.requests.task.CreateTaskRequest;
import ate.technical.model.entities.*;
import ate.technical.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final MachineService machineService;
    private final DeviceService deviceService;
    private final SubDeviceService subDeviceService;
    private final ComponentService componentService;

    private final MaterialService materialService;

    private final UserService userService;

    public TaskService(TaskRepository taskRepository, MachineService machineService, DeviceService deviceService, SubDeviceService subDeviceService, ComponentService componentService, MaterialService materialService, UserService userService) {
        this.taskRepository = taskRepository;
        this.machineService = machineService;
        this.deviceService = deviceService;
        this.subDeviceService = subDeviceService;
        this.componentService = componentService;
        this.materialService = materialService;
        this.userService = userService;
    }

    public void createTask(CreateTaskRequest request) {
        // TODO: Should check if this method works correctly!
        Machine machine = machineService.getMachineByName(request.getMachineName());
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAdditionalInfo(request.getAdditionalInfo());
        task.setMachine(machineService.getMachineByName(request.getMachineName()));
        task.setDevice(deviceService.getDeviceById(request.getDeviceId()));
        task.setSubDevice(subDeviceService.getSubDeviceById(request.getSubDeviceId()));
        task.setComponent(componentService.getComponentsById(request.getComponentId()));
        task.setMaterials(new ArrayList<>());
        task.setActive(true);
        task.setPeriod(request.getPeriodEnum());
        task.setRepeatedAfter(request.getRepeatedAfter());
        taskRepository.save(task);
        machine.getTasks().add(task);


    }
}
