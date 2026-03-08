package ate.technical.api.requests;

public class CreateMaterialRequest {
    private String name;
    private String unit;
    private Long quantity;
    private String sapNumber;

    public String getName() {
        return name;
    }

    public CreateMaterialRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getUnit() {
        return unit;
    }

    public CreateMaterialRequest setUnit(String unit) {
        this.unit = unit;
        return this;
    }

    public Long getQuantity() {
        return quantity;
    }

    public CreateMaterialRequest setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public CreateMaterialRequest setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }
}
