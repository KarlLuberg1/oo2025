package ee.karl.veebipood.controller;


import ee.karl.veebipood.entity.Order;
import ee.karl.veebipood.entity.Product;
import ee.karl.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    //TODO: ei tagastaks koiki tellimusi
    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order) {
        order.setCreated(new Date());
        double sum = 0;
        for (Product p: order.getProducts()) {
            sum = sum + p.getPrice();

        }
        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }
}
