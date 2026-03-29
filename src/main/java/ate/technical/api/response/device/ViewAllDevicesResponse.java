package ate.technical.api.response.device;

public class ViewAllDevicesResponse {
    private String name;

    public ViewAllDevicesResponse(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }

    public ViewAllDevicesResponse setName(String name) {
        this.name = name;
        return this;
    }

}
