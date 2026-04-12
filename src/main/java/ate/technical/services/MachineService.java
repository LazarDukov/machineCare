package ate.technical.services;

import ate.technical.api.requests.machine.CreateMachineRequest;
import ate.technical.api.requests.machine.GetMachinesRequest;
import ate.technical.api.response.machine.ViewStructureResponse;
import ate.technical.api.response.machine.ViewMachineResponse;
import ate.technical.api.response.component.ComponentStructureResponse;
import ate.technical.api.response.device.DevicesStructureResponse;
import ate.technical.api.response.subDevice.SubDevicesStructureResponse;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import ate.technical.model.entities.SubDevice;
import ate.technical.model.enums.TypeEnum;
import ate.technical.repositories.ComponentRepository;
import ate.technical.repositories.DeviceRepository;
import ate.technical.repositories.MachineRepository;
import ate.technical.repositories.SubDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MachineService {
    private final MachineRepository machineRepository;
    private final DeviceRepository deviceRepository;
    private final SubDeviceRepository subDeviceRepository;

    private final ComponentRepository componentRepository;


    public MachineService(MachineRepository machineRepository, DeviceRepository deviceRepository, SubDeviceRepository subDeviceRepository, ComponentRepository componentRepository) {
        this.machineRepository = machineRepository;

        this.deviceRepository = deviceRepository;
        this.subDeviceRepository = subDeviceRepository;
        this.componentRepository = componentRepository;
    }


    public Optional<ViewMachineResponse> optionalGetMachineByName(String name) {
        System.out.println(name + "2");
        return machineRepository.findMachineByName(name).map(this::viewMachineResponse);
    }

    public Machine getMachineById(Long id) {
        return machineRepository.findById(id).orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public Machine getMachineByName(String name) {
        return machineRepository.findMachineByName(name).orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    private ViewMachineResponse viewMachineResponse(Machine machine) {
        return new ViewMachineResponse().setName(machine.getName()).setIdentificationNumber(machine.getIdentificationNumber()).setManufacturer(machine.getManufacturer()).setType(machine.getType().name()).setModel(machine.getModel());
    }


    public void createMachine(CreateMachineRequest request) {
        System.out.println("Im in service layer before createing machine");
        System.out.println(request.getName());
        System.out.println(request.getManufacturer());
        System.out.println(request.getType());
        System.out.println(request.getModel());
        System.out.println(request.getIdentificationNumber());

        Machine machine = new Machine();
        machine.setName(request.getName());
        machine.setIdentificationNumber(request.getIdentificationNumber());
        machine.setManufacturer(request.getManufacturer());
        machine.setType(TypeEnum.valueOf(request.getType().toUpperCase()));
        machine.setModel(request.getModel());
        System.out.println("machine created");
        machineRepository.save(machine);
        System.out.println("machine saved");
    }

    public List<GetMachinesRequest> findAllByType(TypeEnum type) {

        return machineRepository.findAllMachinesByType(type).stream().map(machine -> new GetMachinesRequest(machine.getId(), machine.getName())).collect(Collectors.toList());
    }

    public void updateMachine(Long id, CreateMachineRequest request) {
        Machine machine = findMachineById(id);
        machine.setName(request.getName());
        machine.setIdentificationNumber(request.getIdentificationNumber());
        machine.setManufacturer(request.getManufacturer());
        machine.setType(TypeEnum.valueOf(request.getType()));
        machine.setModel(request.getModel());
        machineRepository.save(machine);
    }

    private Machine findMachineByName(String name) {
        return machineRepository.findMachineByName(name)
                .orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public Machine findMachineById(Long id) {
        return machineRepository.findById(id).orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public void deleteMachine(Long id) {
        machineRepository.deleteById(id);
    }

    public ViewStructureResponse viewStructure(String name) {
        Machine machine = findMachineByName(name);

        List<DevicesStructureResponse> devices = machine.getDevices().stream()
                .map(this::mapDevice)
                .toList();

        ViewStructureResponse response = new ViewStructureResponse();
        response.setStructure(devices);

        return response;
    }


    private DevicesStructureResponse mapDevice(Device device) {
        DevicesStructureResponse deviceView = new DevicesStructureResponse();
        deviceView.setId(device.getId());
        deviceView.setName(device.getName());

        List<SubDevicesStructureResponse> subDevices = subDeviceRepository
                .findByDeviceId(device.getId())
                .stream()
                .map(this::mapSubDevice)
                .toList();

        deviceView.setSubDevices(subDevices);
        return deviceView;
    }

    private SubDevicesStructureResponse mapSubDevice(SubDevice subDevice) {
        SubDevicesStructureResponse subView = new SubDevicesStructureResponse();
        subView.setId(subDevice.getId());
        subView.setName(subDevice.getName());

        List<ComponentStructureResponse> components = componentRepository
                .findBySubDeviceId(subDevice.getId())
                .stream()
                .map(this::mapComponent)
                .toList();

        subView.setComponents(components);
        return subView;
    }

    private ComponentStructureResponse mapComponent(Component component) {
        ComponentStructureResponse compView = new ComponentStructureResponse();
        compView.setId(component.getId());
        compView.setName(component.getName());
        return compView;
    }


}
