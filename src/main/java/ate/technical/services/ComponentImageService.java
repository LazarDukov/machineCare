package ate.technical.services;

import ate.technical.api.response.component.ViewPicturesForGivenComponentResponse;
import ate.technical.api.response.part.ViewPicturesForGivenPartResponse;
import ate.technical.model.entities.Component;
import ate.technical.model.entities.ComponentImage;
import ate.technical.model.entities.PartImage;
import ate.technical.repositories.ComponentImageRepository;
import ate.technical.repositories.ComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ComponentImageService {

    private ComponentRepository componentRepository;
    private ComponentImageRepository componentImageRepository;


    public ComponentImageService(ComponentRepository componentRepository, ComponentImageRepository componentImageRepository) {
        this.componentRepository = componentRepository;

        this.componentImageRepository = componentImageRepository;
    }


    public void uploadImage(String componentId, MultipartFile file) {
        Long id = Long.parseLong(String.valueOf(componentId));
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("uploadedImages").resolve(fileName);

        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ComponentImage componentImage = new ComponentImage();
        componentImage.setImageUrl(fileName);
        componentImage.setComponent(component);
        component.getComponentImages().add(componentImage);
        componentRepository.save(component);
        // Implement the logic to save the image file and associate it with the part
        // For example, you can save the file to a local directory and store the file path in the database

    }

    public List<ViewPicturesForGivenComponentResponse> getComponentImages(Long componentId) {
        List<ComponentImage> images = componentImageRepository.findAllByComponentId(componentId);
        if (images.size() == 0) {
            return new ArrayList<>();
        }
        List<ViewPicturesForGivenComponentResponse> response = images.stream()
                .map(image -> new ViewPicturesForGivenComponentResponse(image.getId(), image.getImageUrl()))
                .toList();

        return response;
    }
}
