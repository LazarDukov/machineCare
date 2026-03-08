package ate.technical.api.requests;

public class CreateSubDeviceRequest {
    private String name;


    public String getName() {
        return name;
    }

    public CreateSubDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }

}
