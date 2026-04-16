package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "parts")
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String partName;

    @Column
    private String sapNumber;

    @Column
    private String description;

    public Long getId() {
        return id;
    }

    public Part setId(Long id) {
        this.id = id;
        return this;
    }

    public String getPartName() {
        return partName;
    }

    public Part setPartName(String partName) {
        this.partName = partName;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public Part setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Part setDescription(String description) {
        this.description = description;
        return this;
    }
}