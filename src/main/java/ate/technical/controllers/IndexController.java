package ate.technical.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {
    @GetMapping("/")
    public String getHomePage() {
        return "home";
    }

    @GetMapping("/machines")
    public String getMachinesPage() {
        return "machines";
    }


}
