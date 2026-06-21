package ate.technical.api.response.component;

public class ComponentStructureResponse {
    private Long id;
    private String name;
    private String brand;
    private String model;

    private String additionalInfo;

    public ComponentStructureResponse() {
    }


    public Long getId() {
        return id;
    }

    public ComponentStructureResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ComponentStructureResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public ComponentStructureResponse setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public String getBrand() {
        return brand;
    }

    public ComponentStructureResponse setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getModel() {
        return model;
    }

    public ComponentStructureResponse setModel(String model) {
        this.model = model;
        return this;
    }
}
