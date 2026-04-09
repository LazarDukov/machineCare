package ate.technical.repositories;

import ate.technical.model.entities.Device;
import ate.technical.model.entities.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findAllByMachine_Name(String machineName);

    @Query("""
    SELECT DISTINCT d FROM Device d
    LEFT JOIN FETCH d.subDevice sd
    LEFT JOIN FETCH sd.components
    WHERE d.machine.name = :name
""")
    List<Device> findFullStructure(@Param("name") String name);
}
