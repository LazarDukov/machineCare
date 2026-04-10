package ate.technical.services;

import ate.technical.api.requests.machine.CreateMachineRequest;
import ate.technical.api.requests.machine.GetMachinesRequest;
import ate.technical.api.response.ViewStructureResponse;
import ate.technical.api.response.ViewMachineResponse;
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

import java.util.ArrayList;
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

    public Machine findMachineById(Long id) {
        return machineRepository.findById(id).orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public void deleteMachine(Long id) {
        machineRepository.deleteById(id);
    }


    public ViewStructureResponse viewStructure(String name) {
        Machine machine = machineRepository.findMachineByName(name).orElseThrow(() -> new RuntimeException("Machine not found"));
        List<DevicesStructureResponse> devices = new ArrayList<>();
        for (Device device : machine.getDevices()) {
            DevicesStructureResponse view = new DevicesStructureResponse();

            view.setId(device.getId());
            view.setName(device.getName());
            List<SubDevice> subDevicesDb = subDeviceRepository.findByDeviceId(device.getId());
            List<SubDevicesStructureResponse> subDevices = new ArrayList<>();
            view.setSubDevices(new ArrayList<>());
            for (SubDevice subDevice : subDevicesDb) {

                SubDevicesStructureResponse subDeviceView = new SubDevicesStructureResponse();
                subDeviceView.setId(subDevice.getId());
                subDeviceView.setName(subDevice.getName());
                subDeviceView.setComponents(new ArrayList<>());
                List<ComponentStructureResponse> components = new ArrayList<>();
                List<Component> componentsDb = componentRepository.findBySubDeviceId(subDevice.getId());
                for (Component component : componentsDb) {
                    ComponentStructureResponse componentView = new ComponentStructureResponse();
                    componentView.setId(component.getId());
                    componentView.setName(component.getName());
                    components.add(componentView);
                }

                subDeviceView.setComponents(components);
                subDevices.add(subDeviceView);
            }

            view.setSubDevices(subDevices);
            devices.add(view);
        }

        ViewStructureResponse response = new ViewStructureResponse();
        response.setStructure(devices);


        return response;
    }

}
