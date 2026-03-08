package ate.technical.api;

import ate.technical.api.requests.CreateComponentRequest;
import ate.technical.services.ComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{id}")
    public ResponseEntity<Void> editComponentName(@PathVariable Long id, String newName) {
        componentService.changeComponentName(id, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComponent(@PathVariable Long id) {
        componentService.deleteComponent(id);
        return ResponseEntity.noContent().build();
    }
}
