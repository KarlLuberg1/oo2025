package ee.karl.Proovikt2.controller;

import ee.karl.Proovikt2.model.Word;
import ee.karl.Proovikt2.service.WordService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/words")
public class WordController {
    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public Page<Word> getWords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sort
    ) {
        return wordService.getWordsPaginated(page, size, sort);
    }

    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordService.getWordById(id);
    }

    @PostMapping
    public Word createWord(@RequestBody Word word) {
        return wordService.saveWord(word);
    }

    @PutMapping
    public Word updateWord(@RequestBody Word word) {
        return wordService.saveWord(word);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        wordService.deleteWord(id);
    }
}
