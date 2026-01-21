package ate.technical.model.entities;

import jakarta.persistence.*;

import javax.print.attribute.standard.DateTimeAtCompleted;
import javax.print.attribute.standard.DateTimeAtCreation;
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

    @Column
    @ManyToMany
    private List<Material> materials;

    @ManyToOne(fetch = FetchType.LAZY)
    private Machine machine;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "task")
    private List<UserTask> user;



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

    public List<UserTask> getUser() {
        return user;
    }

    public Task setUser(List<UserTask> user) {
        this.user = user;
        return this;
    }
}
