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
    @ManyToMany
    private List<Material> materials;

    @Column
    private DateTimeAtCreation createdAt;

    @Column
    private DateTimeAtCompleted finishedAt;

    @Column
    private String additionalInfo;

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

    public DateTimeAtCreation getCreatedAt() {
        return createdAt;
    }

    public Task setCreatedAt(DateTimeAtCreation createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public DateTimeAtCompleted getFinishedAt() {
        return finishedAt;
    }

    public Task setFinishedAt(DateTimeAtCompleted finishedAt) {
        this.finishedAt = finishedAt;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public Task setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
