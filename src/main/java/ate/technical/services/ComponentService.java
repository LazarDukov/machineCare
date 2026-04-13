package ate.technical.services;


import ate.technical.api.requests.component.CreateComponentRequest;
import ate.technical.api.response.component.ComponentStructureResponse;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Component findById(Long id) {
        return componentRepository.findById(id).orElseThrow(() -> new RuntimeException("Component not found"));
    }

    public void changeComponentName(Long id, String newName) {

        Component component = componentRepository.findById(id).orElseThrow(() -> new RuntimeException("Component not found"));
        component.setName(newName);
        componentRepository.save(component);
    }

    public void deleteComponent(Long id) {
        componentRepository.deleteById(id);
    }

    public List<ComponentStructureResponse> getComponentsBySubDeviceId(Long subDeviceId) {
        List<Component> components = componentRepository.findBySubDeviceId(subDeviceId);
        List<ComponentStructureResponse> response = new ArrayList<>();
        for (Component component : components) {
            response.add(new ComponentStructureResponse()
                    .setId(component.getId())
                    .setName(component.getName()));
        }
        System.out.println("Found " + response.size() + " sub-devices for device ID: " + subDeviceId);
        return response;

    }
}
