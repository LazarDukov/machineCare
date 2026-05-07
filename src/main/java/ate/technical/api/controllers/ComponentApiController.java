package ate.technical.api.controllers;

import ate.technical.api.requests.component.AddPartToComponentRequest;
import ate.technical.api.requests.component.ChangeComponentRequest;
import ate.technical.api.requests.component.CreateComponentRequest;
import ate.technical.api.requests.component.DeleteComponentRequest;
import ate.technical.api.response.component.ComponentStructureResponse;
import ate.technical.services.ComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class ComponentApiController {
    private ComponentService componentService;

    public ComponentApiController(ComponentService componentService) {
        this.componentService = componentService;
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

    @GetMapping("/sub-devices/{subDeviceId}")
    public List<ComponentStructureResponse> getComponentsBySubDeviceId(@PathVariable Long subDeviceId) {
        return componentService.getComponentsBySubDeviceId(subDeviceId);
    }


    @PutMapping("/change")
    public ResponseEntity<Void> editComponentName(@RequestBody ChangeComponentRequest request) {
        componentService.changeComponentName(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<DeleteComponentRequest> deleteComponent(@RequestBody DeleteComponentRequest request) {
        System.out.println("Deleting component with id: " + request.getId());
        componentService.deleteComponent(request.getId());

        return ResponseEntity.noContent().build();
    }
}
