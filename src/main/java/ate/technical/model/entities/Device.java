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

    @Column
    private String subDevice;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "device")
    private List<MachineDevice> machines;

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

    public String getSubDevice() {
        return subDevice;
    }

    public Device setSubDevice(String subDevice) {
        this.subDevice = subDevice;
        return this;
    }
}
