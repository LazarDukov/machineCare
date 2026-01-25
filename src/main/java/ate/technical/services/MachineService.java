package ate.technical.services;

import ate.technical.model.entities.Machine;
import org.springframework.stereotype.Service;

@Service
public class MachineService {
    private final MachineService machineService;

    public MachineService(MachineService machineService) {
        this.machineService = machineService;
    }

    public Machine getMachineByName(String name) {
        return machineService.getMachineByName(name);
    }

}
