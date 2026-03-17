package ate.technical.services;


import ate.technical.api.requests.component.CreateComponentRequest;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ComponentService {
    private SubDeviceService subDeviceService;
    private ComponentRepository componentRepository;

    public ComponentService(SubDeviceService subDeviceService, ComponentRepository componentRepository) {
        this.subDeviceService = subDeviceService;
        this.componentRepository = componentRepository;
    }

    public void createComponent(CreateComponentRequest request) {
        SubDevice subDevice = subDeviceService.findById(request.getSubDeviceId());
        Component component = new Component();
        component.setName(request.getName());
        component.setAdditionalInfo(request.getAdditionalInfo());
        component.setSubDevice(subDevice);
        componentRepository.save(component);
    }

    public void changeComponentName(Long id, String newName) {

        Component component = componentRepository.findById(id).orElseThrow(() -> new RuntimeException("Component not found"));
        component.setName(newName);
        componentRepository.save(component);
    }

    public void deleteComponent(Long id) {
        componentRepository.deleteById(id);
    }
}
