package ate.technical.repositories;

import ate.technical.model.entities.PartImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartImagesRepository extends JpaRepository<PartImage, Long> {
    List<PartImage> findAllByPartId(Long partId);

}
