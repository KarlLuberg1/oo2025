package ee.karl.Proovikt2.repository;

import ee.karl.Proovikt2.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
