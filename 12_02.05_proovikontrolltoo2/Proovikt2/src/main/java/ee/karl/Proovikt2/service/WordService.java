package ee.karl.Proovikt2.service;

import ee.karl.Proovikt2.model.Word;
import ee.karl.Proovikt2.repository.WordRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class WordService {
    private final WordRepository wordRepository;

    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public Page<Word> getWordsPaginated(int page, int size, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, "type"));
        return wordRepository.findAll(pageable);
    }

    public Word getWordById(Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    public Word saveWord(Word word) {
        return wordRepository.save(word);
    }

    public void deleteWord(Long id) {
        wordRepository.deleteById(id);
    }
}
