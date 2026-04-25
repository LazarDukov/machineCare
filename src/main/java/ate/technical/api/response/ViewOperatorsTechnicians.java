package ate.technical.api.response;

public class ViewOperatorsTechnicians {
    private Long id;
    private String name;

    public ViewOperatorsTechnicians(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public ViewOperatorsTechnicians setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ViewOperatorsTechnicians setName(String name) {
        this.name = name;
        return this;
    }
}
