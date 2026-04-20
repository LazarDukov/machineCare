package ate.technical.repositories;


import ate.technical.model.entities.ComponentPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentsPartsRepository extends JpaRepository<ComponentPart, Long> {

    List<ComponentPart> findAllByComponentId(Long componentId);

    ComponentPart findByComponentIdAndPartId(Long componentId, Long id);
}
