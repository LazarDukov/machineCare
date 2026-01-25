package ate.technical.model.entities;

import ate.technical.model.enums.DepartmentEnum;
import ate.technical.model.enums.RoleEnum;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String firstName;
    @Column
    private String lastName;


    @Column
    private String email;
    @Column
    @Enumerated(EnumType.STRING)
    private RoleEnum roleEnum;


    @Column
    @Enumerated(EnumType.STRING)
    private DepartmentEnum departmentEnum;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<UserTask> tasks;

    @Column
    private String password;

    public User() {
    }

    public User(Long id,
                String username,
                String firstName,
                String lastName,
                String email,
                RoleEnum roleEnum,
                DepartmentEnum departmentEnum,
                List<UserTask> tasks,
                String password) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleEnum = roleEnum;
        this.departmentEnum = departmentEnum;
        this.tasks = tasks;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }


    public DepartmentEnum getDepartment() {
        return departmentEnum;
    }

    public User setDepartment(DepartmentEnum departmentEnum) {
        this.departmentEnum = departmentEnum;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public RoleEnum getRole() {
        return roleEnum;
    }

    public User setRole(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
        return this;
    }

    public List<UserTask> getTasks() {
        return tasks;
    }


    public User setTasks(List<UserTask> tasks) {
        this.tasks = tasks;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }
}
