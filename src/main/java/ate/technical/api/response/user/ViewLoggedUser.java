package ate.technical.api.response.user;

import ate.technical.model.enums.RoleEnum;

import java.util.List;

public class ViewLoggedUser {

    private Long id;
    private String username;

    private String firstName;

    private boolean authenticated;

    private List<RoleEnum> roles;


    public boolean isAuthenticated() {
        return authenticated;
    }

    public ViewLoggedUser setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
        return this;
    }

    public Long getId() {
        return id;
    }

    public ViewLoggedUser setId(Long id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public ViewLoggedUser setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public ViewLoggedUser setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public List<RoleEnum> getRoles() {
        return roles;
    }

    public ViewLoggedUser setRoles(List<RoleEnum> roles) {
        this.roles = roles;
        return this;
    }
}
