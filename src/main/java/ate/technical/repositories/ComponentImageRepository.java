package ate.technical.repositories;

import ate.technical.model.entities.ComponentImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentImageRepository extends JpaRepository<ComponentImage, Long> {
    List<ComponentImage> findAllByComponentId(Long componentId);
}
