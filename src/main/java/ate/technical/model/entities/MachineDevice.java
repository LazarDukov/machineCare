package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "machine_devices")
public class MachineDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device device;

    public Long getId() {
        return id;
    }

    public MachineDevice setId(Long id) {
        this.id = id;
        return this;
    }

    public Machine getMachine() {
        return machine;
    }

    public MachineDevice setMachine(Machine machine) {
        this.machine = machine;
        return this;
    }

    public Device getDevice() {
        return device;
    }

    public MachineDevice setDevice(Device device) {
        this.device = device;
        return this;
    }
}
