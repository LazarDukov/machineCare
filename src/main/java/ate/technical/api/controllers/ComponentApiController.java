package ate.technical.api.controllers;

import ate.technical.api.requests.component.AddPartToComponentRequest;
import ate.technical.api.requests.component.ChangeComponentRequest;
import ate.technical.api.requests.component.CreateComponentRequest;
import ate.technical.api.requests.component.DeleteComponentRequest;
import ate.technical.api.response.component.ComponentStructureResponse;
import ate.technical.api.response.component.ViewPicturesForGivenComponentResponse;
import ate.technical.model.entities.ComponentImage;
import ate.technical.services.ComponentImageService;
import ate.technical.services.ComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class ComponentApiController {
    private ComponentService componentService;
    private ComponentImageService componentImageService;

    public ComponentApiController(ComponentService componentService, ComponentImageService componentImageService) {
        this.componentService = componentService;
        this.componentImageService = componentImageService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createComponent(@RequestBody CreateComponentRequest request) {
        componentService.createComponent(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-part")
    public ResponseEntity<Void> addPartToComponent(@RequestBody AddPartToComponentRequest request) {
        componentService.addPartToComponent(request.getComponentId(), request.getPartId(), request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-image")
    public ResponseEntity<Void> uploadImage(
            @RequestParam("componentId") String componentId,
            @RequestParam("file") MultipartFile file) {
        System.out.println(componentId);
        System.out.println(file);
        componentImageService.uploadImage(componentId, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sub-device/{subDeviceId}")
    public List<ComponentStructureResponse> getComponentsBySubDeviceId(@PathVariable Long subDeviceId) {
        return componentService.getComponentsBySubDeviceId(subDeviceId);
    }


    @PutMapping("/change")
    public ResponseEntity<Void> editComponentName(@RequestBody ChangeComponentRequest request) {
        componentService.changeComponent(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<DeleteComponentRequest> deleteComponent(@RequestBody DeleteComponentRequest request) {
        System.out.println("Deleting component with id: " + request.getId());
        componentService.deleteComponent(request.getId());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{componentId}/view-images")
    public ResponseEntity<List<ViewPicturesForGivenComponentResponse>> viewComponentImages(@PathVariable Long componentId) {
        return ResponseEntity.ok(componentImageService.getComponentImages(componentId));
    }

}
