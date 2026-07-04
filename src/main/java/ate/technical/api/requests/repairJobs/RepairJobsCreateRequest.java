package ate.technical.api.requests.repairJobs;

import java.time.LocalDate;
import java.util.List;

public class RepairJobsCreateRequest {
    private String machineName;
    private String name;

    private LocalDate startDate;
    private LocalDate endDate;
    private List<Long> technicianIds;
    private String description;
    public LocalDate getStartDate() {
        return startDate;
    }

    public RepairJobsCreateRequest setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public RepairJobsCreateRequest setEndDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }



    public String getMachineName() {
        return machineName;
    }

    public RepairJobsCreateRequest setMachineName(String machineName) {
        this.machineName = machineName;
        return this;
    }

    public String getName() {
        return name;
    }

    public RepairJobsCreateRequest setName(String name) {
        this.name = name;
        return this;
    }



    public List<Long> getTechnicianIds() {
        return technicianIds;
    }

    public RepairJobsCreateRequest setTechnicianIds(List<Long> technicianIds) {
        this.technicianIds = technicianIds;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public RepairJobsCreateRequest setDescription(String description) {
        this.description = description;
        return this;
    }

}
