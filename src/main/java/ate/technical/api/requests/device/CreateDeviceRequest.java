package ate.technical.api.requests.device;

public class CreateDeviceRequest {
    private String name;
    private String machineName;



    public String getMachineName() {
        return machineName;
    }

    public CreateDeviceRequest setMachineName(String machineName) {
        this.machineName = machineName;
        return this;
    }

    public String getName() {
        return name;
    }

    public CreateDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }


}
