package ate.technical.api;

import ate.technical.api.requests.device.CreateDeviceRequest;
import ate.technical.api.response.ViewMachineResponse;
import ate.technical.api.response.device.ViewAllDevicesResponse;
import ate.technical.model.entities.Device;
import ate.technical.services.DeviceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    @GetMapping("/all/{machineName}")
//    @ResponseBody
//    public ResponseEntity<List<ViewAllDevicesResponse>> getAllDevicesByGivenMachine(@PathVariable String machineName) {
//        return ResponseEntity.ok(deviceService.getAllDevicesOfGivenMachine(machineName));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editDeviceName(@PathVariable Long id, String newName) {
        deviceService.changeDeviceName(id, newName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }
}
