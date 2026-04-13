package ate.technical.api.requests.component;

import ate.technical.model.entities.Device;

public class CreateComponentRequest {
    private String name;
    //TODO: maybe additionalInfo should be removed here because not needed in my project
    private String additionalInfo;
    private Long subDeviceId;

    public String getName() {
        return name;
    }

    public CreateComponentRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public CreateComponentRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
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
