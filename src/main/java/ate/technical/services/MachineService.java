package ate.technical.services;

import ate.technical.api.requests.machine.CreateMachineRequest;
import ate.technical.api.requests.machine.GetMachinesRequest;
import ate.technical.api.response.ViewAllStructure;
import ate.technical.api.response.ViewMachineResponse;
import ate.technical.api.response.component.ViewAllComponentResponse;
import ate.technical.api.response.device.ViewAllDevicesResponse;
import ate.technical.api.response.subDevice.ViewAllSubDevicesResponse;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import ate.technical.model.enums.TypeEnum;
import ate.technical.repositories.DeviceRepository;
import ate.technical.repositories.MachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MachineService {
    private final MachineRepository machineRepository;
    private final DeviceRepository deviceRepository;



    public MachineService(MachineRepository machineRepository, DeviceRepository deviceRepository) {
        this.machineRepository = machineRepository;

        this.deviceRepository = deviceRepository;
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
        return new ViewMachineResponse().setName(machine.getName())
                .setIdentificationNumber(machine.getIdentificationNumber())
                .setManufacturer(machine.getManufacturer())
                .setType(machine.getType().name())
                .setModel(machine.getModel());
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

        return machineRepository.findAllMachinesByType(type).stream()
                .map(machine -> new GetMachinesRequest(machine.getId(),
                        machine.getName()))
                .collect(Collectors.toList());
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


    public ViewAllStructure getMachineStructureByName(String name) {
        List<Device> devices = deviceRepository.findFullStructure(name);

        ViewAllStructure response = new ViewAllStructure();

        List<ViewAllDevicesResponse> deviceView = devices.stream().map(device -> {

            // 🔹 SubDevices
            List<ViewAllSubDevicesResponse> subDeviceView =
                    device.getSubDevice() != null
                            ? device.getSubDevice().stream().map(sub -> {

                        List<ViewAllComponentResponse> componentView =
                                sub.getComponents() != null
                                        ? sub.getComponents().stream().map(comp ->
                                        new ViewAllComponentResponse(
                                                comp.getId(),
                                                comp.getName()
                                        )
                                ).toList()
                                        : List.of();

                        return new ViewAllSubDevicesResponse(
                                sub.getId(),
                                sub.getName(),
                                componentView
                        );

                    }).toList()
                            : List.of();

            return new ViewAllDevicesResponse(
                    device.getId(),
                    device.getName(),
                    subDeviceView
            );

        }).toList();

        response.setDevicesResponses(deviceView);

        return response;
    }
}
