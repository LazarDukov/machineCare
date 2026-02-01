package ate.technical.services;

import ate.technical.api.requests.CreateMachineRequest;
import ate.technical.model.entities.Machine;
import ate.technical.model.enums.TypeEnum;
import ate.technical.repositories.MachineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MachineService {
    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }


    public Machine getMachineByName(String name) {
        return machineRepository.findMachineByName(name);
    }


    public void createMachine(CreateMachineRequest request) {
        System.out.println("Im in service layer before createing machine");
        System.out.println(request.getName());
        System.out.println(request.getManufacturer());
        System.out.println(request.getType());
        System.out.println(request.getModel());
        System.out.println(request.getIdentificationNumber());

        Machine machine = new Machine();
        machine.setName(request.getName());
        machine.setIdentificationNumber(request.getIdentificationNumber());
        machine.setManufacturer(request.getManufacturer());
        machine.setType(TypeEnum.valueOf(request.getType()));
        machine.setModel(request.getModel());
        System.out.println("machine created");
        machineRepository.save(machine);
        System.out.println("machine saved");
    }

    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }
}
