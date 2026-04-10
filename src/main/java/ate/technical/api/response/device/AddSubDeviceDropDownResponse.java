package ate.technical.api.response.device;

public class AddSubDeviceDropDownResponse {
    private Long id;
    private String name;

    public AddSubDeviceDropDownResponse() {
    }

    public AddSubDeviceDropDownResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public AddSubDeviceDropDownResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public AddSubDeviceDropDownResponse setName(String name) {
        this.name = name;
        return this;
    }
}
