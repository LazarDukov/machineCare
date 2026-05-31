package ate.technical.api.requests.component;

import ate.technical.model.entities.Device;

public class CreateComponentRequest {
    private String name;

    private Long subDeviceId;

    public String getName() {
        return name;
    }

    public CreateComponentRequest setName(String name) {
        this.name = name;
        return this;
    }


    public Long getSubDeviceId() {
        return subDeviceId;
    }

    public CreateComponentRequest setSubDeviceId(Long subDeviceId) {
        this.subDeviceId = subDeviceId;
        return this;
    }
}
