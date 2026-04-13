package ate.technical.config;


import ate.technical.repositories.UserRepository;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

    private final UserRepository userRepository;


    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable).headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)).authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(PathRequest.toStaticResources()
                                .atCommonLocations())
                        .permitAll()
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/login.html",
                                "/login",
                                "/register",
                                "/register.html",
                                "/machines",
                                "/machines.html",
                                "/extruders",
                                "/extruders.html",
                                "/static/**",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/machines/extruders/add",
                                "/api/machines/name/**",
                                "/machine-details.html",
                                "/api/machines/**",
                                "/machines/extruders/**",
                                "/add-machine.html",
                                "/machines/add.html",
                                "/machines/**",
                                "/api/auth/**",
                                "/api/auth/login.html",
                                "/add-task.html",
                                "/api/machines",
                                "/api/machines/add",
                                "/api/machines/type/**",
                                "/machines/update/**",
                                "/api/machines/update/**",
                                "/api/machines/name/**",
                                "/api/devices/**",
                                "/api/sub-devices/**",
                                "/api/sub-devices/add",
                                "/api/sub-devices/device/**",
                                "/api/components/**",
                                "/api/components/add",
                                "/api/parts/**",
                                "/api/materials/**",
                        "/api/tasks/**",
                        "/tasks/add")
                        .permitAll()
                        .anyRequest().authenticated()
                ).formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        System.out.println("authentication manager bean called");
        return authenticationConfiguration.getAuthenticationManager();
    }


}
