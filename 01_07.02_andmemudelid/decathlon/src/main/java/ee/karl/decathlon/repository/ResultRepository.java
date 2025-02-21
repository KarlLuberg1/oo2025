package ee.karl.decathlon.repository;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByAthlete(Athlete athlete);
}