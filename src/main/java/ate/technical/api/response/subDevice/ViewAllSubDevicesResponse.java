package ate.technical.api.response.subDevice;

public class ViewAllSubDevicesResponse {
    private Long id;
    private Long deviceId;
    private String name;

    public Long getId() {
        return id;
    }

    public ViewAllSubDevicesResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public ViewAllSubDevicesResponse setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewAllSubDevicesResponse setName(String name) {
        this.name = name;
        return this;
    }
}
