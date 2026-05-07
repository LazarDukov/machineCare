package ate.technical.api.requests.subDevice;

public class ChangeSubDeviceRequest {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public ChangeSubDeviceRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ChangeSubDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }
}
