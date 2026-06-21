package ate.technical.api.response.componentPart;

public class AllPartsOfGivenComponentResponse {
    private Long partId;
    private String partName;
    private String sapNumber;
    private String brand;
    private String model;

    private int quantity;

    public AllPartsOfGivenComponentResponse(Long id, String partName, String sapNumber, String description, String model, int quantity) {
        this.partId = id;
        this.partName = partName;
        this.sapNumber = sapNumber;
        this.brand = description;
        this.model = model;
        this.quantity = quantity;
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

    public String getBrand() {
        return brand;
    }

    public AllPartsOfGivenComponentResponse setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public AllPartsOfGivenComponentResponse setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getModel() {
        return model;
    }

    public AllPartsOfGivenComponentResponse setModel(String model) {
        this.model = model;
        return this;
    }
}
