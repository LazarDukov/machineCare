package ate.technical.api.requests.repairJobs;

import java.time.LocalDate;
import java.util.List;

public class RepairJobsCreateRequest {
    private String machineName;
    private String repairName;

    private LocalDate repairDate;
    private List<Long> technicianIds;
    private String description;

    public String getMachineName() {
        return machineName;
    }

    public RepairJobsCreateRequest setMachineName(String machineName) {
        this.machineName = machineName;
        return this;
    }

    public String getRepairName() {
        return repairName;
    }

    public RepairJobsCreateRequest setRepairName(String repairName) {
        this.repairName = repairName;
        return this;
    }

    public LocalDate getRepairDate() {
        return repairDate;
    }

    public RepairJobsCreateRequest setRepairDate(LocalDate repairDate) {
        this.repairDate = repairDate;
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
