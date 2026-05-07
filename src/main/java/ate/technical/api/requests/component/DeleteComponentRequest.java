package ate.technical.api.requests.component;

public class DeleteComponentRequest {
    private Long id;

    public Long getId() {
        return id;
    }

    public DeleteComponentRequest setId(Long id) {
        this.id = id;
        return this;
    }
}
