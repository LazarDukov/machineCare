package ate.technical.api.requests.component;

public class AddPartToComponentRequest {
    private Long componentId;
    private Long partId;
    private int quantity;

    public Long getComponentId() {
        return componentId;
    }

    public AddPartToComponentRequest setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public Long getPartId() {
        return partId;
    }

    public AddPartToComponentRequest setPartId(Long partId) {
        this.partId = partId;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public AddPartToComponentRequest setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }
}
