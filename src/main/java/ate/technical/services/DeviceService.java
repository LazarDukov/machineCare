package ate.technical.services;

import ate.technical.api.requests.device.CreateDeviceRequest;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import ate.technical.repositories.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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
        Machine machine = machineService.getMachineById(request.getMachineId());
        Device device = new Device();
        device.setDeviceName(request.getName());
        device.setMachine(machine);
        device.setSubDevice(new ArrayList<>());
        machine.getDevices().add(device);
        // TODO: Should create method for give this device to a given machine
        deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public void changeDeviceName(Long id, String newName) {
        Device device = deviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Device not found"));
        device.setDeviceName(newName);
        deviceRepository.save(device);
    }
}
