package ate.technical.api.response;

import ate.technical.api.response.device.ViewAllDevicesResponse;

import java.util.List;

public class ViewAllStructure {
    private List<ViewAllDevicesResponse> devicesResponses;


    public List<ViewAllDevicesResponse> getDevicesResponses() {
        return devicesResponses;
    }

    public ViewAllStructure setDevicesResponses(List<ViewAllDevicesResponse> devicesResponses) {
        this.devicesResponses = devicesResponses;
        return this;
    }


}
