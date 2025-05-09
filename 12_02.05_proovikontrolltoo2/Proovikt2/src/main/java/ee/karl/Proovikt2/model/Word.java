package ee.karl.Proovikt2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeID;

    private String type;
    private String description;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    @JsonBackReference
    private Admin admin;
}
