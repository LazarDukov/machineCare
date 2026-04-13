package ate.technical.api.requests.task;

import ate.technical.model.enums.PeriodEnum;

public class CreateTaskRequest {
    private String title;
    private String description;
    private String additionalInfo;
    private String machineName;

    private Long deviceId;
    private Long subDeviceId;
    private Long componentId;

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

    public Long getDeviceId() {
        return deviceId;
    }

    public CreateTaskRequest setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public Long getSubDeviceId() {
        return subDeviceId;
    }

    public CreateTaskRequest setSubDeviceId(Long subDeviceId) {
        this.subDeviceId = subDeviceId;
        return this;
    }

    public Long getComponentId() {
        return componentId;
    }

    public CreateTaskRequest setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }
}
