package ate.technical.services;

import ate.technical.model.entities.Material;
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
}
