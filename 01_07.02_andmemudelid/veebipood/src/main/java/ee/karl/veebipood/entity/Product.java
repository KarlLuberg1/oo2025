package ee.karl.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Hibernate
// automaatselt tekib andmebaasi tabel mis on klassi nimega

//File settings plugins
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image; //.jpg
    private boolean active;

    // @ManyToMany, @ManyToOne, @OneToOne - (ntx user ja tema contact andmed), @OneToMany

    @ManyToOne
    private Category category;



    //public void setPrice(double price) {
    //    this.price = price;
    //   System.out.print("muudeti hinda")
    //}
}
