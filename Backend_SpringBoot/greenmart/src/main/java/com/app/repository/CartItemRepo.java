package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.CartItems;
import com.app.pojos.CustomerCart;

@Repository
public interface CartItemRepo extends JpaRepository<CartItems, Long> {

	List<CartItems> findByCart(CustomerCart cart);
}
