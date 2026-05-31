package ate.technical.api.requests.component;

public class ChangeComponentRequest {
    private Long id;
    private String name;


    public Long getId() {
        return id;
    }

    public ChangeComponentRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ChangeComponentRequest setName(String name) {
        this.name = name;
        return this;
    }


}
