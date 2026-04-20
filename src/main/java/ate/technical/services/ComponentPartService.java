package ate.technical.services;

import ate.technical.api.response.componentPart.AllPartsOfGivenComponentResponse;
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

        List<ComponentPart> cps =
                componentsPartsRepository.findAllByComponentId(componentId);

        List<AllPartsOfGivenComponentResponse> response = new ArrayList<>();

        for (ComponentPart cp : cps) {

            Part part = cp.getPart();

            response.add(new AllPartsOfGivenComponentResponse(
                    part.getId(),
                    part.getPartName(),
                    part.getSapNumber(),
                    part.getDescription(),
                    cp.getQuantity() // ✅ директно от entity
            ));
        }

        return response;
    }
}
