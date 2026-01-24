package ate.technical.model.dtos;

import ate.technical.model.enums.Department;

public class RegisterDto {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String password;
    private String confirmPassword;

    public String getUsername() {
        return username;
    }

    public RegisterDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public RegisterDto setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public RegisterDto setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public RegisterDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getDepartment() {
        return department;
    }

    public RegisterDto setDepartment(String department) {
        this.department = department;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public RegisterDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public RegisterDto setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
        return this;
    }
}
