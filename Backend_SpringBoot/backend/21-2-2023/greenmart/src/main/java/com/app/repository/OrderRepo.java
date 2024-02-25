package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Customer;
import com.app.pojos.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findByCustomer(Customer customer);
}
