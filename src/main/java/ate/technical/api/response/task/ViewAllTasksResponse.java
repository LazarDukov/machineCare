package ate.technical.api.response.task;

import java.time.LocalDateTime;

public class ViewAllTasksResponse {
    private Long id;
    private String title;
    private Long machineId;
    private String machineName;
    private Long deviceId;
    private String deviceName;
    private Long subDeviceId;
    private String subDeviceName;
    private Long componentId;
    private String componentName;
    private String description;

    private boolean completed;
    private int repeatedAfter;
    private String periodEnum;
    private LocalDateTime createdAt;


    public ViewAllTasksResponse setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Long getId() {
        return id;
    }

    public ViewAllTasksResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ViewAllTasksResponse setTitle(String title) {
        this.title = title;
        return this;
    }

    public Long getMachineId() {
        return machineId;
    }

    public ViewAllTasksResponse setMachineId(Long machineId) {
        this.machineId = machineId;
        return this;
    }

    public String getMachineName() {
        return machineName;
    }

    public ViewAllTasksResponse setMachineName(String machineName) {
        this.machineName = machineName;
        return this;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public ViewAllTasksResponse setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public ViewAllTasksResponse setDeviceName(String deviceName) {
        this.deviceName = deviceName;
        return this;
    }

    public Long getSubDeviceId() {
        return subDeviceId;
    }

    public ViewAllTasksResponse setSubDeviceId(Long subDeviceId) {
        this.subDeviceId = subDeviceId;
        return this;
    }

    public String getSubDeviceName() {
        return subDeviceName;
    }

    public ViewAllTasksResponse setSubDeviceName(String subDeviceName) {
        this.subDeviceName = subDeviceName;
        return this;
    }

    public Long getComponentId() {
        return componentId;
    }

    public ViewAllTasksResponse setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public String getComponentName() {
        return componentName;
    }

    public ViewAllTasksResponse setComponentName(String componentName) {
        this.componentName = componentName;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ViewAllTasksResponse setDescription(String description) {
        this.description = description;
        return this;
    }

    public boolean isCompleted() {
        return completed;
    }

    public ViewAllTasksResponse setCompleted(boolean completed) {
        this.completed = completed;
        return this;
    }

    public int getRepeatedAfter() {
        return repeatedAfter;
    }

    public ViewAllTasksResponse setRepeatedAfter(int repeatedAfter) {
        this.repeatedAfter = repeatedAfter;
        return this;
    }

    public String getPeriodEnum() {
        return periodEnum;
    }

    public ViewAllTasksResponse setPeriodEnum(String periodEnum) {
        this.periodEnum = periodEnum;
        return this;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
