package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
	Optional<Customer> findByEmailAndPassword(String email, String pwd);

	Optional<Customer> findByEmail(String email);
}
