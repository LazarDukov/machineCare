package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "parts")
public class Part {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column
    private String partName;

    @Column
    private int count;

    @Column
    private String sapNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    private SubDevice subDevice;

    public SubDevice getSubDevice() {
        return subDevice;
    }

    public Part setSubDevice(SubDevice subDevice) {
        this.subDevice = subDevice;
        return this;
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

    public int getCount() {
        return count;
    }

    public Part setCount(int count) {
        this.count = count;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public Part setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }
}
