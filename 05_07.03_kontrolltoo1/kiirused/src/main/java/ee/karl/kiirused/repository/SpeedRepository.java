package ee.karl.kiirused.repository;

import ee.karl.kiirused.entity.SpeedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeedRepository extends JpaRepository<SpeedEntity, Long> {
}