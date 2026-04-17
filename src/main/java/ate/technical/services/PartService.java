package ate.technical.services;

import ate.technical.api.requests.part.CreatePartRequest;
import ate.technical.api.response.part.ViewAllPartsResponse;
import ate.technical.api.response.task.ViewAllTasksResponse;
import ate.technical.model.entities.Part;
import ate.technical.model.entities.SubDevice;
import ate.technical.repositories.PartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartService {
    private SubDeviceService subDeviceService;
    private PartRepository partRepository;

    public PartService(SubDeviceService subDeviceService, PartRepository partRepository) {
        this.subDeviceService = subDeviceService;
        this.partRepository = partRepository;
    }

    public void createPart(CreatePartRequest request) {
        Part part = new Part();
        part.setPartName(request.getName());
        part.setSapNumber(request.getSapNumber());
        part.setDescription(request.getDescription());
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

    public List<ViewAllPartsResponse> getAllParts() {


        return partRepository.findAll().stream()
                .map(part -> new ViewAllPartsResponse(part.getId(), part.getPartName(), part.getDescription(), part.getSapNumber()))
                .toList();
    }
}
