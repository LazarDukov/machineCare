package ate.technical.api.requests;

import ate.technical.model.enums.TypeEnum;

public class GetMachinesRequest {
    private Long id;
    private String name;

    public GetMachinesRequest(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public GetMachinesRequest setName(String name) {
        this.name = name;
        return this;
    }

    public Long getId() {
        return id;
    }

    public GetMachinesRequest setId(Long id) {
        this.id = id;
        return this;
    }
}
