package ate.technical.services;

import ate.technical.model.entities.Machine;
import ate.technical.repositories.MachineRepository;
import org.springframework.stereotype.Service;

@Service
public class MachineService {
    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }


    public Machine getMachineByName(String name) {
        return machineRepository.findMachineByName(name);
    }

}
