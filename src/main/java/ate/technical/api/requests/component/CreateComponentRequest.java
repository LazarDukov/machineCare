package ate.technical.api.requests.component;

import ate.technical.model.entities.Device;

public class CreateComponentRequest {
    private String name;

    private Long subDeviceId;
    private String brand;
    private String model;
    private String additionalInfo;

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

    public String getBrand() {
        return brand;
    }

    public CreateComponentRequest setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getModel() {
        return model;
    }

    public CreateComponentRequest setModel(String model) {
        this.model = model;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public CreateComponentRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
