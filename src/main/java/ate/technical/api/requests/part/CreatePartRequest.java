package ate.technical.api.requests.part;

public class CreatePartRequest {
    private String name;
    private int count;
    private String sapNumber;
    private Long subDeviceId;

    public String getName() {
        return name;
    }

    public CreatePartRequest setName(String name) {
        this.name = name;
        return this;
    }

    public int getCount() {
        return count;
    }

    public CreatePartRequest setCount(int count) {
        this.count = count;
        return this;
    }

    public String getSapNumber() {
        return sapNumber;
    }

    public CreatePartRequest setSapNumber(String sapNumber) {
        this.sapNumber = sapNumber;
        return this;
    }

    public Long getSubDeviceId() {
        return subDeviceId;
    }

    public CreatePartRequest setSubDeviceId(Long subDeviceId) {
        this.subDeviceId = subDeviceId;
        return this;
    }
}
