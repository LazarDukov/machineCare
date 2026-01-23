package ate.technical.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegisterController {
    @GetMapping("/register")
    public String getRegisterPage() {
        return "register";
    }
}
//TODO: Implement registration logic