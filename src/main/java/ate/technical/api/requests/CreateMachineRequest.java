package ate.technical.api.requests;


public class CreateMachineRequest {
    private String name;

    private String identificationNumber;

    private String manufacturer;

    private String type;

    private String model;
    public void printWhereIAm() {
        System.out.println("I red all create machine request fields");
    }


    public String getName() {
        return name;
    }

    public CreateMachineRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public CreateMachineRequest setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
        return this;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public CreateMachineRequest setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public String getType() {
        return type;
    }

    public CreateMachineRequest setType(String type) {
        this.type = type;
        return this;
    }

    public String getModel() {
        return model;
    }

    public CreateMachineRequest setModel(String model) {
        this.model = model;
        return this;
    }
}
