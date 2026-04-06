package ate.technical.api.response.component;

public class ViewAllComponentResponse {
    private Long id;
    private String name;
    private String additionalInfo;

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

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public ViewAllComponentResponse setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
