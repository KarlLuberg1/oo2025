package ee.karl.decathlon.service;

import ee.karl.decathlon.model.Athlete;
import ee.karl.decathlon.model.Result;
import ee.karl.decathlon.repository.AthleteRepository;
import ee.karl.decathlon.repository.ResultRepository;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        if (athlete.getId() == null) {
            // Kui ID puudub, loob uue
            return athleteRepository.save(athlete);
        } else {
            // Kui ID olemas, kontrollib kas sportlane olemas ja uuendab
            Athlete existingAthlete = athleteRepository.findById(athlete.getId())
                    .orElseThrow(() -> new RuntimeException("Athlete not found with ID: " + athlete.getId()));

            existingAthlete.setName(athlete.getName());
            existingAthlete.setAge(athlete.getAge());
            existingAthlete.setCountry(athlete.getCountry());

            return athleteRepository.save(existingAthlete);
        }
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

    public void deleteAthlete(Long id) {
        athleteRepository.deleteById(id);
    }

    //sportlane koos tema punktidega
    @Data
    public static class AthleteWithPoints {
        private final Long id;
        private final String name;
        private final String country;
        private final int totalPoints;
    }

    //pagineerimine
    public Page<Athlete> getAllAthletesPaged(Pageable pageable) {
        return athleteRepository.findAll(pageable);
    }

    public Page<Athlete> getAthletesByCountry(String country, Pageable pageable) {
        return athleteRepository.findByCountry(country, pageable);
    }
}