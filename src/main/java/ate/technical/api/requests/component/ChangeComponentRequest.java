package ate.technical.api.requests.component;

public class ChangeComponentRequest {
    private Long id;
    private String name;
    private String brand;
    private String model;
    private String additionalInfo;


    public Long getId() {
        return id;
    }

    public ChangeComponentRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ChangeComponentRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getBrand() {
        return brand;
    }

    public ChangeComponentRequest setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getModel() {
        return model;
    }

    public ChangeComponentRequest setModel(String model) {
        this.model = model;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public ChangeComponentRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
