package ate.technical.api.response;

import ate.technical.model.entities.User;

import java.util.List;

public class ViewOperatorsTechnicians {

    private Long id;

    private String firstName;
    private String lastName;


    public Long getId() {
        return id;
    }

    public ViewOperatorsTechnicians setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public ViewOperatorsTechnicians setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public ViewOperatorsTechnicians setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }
}
