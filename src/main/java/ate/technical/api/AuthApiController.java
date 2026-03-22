package ate.technical.api;

import ate.technical.api.requests.auth.CreateUserRequest;
import ate.technical.api.requests.auth.LoginRequest;
import ate.technical.services.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {
    private UserService userService;
    private AuthenticationConfiguration authenticationConfiguration;


    public AuthApiController(UserService userService, AuthenticationConfiguration authenticationConfiguration) {
        this.userService = userService;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    // TODO: Should implement validation for password - confirm password in register.
    @PostMapping("/register")
    public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest createUserRequest) {
        System.out.println("create user api called");
        userService.registerNewUser(createUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
        System.out.println("login.html api called");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok("Login successfully");
    }
}
