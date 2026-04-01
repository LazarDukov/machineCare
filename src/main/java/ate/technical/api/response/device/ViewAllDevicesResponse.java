package ate.technical.api.response.device;

public class ViewAllDevicesResponse {
    private Long id;
    private String name;

    public ViewAllDevicesResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public ViewAllDevicesResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewAllDevicesResponse setName(String name) {
        this.name = name;
        return this;
    }

}
