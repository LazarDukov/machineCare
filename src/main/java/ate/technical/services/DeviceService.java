package ate.technical.services;

import ate.technical.api.requests.device.CreateDeviceRequest;
import ate.technical.api.response.device.AddSubDeviceDropDownResponse;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import ate.technical.repositories.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {
    private MachineService machineService;
    private DeviceRepository deviceRepository;

    public DeviceService(MachineService machineService, DeviceRepository deviceRepository) {
        this.machineService = machineService;
        this.deviceRepository = deviceRepository;
    }

    public Device getDeviceById(Long id) {
        return deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found"));
    }

    public void createDevice(CreateDeviceRequest request) {
        Machine machine = machineService.getMachineByName(request.getMachineName());
        Device device = new Device();
        device.setName(request.getName());
        device.setMachine(machine);
        device.setSubDevices(new ArrayList<>());
        machine.getDevices().add(device);
        deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public void changeDeviceName(Long id, String newName) {
        Device device = deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found"));
        device.setName(newName);
        deviceRepository.save(device);
    }

    public List<AddSubDeviceDropDownResponse> getAllDevicesOfGivenMachine(String machineName) {
        return deviceRepository.findAllByMachine_Name(machineName).stream()
                .map(device -> new AddSubDeviceDropDownResponse(device.getId(), device.getName())).toList();
    }
}
