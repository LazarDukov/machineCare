package ate.technical.api;

import ate.technical.api.requests.auth.CreateUserRequest;
import ate.technical.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class RegisterApiController {
    private UserService userService;

    public RegisterApiController(UserService userService) {
        this.userService = userService;
    }

    // TODO: Should implement password validation via password encoder.
    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest createUserRequest) {
        userService.registerNewUser(createUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
