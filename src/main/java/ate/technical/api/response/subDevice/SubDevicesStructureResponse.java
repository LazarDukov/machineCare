package ate.technical.api.response.subDevice;

import ate.technical.api.response.component.ComponentStructureResponse;

import java.util.List;

public class SubDevicesStructureResponse {
    private Long id;
    private String name;

    private List<ComponentStructureResponse> components;



    public SubDevicesStructureResponse(Long id, String name, List<ComponentStructureResponse> components) {
        this.id = id;
        this.name = name;
        this.components = components;
    }

    public SubDevicesStructureResponse() {

    }

    public Long getId() {
        return id;
    }

    public SubDevicesStructureResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public SubDevicesStructureResponse setName(String name) {
        this.name = name;
        return this;
    }

    public List<ComponentStructureResponse> getComponents() {
        return components;
    }

    public SubDevicesStructureResponse setComponents(List<ComponentStructureResponse> components) {
        this.components = components;
        return this;
    }
}
