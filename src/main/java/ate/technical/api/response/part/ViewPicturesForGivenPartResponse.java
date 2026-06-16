package ate.technical.api.response.part;

public class ViewPicturesForGivenPartResponse {
    private Long id;
    private String pictureUrl;

    public ViewPicturesForGivenPartResponse(Long id, String pictureUrl) {
        this.id = id;
        this.pictureUrl = pictureUrl;
    }

    public Long getId() {
        return id;
    }

    public ViewPicturesForGivenPartResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public ViewPicturesForGivenPartResponse setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        return this;
    }
}
