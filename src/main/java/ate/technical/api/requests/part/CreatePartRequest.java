package ate.technical.api.requests.part;

public class CreatePartRequest {
    private String name;
    private String description;
    private String sapNumber;

    //TODO: Should create request body for add part to given component!

    public String getName() {
        return name;
    }

    public CreatePartRequest setName(String name) {
        this.name = name;
        return this;
    }


    public String getSapNumber() {
        return sapNumber;
    }

    public CreatePartRequest setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public CreatePartRequest setDescription(String description) {
        this.description = description;
        return this;
    }
}
