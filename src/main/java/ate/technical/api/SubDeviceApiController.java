package ate.technical.api;


import ate.technical.api.requests.subDevice.CreateSubDeviceRequest;
import ate.technical.services.SubDeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sub-devices")
public class SubDeviceApiController {
    private SubDeviceService subDeviceService;

    public SubDeviceApiController(SubDeviceService subDeviceService) {
        this.subDeviceService = subDeviceService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createSubDevice(@RequestBody CreateSubDeviceRequest request) {
        System.out.println("Creating sub-device with name: " + request.getName() + " for device ID: " + request.getDeviceId());
        subDeviceService.createSubDevice(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editSubDeviceName(@PathVariable Long id, String newName) {
        subDeviceService.changeDeviceName(id, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubDevice(@PathVariable Long id) {
        subDeviceService.deleteSubDevice(id);
        return ResponseEntity.noContent().build();
    }
}
