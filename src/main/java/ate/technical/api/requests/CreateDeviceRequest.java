package ate.technical.api.requests;

public class CreateDeviceRequest {
    private String name;

    public String getName() {
        return name;
    }

    public CreateDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }
}
