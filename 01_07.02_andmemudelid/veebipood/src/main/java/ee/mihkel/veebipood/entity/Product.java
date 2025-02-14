package ee.mihkel.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Hibernate
// automaatselt tekib andmebaasi tabel mis on klassi nimega

// File -> Settings -> Plugins -> JPA Buddy -> Install

// boolean

// String
// char

// Long ->
// int -> 2.1miljardit
// short -> 128
// byte -> 32

// float -> . 8 kohta
// double -> . 16 kohta

@Getter
@Setter // encapsulation
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image; // .jpg
    private boolean active;

//    public void setPrice(double price) {
//        this.price = price;
//        System.out.println("Kasutaja xxx muutis hinda. ID: " + this.id);
//    }
}
