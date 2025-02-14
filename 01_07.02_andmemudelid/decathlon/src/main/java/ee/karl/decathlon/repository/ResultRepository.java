package ee.karl.decathlon.repository;

import ee.karl.decathlon.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}