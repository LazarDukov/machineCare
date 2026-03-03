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
    private List<Component> components;

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

    public List<Component> getComponents() {

        return components;
    }

    public SubDevice setComponents(List<Component> components) {
        this.components = components;
        return this;
    }
}
