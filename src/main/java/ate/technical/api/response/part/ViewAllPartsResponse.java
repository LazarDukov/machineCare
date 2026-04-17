package ate.technical.api.response.part;

public class ViewAllPartsResponse {
    private Long id;
    private String partName;
    private String description;
    private String sapNumber;

    public ViewAllPartsResponse(Long id, String partName, String description, String sapNumber) {
        this.id = id;
        this.partName = partName;
        this.description = description;
        this.sapNumber = sapNumber;
    }

    public Long getId() {
        return id;
    }

    public ViewAllPartsResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getPartName() {
        return partName;
    }

    public ViewAllPartsResponse setPartName(String partName) {
        this.partName = partName;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ViewAllPartsResponse setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public ViewAllPartsResponse setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }
}
