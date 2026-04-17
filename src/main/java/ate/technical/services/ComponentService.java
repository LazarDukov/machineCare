package ate.technical.services;


import ate.technical.api.requests.component.CreateComponentRequest;
import ate.technical.api.response.component.ComponentStructureResponse;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.ComponentPart;
import ate.technical.model.entities.Part;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.ComponentPartRepository;
import ate.technical.repositories.ComponentRepository;
import ate.technical.repositories.PartRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComponentService {
    private SubDeviceService subDeviceService;
    private ComponentRepository componentRepository;
    private PartRepository partRepository;

    private ComponentPartRepository componentPartRepository;

    public ComponentService(SubDeviceService subDeviceService, ComponentRepository componentRepository, PartRepository partRepository, ComponentPartRepository componentPartRepository) {
        this.subDeviceService = subDeviceService;
        this.componentRepository = componentRepository;

        this.partRepository = partRepository;
        this.componentPartRepository = componentPartRepository;
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

    public void addPartToComponent(Long componentId, Long partId, int quantity) {
        Component component = componentRepository.findById(componentId).orElseThrow(() -> new RuntimeException("Component not found"));
        Part part = partRepository.findById(partId).orElseThrow(() -> new RuntimeException("Part not found"));

        ComponentPart componentPart = new ComponentPart();
        componentPart.setComponent(component);
        componentPart.setPart(part);
        componentPart.setQuantity(quantity);
        componentPartRepository.save(componentPart);

    }
}
