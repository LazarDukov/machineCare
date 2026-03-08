package ate.technical.services;

import ate.technical.api.requests.CreatePartRequest;
import ate.technical.model.entities.Part;
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
}
