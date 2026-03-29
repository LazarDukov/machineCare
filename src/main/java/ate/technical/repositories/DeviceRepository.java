package ate.technical.repositories;

import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findAllByMachine_Name(String machineName);
}
