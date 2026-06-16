package ate.technical.api.requests.part;

public class ViewPicturesRequest {
    private Long partId;

    public Long getPartId() {
        return partId;
    }

    public ViewPicturesRequest setPartId(Long partId) {
        this.partId = partId;
        return this;
    }
}
