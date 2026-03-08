package ate.technical.api;

import ate.technical.api.requests.CreateMaterialRequest;
import ate.technical.services.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/materials")
public class MaterialApiController {
    private MaterialService materialService;

    public MaterialApiController(MaterialService materialService) {
        this.materialService = materialService;
    }

    public ResponseEntity<Void> createMaterial(@RequestBody CreateMaterialRequest request) {
        materialService.createMaterial(request);
        return ResponseEntity.ok().build();
     }

}
