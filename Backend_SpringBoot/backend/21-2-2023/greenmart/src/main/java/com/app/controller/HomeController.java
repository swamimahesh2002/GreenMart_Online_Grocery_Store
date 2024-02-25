package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductDto;
import com.app.service.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/")
public class HomeController {

	@Autowired
	private CustomerService customerService;

	// GET - get all products
	@GetMapping("/product/")
	public ResponseEntity<List<ProductDto>> getAllProducts() {
		return ResponseEntity.ok(this.customerService.getAllProducts());
	}

	// GET - getProduct by category
	@GetMapping("/product/{categoryId}")
	public ResponseEntity<List<ProductDto>> getProductByCategory(@PathVariable Long categoryId) {
		return ResponseEntity.ok(this.customerService.getProduct(categoryId));
	}

	// GET - getProduct by rate
	@GetMapping("/product/rate")
	public ResponseEntity<List<ProductDto>> getProductByRate() {
		return ResponseEntity.ok(this.customerService.getProductByRate());
	}

	// GET - getProduct by name
	@GetMapping("/product/name/{name}")
	public ResponseEntity<List<ProductDto>> getProductByName(@PathVariable String name) {
		return ResponseEntity.ok(this.customerService.getProductByName(name));
	}

	// Get - get product by review ( sort by review )
	@GetMapping("/product/review")
	public ResponseEntity<List<ProductDto>> getProductByReview() {
		return ResponseEntity.ok(this.customerService.getProductByReview());
	}
}
