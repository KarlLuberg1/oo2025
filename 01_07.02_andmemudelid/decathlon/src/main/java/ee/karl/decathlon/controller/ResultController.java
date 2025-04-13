package ee.karl.decathlon.controller;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.model.Result;
import ee.karl.decathlon.service.ResultService;
import ee.karl.decathlon.service.AthleteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/results")
public class ResultController {
    private final ResultService resultService;
    private final AthleteService athleteService;

    public ResultController(ResultService resultService, AthleteService athleteService) {
        this.resultService = resultService;
        this.athleteService = athleteService;
    }

    //tulemuse loomine ja sportlasega sidmine
    @PostMapping
    public Result createResult(@RequestBody Result result, @RequestParam Long athleteId) {
        Athlete athlete = athleteService.getAthleteById(athleteId);  //sportlane id järgi
        result.setAthlete(athlete);  //tulemus seotakse sportlasega

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

    @DeleteMapping("/{id}")
    public void deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
    }
}