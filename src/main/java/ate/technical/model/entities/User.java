package ate.technical.model.entities;

import ate.technical.model.enums.Department;
import ate.technical.model.enums.Position;
import ate.technical.model.enums.Role;
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
    private Role role;

    @Column
    @Enumerated
    private Position position;



    @Column
    @Enumerated
    private Department department;



    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<UserTask> tasks;


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
    public User setPosition(Position position) {
        this.position = position;
        return this;
    }

    public Department getDepartment() {
        return department;
    }

    public User setDepartment(Department department) {
        this.department = department;
        return this;
    }
    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }
    public Position getPosition() {
        return position;
    }
    public Role getRole() {
        return role;
    }

    public User setRole(Role role) {
        this.role = role;
        return this;
    }

    public List<UserTask> getTasks() {
        return tasks;
    }



    public User setTasks(List<UserTask> tasks) {
        this.tasks = tasks;
        return this;
    }
}
