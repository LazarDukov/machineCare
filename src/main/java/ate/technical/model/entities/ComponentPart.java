package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "component_parts")
public class ComponentPart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "component_id")
    private Component component;

    @ManyToOne
    @JoinColumn(name = "part_id")
    private Part part;

    @Column
    private int quantity;

    public Long getId() {
        return id;
    }

    public ComponentPart setId(Long id) {
        this.id = id;
        return this;
    }

    public Component getComponent() {
        return component;
    }

    public ComponentPart setComponent(Component component) {
        this.component = component;
        return this;
    }

    public Part getPart() {
        return part;
    }

    public ComponentPart setPart(Part part) {
        this.part = part;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public ComponentPart setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }
}