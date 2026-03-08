package ate.technical.repositories;

import ate.technical.model.entities.SubDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubDeviceRepository extends JpaRepository<SubDevice, Long> {

}
