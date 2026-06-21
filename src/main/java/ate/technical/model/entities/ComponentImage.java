package ate.technical.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "component_images")
public class ComponentImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id")
    private Component component;

    public Long getId() {
        return id;
    }

    public ComponentImage setId(Long id) {
        this.id = id;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public ComponentImage setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public Component getComponent() {
        return component;
    }

    public ComponentImage setComponent(Component component) {
        this.component = component;
        return this;
    }
}
