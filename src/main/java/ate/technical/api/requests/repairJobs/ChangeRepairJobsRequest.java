package ate.technical.api.requests.repairJobs;

import java.time.LocalDate;
import java.util.List;

public class ChangeRepairJobsRequest {
    private Long id;
    private String name;

    private LocalDate startDate;
    private LocalDate endDate;
    private List<Long> technicianIds;
    private String description;

    public Long getId() {
        return id;
    }

    public ChangeRepairJobsRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ChangeRepairJobsRequest setName(String name) {
        this.name = name;
        return this;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public ChangeRepairJobsRequest setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ChangeRepairJobsRequest setEndDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public List<Long> getTechnicianIds() {
        return technicianIds;
    }

    public ChangeRepairJobsRequest setTechnicianIds(List<Long> technicianIds) {
        this.technicianIds = technicianIds;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ChangeRepairJobsRequest setDescription(String description) {
        this.description = description;
        return this;
    }
}
