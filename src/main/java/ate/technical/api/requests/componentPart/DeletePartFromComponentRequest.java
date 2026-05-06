package ate.technical.api.requests.componentPart;

public class DeletePartFromComponentRequest {
    private Long componentId;
    private Long partId;

    public Long getComponentId() {
        return componentId;
    }

    public DeletePartFromComponentRequest setComponentId(Long componentId) {
        this.componentId = componentId;
        return this;
    }

    public Long getPartId() {
        return partId;
    }

    public DeletePartFromComponentRequest setPartId(Long partId) {
        this.partId = partId;
        return this;
    }
}
