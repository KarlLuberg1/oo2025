package ee.karl.kiirused.controller;

import ee.karl.kiirused.entity.SpeedEntity;
import ee.karl.kiirused.entity.SpeedMphEntity;
import ee.karl.kiirused.repository.SpeedRepository;
import ee.karl.kiirused.repository.SpeedMphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.OptionalDouble;

@RestController
@RequestMapping("/speed")
public class SpeedController {
    private final SpeedRepository speedRepository;
    private final SpeedMphRepository speedMphRepository;

    @Autowired
    public SpeedController(SpeedRepository speedRepository, SpeedMphRepository speedMphRepository) {
        this.speedRepository = speedRepository;
        this.speedMphRepository = speedMphRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSpeed(@RequestBody SpeedEntity speedEntity) {
        if (speedEntity.getSpeed() == null) {
            return ResponseEntity.badRequest().body("speed cannot be null");
        }
        if (speedEntity.getSpeed() < 0) {
            return ResponseEntity.badRequest().body("speed cannot be lower than zero");
        }
        return ResponseEntity.ok(speedRepository.save(speedEntity));
    }

    @GetMapping("/all")
    public List<SpeedEntity> getAllSpeeds() {
        return speedRepository.findAll();
    }

    private static final double KMH_TO_MPH = 0.621371;
    @PostMapping("/convert")
    public ResponseEntity<?> convertAndStoreSpeedsInMph() {
        List<SpeedEntity> speeds = speedRepository.findAll();
        List<SpeedMphEntity> mphSpeeds = speeds.stream()
                .map(speed -> new SpeedMphEntity(null, speed.getSpeed() * KMH_TO_MPH))
                .toList();
        speedMphRepository.saveAll(mphSpeeds);
        return ResponseEntity.ok("converted kmh to mph");
    }

    @GetMapping("/allmph")
    public List<SpeedMphEntity> getAllSpeedsInMph() {
        return speedMphRepository.findAll();
    }

    @PutMapping("/increaseby1")
    public ResponseEntity<?> increaseAllSpeeds() {

        //suurendab kmh yhe vorra
        List<SpeedEntity> updatedSpeeds = speedRepository.findAll().stream()
                .peek(speed -> speed.setSpeed(speed.getSpeed() + 1))
                .toList();
        speedRepository.saveAll(updatedSpeeds);

        //suurendab mph yhe vorra
        List<SpeedMphEntity> updatedSpeedsMph = speedMphRepository.findAll().stream()
                .peek(speedMph -> speedMph.setSpeedMph(speedMph.getSpeedMph() + 1))
                .toList();
        speedMphRepository.saveAll(updatedSpeedsMph);
        return ResponseEntity.ok("all speeds increasd by 1");
    }
}