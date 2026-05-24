package ate.technical.api.requests.device;

public class DeleteDeviceRequest {
    private Long id;

    public Long getId() {
        return id;
    }

    public DeleteDeviceRequest setId(Long id) {
        this.id = id;
        return this;
    }
}
