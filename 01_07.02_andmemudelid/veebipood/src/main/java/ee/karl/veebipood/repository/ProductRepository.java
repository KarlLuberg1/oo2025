package ee.karl.veebipood.repository;

import ee.karl.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
