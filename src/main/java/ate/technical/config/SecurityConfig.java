package ate.technical.config;


import ate.technical.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
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
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


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
                                "/login",
                                "/login.html",
                                "/register",
                                "/register.html",
                                "/api/auth/login",
                                "/api/auth/register"
                        ).anonymous()
                        .requestMatchers(

                                "/api/machines/extruders/add",
                                "/api/sub-devices/add",
                                "/api/devices/add",
                                "/api/components/add",
                                "/api/parts/add",
                                "/api/components/add-part",
                                "/api/components/add-image",
                                "/api/materials/add",
                                "/api/tasks/add",
                                "/api/devices/change", "/api/devices/delete",
                                "/api/sub-devices/change", "/api/sub-devices/delete",
                                "/api/components/change", "/api/components/delete",
                                "/api/parts/change", "/api/parts/delete",
                                "/api/materials/change", "/api/materials/delete",
                                "/tasks/add", "/api/tasks/change", "/api/tasks/delete",
                                "/api/components-parts/delete",
                                "/api/parts/add-to-component", "/api/parts/change-quantity",
                                "/api/repairs-job/add")
                        .hasRole("ADMIN")
                        .requestMatchers(
                                "/uploadedImages/**",
                                "/",
                                "/index.html",
                                "/machines",
                                "/machines.html",
                                "/machines/extruders",
                                "/api/machines/**",
                                "/machines/extruders/**",
                                "/extruders",
                                "/extruders.html",
                                "/tasks/**",
                                "/static/**",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/api/machines/name/**",
                                "/machine-details.html",
                                "/full-machine-structure.html",
                                "/full-structure",
                                "/api/components-parts/**",
                                "/api/components/**",
                                "/repair-jobs",
                                "/repair-job.html",
                                "/tasks/all/**",
                                "/tasks.html",
                                "/api/tasks/all/**",
                                "/api/users/operators-technicians"
                        )
                        .permitAll().anyRequest().authenticated()
                ).formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .logout(logout -> logout
                        .logoutRequestMatcher(
                                new AntPathRequestMatcher("/api/auth/logout", "POST")
                        )
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler((request, response, authentication) ->
                                response.setStatus(HttpServletResponse.SC_NO_CONTENT)
                        )
                        .permitAll()
                )
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
