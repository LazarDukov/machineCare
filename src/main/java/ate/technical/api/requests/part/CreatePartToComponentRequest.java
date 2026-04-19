package ate.technical.api.requests.part;

public class CreatePartToComponentRequest {
    private Long partId;
    private Long componentId;
    private int quantity;

    public Long getPartId() {
        return partId;
    }

    public CreatePartToComponentRequest setPartId(Long partId) {
        this.partId = partId;
        return this;
    }

    public Long getComponentId() {
        return componentId;
    }

    public CreatePartToComponentRequest setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public CreatePartToComponentRequest setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }
}
