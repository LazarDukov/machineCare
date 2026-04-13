package ate.technical.services;

import ate.technical.api.requests.subDevice.CreateSubDeviceRequest;
import ate.technical.model.entities.Device;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.SubDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        device.getSubDevices().add(subDevice);
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

    public List<SubDevice> getSubDevicesByDeviceId(Long deviceId) {
        return subDeviceRepository.findByDeviceId(deviceId);


    }

    public SubDevice getSubDeviceById(Long subDeviceId) {
        return subDeviceRepository.findById(subDeviceId).orElseThrow(() -> new RuntimeException("Sub-device not found"));
    }
}
