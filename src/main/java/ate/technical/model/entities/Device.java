package ate.technical.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "devices")
public class Device {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    private List<SubDevice> subDevices;


    public List<SubDevice> getSubDevices() {
        return subDevices;
    }

    public Device setSubDevices(List<SubDevice> subDevices) {
        this.subDevices = subDevices;
        return this;
    }

    public Machine getMachine() {
        return machine;
    }

    public Device setMachine(Machine machine) {
        this.machine = machine;
        return this;
    }

    public Long getId() {
        return id;
    }

    public Device setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Device setName(String name) {
        this.name = name;
        return this;
    }


}
