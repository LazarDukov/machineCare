package ate.technical.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "parts")
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String partName;

    @Column
    private String sapNumber;

    @Column
    private String brand;

    @Column
    private String model;

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PartImage> partImages;



    public Part() {

    }

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

    public String getBrand() {
        return brand;
    }

    public Part setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public List<PartImage> getPartImages() {
        return partImages;
    }

    public Part setPartImages(List<PartImage> partImages) {
        this.partImages = partImages;
        return this;
    }

    public String getModel() {
        return model;
    }

    public Part setModel(String model) {
        this.model = model;
        return this;
    }
}