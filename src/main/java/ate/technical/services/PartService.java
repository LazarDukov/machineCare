package ate.technical.services;

import ate.technical.api.requests.CreatePartRequest;
import ate.technical.model.entities.Part;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.PartRepository;
import org.springframework.stereotype.Service;

@Service
public class PartService {
    private PartRepository partRepository;

    public PartService(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    public void createPart(CreatePartRequest request) {
        Part part = new Part();
        part.setPartName(request.getName());
        part.setCount(request.getCount());
        part.setSapNumber(request.getSapNumber());
        partRepository.save(part);
    }

    public void changePartName(Long id, String newName) {

        Part part = partRepository.findById(id).orElseThrow(() -> new RuntimeException("Part not found"));
        part.setPartName(newName);
        partRepository.save(part);
    }

    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }
}
