package ate.technical.services;

import ate.technical.api.requests.auth.CreateUserRequest;
import ate.technical.model.dtos.RegisterDto;
import ate.technical.model.entities.User;
import ate.technical.model.enums.DepartmentEnum;
import ate.technical.model.enums.RoleEnum;
import ate.technical.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void registerNewUser(CreateUserRequest createUserRequest) {
        User user = new User();
        user.setUsername(createUserRequest.getUsername());
        user.setFirstName(createUserRequest.getFirstName());
        user.setLastName(createUserRequest.getLastName());
        user.setEmail(createUserRequest.getEmail());
        user.setRole(RoleEnum.USER);
        user.setDepartment(DepartmentEnum.valueOf(createUserRequest.getDepartment()));

        user.setTasks(new ArrayList<>());
        user.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        userRepository.save(user);
    }
}
