package ate.technical.api.controllers;


import ate.technical.api.requests.subDevice.ChangeSubDeviceRequest;
import ate.technical.api.requests.subDevice.CreateSubDeviceRequest;
import ate.technical.api.requests.subDevice.DeleteSubDeviceRequest;
import ate.technical.api.response.device.AddSubDeviceDropDownResponse;
import ate.technical.api.response.subDevice.AddComponentDropDownResponse;
import ate.technical.services.SubDeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/device/{deviceId}")
    @ResponseBody
    public ResponseEntity<List<AddComponentDropDownResponse>> getAllSubDevicesByGivenDeviceId(@PathVariable Long deviceId) {
        return ResponseEntity.ok(subDeviceService.getAllSubDevicesOfGivenDeviceId(deviceId));
    }


    @PutMapping("/change")
    public ResponseEntity<ChangeSubDeviceRequest> editSubDeviceName(@RequestBody ChangeSubDeviceRequest request) {
        subDeviceService.changeSubDevice(request.getId(), request.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteSubDevice(@RequestBody DeleteSubDeviceRequest request) {
        subDeviceService.deleteSubDevice(request.getId());
        return ResponseEntity.noContent().build();
    }
}
