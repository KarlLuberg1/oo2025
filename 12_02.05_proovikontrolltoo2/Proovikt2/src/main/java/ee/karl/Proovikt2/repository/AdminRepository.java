package ee.karl.Proovikt2.repository;

import ee.karl.Proovikt2.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
