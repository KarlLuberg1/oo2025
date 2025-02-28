package ee.karl.proovikt.controller;

import ee.karl.proovikt.entity.NumberEntity;
import ee.karl.proovikt.repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/numbers")
public class NumberController {

    @Autowired
    private NumberRepository numberRepository;

    //uue numbri lisamine
    @PostMapping
    public NumberEntity addNumber(@RequestBody NumberEntity number) {
        return numberRepository.save(number);
    }

    @GetMapping
    public List<NumberEntity> getAllNumbers() {
        return numberRepository.findAll();
    }

    @GetMapping("/sum")
    public int getSumOfNumbers() {
        return numberRepository.findAll().stream()
                .mapToInt(NumberEntity::getValue)
                .sum();

    }

    @GetMapping("/average")
    public double getAverageOfNumbers() {
        List<NumberEntity> numbers = numberRepository.findAll();
        return numbers.isEmpty() ? 0.0 :
                numbers.stream().mapToInt(NumberEntity::getValue).average().orElse(0.0);
    }

    @GetMapping("/max")
    public int getMaxNumber() {
        return numberRepository.findAll().stream()
                .mapToInt(NumberEntity::getValue)
                .max()
                .orElse(0);
    }

    @GetMapping("/sliding_average")
    public List<Double> getSlidingAverage() {
        List<NumberEntity> numbers = numberRepository.findAll();
        List<Double> slidingAverages = new ArrayList<>();
        IntStream.range(0, numbers.size() - 2)
                .forEach(i -> slidingAverages.add(
                        (numbers.get(i).getValue() + numbers.get(i + 1).getValue() + numbers.get(i + 2).getValue()) / 3.0));
        return slidingAverages;
    }



}