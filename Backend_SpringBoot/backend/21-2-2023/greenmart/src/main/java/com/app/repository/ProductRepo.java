package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.Vendor;

public interface ProductRepo extends JpaRepository<Product, Long> {
	List<Product> findByCategory(Category category);

	List<Product> findByRate(double rate);

	List<Product> findByProductName(String productname);

	public List<Product> findAll();

	public Optional<Product> findById(Long id);

	public List<Product> findByVendor(Vendor vendor);

	public List<Product> findByVendorAndCategory(Vendor v, Category c);
}
