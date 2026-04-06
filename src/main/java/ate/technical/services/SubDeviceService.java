package ate.technical.services;

import ate.technical.api.requests.subDevice.CreateSubDeviceRequest;
import ate.technical.api.response.subDevice.ViewAllSubDevicesResponse;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.SubDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubDeviceService {
    private DeviceService deviceService;
    private SubDeviceRepository subDeviceRepository;

    public SubDeviceService(DeviceService deviceService, SubDeviceRepository subDeviceRepository) {
        this.deviceService = deviceService;
        this.subDeviceRepository = subDeviceRepository;
    }

    public SubDevice findById(Long id) {
        return subDeviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Sub-device not found"));
    }

    public void createSubDevice(CreateSubDeviceRequest request) {
        Device device = deviceService.getDeviceById(request.getDeviceId());
        SubDevice subDevice = new SubDevice();
        subDevice.setName(request.getName());
        subDevice.setDevice(device);
        subDevice.setComponents(new ArrayList<>());
        device.getSubDevice().add(subDevice);
        subDeviceRepository.save(subDevice);

    }

    public void changeDeviceName(Long id, String newName) {

        SubDevice subDevice = subDeviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Sub-device not found"));
        subDevice.setName(newName);
        subDeviceRepository.save(subDevice);
    }

    public void deleteSubDevice(Long id) {
        subDeviceRepository.deleteById(id);
    }

    public List<ViewAllSubDevicesResponse> getSubDevicesByDeviceId(Long deviceId) {
        List<SubDevice> subDevices = subDeviceRepository.findByDeviceId(deviceId);
        List<ViewAllSubDevicesResponse> response = new ArrayList<>();
        for (SubDevice subDevice : subDevices) {
            response.add(new ViewAllSubDevicesResponse()
                    .setId(subDevice.getId())
                    .setName(subDevice.getName())
                    .setDeviceId(subDevice.getDevice().getId()));
        }
        System.out.println("Found " + response.size() + " sub-devices for device ID: " + deviceId);
        return response;

    }
}
