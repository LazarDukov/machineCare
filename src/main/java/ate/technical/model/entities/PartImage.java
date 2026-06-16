package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "part_images")
public class PartImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id")
    private Part part;

    public Long getId() {
        return id;
    }

    public PartImage setId(Long id) {
        this.id = id;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public PartImage setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public Part getPart() {
        return part;
    }

    public PartImage setPart(Part part) {
        this.part = part;
        return this;
    }
}
