package ate.technical.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(PathRequest.toStaticResources()
                                .atCommonLocations())
                        .permitAll()
                        .requestMatchers(
                                "/login.html","/home.html","/register.html","/static/**",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/machines",
                                "/machines/add",
                                "/machines/**",
                                "/api/register/**",
                                "/api/machines",
                                "/api/machines/add",
                                "/api/machines/type/**",
                                "/machines/update/**",
                                "/api/machines/update/**",
                                "/api/machines/name/**",
                                "/api/devices/**",
                                "/api/sub-devices/**",
                                "/api/components/**",
                                "/api/parts/**",
                                "/api/materials/**")
                        .permitAll()
                        .anyRequest().authenticated()).formLogin(login -> login.loginPage("/login.html")
                        .usernameParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
                        .passwordParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_PASSWORD_KEY)
                        .defaultSuccessUrl("/home", true)
                        .failureUrl("/login-error")
                        .permitAll())
                .logout((logout) -> logout.logoutUrl("/logout").logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"));
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
