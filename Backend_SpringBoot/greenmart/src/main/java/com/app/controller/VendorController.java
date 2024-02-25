package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductDto;
import com.app.dto.VendorDto;
import com.app.dto.VendorEarningDto;
import com.app.pojos.Product;
import com.app.service.VendorService;

@CrossOrigin
@RestController
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	VendorService venService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("/{id}")
	public ResponseEntity<VendorDto> getVendorById(@PathVariable Long id) {
		return ResponseEntity.ok(modelMapper.map(venService.fetchVendorById(id), VendorDto.class));
	}

	@PostMapping("/register")
	public void registerVendor(@RequestBody VendorDto venDto) {
		venService.addVendor(venDto);
	}

	@PostMapping("/update/{id}")
	public void updateProfile(@RequestBody VendorDto venDto, @PathVariable Long id) {
		venService.modifyProfile(venDto, id);
	}

	@PostMapping("/changep/{id}")
	public void changePassword(@RequestBody VendorDto venDto, @PathVariable Long id) {
		venService.modifyPassword(venDto, id);
	}

	@GetMapping("/delete/{id}")
	public void deleteProfile(@PathVariable Long id) {
		venService.removeProfile(id);
	}

	// show approved products
	// Expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/products/approved/{id}")
	public ResponseEntity<List<ProductDto>> getApprovedProducts(@PathVariable Long id) {
		List<Product> products = venService.fetchApprovedProducts(id);
		return ResponseEntity
				.ok(products.stream().map(p -> modelMapper.map(p, ProductDto.class)).collect(Collectors.toList()));
	}

	// show not approved products
	// Expired = FALSE, inStock = TRUE/FALSE, isAvailable = FALSE
	@GetMapping("/products/not-approved/{id}")
	public ResponseEntity<List<ProductDto>> getNotApprovedProducts(@PathVariable Long id) {
		List<Product> products = venService.fetchNotApprovedProducts(id);
		return ResponseEntity
				.ok(products.stream().map(p -> modelMapper.map(p, ProductDto.class)).collect(Collectors.toList()));
	}

	// show expired products
	// Expired = TRUE, inStock = TRUE/FALSE, isAvailable = FALSE
	@GetMapping("/products/expired/{id}")
	public ResponseEntity<List<ProductDto>> getExpiredProducts(@PathVariable Long id) {
		List<Product> products = venService.fetchExpiredProducts(id);
		return ResponseEntity
				.ok(products.stream().map(p -> modelMapper.map(p, ProductDto.class)).collect(Collectors.toList()));
	}

	// show approved products
	// Expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/productsbycat/{catId}/{id}")
	public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable Long catId, @PathVariable Long id) {
		List<Product> products = venService.fetchProductsByCategory(catId, id);
		return ResponseEntity
				.ok(products.stream().map(p -> modelMapper.map(p, ProductDto.class)).collect(Collectors.toList()));
	}

	// show approved products
	// Expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/productsbyrating/{id}")
	public ResponseEntity<List<ProductDto>> getProductsByRating(@PathVariable Long id) {
		List<Product> products = venService.fetchProductsByRating(id);
		return ResponseEntity
				.ok(products.stream().map(p -> modelMapper.map(p, ProductDto.class)).collect(Collectors.toList()));
	}

	// add product
	@PostMapping("/add-product={catId}/{id}")
	public void addProduct(@RequestBody ProductDto prodDto, @PathVariable Long catId, @PathVariable Long id) {
		System.out.println(prodDto.getProductName());
		venService.insertProduct(prodDto, catId, id);
	}

	// update product
	@PutMapping("/update-product={catId}/{id}")
	public void updateProduct(@RequestBody ProductDto prodDto, @PathVariable Long catId, @PathVariable Long id) {
		venService.modifyProduct(prodDto, catId, id);
	}

	// delete product => remove from tables;
	@DeleteMapping("/products/delete/{id}")
	public void deleteProduct(@PathVariable Long id) {
		venService.removeProduct(id);
	}

	// get daily revenue details by vendor id
	@GetMapping("/revenue/{id}")
	public ResponseEntity<List<VendorEarningDto>> getDailyRevenueDetails(@PathVariable Long id) {
		return ResponseEntity.ok(venService.fetchDailyVendorEarnings(id).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

	// get monthly revenue details by vendor id
	@GetMapping("/revenue/{id}/month={num}")
	public ResponseEntity<List<VendorEarningDto>> getMonthlyRevenueDetails(@PathVariable Long id,
			@PathVariable int num) {
		return ResponseEntity.ok(venService.fetchMonthlyVendorEarnings(id, num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

	// get yearly revenue details by vendor id
	@GetMapping("/revenue/{id}/yearly={num}")
	public ResponseEntity<List<VendorEarningDto>> getYearlyRevenueDetails(@PathVariable Long id,
			@PathVariable int num) {
		return ResponseEntity.ok(venService.fetchYearlyVendorEarnings(id, num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

}
