package ate.technical.api.requests;

public class GetMachinesRequest {
    private Long id;
    private String name;

    public String getName() {
        return name;
    }

    public GetMachinesRequest setName(String name) {
        this.name = name;
        return this;
    }

    public Long getId() {
        return id;
    }

    public GetMachinesRequest setId(Long id) {
        this.id = id;
        return this;
    }
}
