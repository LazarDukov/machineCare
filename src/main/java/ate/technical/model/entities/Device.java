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
    private String deviceName;

    @ManyToOne(fetch = FetchType.LAZY)
    private Machine machine;
    @OneToMany(fetch = FetchType.LAZY)
    private List<SubDevice> subDevice;


    public List<SubDevice> getSubDevice() {
        return subDevice;
    }

    public Device setSubDevice(List<SubDevice> subDevice) {
        this.subDevice = subDevice;
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

    public String getDeviceName() {
        return deviceName;
    }

    public Device setDeviceName(String deviceName) {
        this.deviceName = deviceName;
        return this;
    }


}
