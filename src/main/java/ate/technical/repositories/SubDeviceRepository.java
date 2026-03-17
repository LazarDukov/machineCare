package ate.technical.repositories;

import ate.technical.model.entities.SubDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubDeviceRepository extends JpaRepository<SubDevice, Long> {
    Optional<SubDevice> findById(Long id);
}
