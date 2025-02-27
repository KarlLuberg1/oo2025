package ee.karl.decathlon.service;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.model.Result;
import ee.karl.decathlon.repository.AthleteRepository;
import ee.karl.decathlon.repository.ResultRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class AthleteService {
    private final AthleteRepository athleteRepository;
    private final ResultRepository resultRepository;

    public AthleteService(AthleteRepository athleteRepository, ResultRepository resultRepository) {
        this.athleteRepository = athleteRepository;
        this.resultRepository = resultRepository;
    }

    public Athlete saveAthlete(Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("Athlete name must be provided!");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("Athlete country must be provided!");
        }
        return athleteRepository.save(athlete);
    }

    public List<Athlete> getAllAthletes() {
        return athleteRepository.findAll();
    }

    public Athlete getAthleteById(Long athleteId) {
        return athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found with ID: " + athleteId));
    }

    //sportlase kogu punktisumma aruvtamine
    public int getAthleteTotalPoints(Long athleteId) {
        Athlete athlete = getAthleteById(athleteId);
        List<Result> results = resultRepository.findByAthlete(athlete);
        return results.stream().mapToInt(Result::getPoints).sum();
    }

    public List<AthleteWithPoints> getAllAthletesWithPoints() {
        return athleteRepository.findAll().stream()
                .map(athlete -> new AthleteWithPoints(
                        athlete.getId(), athlete.getName(), athlete.getCountry(),
                        getAthleteTotalPoints(athlete.getId())))
                .collect(Collectors.toList());
    }

    //sportlane koos tema punktidega
    @Data
    public static class AthleteWithPoints {
        private final Long id;
        private final String name;
        private final String country;
        private final int totalPoints;
    }
}