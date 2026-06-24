package ate.technical.api.requests.taskHistory;

import java.util.List;

public class EndTaskRequest {
    private Long taskId;

    private String note;
    private List<Long> employees;

    public Long getTaskId() {
        return taskId;
    }

    public EndTaskRequest setTaskId(Long taskId) {
        this.taskId = taskId;
        return this;
    }

    public List<Long> getEmployees() {
        return employees;
    }

    public EndTaskRequest setEmployees(List<Long> employees) {
        this.employees = employees;
        return this;
    }

    public String getNote() {
        return note;
    }

    public EndTaskRequest setNote(String note) {
        this.note = note;
        return this;
    }
}
