package ate.technical.api.requests.repairJobs;

import java.util.List;

public class RepairJobsGetTechnicians {
    private Long repairJobId;
    private List<Long> technicians;
    private Long machineId;

    public Long getRepairJobId() {
        return repairJobId;
    }

    public RepairJobsGetTechnicians setRepairJobId(Long repairJobId) {
        this.repairJobId = repairJobId;
        return this;
    }

    public List<Long> getTechnicians() {
        return technicians;
    }

    public RepairJobsGetTechnicians setTechnicians(List<Long> technicians) {
        this.technicians = technicians;
        return this;
    }

    public Long getMachineId() {
        return machineId;
    }

    public RepairJobsGetTechnicians setMachineId(Long machineId) {
        this.machineId = machineId;
        return this;
    }
}
