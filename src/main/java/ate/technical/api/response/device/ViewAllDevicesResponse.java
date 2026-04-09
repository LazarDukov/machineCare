package ate.technical.api.response.device;

import ate.technical.api.response.subDevice.ViewAllSubDevicesResponse;

import java.util.List;

public class ViewAllDevicesResponse {
    private Long id;
    private String name;
    private List<ViewAllSubDevicesResponse> subDevicesResponses;

    public ViewAllDevicesResponse(Long id, String name, List<ViewAllSubDevicesResponse> subDevicesResponses) {
        this.id = id;
        this.name = name;
        this.subDevicesResponses = subDevicesResponses;
    }

    public Long getId() {
        return id;
    }

    public ViewAllDevicesResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewAllDevicesResponse setName(String name) {
        this.name = name;
        return this;
    }

    public List<ViewAllSubDevicesResponse> getSubDevicesResponses() {
        return subDevicesResponses;
    }

    public ViewAllDevicesResponse setSubDevicesResponses(List<ViewAllSubDevicesResponse> subDevicesResponses) {
        this.subDevicesResponses = subDevicesResponses;
        return this;
    }
}