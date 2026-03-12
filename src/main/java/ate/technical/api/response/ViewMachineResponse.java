package ate.technical.api.response;


public class ViewMachineResponse {
    private String name;
    private String identificationNumber;
    private String manufacturer;
    private String type;
    private String model;

    public String getName() {
        return name;
    }

    public ViewMachineResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public ViewMachineResponse setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
        return this;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public ViewMachineResponse setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public String getType() {
        return type;
    }

    public ViewMachineResponse setType(String type) {
        this.type = type;
        return this;
    }

    public String getModel() {
        return model;
    }

    public ViewMachineResponse setModel(String model) {
        this.model = model;
        return this;
    }
}

//private String identificationNumber;
//
//    @Column
//    private String manufacturer;
//
//    @Column
//    @Enumerated(EnumType.STRING)
//    private TypeEnum type;
//
//    @Column
//    private String model;
//
//    @OneToMany(fetch = FetchType.LAZY)
//    private List<Device> devices;
//
//    @OneToMany(fetch = FetchType.LAZY)
//    private List<Task> tasks;
