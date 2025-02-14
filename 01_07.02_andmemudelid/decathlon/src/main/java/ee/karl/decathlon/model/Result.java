package ee.karl.decathlon.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String event; //ala nimi
    private double score; // tulemus
    private int points;   //punktid pärast arvutamist
}