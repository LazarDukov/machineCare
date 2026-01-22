package ate.technical.model.entities;

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
    private String model;

    @Column
    private String device;

    @Column
    private String subDevice;

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

    public String getDevice() {
        return device;
    }

    public Machine setDevice(String device) {
        this.device = device;
        return this;
    }

    public String getSubDevice() {
        return subDevice;
    }

    public Machine setSubDevice(String subDevice) {
        this.subDevice = subDevice;
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
