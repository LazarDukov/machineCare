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

    @ManyToMany
    private List<Material> materials;

    @ManyToOne(fetch = FetchType.LAZY)
    private Machine machine;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "task")
    private List<UserTask> userTask;

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

    public List<UserTask> getUserTask() {
        return userTask;
    }

    public Task setUserTask(List<UserTask> userTask) {
        this.userTask = userTask;
        return this;
    }
}
