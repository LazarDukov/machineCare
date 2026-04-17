package ate.technical.api.controllers;

import ate.technical.api.requests.part.CreatePartRequest;
import ate.technical.api.response.part.ViewAllPartsResponse;
import ate.technical.services.PartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartApiController {
    private PartService partService;

    public PartApiController(PartService partService) {
        this.partService = partService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ViewAllPartsResponse>> getAllParts() {
        return ResponseEntity.ok(partService.getAllParts());
    }


    @PostMapping("/add")
    public ResponseEntity<Void> createPart(@RequestBody CreatePartRequest request) {
        partService.createPart(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editPartName(@PathVariable Long id, String newName) {
        partService.changePartName(id, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }
}
