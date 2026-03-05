package ate.technical.api;

import ate.technical.api.requests.CreateDeviceRequest;
import ate.technical.services.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
public class DeviceApiController {
    private DeviceService deviceService;

    public DeviceApiController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> createDevice(@RequestBody CreateDeviceRequest request) {
        deviceService.createDevice(request);
        return ResponseEntity.ok().build();
    }
}
