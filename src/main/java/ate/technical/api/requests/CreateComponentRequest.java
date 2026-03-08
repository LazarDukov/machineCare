package ate.technical.api.requests;


public class CreateComponentRequest {
    private String name;

    private String additionalInfo;

    public String getName() {
        return name;
    }

    public CreateComponentRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public CreateComponentRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
