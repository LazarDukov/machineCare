package ate.technical.model.entities;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "task_history")
public class TaskHistory {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
    @ManyToMany
    @JoinTable(
            name = "task_history_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> employees;

    private LocalDate endedAt;

    private String note;

    public Long getId() {
        return id;
    }

    public TaskHistory setId(Long id) {
        this.id = id;
        return this;
    }

    public Task getTask() {
        return task;
    }

    public TaskHistory setTask(Task task) {
        this.task = task;
        return this;
    }

    public List<User> getEmployees() {
        return employees;
    }

    public TaskHistory setEmployees(List<User> employees) {
        this.employees = employees;
        return this;
    }

    public LocalDate getEndedAt() {
        return endedAt;
    }

    public TaskHistory setEndedAt(LocalDate endedAt) {
        this.endedAt = endedAt;
        return this;
    }

    public String getNote() {
        return note;
    }

    public TaskHistory setNote(String note) {
        this.note = note;
        return this;
    }
}
