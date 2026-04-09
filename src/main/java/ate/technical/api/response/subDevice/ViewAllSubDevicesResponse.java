package ate.technical.api.response.subDevice;

import ate.technical.api.response.component.ViewAllComponentResponse;

import java.util.List;

public class ViewAllSubDevicesResponse {
    private Long id;
    private String name;

    private List<ViewAllComponentResponse> componentResponses;

    public ViewAllSubDevicesResponse(Long id, String name, List<ViewAllComponentResponse> componentResponses) {
        this.id = id;
        this.name = name;
        this.componentResponses = componentResponses;
    }

    public ViewAllSubDevicesResponse() {

    }

    public Long getId() {
        return id;
    }

    public ViewAllSubDevicesResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewAllSubDevicesResponse setName(String name) {
        this.name = name;
        return this;
    }

    public List<ViewAllComponentResponse> getComponentResponses() {
        return componentResponses;
    }

    public ViewAllSubDevicesResponse setComponentResponses(List<ViewAllComponentResponse> componentResponses) {
        this.componentResponses = componentResponses;
        return this;
    }
}
