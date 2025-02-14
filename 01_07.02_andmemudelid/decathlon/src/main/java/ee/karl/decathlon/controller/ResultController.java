package ee.karl.decathlon.controller;

import ee.karl.decathlon.model.Result;
import ee.karl.decathlon.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/results")
public class ResultController {
    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public Result createResult(@RequestBody Result result) {
        if (result.getScore() == null || result.getScore() < 0) {
            throw new IllegalArgumentException("Score cannot be null or negative");
        }
        if (result.getPoints() < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }
        return resultService.saveResult(result);
    }

    @GetMapping("/{id}")
    public Result getResultById(@PathVariable Long id) {
        Optional<Result> result = resultService.getResultById(id);

        if (result.isEmpty()) {
            throw new RuntimeException("Result with ID " + id + " not found!");
        }
        return result.get();
    }

    @GetMapping
    public List<Result> getAllResults() {
        return resultService.getAllResults();
    }
}