package ee.karl.decathlon.service;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.repository.AthleteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AthleteService {
    private final AthleteRepository athleteRepository;

    public AthleteService(AthleteRepository athleteRepository) {
        this.athleteRepository = athleteRepository;
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
}