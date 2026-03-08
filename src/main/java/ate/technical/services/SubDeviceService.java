package ate.technical.services;

import ate.technical.api.requests.CreateSubDeviceRequest;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.SubDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SubDeviceService {
    private SubDeviceRepository subDeviceRepository;

    public SubDeviceService(SubDeviceRepository subDeviceRepository) {
        this.subDeviceRepository = subDeviceRepository;
    }

    public void createSubDevice(CreateSubDeviceRequest request) {
        SubDevice subDevice = new SubDevice();
        subDevice.setName(request.getName());
        subDevice.setComponents(new ArrayList<>());
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
}
