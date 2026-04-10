package ate.technical.api.response.device;

import ate.technical.api.response.subDevice.SubDevicesStructureResponse;

import java.util.List;

public class DevicesStructureResponse {
    private Long id;
    private String name;
    private List<SubDevicesStructureResponse> subDevices;

    public DevicesStructureResponse() {
    }

    public DevicesStructureResponse(Long id, String name, List<SubDevicesStructureResponse> subDevices) {
        this.id = id;
        this.name = name;
        this.subDevices = subDevices;
    }

    public Long getId() {
        return id;
    }

    public DevicesStructureResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public DevicesStructureResponse setName(String name) {
        this.name = name;
        return this;
    }

    public List<SubDevicesStructureResponse> getSubDevices() {
        return subDevices;
    }

    public DevicesStructureResponse setSubDevices(List<SubDevicesStructureResponse> subDevices) {
        this.subDevices = subDevices;
        return this;
    }
}