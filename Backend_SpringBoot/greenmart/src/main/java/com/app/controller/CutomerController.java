package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.dto.ApiResponse;
import com.app.dto.CartItemsDto;
import com.app.dto.CustomerDto;
import com.app.dto.OrderDetailsDto;
import com.app.dto.OrderDto;
import com.app.dto.ProductDto;
import com.app.service.CustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CutomerController {

	@Autowired
	private CustomerService customerService;

	public CutomerController() {
		System.out.println("inside " + getClass().getName());
	}

//	@PostMapping("/login")
//	public ResponseEntity<?> authenticateCustomer(@RequestBody LoginRequest request) {
//		System.out.println("in auth cust " + request);
//		return ResponseEntity.ok(customerService.authenticateCustomer(request.getEmail(), request.getPassword()));
//	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse> registerCustomer(@RequestBody CustomerDto customerDto) {
		boolean success = this.customerService.registerCustomer(customerDto);
		if (success) {
			return new ResponseEntity<ApiResponse>(new ApiResponse("customer registered successfully!!", true),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<ApiResponse>(new ApiResponse("customer registered Unsuccessfully!!", true),
					HttpStatus.NOT_ACCEPTABLE);
		}
	}

	// PUT - update customer
	@PutMapping("/{customerId}")
	public ResponseEntity<CustomerDto> updateCustomer(@RequestBody CustomerDto customerDto,
			@PathVariable Long customerId) {
		CustomerDto updatedCustomer = this.customerService.updateCustomer(customerDto, customerId);
		return ResponseEntity.ok(updatedCustomer);
	}

	// PUT - change password
	@PutMapping("/password/{customerId}")
	public ResponseEntity<ApiResponse> updateCustomerPassword(@RequestBody CustomerDto customerDto,
			@PathVariable Long customerId) {
		this.customerService.updateCustomerPassword(customerDto, customerId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("password changed Successfully!!", true), HttpStatus.OK);
	}

	// DELETE - delete customer
	@DeleteMapping("/{customerId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long customerId) {
		this.customerService.deleteCustomer(customerId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("customer Deleted Successfully!!", true), HttpStatus.OK);
	}

	// GET - get customer
	@GetMapping("/")
	public ResponseEntity<List<CustomerDto>> getAllUser() {
		return ResponseEntity.ok(this.customerService.getAllUsers());
	}

	// GET get customer by ID
	@GetMapping("/{customerId}")
	public ResponseEntity<CustomerDto> getUserById(@PathVariable Long customerId) {
		return ResponseEntity.ok(this.customerService.getCustomerById(customerId));
	}

	// GET - get all products
	@GetMapping("/product/")
	public ResponseEntity<List<ProductDto>> getAllProducts() {
		return ResponseEntity.ok(this.customerService.getAllProducts());
	}

	// PUT - add product to cartitems

	@PutMapping("/cart/{customerId}/prodId/{prodId}/qty/{qty}")
	public ResponseEntity<ApiResponse> addProductToCart(@PathVariable Long prodId, @PathVariable Long customerId,
			@PathVariable Integer qty) {
		this.customerService.addProductToCart(prodId, customerId, qty);
		return new ResponseEntity<ApiResponse>(new ApiResponse("customer added product in cart Successfully!!", true),
				HttpStatus.OK);

	}

	// PUT - remove cartItem from Cart
	@PutMapping("/cart/{customerId}/cartItem/{cartItemId}/")
	public ResponseEntity<ApiResponse> removeFromCart(@PathVariable Long customerId, @PathVariable Long cartItemId) {
		this.customerService.removeCartItem(customerId, cartItemId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("cart Item removed  Successfully!!", true),
				HttpStatus.OK);
	}

	// Get - view cart
	@GetMapping("/cart/{customerId}")
	public ResponseEntity<List<CartItemsDto>> showCustomerCart(@PathVariable Long customerId) {
		return ResponseEntity.ok(this.customerService.getCustomerCart(customerId));
	}

	// PUT - update cart
	@PutMapping("/cart/{cartItemId}/qty/{qty}")
	public ResponseEntity<ApiResponse> updateCustomerCart(@PathVariable Long cartItemId, @PathVariable Integer qty) {
		this.customerService.updateCustomerCart(cartItemId, qty);
		return new ResponseEntity<ApiResponse>(new ApiResponse("customer cart updated  Successfully!!", true),
				HttpStatus.OK);

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

	// put - write review by product Id ( give rating to Product)
	@PutMapping("/product/review/{customerId}/product/{productId}/rating/{rating}")
	public ResponseEntity<ApiResponse> writeReviewByProductId(@PathVariable Long customerId,
			@PathVariable Long productId, @PathVariable Integer rating) {
		this.customerService.writeReviewByProductId(customerId, productId, rating);
		return new ResponseEntity<ApiResponse>(new ApiResponse("rating added  Successfully!!", true), HttpStatus.OK);
	}

	// Put - place an order
	@PutMapping("/order/{customerId}/mode/{modeOfPayment}")
	public ResponseEntity<ApiResponse> placeAnOrder(@RequestBody List<OrderDetailsDto> orderDetails,
			@PathVariable Long customerId, @PathVariable Integer modeOfPayment) {

		boolean success = this.customerService.addOrder(orderDetails, customerId, modeOfPayment);
		if (success) {
			return new ResponseEntity<ApiResponse>(new ApiResponse("Order placed  Successfully!!", true),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<ApiResponse>(new ApiResponse("Order placed  unsuccessfull!!", true),
					HttpStatus.NOT_ACCEPTABLE);
		}

	}

	// GET - get order status ( get Order)
	@GetMapping("/order/{customerId}")
	public ResponseEntity<List<OrderDto>> getOrderStatus(@PathVariable Long customerId) {
		return ResponseEntity.ok(this.customerService.getOrders(customerId));
	}

	// GET - get order details ( get Order)
	@GetMapping("/orderdetails/{orderId}")
	public ResponseEntity<List<OrderDetailsDto>> getOrderDetails(@PathVariable Long orderId) {
		return ResponseEntity.ok(this.customerService.getOrdersDetails(orderId));
	}

	// GET - get cancelled order
	@GetMapping("/cancelorder/{customerId}")
	public ResponseEntity<List<OrderDto>> getCancelOrders(@PathVariable Long customerId) {
		return ResponseEntity.ok(this.customerService.getCancelOrders(customerId));
	}

	// PUT - cancel order
	@PutMapping("/cancelorder/{customerId}/orderid/{orderId}")
	public ResponseEntity<ApiResponse> cancelOrder(@PathVariable Long customerId, @PathVariable Long orderId) {
		this.customerService.cancelOrder(customerId, orderId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Order cancelled  Successfully!!", true), HttpStatus.OK);
	}

	// GET - get Product by ID
	@GetMapping("/product/prodID/{prodId}")
	public ResponseEntity<ProductDto> getProductById(@PathVariable Long prodId) {
		return ResponseEntity.ok(this.customerService.getProductById(prodId));
	}
}
