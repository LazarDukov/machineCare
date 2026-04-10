package ate.technical.model.entities;

import jakarta.persistence.*;

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

    @ManyToOne(fetch = FetchType.EAGER)
    private SubDevice subDevice;

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
}
