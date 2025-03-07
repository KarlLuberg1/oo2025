package ee.karl.kiirused.repository;

import ee.karl.kiirused.entity.SpeedMphEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeedMphRepository extends JpaRepository<SpeedMphEntity, Long> {
}