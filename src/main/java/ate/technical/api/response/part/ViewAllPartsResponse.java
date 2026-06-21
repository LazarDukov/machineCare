package ate.technical.api.response.part;

public class ViewAllPartsResponse {
    private Long id;
    private String partName;
    private String brand;
    private String model;
    private String sapNumber;

    public ViewAllPartsResponse(Long id, String partName, String description, String model, String sapNumber) {
        this.id = id;
        this.partName = partName;
        this.brand = description;
        this.model = model;
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

    public String getBrand() {
        return brand;
    }

    public ViewAllPartsResponse setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public ViewAllPartsResponse setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public String getModel() {
        return model;
    }

    public ViewAllPartsResponse setModel(String model) {
        this.model = model;
        return this;
    }
}
