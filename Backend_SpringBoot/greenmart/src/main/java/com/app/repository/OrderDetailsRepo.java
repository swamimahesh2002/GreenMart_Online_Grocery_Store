package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.Product;
import com.app.pojos.Vendor;

@Repository
public interface OrderDetailsRepo extends JpaRepository<OrderDetail, Long> {

	List<OrderDetail> findByOrder(Order order);

	public List<OrderDetail> findByProduct(Product product);

	public List<OrderDetail> findByVendor(Vendor vendor);
}
