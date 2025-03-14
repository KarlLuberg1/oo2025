package ee.karl.veebipood.controller;


import ee.karl.veebipood.entity.Person;
import ee.karl.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController //annab voimaluse api paringuid vastu votta
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    //TODO: peab saatma emaili ja parooli, muid väljasid ei küsi
    //TODO: tagastada korralik mudel front endile, mitte boolean
    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getId() == null) {
            throw new RuntimeException("ERROR_ID_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
       Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        if (dbPerson.getPassword().equals(person.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    //TODO: ei tagasta pärast signupi listi inimestest
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        if (person.getEmail().isBlank()) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        return personRepository.findAll();
    }
}
