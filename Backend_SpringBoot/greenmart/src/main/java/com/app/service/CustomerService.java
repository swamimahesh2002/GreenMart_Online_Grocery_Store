package com.app.service;

import java.util.List;

import com.app.dto.CartItemsDto;
import com.app.dto.CustomerDto;
import com.app.dto.OrderDetailsDto;
import com.app.dto.OrderDto;
import com.app.dto.ProductDto;

public interface CustomerService {

//	LoginResponse authenticateCustomer(String email, String pwd);

	CustomerDto updateCustomer(CustomerDto customerDto, Long CustomerId);

	void updateCustomerPassword(CustomerDto customerDto, Long CustomerId);

	void deleteCustomer(Long customerId);

	List<CustomerDto> getAllUsers();

	CustomerDto getCustomerById(Long customerId);

	List<ProductDto> getAllProducts();

	ProductDto addProductToCart(Long prodId, Long customerId, Integer qty);

	List<CartItemsDto> getCustomerCart(Long customerId);

	void updateCustomerCart(Long cartItemId, Integer qty);

	List<ProductDto> getProduct(Long categoryId);

	List<ProductDto> getProductByRate();

	List<ProductDto> getProductByName(String name);

	List<ProductDto> getProductByReview();

	void writeReviewByProductId(Long customerId, Long productId, Integer rating);

	boolean addOrder(List<OrderDetailsDto> orderDetails, Long customerId, Integer modeOfPayment);

	List<OrderDto> getOrders(Long customerId);

	List<OrderDetailsDto> getOrdersDetails(Long orderId);

	List<OrderDto> getCancelOrders(Long customerId);

	boolean registerCustomer(CustomerDto customerDto);

	void cancelOrder(Long customerId, Long orderId);

	void removeCartItem(Long customerId, Long cartItemId);

	ProductDto getProductById(Long prodId);
}
