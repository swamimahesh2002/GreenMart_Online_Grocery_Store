package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerDto;
import com.app.dto.OrderDetailsDto;
import com.app.dto.OrderDto;
import com.app.dto.ProductDto;
import com.app.dto.VendorDto;
import com.app.dto.VendorEarningDto;
import com.app.pojos.Customer;
import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.Product;
import com.app.pojos.Vendor;
import com.app.service.AdminService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private ModelMapper modelMapper;

	// login method
//	@PostMapping("/login")
//	public ResponseEntity<?> authenticate(@RequestBody LoginRequest request) {
//		System.out.println(request);
//		return ResponseEntity.ok(adminService.authenticateAdmin(request.getEmail(), request.getPassword()));
//	}

	// get all not expired products (include products with quantity 0)
	// expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/products")
	public ResponseEntity<List<ProductDto>> getProducts() {
		List<Product> products = adminService.fetchProducts();
		return ResponseEntity.ok(
				products.stream().map(p -> modelMapper.map(products, ProductDto.class)).collect(Collectors.toList()));
	}

	// get product by id
	@GetMapping("/products/{id}")
	public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
		Product product = adminService.fetchProductById(id);
		// String productName, double rate, int discount, String productDescription,
		// String image,
		// LocalDate expiryDate, int productQuantity, double averageRating
		return ResponseEntity.ok(modelMapper.map(product, ProductDto.class));
	}

	// get not expired products from specific category (include products with
	// quantity 0)
	// expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/products/category={catId}")
	public ResponseEntity<List<ProductDto>> getProductByCategory(@PathVariable Long catId) {
		List<Product> products = adminService.fetchProductByCategory(catId);
		return ResponseEntity.ok(
				products.stream().map(p -> modelMapper.map(products, ProductDto.class)).collect(Collectors.toList()));
	}

	// get not expired products by specific vendor (include products with quantity
	// 0)
	// expired = FALSE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/products/vendor={venId}")
	public ResponseEntity<List<ProductDto>> getProductByVendor(@PathVariable Long venId) {
		List<Product> products = adminService.fetchProductByVendor(venId);
		return ResponseEntity.ok(
				products.stream().map(p -> modelMapper.map(products, ProductDto.class)).collect(Collectors.toList()));
	}

	// get not expired in stock products
	// expired = FALSE, inStock = TRUE, isAvailable = FALSE
	@GetMapping("/products/new")
	public ResponseEntity<List<ProductDto>> getNewProducts() {
		List<Product> products = adminService.fetchNewProducts();
		return ResponseEntity.ok(
				products.stream().map(p -> modelMapper.map(products, ProductDto.class)).collect(Collectors.toList()));
	}

	// get expired products
	// expired = TRUE, inStock = TRUE/FALSE, isAvailable = TRUE
	@GetMapping("/products/expired")
	public ResponseEntity<List<ProductDto>> getExpiredProducts() {
		List<Product> products = adminService.fetchExpiredProducts();
		return ResponseEntity.ok(
				products.stream().map(p -> modelMapper.map(products, ProductDto.class)).collect(Collectors.toList()));
	}

	// add product by id => change isAvailable = true
	@PutMapping("/products/add={id}")
	public void addProduct(@PathVariable Long id) {
		adminService.insertProduct(id);
	}

	// update product by product id => discount only
	@PutMapping("/products/update={id}/{disc}")
	public void updateProduct(@PathVariable Long id, @PathVariable int disc) {
		adminService.modifyProduct(id, disc);
	}

	// delete product by id => change isAvailable = false
	@PutMapping("/products/delete={id}")
	public void deleteProduct(@PathVariable Long id) {
		adminService.removeProduct(id);
	}

	// get all vendors
	@GetMapping("/vendors")
	public ResponseEntity<List<VendorDto>> getVendors() {
		List<Vendor> vendors = adminService.fetchVendors();
		return ResponseEntity.ok(vendors.stream().map(v -> new VendorDto(v.getFirstName(), v.getLastName(),
				v.getEmail(), v.getUserRole(), v.getMobNo(), v.getAddress())).collect(Collectors.toList()));
	}

	// get vendor by id
	@GetMapping("/vendors/{id}")
	public ResponseEntity<VendorDto> getVendorById(@PathVariable Long id) {
		Vendor v = adminService.fetchVendorById(id);
		return ResponseEntity.ok(new VendorDto(v.getFirstName(), v.getLastName(), v.getEmail(), v.getUserRole(),
				v.getMobNo(), v.getAddress()));
	}

	// add vendor => isAuthenticate=true
	@PutMapping("/vendors/add={id}")
	public void addVendor(@PathVariable Long id) {
		adminService.insertVendor(id);
	}

	// delete vendor => isAuthenticate=false
	@PutMapping("/vendors/delete={id}")
	public void deleteVendor(@PathVariable Long id) {
		adminService.removeVendor(id);
	}

	// get all customers
	@GetMapping("/customers")
	public ResponseEntity<List<CustomerDto>> getCustomers() {
		List<Customer> customers = adminService.fetchCustomers();
		return ResponseEntity.ok(customers.stream().map(
				c -> new CustomerDto(c.getFirstName(), c.getLastName(), c.getEmail(), c.getMobNo(), c.getAddress()))
				.collect(Collectors.toList()));
	}

	// get customer by id
	@GetMapping("/customers/{id}")
	public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id) {
		Customer customer = adminService.fetchCustomerById(id);
		return ResponseEntity.ok(new CustomerDto(customer.getFirstName(), customer.getLastName(), customer.getEmail(),
				customer.getMobNo(), customer.getAddress()));
	}

	// delete customer
	@GetMapping("/customers/delete={id}")
	public void deleteCustomer(@PathVariable Long id) {
		adminService.removeCustomer(id);
	}

	// get delivered orders
	@GetMapping("/orders")
	public ResponseEntity<List<OrderDto>> getOrders() {
		List<Order> orders = adminService.fetchOrders();
		return ResponseEntity.ok(orders.stream()
				.map(o -> new OrderDto(o.getOrderDate(), o.getDeliveryDate(), o.getOrderStatus(), o.getModeOfPayment()))
				.collect(Collectors.toList()));
	}

	// get pending orders
	@GetMapping("/orders/pending")
	public ResponseEntity<List<OrderDto>> getPendingOrders() {
		List<Order> orders = adminService.fetchPendingOrders();
		return ResponseEntity.ok(orders.stream()
				.map(o -> new OrderDto(o.getOrderDate(), o.getDeliveryDate(), o.getOrderStatus(), o.getModeOfPayment()))
				.collect(Collectors.toList()));
	}

	// get cancelled orders
	@GetMapping("/orders/cancelled")
	public ResponseEntity<List<OrderDto>> getCancelledOrders() {
		List<Order> orders = adminService.fetchCancelledOrders();
		return ResponseEntity.ok(orders.stream()
				.map(o -> new OrderDto(o.getOrderDate(), o.getDeliveryDate(), o.getOrderStatus(), o.getModeOfPayment()))
				.collect(Collectors.toList()));
	}

	// get orders (all) of particular customer
	@GetMapping("/orders/{id}")
	public ResponseEntity<List<OrderDto>> getOrdersByCustomer(@PathVariable Long id) {
		List<Order> orders = adminService.fetchOrdersByCustomer(id);
		return ResponseEntity.ok(orders.stream()
				.map(o -> new OrderDto(o.getOrderDate(), o.getDeliveryDate(), o.getOrderStatus(), o.getModeOfPayment()))
				.collect(Collectors.toList()));
	}

	// get orders (all) of particular vendor
	@GetMapping("/orders/vendor={id}")
	public ResponseEntity<List<OrderDetailsDto>> getOrdersByVendor(@PathVariable Long id) {
		List<OrderDetail> orderDetails = adminService.fetchOrderDetailsByVendor(id);
		return ResponseEntity
				.ok(orderDetails.stream().map(o -> new OrderDetailsDto(o.getQuantity(), o.getProduct(), o.getVendor()))
						.collect(Collectors.toList()));
	}

	// get orders (all) by product id
	@GetMapping("/orders/product={id}")
	public ResponseEntity<List<OrderDetailsDto>> getOrdersByProduct(@PathVariable Long id) {
		List<OrderDetail> orderDetails = adminService.fetchOrderDetailsByProduct(id);
		return ResponseEntity
				.ok(orderDetails.stream().map(o -> new OrderDetailsDto(o.getQuantity(), o.getProduct(), o.getVendor()))
						.collect(Collectors.toList()));
	}

	// get orders(all) by category id
	@GetMapping("/orders/category={id}")
	public ResponseEntity<List<OrderDetailsDto>> getOrdersByCategory(@PathVariable Long id) {
		List<OrderDetail> orderDetails = adminService.fetchOrderDetailsByCategory(id);
		return ResponseEntity
				.ok(orderDetails.stream().map(o -> new OrderDetailsDto(o.getQuantity(), o.getProduct(), o.getVendor()))
						.collect(Collectors.toList()));
	}

	// get daily revenue details by vendor id
	@GetMapping("/revenue/{id}")
	public ResponseEntity<List<VendorEarningDto>> getVendorDailyRevenueDetails(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.fetchVendorDailyVendorEarnings(id).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

	// get monthly revenue details by vendor id
	@GetMapping("/revenue/{id}/month={num}")
	public ResponseEntity<List<VendorEarningDto>> getVendorMonthlyRevenueDetails(@PathVariable Long id,
			@PathVariable int num) {
		return ResponseEntity.ok(adminService.fetchVendorMonthlyVendorEarnings(id, num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

	// get yearly revenue details by vendor id
	@GetMapping("/revenue/{id}/yearly={num}")
	public ResponseEntity<List<VendorEarningDto>> getVendorYearlyRevenueDetails(@PathVariable Long id,
			@PathVariable int num) {
		return ResponseEntity.ok(adminService.fetchVendorYearlyVendorEarnings(id, num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount())).collect(Collectors.toList()));
	}

	// get daily revenue details of admin
	@GetMapping("/revenue")
	public ResponseEntity<List<VendorEarningDto>> getDailyRevenueDetails() {
		return ResponseEntity.ok(adminService.fetchDailyVendorEarnings().stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount() * 0.05)).collect(Collectors.toList()));
	}

	// get monthly revenue details of admin
	@GetMapping("/revenue/month={num}")
	public ResponseEntity<List<VendorEarningDto>> getMonthlyRevenueDetails(@PathVariable int num) {
		return ResponseEntity.ok(adminService.fetchMonthlyVendorEarnings(num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount() * 0.05)).collect(Collectors.toList()));
	}

	// get yearly revenue details of admin
	@GetMapping("/revenue/yearly={num}")
	public ResponseEntity<List<VendorEarningDto>> getYearlyRevenueDetails(@PathVariable int num) {
		return ResponseEntity.ok(adminService.fetchYearlyVendorEarnings(num).stream()
				.map(v -> new VendorEarningDto(v.getDate(), v.getAmount() * 0.05)).collect(Collectors.toList()));
	}
}
