package ate.technical.api.response.user;

public class ViewTechniciansResponse {
    private Long id;
    private String FirstName;
    private String LastName;

    public Long getId() {
        return id;
    }

    public ViewTechniciansResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return FirstName;
    }

    public ViewTechniciansResponse setFirstName(String firstName) {
        FirstName = firstName;
        return this;
    }

    public String getLastName() {
        return LastName;
    }

    public ViewTechniciansResponse setLastName(String lastName) {
        LastName = lastName;
        return this;
    }
}
