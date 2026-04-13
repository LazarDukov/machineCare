package ate.technical.model.entities;

import ate.technical.model.enums.PeriodEnum;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String additionalInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "machine_id")
    private Machine machine;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device device;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_device_id")
    private SubDevice subDevice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id")
    private Component component;

    @ManyToMany
    @JoinTable(
            name = "task_materials",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materials;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Column
    private boolean active;

    @Column
    private int repeatedAfter;

    @Column
    @Enumerated(EnumType.STRING)
    private PeriodEnum periodEnum;

    public boolean isActive() {
        return active;
    }

    public Task setActive(boolean active) {
        this.active = active;
        return this;
    }


    public PeriodEnum getPeriod() {
        return periodEnum;
    }

    public Task setPeriod(PeriodEnum periodEnum) {
        this.periodEnum = periodEnum;
        return this;
    }

    public int getRepeatedAfter() {
        return repeatedAfter;
    }

    public Task setRepeatedAfter(int repeatedAfter) {
        this.repeatedAfter = repeatedAfter;
        return this;
    }

    public PeriodEnum getPeriodEnum() {
        return periodEnum;
    }

    public Task setPeriodEnum(PeriodEnum periodEnum) {
        this.periodEnum = periodEnum;
        return this;
    }

    public Long getId() {
        return id;
    }

    public Task setId(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Task setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Task setDescription(String description) {
        this.description = description;
        return this;
    }

    public List<Material> getMaterials() {
        return materials;
    }

    public Task setMaterials(List<Material> materials) {
        this.materials = materials;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public Task setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public Machine getMachine() {
        return machine;
    }

    public Task setMachine(Machine machine) {
        this.machine = machine;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Task setUser(User user) {
        this.user = user;
        return this;
    }

    public SubDevice getSubDevice() {
        return subDevice;
    }

    public Task setSubDevice(SubDevice subDevice) {
        this.subDevice = subDevice;
        return this;
    }

    public Component getComponent() {
        return component;
    }

    public Task setComponent(Component component) {
        this.component = component;
        return this;
    }

    public Device getDevice() {
        return device;
    }

    public Task setDevice(Device device) {
        this.device = device;
        return this;
    }
}
