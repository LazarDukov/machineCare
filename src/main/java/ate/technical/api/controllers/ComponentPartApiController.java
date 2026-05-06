package ate.technical.api.controllers;

import ate.technical.api.requests.componentPart.DeletePartFromComponentRequest;
import ate.technical.api.response.componentPart.AllPartsOfGivenComponentResponse;
import ate.technical.services.ComponentPartService;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components-parts")
public class ComponentPartApiController {

    private ComponentPartService componentsPartsService;

    public ComponentPartApiController(ComponentPartService componentsPartsService) {
        this.componentsPartsService = componentsPartsService;
    }

    @GetMapping("/{componentId}/parts")
    public ResponseEntity<List<AllPartsOfGivenComponentResponse>> getAllPartsOfGivenComponent(@PathVariable Long componentId) {
        System.out.println("Retrieving all parts of component with ID: " + componentId);
        return ResponseEntity.ok(componentsPartsService.getAllPartsOfGivenComponent(componentId));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePartFromComponent(@RequestBody DeletePartFromComponentRequest request) {
        System.out.println("Deleting part with ID: " + request.getPartId() + " from component with ID: " + request.getComponentId());
        componentsPartsService.deletePartFromComponent(request.getComponentId(), request.getPartId());
        return ResponseEntity.noContent().build();
    }
}
