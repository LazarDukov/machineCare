package ate.technical.api;

import ate.technical.api.requests.material.CreateMaterialRequest;
import ate.technical.services.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/materials")
public class MaterialApiController {
    private MaterialService materialService;

    public MaterialApiController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createMaterial(@RequestBody CreateMaterialRequest request) {
        materialService.createMaterial(request);
        return ResponseEntity.ok().build();
     }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editMaterialName(@PathVariable Long id, String newName) {
        materialService.changeMaterialName(id, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }

}
