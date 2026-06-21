package ate.technical.api.response.component;

public class ViewPicturesForGivenComponentResponse {
    private Long id;
    private String pictureUrl;


    public ViewPicturesForGivenComponentResponse(Long id, String pictureUrl) {
        this.id = id;
        this.pictureUrl = pictureUrl;
    }

    public Long getId() {
        return id;
    }

    public ViewPicturesForGivenComponentResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public ViewPicturesForGivenComponentResponse setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        return this;
    }
}
