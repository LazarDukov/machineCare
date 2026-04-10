package ate.technical.api.response.component;

public class ComponentStructureResponse {
    private Long id;
    private String name;

    public ComponentStructureResponse() {
    }

    public ComponentStructureResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public ComponentStructureResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ComponentStructureResponse setName(String name) {
        this.name = name;
        return this;
    }
}
