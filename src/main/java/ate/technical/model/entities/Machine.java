package ate.technical.model.entities;

import ate.technical.model.enums.TypeEnum;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "machines")
public class Machine {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String identificationNumber;

    @Column
    private String manufacturer;

    @Column
    @Enumerated(EnumType.STRING)
    private TypeEnum type;

    @Column
    private String model;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Device> devices;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "machine")
    private List<Task> tasks;


    public Long getId() {
        return id;
    }

    public Machine setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Machine setName(String name) {
        this.name = name;
        return this;
    }

    public TypeEnum getType() {
        return type;
    }

    public Machine setType(TypeEnum type) {
        this.type = type;
        return this;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public Machine setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
        return this;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public Machine setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public String getModel() {
        return model;
    }

    public Machine setModel(String model) {
        this.model = model;
        return this;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public Machine setDevices(List<Device> devices) {
        this.devices = devices;
        return this;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public Machine setTasks(List<Task> tasks) {
        this.tasks = tasks;
        return this;
    }


}
