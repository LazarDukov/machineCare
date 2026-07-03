package ate.technical.repositories;

import ate.technical.api.controllers.RepairJobsController;
import ate.technical.model.entities.RepairJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairJobRepository extends JpaRepository<RepairJob, Long> {
    List<RepairJob> findAllByMachineId(Long machineId);
}
