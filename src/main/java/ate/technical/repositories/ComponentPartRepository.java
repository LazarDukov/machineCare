package ate.technical.repositories;

import ate.technical.model.entities.ComponentPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComponentPartRepository extends JpaRepository<ComponentPart, Long> {


}
