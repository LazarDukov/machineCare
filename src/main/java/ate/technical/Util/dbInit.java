package ate.technical.Util;

import ate.technical.model.entities.*;
import ate.technical.model.enums.DepartmentEnum;
import ate.technical.repositories.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class dbInit implements CommandLineRunner {

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
        machine.setType(ate.technical.model.enums.TypeEnum.EXTRUDER);
        machine.setDevices(new ArrayList<>());
        machineRepository.save(machine);

    }


    public void initDevice() {

        Device device = new Device();
        Machine machine = machineRepository.findMachineByName("Нана").orElseThrow(() -> new RuntimeException("Machine not found"));
        device.setName("Дозираща система");
        device.setSubDevices(new ArrayList<>());
        device.setMachine(machine);
        deviceRepository.save(device);

    }


    public void initSubDevice() {

        SubDevice subDevice = new SubDevice();
        Device device = deviceRepository.findById(1L).get();
        subDevice.setName("маса 'А'");
        subDevice.setComponents(new ArrayList<>());
        subDevice.setDevice(device);
        subDeviceRepository.save(subDevice);
    }


    public void initComponent() {

        Component component = new Component();
        SubDevice subDevice = subDeviceRepository.findById(1L).get();
        component.setName("Дозатор 1 - въздушен филтър");
        component.setAdditionalInfo("Почиства се на всеки 3 дни! При нужда - подмяна с нов!");
        component.setSubDevice(subDevice);
        componentRepository.save(component);


    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        init();
    }
}
