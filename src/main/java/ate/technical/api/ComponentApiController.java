package ate.technical.api;

import ate.technical.api.requests.CreateComponentRequest;
import ate.technical.services.ComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
