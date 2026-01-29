package ate.technical.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "sub_devices")
public class SubDevice {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Part> parts;

    public Long getId() {
        return id;
    }

    public SubDevice setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public SubDevice setName(String name) {
        this.name = name;
        return this;
    }

    public List<Part> getParts() {
        return parts;
    }

    public SubDevice setParts(List<Part> parts) {
        this.parts = parts;
        return this;
    }
}
