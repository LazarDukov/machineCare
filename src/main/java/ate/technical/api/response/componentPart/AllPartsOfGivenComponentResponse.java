package ate.technical.api.response.componentPart;

public class AllPartsOfGivenComponentResponse {
    private Long partId;
    private String partName;
    private String sapNumber;
    private String description;

    public AllPartsOfGivenComponentResponse(Long id, String partName, String sapNumber, String description) {
        this.partId = id;
        this.partName = partName;
        this.sapNumber = sapNumber;
        this.description = description;
    }

    public Long getPartId() {
        return partId;
    }

    public AllPartsOfGivenComponentResponse setPartId(Long partId) {
        this.partId = partId;
        return this;
    }

    public String getPartName() {
        return partName;
    }

    public AllPartsOfGivenComponentResponse setPartName(String partName) {
        this.partName = partName;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public AllPartsOfGivenComponentResponse setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public AllPartsOfGivenComponentResponse setDescription(String description) {
        this.description = description;
        return this;
    }
}
