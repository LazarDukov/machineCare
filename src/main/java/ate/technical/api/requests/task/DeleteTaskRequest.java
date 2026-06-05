package ate.technical.api.requests.task;

public class DeleteTaskRequest {
    public Long id;

    public Long getId() {
        return id;
    }

    public DeleteTaskRequest setId(Long id) {
        this.id = id;
        return this;
    }
}
