package ee.karl.decathlon.controller;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.service.AthleteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/athletes")
public class AthleteController {
    private final AthleteService athleteService;

    public AthleteController(AthleteService athleteService) {
        this.athleteService = athleteService;
    }

    @PostMapping
    public Athlete createAthlete(@RequestBody Athlete athlete) {
        return athleteService.saveAthlete(athlete);
    }

    @GetMapping("/{id}")
    public Athlete getAthleteById(@PathVariable Long id) {
        return athleteService.getAllAthletes().stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Athlete with ID " + id + " not found!"));
    }

    @GetMapping
    public List<Athlete> getAllAthletes() {
        return athleteService.getAllAthletes();
    }

    // Päring ühe sportlase kogupunktide saamiseks(postmanis id järgi)
    @GetMapping("/{id}/total-points")
    public int getAthleteTotalPoints(@PathVariable Long id) {
        return athleteService.getAthleteTotalPoints(id);
    }

    // Päring kõigi sportlaste kohta koos punktisummadega
    @GetMapping("/with-points")
    public List<AthleteService.AthleteWithPoints> getAllAthletesWithPoints() {
        return athleteService.getAllAthletesWithPoints();
    }
}