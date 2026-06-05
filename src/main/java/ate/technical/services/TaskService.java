package ate.technical.services;

import ate.technical.api.requests.task.ChangeTaskRequest;
import ate.technical.api.requests.task.CreateTaskRequest;
import ate.technical.api.response.task.ViewAllTasksResponse;
import ate.technical.model.entities.*;
import ate.technical.model.enums.PeriodEnum;
import ate.technical.repositories.TaskHistoryRepository;
import ate.technical.repositories.TaskRepository;
import ate.technical.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final MachineService machineService;
    private final DeviceService deviceService;
    private final SubDeviceService subDeviceService;
    private final ComponentService componentService;
    private final TaskHistoryRepository taskHistoryRepository;

    private final MaterialService materialService;

    private final UserService userService;

    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, MachineService machineService, DeviceService deviceService, SubDeviceService subDeviceService, ComponentService componentService, TaskHistoryRepository taskHistoryRepository, MaterialService materialService, UserService userService, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.machineService = machineService;
        this.deviceService = deviceService;
        this.subDeviceService = subDeviceService;
        this.componentService = componentService;
        this.taskHistoryRepository = taskHistoryRepository;
        this.materialService = materialService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public void createTask(CreateTaskRequest request) {
        // TODO: Should check if this method works correctly!
        Machine machine = machineService.getMachineByName(request.getMachineName());
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAdditionalInfo(request.getAdditionalInfo());
        task.setMachine(machineService.getMachineByName(request.getMachineName()));
        task.setDevice(deviceService.findById(request.getDeviceId()));
        task.setSubDevice(subDeviceService.findById(request.getSubDeviceId()));
        task.setComponent(componentService.findById(request.getComponentId()));
        task.setMaterials(new ArrayList<>());
        task.setActive(true);
        task.setPeriod(request.getPeriodEnum());
        task.setRepeatedAfter(request.getRepeatedAfter());
        taskRepository.save(task);
        machine.getTasks().add(task);


    }

    public List<ViewAllTasksResponse> getAllTasks(String machineName) {
        List<ViewAllTasksResponse> responseList = new ArrayList<>();
        System.out.println(machineName);
        List<Task> tasks = taskRepository.findAllByMachine_Name(machineName);
        System.out.println(tasks.size() + 1);
        for (Task task : tasks) {
            ViewAllTasksResponse response = new ViewAllTasksResponse();
            response.setId(task.getId());
            response.setTitle(task.getTitle());
            response.setMachineId(task.getMachine().getId());
            response.setMachineName(task.getMachine().getName());
            response.setDeviceId(task.getDevice().getId());
            response.setDeviceName(task.getDevice().getName());
            response.setSubDeviceId(task.getSubDevice().getId());
            response.setSubDeviceName(task.getSubDevice().getName());
            response.setComponentId(task.getComponent().getId());
            response.setComponentName(task.getComponent().getName());
            response.setDescription(task.getDescription());
            response.setRepeatedAfter(task.getRepeatedAfter());
            response.setPeriodEnum(task.getPeriodEnum().toString());
            response.setCompleted(!task.isActive());
            response.setCreatedAt(task.getCreatedAt());
            responseList.add(response);
        }

        return responseList;
    }


    public void updateTask(ChangeTaskRequest request) {
        Task task = taskRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("Task not found with id: " + request.getId()));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAdditionalInfo(request.getAdditionalInfo());
        task.setDevice(deviceService.findById(request.getDeviceId()));
        task.setSubDevice(subDeviceService.findById(request.getSubDeviceId()));
        task.setComponent(componentService.findById(request.getComponentId()));
        task.setPeriodEnum(PeriodEnum.valueOf(request.getPeriodEnum()));
        task.setRepeatedAfter(request.getRepeatedAfter());
        taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        TaskHistory taskHistory = taskHistoryRepository.getReferenceById(id);
        taskHistoryRepository.delete(taskHistory);
        taskRepository.delete(task);
    }
}
