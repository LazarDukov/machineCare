package ate.technical.api;

import ate.technical.api.requests.CreatePartRequest;
import ate.technical.services.PartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parts")
public class PartApiController {
    private PartService partService;

    public PartApiController(PartService partService) {
        this.partService = partService;
    }

    public ResponseEntity<Void> createPart(@RequestBody CreatePartRequest request) {
        partService.createPart(request);
        return ResponseEntity.ok().build();
    }
}
