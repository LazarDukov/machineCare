package ate.technical.services;

import ate.technical.api.requests.CreateDeviceRequest;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DeviceService {
    private DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public void createDevice(CreateDeviceRequest request) {
        Device device = new Device();
        device.setDeviceName(request.getName());
        device.setSubDevice(new ArrayList<>());
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
