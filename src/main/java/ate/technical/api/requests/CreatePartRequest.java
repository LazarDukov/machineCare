package ate.technical.api.requests;

public class CreatePartRequest {
    private String name;

    private int count;

    private String sapNumber;

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
}
