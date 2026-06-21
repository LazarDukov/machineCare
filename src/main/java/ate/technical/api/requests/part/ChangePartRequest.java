package ate.technical.api.requests.part;

public class ChangePartRequest {
    private Long id;
    private String partName;
    private String brand;

    private String model;
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

    public String getBrand() {
        return brand;
    }

    public ChangePartRequest setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public ChangePartRequest setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public String getModel() {
        return model;
    }

    public ChangePartRequest setModel(String model) {
        this.model = model;
        return this;
    }
}
