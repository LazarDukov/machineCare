package ate.technical.repositories;

import ate.technical.model.entities.Component;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {

    List<Component> findBySubDeviceId(Long subDeviceId);
}
