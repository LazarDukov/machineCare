package ate.technical.api.response;

import ate.technical.api.response.device.DevicesStructureResponse;

import java.util.List;

public class ViewStructureResponse {
    private List<DevicesStructureResponse> structure;

    public ViewStructureResponse() {
    }

    public List<DevicesStructureResponse> getStructure() {
        return structure;
    }

    public ViewStructureResponse setStructure(List<DevicesStructureResponse> structure) {
        this.structure = structure;
        return this;
    }
}
