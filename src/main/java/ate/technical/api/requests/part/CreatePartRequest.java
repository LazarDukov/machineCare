package ate.technical.api.requests.part;

public class CreatePartRequest {
    private String name;
    private String brand;



    private String model;
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

    public String getBrand() {
        return brand;
    }

    public CreatePartRequest setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getModel() {
        return model;
    }

    public CreatePartRequest setModel(String model) {
        this.model = model;
        return this;
    }
}
