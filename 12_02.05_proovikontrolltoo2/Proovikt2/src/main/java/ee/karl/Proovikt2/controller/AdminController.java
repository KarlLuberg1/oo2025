package ee.karl.Proovikt2.controller;

import ee.karl.Proovikt2.model.Admin;
import ee.karl.Proovikt2.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }
}
