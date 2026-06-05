package ate.technical.api.requests.task;

import java.time.LocalDateTime;

public class ChangeTaskRequest {
    private Long id;
    private String title;
    private String description;
    private String additionalInfo;
    private Long deviceId;
    private Long subDeviceId;
    private Long componentId;
    private int repeatedAfter;
    private String periodEnum;
    private LocalDateTime createdAt;





    public Long getId() {
        return id;
    }

    public ChangeTaskRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ChangeTaskRequest setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ChangeTaskRequest setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public ChangeTaskRequest setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public ChangeTaskRequest setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public Long getSubDeviceId() {
        return subDeviceId;
    }

    public ChangeTaskRequest setSubDeviceId(Long subDeviceId) {
        this.subDeviceId = subDeviceId;
        return this;
    }

    public Long getComponentId() {
        return componentId;
    }

    public ChangeTaskRequest setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public int getRepeatedAfter() {
        return repeatedAfter;
    }

    public ChangeTaskRequest setRepeatedAfter(int repeatedAfter) {
        this.repeatedAfter = repeatedAfter;
        return this;
    }

    public String getPeriodEnum() {
        return periodEnum;
    }

    public ChangeTaskRequest setPeriodEnum(String periodEnum) {
        this.periodEnum = periodEnum;
        return this;
    }
}
