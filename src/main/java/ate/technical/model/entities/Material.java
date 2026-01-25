package ate.technical.model.entities;

import ate.technical.model.enums.UnitEnum;
import jakarta.persistence.*;

@Entity
@Table(name = "materials")
public class Material {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private UnitEnum unitEnum;

    @Column
    private Long quantity;

    @Column
    private String sapNumber;


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

    public UnitEnum getUnit() {
        return unitEnum;
    }

    public Material setUnit(UnitEnum unitEnum) {
        this.unitEnum = unitEnum;
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


}
