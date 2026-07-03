package ate.technical.api.controllers;

import ate.technical.api.response.user.ViewOperatorsTechnicians;
import ate.technical.api.response.user.ViewTechniciansResponse;
import ate.technical.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserApiController {
    private UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/operators-technicians")
    public ResponseEntity<List<ViewOperatorsTechnicians>> getOperatorsAndTechnicians() {
        return ResponseEntity.ok(userService.getOperatorsAndTechnicians());

    }

    @GetMapping("/technicians")
    public ResponseEntity<List<ViewTechniciansResponse>> getTechnicians() {
        return ResponseEntity.ok(userService.getTechnicians());
    }

}
