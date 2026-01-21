package ate.technical.model.entities;

import ate.technical.model.enums.Unit;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "materials")
public class Material {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.ORDINAL)
    private Unit unit;

    @Column
    private Long quantity;

    @Column
    private String sapNumber;

    @ManyToMany(mappedBy = "materials", fetch = FetchType.EAGER)
    private List<Machine> machines;

    public Long getId() {
        return id;
    }

    public Material setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Material setName(String name) {
        this.name = name;
        return this;
    }

    public Unit getUnit() {
        return unit;
    }

    public Material setUnit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Material setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public Material setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public Material setMachines(List<Machine> machines) {
        this.machines = machines;
        return this;
    }
}
