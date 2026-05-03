package ate.technical.api.requests.part;

public class ChangePartQuantityIntoComponent {
    private Long componentId;
    private Long partId;
    private int quantity;

    public Long getComponentId() {
        return componentId;
    }

    public ChangePartQuantityIntoComponent setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public Long getPartId() {
        return partId;
    }

    public ChangePartQuantityIntoComponent setPartId(Long partId) {
        this.partId = partId;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public ChangePartQuantityIntoComponent setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }
}
