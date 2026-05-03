package ate.technical.repositories;

import ate.technical.model.entities.ComponentPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComponentPartRepository extends JpaRepository<ComponentPart, Long> {
    Optional<ComponentPart> findByComponentIdAndPartId(Long componentId, Long partId);

}
