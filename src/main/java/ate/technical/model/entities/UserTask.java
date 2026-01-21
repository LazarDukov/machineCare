package ate.technical.model.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_tasks")
public class UserTask {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    @Column
    private boolean finished;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime finishedAt;

    @Column
    private String additionalInfo;

    public Long getId() {
        return id;
    }

    public UserTask setId(Long id) {
        this.id = id;
        return this;
    }

    public User getUser() {
        return user;
    }

    public UserTask setUser(User user) {
        this.user = user;
        return this;
    }

    public Task getTask() {
        return task;
    }

    public UserTask setTask(Task task) {
        this.task = task;
        return this;
    }

    public boolean isFinished() {
        return finished;
    }

    public UserTask setFinished(boolean finished) {
        this.finished = finished;
        return this;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public UserTask setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public LocalDateTime getFinishedAt() {
        return finishedAt;
    }

    public UserTask setFinishedAt(LocalDateTime finishedAt) {
        this.finishedAt = finishedAt;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public UserTask setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }
}
