package ate.technical.api.response.component;

public class ViewAllComponentResponse {
    private Long id;
    private String name;


    public ViewAllComponentResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public ViewAllComponentResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewAllComponentResponse setName(String name) {
        this.name = name;
        return this;
    }
}
