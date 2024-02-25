package com.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.CartItemsDto;
import com.app.dto.CustomerDto;
import com.app.dto.OrderDetailsDto;
import com.app.dto.OrderDto;
import com.app.dto.ProductDto;
import com.app.exceptions.ResourceNotFoundException;
import com.app.exceptions.UsernameNotFoundException;
import com.app.pojos.AppUser;
import com.app.pojos.CartItems;
import com.app.pojos.Category;
import com.app.pojos.Customer;
import com.app.pojos.CustomerCart;
import com.app.pojos.ModeOfPayment;
import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.OrderStatus;
import com.app.pojos.Product;
import com.app.pojos.Review;
import com.app.pojos.Role;
import com.app.pojos.Vendor;
import com.app.repository.AppUserRepo;
import com.app.repository.CartItemRepo;
import com.app.repository.CategoryRepo;
import com.app.repository.CustomerCartRepo;
import com.app.repository.CustomerRepo;
import com.app.repository.OrderDetailsRepo;
import com.app.repository.OrderRepo;
import com.app.repository.ProductRepo;
import com.app.repository.ReviewRepo;
import com.app.repository.VendorRepo;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private CustomerCartRepo cartRepo;

	@Autowired
	private CartItemRepo cartItemepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private ReviewRepo reviewRepo;

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private OrderDetailsRepo orderDetailsRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private VendorRepo vendorRepo;

	@Autowired
	private AppUserRepo appUserRepo;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
//	private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

//	@Override
//	public LoginResponse authenticateCustomer(String email, String pwd) {
//
//		Customer customer = customerRepo.findByEmailAndPassword(email, pwd)
//				.orElseThrow(() -> new RuntimeException("Auth Failed"));
//		return new LoginResponse(customer.getId(), customer.getFirstName());
//	}

	@Override
	public CustomerDto updateCustomer(CustomerDto customerDto, Long customerId) {
		Customer customerToBeUpdated = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
		customerToBeUpdated.setFirstName(customerDto.getFirstName());
		customerToBeUpdated.setLastName(customerDto.getLastName());
		customerToBeUpdated.setEmail(customerDto.getEmail());
		customerToBeUpdated.setAddress(customerDto.getAddress());
		customerToBeUpdated.setMobNo(customerDto.getMobNo());
		this.customerRepo.save(customerToBeUpdated);

		return this.customerToCustomerDto(customerToBeUpdated);
	}

	@Override
	public void updateCustomerPassword(CustomerDto customerDto, Long customerId) {
		Customer customerToBeUpdated = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
		customerToBeUpdated.setPassword(customerDto.getPassword());
		AppUser appUser = appUserRepo.findByEmail(customerToBeUpdated.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User", " id ", customerId));
		String encodedPassword = bCryptPasswordEncoder.encode(customerDto.getPassword());
		appUser.setPassword(encodedPassword);
		appUserRepo.save(appUser);
		this.customerRepo.save(customerToBeUpdated);

	}

	private Customer dtoToCustomer(CustomerDto customerDto) {
		Customer customer = new Customer();
		customer.setId(customerDto.getId());
		customer.setFirstName(customerDto.getFirstName());
		customer.setLastName(customerDto.getLastName());
		customer.setEmail(customerDto.getEmail());
		customer.setPassword(customerDto.getPassword());
		customer.setMobNo(customerDto.getMobNo());
		customer.setAddress(customerDto.getAddress());
		return customer;
	}

	private CustomerDto customerToCustomerDto(Customer customer) {
		CustomerDto customerDto = new CustomerDto();
		customerDto.setId(customer.getId());
		customerDto.setFirstName(customer.getFirstName());
		customerDto.setLastName(customer.getLastName());
		customerDto.setEmail(customer.getEmail());
		customerDto.setPassword(customer.getPassword());
		customerDto.setMobNo(customer.getMobNo());
		customerDto.setAddress(customer.getAddress());
		return customerDto;
	}

	@Override
	public void deleteCustomer(Long customerId) {
		Customer customerToBeDeleted = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		customerToBeDeleted.setAuthenticated(false);

		AppUser appUser = this.appUserRepo.findByEmail(customerToBeDeleted.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException(" email "));

		appUserRepo.delete(appUser);

	}

	@Override
	public List<CustomerDto> getAllUsers() {
		List<Customer> customers = this.customerRepo.findAll();
		List<CustomerDto> customerDtos = customers.stream().map(customer -> this.customerToCustomerDto(customer))
				.collect(Collectors.toList());
		return customerDtos;

	}

	@Override
	public CustomerDto getCustomerById(Long customerId) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		return this.customerToCustomerDto(customer);
	}

	@Override
	public List<ProductDto> getAllProducts() {
		List<Product> products = productRepo.findAll();
		List<ProductDto> productdtos = products.stream().map(p -> this.ProductTodto(p))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		return productdtos;
	}

	private Product dtoToProduct(ProductDto productDto) {
		Product product = new Product();
		product.setProductName(productDto.getProductName());
		product.setRate(productDto.getRate());
		product.setDiscount(productDto.getDiscount());
		product.setProductDescription(productDto.getProductDescription());
		product.setImage(productDto.getImage());
		product.setExpiryDate(productDto.getExpiryDate());
		product.setProductQuantity(productDto.getProductQuantity());
		product.setAverageRating(productDto.getAverageRating());
		product.setAvailable(productDto.isAvailable());
		return product;
	}

	private ProductDto ProductTodto(Product product) {
		ProductDto productdto = new ProductDto();
		productdto.setId(product.getId());
		productdto.setProductName(product.getProductName());
		productdto.setRate(product.getRate());
		productdto.setDiscount(product.getDiscount());
		productdto.setProductDescription(product.getProductDescription());
		productdto.setImage(product.getImage());
		productdto.setExpiryDate(product.getExpiryDate());
		productdto.setProductQuantity(product.getProductQuantity());
		productdto.setAverageRating(product.getAverageRating());
		productdto.setAvailable(product.isAvailable());
		return productdto;
	}

//add method to add product in cartitem and add

	@Override
	public ProductDto addProductToCart(Long prodId, Long customerId, Integer qty) {
		boolean allReadyInCart = false;
		int newQuantity = 0;
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		Product product = this.productRepo.findById(prodId)
				.orElseThrow(() -> new ResourceNotFoundException("product", " id ", customerId));

		CustomerCart cart = this.cartRepo.findByCustomer(customer);

		List<CartItems> cartItems = cart.getCartItems();

		for (int i = 0; i < cartItems.size(); i++) {
			if (cartItems.get(i).getProduct().getId() == prodId) {
				newQuantity = cartItems.get(i).getQty() + qty;
				allReadyInCart = true;
				cartItems.get(i).setQty(newQuantity);
			}
		}

		if (!allReadyInCart) {
			CartItems cartItem = new CartItems();
			cartItem.setProduct(product);
			cartItem.setCart(customer.getCart());
			cartItem.setQty(qty);
			this.cartItemepo.save(cartItem);
		}
		if (allReadyInCart) {
			this.cartItemepo.saveAll(cartItems);
		}

		return this.ProductTodto(product);
	}

	@Override
	public List<CartItemsDto> getCustomerCart(Long customerId) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		CustomerCart cart = customer.getCart();

		List<CartItems> cartItems = cart.getCartItems();
		List<CartItemsDto> cartItemsDtos = cartItems.stream().map(c -> this.cartItemsToCartItemsDto(c))
				.collect(Collectors.toList());
		return cartItemsDtos;
	}

	private CartItemsDto cartItemsToCartItemsDto(CartItems cartItems) {
		CartItemsDto cartItemsDto = new CartItemsDto();
		cartItemsDto.setId(cartItems.getId());
		cartItemsDto.setProduct(cartItems.getProduct());
		cartItemsDto.setQty(cartItems.getQty());
		return cartItemsDto;
	}

	@Override
	public void updateCustomerCart(Long cartId, Integer qty) {
		if (qty == 0) {
			cartItemepo.delete(cartItemepo.findById(cartId)
					.orElseThrow(() -> new ResourceNotFoundException("Cart", " id ", cartId)));
		} else {
			CartItems cartItems = cartItemepo.findById(cartId)
					.orElseThrow(() -> new ResourceNotFoundException("Cart", " id ", cartId));
			cartItems.setQty(qty);
			this.cartItemepo.save(cartItems);
		}

	}

	@Override
	public List<ProductDto> getProduct(Long categoryId) {
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("category", " id ", categoryId));
		List<Product> products = this.productRepo.findByCategory(category);
		List<ProductDto> productDtos = products.stream().map(p -> this.ProductTodto(p))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		return productDtos;
	}

	@Override
	public List<ProductDto> getProductByRate() {
		List<Product> products = this.productRepo.findAll();
		List<ProductDto> productDtos = products.stream().sorted(Comparator.comparingDouble(Product::getRate).reversed())
				.map(p -> this.ProductTodto(p)).filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		return productDtos;
	}

	@Override
	public List<ProductDto> getProductByName(String name) {
		List<Product> products = this.productRepo.findByProductName(name);
		List<ProductDto> productDtos = products.stream().map(p -> this.ProductTodto(p))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		return productDtos;

	}

	@Override
	public List<ProductDto> getProductByReview() {
		List<Product> products = this.productRepo.findAll();
		products = products.stream().sorted(Comparator.comparingDouble(Product::getAverageRating).reversed())
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		List<ProductDto> productDtos = products.stream().map(p -> this.ProductTodto(p))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
		return productDtos;
	}

	@Override
	public void writeReviewByProductId(Long customerId, Long productId, Integer rating) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
		Product product = this.productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", " id ", productId));
		Review review = new Review();
		review.setCustomer(customer);
		review.setProduct(product);
		review.setRating(rating);

		this.reviewRepo.save(review);
	}

//	@Override
//	public boolean addOrder(List<OrderDetailsDto> orderDetailDtos, Long customerId, Integer modeOfPayment) {
//
//		for (int i = 0; i < orderDetailDtos.size(); i++) {
//			Long productId = orderDetailDtos.get(i).getProduct().getId();
//			Long vendorId = orderDetailDtos.get(i).getVendor().getId();
//			Product product = this.productRepo.findById(productId)
//					.orElseThrow(() -> new ResourceNotFoundException("Product", " id ", productId));
//			Vendor vendor = this.vendorRepo.findById(vendorId)
//					.orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", vendorId));
//			int productQuantity = product.getProductQuantity() - orderDetailDtos.get(i).getQuantity();
//			if (productQuantity <= 0) {
//				return false;
//			} else {
//				product.setProductQuantity(productQuantity);
//				productRepo.save(product);
//			}
//		}
//
//		Customer customer = this.customerRepo.findById(customerId)
//				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
//
//		Order order = new Order();
//
//		order.setCustomer(customer);
//		if (modeOfPayment == 0) {
//			order.setModeOfPayment(ModeOfPayment.CASH);
//		} else if (modeOfPayment == 1) {
//			order.setModeOfPayment(ModeOfPayment.CREDITCARD);
//		} else if (modeOfPayment == 2) {
//			order.setModeOfPayment(ModeOfPayment.DEBITCARD);
//		} else if (modeOfPayment == 3) {
//			order.setModeOfPayment(ModeOfPayment.UPI);
//		} else {
//			order.setModeOfPayment(ModeOfPayment.CASH);
//		}
//		order.setOrderDate(LocalDate.now());
//
//		LocalDateTime localDatetime = LocalDateTime.now().plusHours(6);
//		order.setDeliveryDate(localDatetime.toLocalDate());
//
//		order.setOrderStatus(OrderStatus.PENDING);
//
//		this.orderRepo.save(order);
//
//		for (int i = 0; i < orderDetailDtos.size(); i++) {
//			OrderDetail orderDetails = this.orderDetailDtoToOrderDetails(orderDetailDtos.get(i));
//			orderDetails.setOrder(order);
//			this.orderDetailsRepo.save(orderDetails);
//		}
//		return true;
//
//	}

	@Override
	public boolean addOrder(List<OrderDetailsDto> orderDetailDtos, Long customerId, Integer modeOfPayment) {

		for (int i = 0; i < orderDetailDtos.size(); i++) {
			Long productId = orderDetailDtos.get(i).getProduct().getId();

//			Long vendorId = orderDetailDtos.get(i).getVendor().getId();
			Product product = this.productRepo.findById(productId)
					.orElseThrow(() -> new ResourceNotFoundException("Product", " id ", productId));

			Vendor vendor = this.vendorRepo.findById(product.getVendor().getId())
					.orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", product.getVendor().getId()));
			orderDetailDtos.get(i).setVendor(vendor);
			int productQuantity = product.getProductQuantity() - orderDetailDtos.get(i).getQuantity();
			if (productQuantity <= 0) {
				return false;
			} else {
				product.setProductQuantity(productQuantity);
				productRepo.save(product);
			}
		}

		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		Order order = new Order();

		order.setCustomer(customer);
		if (modeOfPayment == 0) {
			order.setModeOfPayment(ModeOfPayment.CASH);
		} else if (modeOfPayment == 1) {
			order.setModeOfPayment(ModeOfPayment.CREDITCARD);
		} else if (modeOfPayment == 2) {
			order.setModeOfPayment(ModeOfPayment.DEBITCARD);
		} else if (modeOfPayment == 3) {
			order.setModeOfPayment(ModeOfPayment.UPI);
		} else {
			order.setModeOfPayment(ModeOfPayment.CASH);
		}
		order.setOrderDate(LocalDate.now());

		LocalDateTime localDatetime = LocalDateTime.now().plusHours(6);
		order.setDeliveryDate(localDatetime.toLocalDate());

		order.setOrderStatus(OrderStatus.PENDING);

		this.orderRepo.save(order);

		for (int i = 0; i < orderDetailDtos.size(); i++) {
			OrderDetail orderDetails = this.orderDetailDtoToOrderDetails(orderDetailDtos.get(i));
			orderDetails.setOrder(order);
			this.orderDetailsRepo.save(orderDetails);
		}
		CustomerCart cart = customer.getCart();
		List<CartItems> cartItems = this.cartItemepo.findByCart(cart);
		for (int i = 0; i < cartItems.size(); i++) {
			this.cartItemepo.deleteById(cartItems.get(i).getId());

		}

		this.cartRepo.save(cart);
		return true;

	}

	private Order orderDtoToOrder(OrderDto orderDto) {
		return this.modelMapper.map(orderDto, Order.class);
	}

	private OrderDto orderToOrderDto(Order order) {
		return this.modelMapper.map(order, OrderDto.class);
	}

	private OrderDetail orderDetailDtoToOrderDetails(OrderDetailsDto orderDetailsDto) {
		return this.modelMapper.map(orderDetailsDto, OrderDetail.class);
	}

	private OrderDetailsDto orderDetailToOrderDetailsDto(OrderDetail orderDetail) {
		return this.modelMapper.map(orderDetail, OrderDetailsDto.class);
	}

	@Override
	public List<OrderDto> getOrders(Long customerId) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		List<Order> orders = this.orderRepo.findByCustomer(customer);
		orders = orders.stream().filter(
				o -> (o.getOrderStatus() == OrderStatus.PENDING) || (o.getOrderStatus() == OrderStatus.DELIVERED))
				.collect(Collectors.toList());

		List<OrderDto> orderDtos = orders.stream().map(o -> this.orderToOrderDto(o)).collect(Collectors.toList());

		return orderDtos;
	}

//	@Override
//	public List<OrderDetailsDto> getOrdersDetails(Long orderId) {
//		Order order = this.orderRepo.findById(orderId)
//				.orElseThrow(() -> new ResourceNotFoundException("Order", " id ", orderId));
//		List<OrderDetail> orderDetails = this.orderDetailsRepo.findByOrder(order);
//		List<OrderDetailsDto> orderdDetails = orderDetails.stream().map(o -> this.orderDetailToOrderDetailsDto(o))
//				.collect(Collectors.toList());
//		return orderdDetails;
//	}

	@Override
	public List<OrderDetailsDto> getOrdersDetails(Long orderId) {
		Order order = this.orderRepo.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", " id ", orderId));
		List<OrderDetail> orderDetails = order.getOrderDetails();
		List<OrderDetailsDto> orderdDetails = orderDetails.stream().map(o -> this.orderDetailToOrderDetailsDto(o))
				.collect(Collectors.toList());
		return orderdDetails;
	}

	@Override
	public List<OrderDto> getCancelOrders(Long customerId) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));

		List<Order> orders = this.orderRepo.findByCustomer(customer);
		orders = orders.stream().filter(o -> o.getOrderStatus() == OrderStatus.CANCELLED).collect(Collectors.toList());

		List<OrderDto> orderDtos = orders.stream().map(o -> this.orderToOrderDto(o)).collect(Collectors.toList());

		return orderDtos;
	}

	@Override
	public boolean registerCustomer(CustomerDto customerDto) {
		Customer newCustomer = modelMapper.map(customerDto, Customer.class);
		CustomerCart customerCart = new CustomerCart();
		customerCart.setCustomer(newCustomer);
		newCustomer.setAuthenticated(true);
		newCustomer.setUserRole(Role.CUSTOMER);

		String role = "ROLE_CUSTOMER";

		AppUser appUser = new AppUser();

		appUser.setEmail(newCustomer.getEmail());
		String password = this.bCryptPasswordEncoder.encode(newCustomer.getPassword());
		appUser.setPassword(password);
		appUser.setRole(role);

		this.appUserRepo.save(appUser);

		this.customerRepo.save(newCustomer);
		this.cartRepo.save(customerCart);

		return true;
	}

	@Override
	public void cancelOrder(Long customerId, Long orderId) {
		Customer customer = this.customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
		Order order = this.orderRepo.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", " id ", orderId));
		List<OrderDetail> orderDetails = this.orderDetailsRepo.findByOrder(order);
		for (int i = 0; i < orderDetails.size(); i++) {
			Product product = orderDetails.get(i).getProduct();
			int prevQuantity = product.getProductQuantity() + orderDetails.get(i).getQuantity();
			product.setProductQuantity(prevQuantity);
			this.productRepo.save(product);
			this.orderDetailsRepo.delete(orderDetails.get(i));
		}
		order.setOrderStatus(OrderStatus.CANCELLED);

	}

	@Override
	public void removeCartItem(Long customerId, Long cartItemId) {
		Customer customer = customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", customerId));
		CustomerCart cart = customer.getCart();

		cartItemepo.deleteById(cartItemId);
		List<CartItems> cartItems = cart.getCartItems();
		cart.setCartItems(cartItems);
		cartRepo.save(cart);

	}

	@Override
	public ProductDto getProductById(Long prodId) {
		Product product = this.productRepo.findById(prodId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", " id ", prodId));
		ProductDto productDto = this.ProductTodto(product);
		return productDto;
	}

}
