package ate.technical.api.controllers;

import ate.technical.api.requests.part.*;
import ate.technical.api.response.part.ViewPicturesForGivenPartResponse;
import ate.technical.api.response.part.ViewAllPartsResponse;
import ate.technical.services.PartImageService;
import ate.technical.services.PartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartApiController {
    private PartService partService;

    private PartImageService partImageService;

    public PartApiController(PartService partService, PartImageService partImageService) {
        this.partService = partService;
        this.partImageService = partImageService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ViewAllPartsResponse>> getAllParts() {
        return ResponseEntity.ok(partService.getAllParts());
    }


    @PostMapping("/add")
    public ResponseEntity<Long> createPart(@RequestBody CreatePartRequest request) {
        Long id = partService.createPart(request);
        return ResponseEntity.ok(id);
    }

    @PostMapping("/add-to-component")
    public ResponseEntity<Void> addPartToComponent(@RequestBody CreatePartToComponentRequest request) {
        partService.addPartToComponent(request);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/change")
    public ResponseEntity<Long> changePart(@RequestBody ChangePartRequest request) {

        Long id = partService.changePart(request);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/change-quantity")
    public ResponseEntity<Void> changePartQuantityIntoComponent(@RequestBody ChangePartQuantityIntoComponent request) {
        partService.changePartQuantityIntoComponent(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        System.out.println("Deleting part with id: " + id);
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add-image")
    public ResponseEntity<Void> uploadImage(
            @RequestParam("partId") String partId,
            @RequestParam("file") MultipartFile file) {
        System.out.println(partId);
        System.out.println(file);
        partImageService.uploadImage(partId, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{partId}/view-images")
    public ResponseEntity<List<ViewPicturesForGivenPartResponse>> viewPictures(@PathVariable Long partId) {
        return ResponseEntity.ok(partService.getAllImagesOfGivenPart(partId));

    }
}