package ate.technical.repositories;

import ate.technical.model.entities.User;
import ate.technical.model.enums.DepartmentEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findUserByUsername(String username);

    List<User> findAllByDepartmentEnum(DepartmentEnum departmentEnum);
}
