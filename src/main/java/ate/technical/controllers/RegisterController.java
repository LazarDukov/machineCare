package ate.technical.controllers;

import ate.technical.model.dtos.RegisterDto;
import ate.technical.services.RegisterService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class RegisterController {
    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @GetMapping("/register")
    public String getRegisterPage() {
        return "register";
    }

    @ModelAttribute("registerDto")
    public RegisterDto registerDto() {
        return new RegisterDto();
    }

    @PostMapping("/register")
    public String postRegister(RegisterDto registerDto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("registerDto", registerDto);
            redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.registerDto", bindingResult);
            return "redirect:/register";
        }
        registerService.registerNewUser(registerDto);
        return "redirect:/login";
    }
}
//TODO: Implement registration logic