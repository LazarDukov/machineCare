package ate.technical.Util;

import ate.technical.model.entities.*;
import ate.technical.model.enums.DepartmentEnum;
import ate.technical.repositories.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class dbInit {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final MachineRepository machineRepository;

    private final DeviceRepository deviceRepository;
    private final SubDeviceRepository subDeviceRepository;
    private final ComponentRepository componentRepository;

    @Autowired
    public dbInit(UserRepository userRepository, PasswordEncoder passwordEncoder, MachineRepository machineRepository, DeviceRepository deviceRepository, SubDeviceRepository subDeviceRepository, ComponentRepository componentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.machineRepository = machineRepository;
        this.deviceRepository = deviceRepository;
        this.subDeviceRepository = subDeviceRepository;
        this.componentRepository = componentRepository;
    }

    @PostConstruct

    public void init() {
        if (userRepository.count() == 0) {
            initUsers();
        }
        if (machineRepository.count() == 0) {

            initMachine();
        }
        if (deviceRepository.count() == 0) {
            initDevice();
        }
        if (subDeviceRepository.count() == 0) {
            initSubDevice();
        }
        if (componentRepository.count() == 0) {
            initComponent();
        }
    }


    public void initUsers() {

        User user = new User();
        user.setUsername("admin");
        user.setFirstName("Admin");
        user.setLastName("Adminov");
        user.setEmail("admin@ateplast.eu");
        user.setRole(ate.technical.model.enums.RoleEnum.ADMIN);
        user.setDepartment(DepartmentEnum.TECHNICAL_DEPARTMENT);
        user.setPassword(passwordEncoder.encode("123"));
        userRepository.save(user);

    }

    public void initMachine() {

        Machine machine = new Machine();
        machine.setName("Нана");
        machine.setIdentificationNumber("54006");
        machine.setManufacturer("Windmoeller & Hoelscher");
        machine.setModel("Varex");
        System.out.println(machine.getName());
        machine.setType(ate.technical.model.enums.TypeEnum.EXTRUDER);
        System.out.println(machine.getType());
        machine.setDevices(new ArrayList<>());
        machineRepository.save(machine);

    }


    public void initDevice() {

        Device device = new Device();
        Machine machine = machineRepository.findMachineByName("Нана").orElseThrow(() -> new RuntimeException("Machine not found"));
        device.setName("Дозираща система");
        device.setSubDevices(new ArrayList<>());
        machine.getDevices().add(device);
        deviceRepository.save(device);
        machineRepository.save(machine);

    }


    public void initSubDevice() {

        SubDevice subDevice = new SubDevice();
        Device device = deviceRepository.findById(1L).get();
        subDevice.setName("маса 'А'");
        subDevice.setComponents(new ArrayList<>());
        device.getSubDevices().add(subDevice);
        subDeviceRepository.save(subDevice);
        deviceRepository.save(device);

    }


    public void initComponent() {

        Component component = new Component();
        SubDevice subDevice = subDeviceRepository.findById(1L).get();
        component.setName("Дозатор 1 - въздушен филтър");
        component.setAdditionalInfo("Почиства се на всеки 3 дни! При нужда - подмяна с нов!");
        subDevice.getComponents().add(component);
        componentRepository.save(component);
        subDeviceRepository.save(subDevice);


    }
}
