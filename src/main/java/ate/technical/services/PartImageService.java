package ate.technical.services;

import ate.technical.model.entities.Part;
import ate.technical.model.entities.PartImage;
import ate.technical.repositories.PartRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class PartImageService {
    private PartRepository partRepository;

    public PartImageService(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    public void uploadImage(String partId, MultipartFile file) {
        Long id = Long.parseLong(String.valueOf(partId));
        Part part = partRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found with id: " + id));

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("uploadedImages").resolve(fileName);

        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        PartImage partImage = new PartImage();
        partImage.setImageUrl(fileName);
        partImage.setPart(part);
        part.getPartImages().add(partImage);
        partRepository.save(part);
        // Implement the logic to save the image file and associate it with the part
        // For example, you can save the file to a local directory and store the file path in the database
    }
}
