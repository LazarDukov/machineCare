package ate.technical.services;

import ate.technical.api.requests.part.ChangePartQuantityIntoComponent;
import ate.technical.api.requests.part.ChangePartRequest;
import ate.technical.api.requests.part.CreatePartRequest;
import ate.technical.api.requests.part.CreatePartToComponentRequest;
import ate.technical.api.response.part.ViewAllPartsResponse;

import ate.technical.model.entities.Component;
import ate.technical.model.entities.ComponentPart;
import ate.technical.model.entities.Part;
import ate.technical.repositories.ComponentPartRepository;
import ate.technical.repositories.ComponentRepository;
import ate.technical.repositories.PartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartService {
    private SubDeviceService subDeviceService;
    private PartRepository partRepository;
    private ComponentRepository componentRepository;

    private ComponentPartRepository componentPartRepository;

    public PartService(SubDeviceService subDeviceService, PartRepository partRepository, ComponentRepository componentRepository, ComponentPartRepository componentPartRepository) {
        this.subDeviceService = subDeviceService;
        this.partRepository = partRepository;
        this.componentRepository = componentRepository;
        this.componentPartRepository = componentPartRepository;
    }

    public Long createPart(CreatePartRequest request) {
        Part part = new Part();
        part.setPartName(request.getName());
        part.setSapNumber(request.getSapNumber());
        part.setDescription(request.getDescription());
        partRepository.save(part);
        return part.getId();
    }

    public Long changePart(ChangePartRequest request) {
        System.out.println("Changing part with id: " + request.getId());
        Part part = partRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("Part not found"));
        part.setPartName(request.getPartName());
        part.setDescription(request.getDescription());
        part.setSapNumber(request.getSapNumber());
        partRepository.save(part);
        return part.getId();
    }

    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }

    public List<ViewAllPartsResponse> getAllParts() {


        return partRepository.findAll().stream()
                .map(part -> new ViewAllPartsResponse(part.getId(), part.getPartName(), part.getDescription(), part.getSapNumber()))
                .toList();
    }

    public void addPartToComponent(CreatePartToComponentRequest request) {
        Part part = partRepository.findById(request.getPartId()).orElseThrow(() -> new RuntimeException("Part not found"));
        Component component = componentRepository.findById(request.getComponentId()).orElseThrow(() -> new RuntimeException("Component not found"));
        ComponentPart componentPart = new ComponentPart();
        componentPart.setPart(part);
        componentPart.setComponent(component);
        componentPart.setQuantity(request.getQuantity());
        componentPartRepository.save(componentPart);
    }


    public void changePartQuantityIntoComponent(ChangePartQuantityIntoComponent request) {
        ComponentPart componentPart = componentPartRepository.findByComponentIdAndPartId(request.getComponentId(), request.getPartId())
                .orElseThrow(() -> new RuntimeException("ComponentPart not found"));
        componentPart.setQuantity(request.getQuantity());
        componentPartRepository.save(componentPart);
    }
}
