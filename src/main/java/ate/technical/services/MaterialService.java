package ate.technical.services;

import ate.technical.api.requests.CreateMaterialRequest;
import ate.technical.model.entities.Material;
import ate.technical.model.enums.UnitEnum;
import ate.technical.repositories.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public Optional<Material> getMaterialByName(String name) {
        return materialRepository.findMaterialByName(name);
    }

    public void createMaterial(CreateMaterialRequest request) {
        Material material = new Material();
        material.setName(request.getName());
        material.setUnit(UnitEnum.valueOf(request.getUnit().toUpperCase()));
        material.setQuantity(request.getQuantity());
        material.setSapNumber(request.getSapNumber());
        materialRepository.save(material);

    }
}
