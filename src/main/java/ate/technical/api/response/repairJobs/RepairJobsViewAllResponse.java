package ate.technical.api.response.repairJobs;

import ate.technical.model.entities.User;

import java.util.List;

public class RepairJobsViewAllResponse {
    private Long id;
    private String name;
    private String description;
    private String startDate;
    private String endDate;

    private List<User> technicians;

    public String getEndDate() {
        return endDate;
    }

    public RepairJobsViewAllResponse setEndDate(String endDate) {
        this.endDate = endDate;
        return this;
    }



    public Long getId() {
        return id;
    }

    public RepairJobsViewAllResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public RepairJobsViewAllResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public RepairJobsViewAllResponse setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getStartDate() {
        return startDate;
    }

    public RepairJobsViewAllResponse setStartDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public List<User> getTechnicians() {
        return technicians;
    }

    public RepairJobsViewAllResponse setTechnicians(List<User> technicians) {
        this.technicians = technicians;
        return this;
    }
}
