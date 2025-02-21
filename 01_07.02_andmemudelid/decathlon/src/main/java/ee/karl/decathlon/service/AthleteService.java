package ee.karl.decathlon.service;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.model.Result;
import ee.karl.decathlon.repository.AthleteRepository;
import ee.karl.decathlon.repository.ResultRepository;
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

    //punktisumma arvutamine
    public int getAthleteTotalPoints(Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));
        List<Result> results = resultRepository.findByAthlete(athlete);  // Query results by athlete
        return results.stream()
                .mapToInt(Result::getPoints)
                .sum();
    }

    //kõigi sportlaste punktisummad
    public List<AthleteWithPoints> getAllAthletesWithPoints() {
        List<Athlete> athletes = athleteRepository.findAll();
        return athletes.stream()
                .map(athlete -> {
                    int totalPoints = getAthleteTotalPoints(athlete.getId());
                    return new AthleteWithPoints(athlete.getId(), athlete.getName(), athlete.getCountry(), totalPoints);
                })
                .collect(Collectors.toList());
    }

    public static class AthleteWithPoints {
        private Long id;
        private String name;
        private String country;
        private int totalPoints;
        public AthleteWithPoints(Long id, String name, String country, int totalPoints) {
            this.id = id;
            this.name = name;
            this.country = country;
            this.totalPoints = totalPoints;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public int getTotalPoints() {
            return totalPoints;
        }

        public void setTotalPoints(int totalPoints) {
            this.totalPoints = totalPoints;
        }
    }
}