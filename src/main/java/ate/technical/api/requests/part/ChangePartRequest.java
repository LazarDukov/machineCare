package ate.technical.api.requests.part;

public class ChangePartRequest {
    private Long id;
    private String partName;
    private String description;
    private String sapNumber;

    public Long getId() {
        return id;
    }

    public ChangePartRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getPartName() {
        return partName;
    }

    public ChangePartRequest setPartName(String partName) {
        this.partName = partName;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ChangePartRequest setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public ChangePartRequest setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }
}
