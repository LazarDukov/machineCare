package ate.technical.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "components")
public class Component {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String additionalInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_device_id")
    private SubDevice subDevice;

    @OneToMany(mappedBy = "component", cascade = CascadeType.ALL)
    private List<ComponentPart> parts;

    public Long getId() {
        return id;
    }

    public Component setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Component setName(String name) {
        this.name = name;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public Component setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public SubDevice getSubDevice() {
        return subDevice;
    }

    public Component setSubDevice(SubDevice subDevice) {
        this.subDevice = subDevice;
        return this;
    }

    public List<ComponentPart> getParts() {
        return parts;
    }

    public Component setParts(List<ComponentPart> parts) {
        this.parts = parts;
        return this;
    }
}
