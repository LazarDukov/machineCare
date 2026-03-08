package ate.technical.services;

import ate.technical.api.requests.CreateComponentRequest;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.ComponentRepository;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {
    private ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public void createComponent(CreateComponentRequest request) {
        Component component = new Component();
        component.setName(request.getName());
        component.setAdditionalInfo(request.getAdditionalInfo());
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
