package ate.technical.api.requests.subDevice;

public class CreateSubDeviceRequest {
    private String name;
    private Long deviceId;

    public String getName() {
        return name;
    }

    public CreateSubDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public CreateSubDeviceRequest setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }
}
