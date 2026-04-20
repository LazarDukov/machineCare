package ate.technical.services;

import ate.technical.api.response.componentPart.AllPartsOfGivenComponentResponse;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.ComponentPart;
import ate.technical.model.entities.Part;
import ate.technical.repositories.ComponentsPartsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComponentPartService {
    private ComponentsPartsRepository componentsPartsRepository;

    public ComponentPartService(ComponentsPartsRepository componentsPartsRepository) {
        this.componentsPartsRepository = componentsPartsRepository;
    }

    public List<AllPartsOfGivenComponentResponse> getAllPartsOfGivenComponent(Long componentId) {
        List<ComponentPart> partsByGivenComponent = componentsPartsRepository.findAllByComponentId(componentId);

        List<Part> parts = new ArrayList<>();
        for (ComponentPart componentPart : partsByGivenComponent) {
            parts.add(componentPart.getPart());
            System.out.println(componentPart.getPart().getPartName());
            System.out.println(parts.size());
        }
        List<AllPartsOfGivenComponentResponse> response = new ArrayList<>();
        for (Part part : parts) {
            response.add(new AllPartsOfGivenComponentResponse(part.getId(), part.getPartName(), part.getSapNumber(), part.getDescription()));
        }

        return response;

    }
}
