package ate.technical.api.requests;

public class CreateDeviceRequest {
    private String name;

    private Long machineId;

    public String getName() {
        return name;
    }

    public CreateDeviceRequest setName(String name) {
        this.name = name;
        return this;
    }

    public Long getMachineId() {
        return machineId;
    }

    public CreateDeviceRequest setMachineId(Long machineId) {
        this.machineId = machineId;
        return this;
    }
}
