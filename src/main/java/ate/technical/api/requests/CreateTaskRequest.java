package ate.technical.api.requests;

import ate.technical.model.enums.PeriodEnum;

public class CreateTaskRequest {
    private String title;
    private String description;
    private String additionalInfo;
    private String material;
    private String machineName;
    private int repeatedAfter;
    private PeriodEnum periodEnum;

    public String getTitle() {
        return title;
    }

    public CreateTaskRequest setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public CreateTaskRequest setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public CreateTaskRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public String getMaterial() {
        return material;
    }

    public CreateTaskRequest setMaterial(String material) {
        this.material = material;
        return this;
    }

    public String getMachineName() {
        return machineName;
    }

    public CreateTaskRequest setMachineName(String machineName) {
        this.machineName = machineName;
        return this;
    }

    public int getRepeatedAfter() {
        return repeatedAfter;
    }

    public CreateTaskRequest setRepeatedAfter(int repeatedAfter) {
        this.repeatedAfter = repeatedAfter;
        return this;
    }

    public PeriodEnum getPeriodEnum() {
        return periodEnum;
    }

    public CreateTaskRequest setPeriodEnum(PeriodEnum periodEnum) {
        this.periodEnum = periodEnum;
        return this;
    }
}
