package ate.technical.repositories;

import ate.technical.model.entities.Machine;
import ate.technical.model.enums.TypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
    Machine findMachineByName(String name);

    List<Machine> findAllMachinesByType(TypeEnum type);

}
