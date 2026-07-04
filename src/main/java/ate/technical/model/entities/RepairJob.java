package ate.technical.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "repair_jobs")
public class RepairJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    public String getName() {
        return name;
    }

    public RepairJob setName(String name) {
        this.name = name;
        return this;
    }

    @Column
    private String description;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @ManyToMany
    @JoinTable(
            name = "repair_jobs_users",
            joinColumns = @JoinColumn(name = "repair_job_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> employees;

    public Long getId() {
        return id;
    }

    public RepairJob setId(Long id) {
        this.id = id;
        return this;
    }

    public Machine getMachine() {
        return machine;
    }

    public RepairJob setMachine(Machine machine) {
        this.machine = machine;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public RepairJob setDescription(String description) {
        this.description = description;
        return this;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public RepairJob setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public RepairJob setEndDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public List<User> getEmployees() {
        return employees;
    }

    public RepairJob setEmployees(List<User> employees) {
        this.employees = employees;
        return this;
    }
}
