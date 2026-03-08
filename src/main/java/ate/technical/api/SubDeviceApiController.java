package ate.technical.api;

import ate.technical.api.requests.CreateSubDeviceRequest;
import ate.technical.services.SubDeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sub-devices")
public class SubDeviceApiController {
    private SubDeviceService subDeviceService;

    public SubDeviceApiController(SubDeviceService subDeviceService) {
        this.subDeviceService = subDeviceService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createSubDevice(@RequestBody CreateSubDeviceRequest request) {
        subDeviceService.createSubDevice(request);
        return ResponseEntity.ok().build();
    }
}
