package ee.karl.proovikt.repository;

import ee.karl.proovikt.entity.NumberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberRepository extends JpaRepository<NumberEntity, Long> {
}
