package ate.technical.api.controllers;

import ate.technical.api.requests.device.ChangeDeviceRequest;
import ate.technical.api.requests.device.CreateDeviceRequest;
import ate.technical.api.requests.device.DeleteDeviceRequest;
import ate.technical.api.response.device.AddSubDeviceDropDownResponse;
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

    @GetMapping("/all/{machineName}")
    @ResponseBody

    public ResponseEntity<List<AddSubDeviceDropDownResponse>> getAllDevicesByGivenMachine(@PathVariable String machineName) {
        System.out.println("Retrieving all devices of machine: " + machineName);

        return ResponseEntity.ok(deviceService.getAllDevicesOfGivenMachine(machineName));
    }

    @PutMapping("/change")
    public ResponseEntity<Void> editDeviceName(@RequestBody ChangeDeviceRequest request) {
        deviceService.changeDeviceName(request.getId(), request.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteDevice(@RequestBody DeleteDeviceRequest request) {
        deviceService.deleteDevice(request.getId());
        return ResponseEntity.noContent().build();
    }
}
