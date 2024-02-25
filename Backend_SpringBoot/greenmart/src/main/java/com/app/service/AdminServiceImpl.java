package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.exceptions.ResourceNotFoundException;
import com.app.pojos.Category;
import com.app.pojos.Customer;
import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.OrderStatus;
import com.app.pojos.Product;
import com.app.pojos.Vendor;
import com.app.pojos.VendorEarning;
import com.app.repository.AdminRepository;
import com.app.repository.CategoryRepo;
import com.app.repository.CustomerRepo;
import com.app.repository.OrderDetailsRepo;
import com.app.repository.OrderRepo;
import com.app.repository.ProductRepo;
import com.app.repository.VendorEarningRepository;
import com.app.repository.VendorRepo;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private ProductRepo prodRepo;

	@Autowired
	private CategoryRepo catRepo;

	@Autowired
	private VendorRepo venRepo;

	@Autowired
	private CustomerRepo custRepo;

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private OrderDetailsRepo orderDetailRepo;

	@Autowired
	private VendorEarningRepository vendorEarningRepo;

//	@Override
//	public LoginResponse authenticateAdmin(String email, String password) {
//		Admin admin = adminRepo.findByEmailAndPassword(email, password)
//				.orElseThrow(() -> new ResourceNotFoundException("Admin", " email "));
//		if (admin.isAuthenticate() == true) {
//			return new LoginResponse(admin.getId(), admin.getFirstName());
//		} else {
//			return null;
//		}
//	}

	@Override
	public List<Product> fetchProducts() {
		List<Product> products = prodRepo.findAll();
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public Product fetchProductById(Long id) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		return product;
	}

	@Override
	public List<Product> fetchProductByCategory(Long catId) {
		Category category = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("category", " id ", catId));
		List<Product> products = prodRepo.findByCategory(category);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchProductByVendor(Long venId) {
		Vendor vendor = venRepo.findById(venId)
				.orElseThrow(() -> new ResourceNotFoundException("vendor", " id ", venId));
		List<Product> products = prodRepo.findByVendor(vendor);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchNewProducts() {
		List<Product> products = prodRepo.findAll();
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.getProductQuantity() >= 0).filter(p -> p.isAvailable() == false)
				.collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchExpiredProducts() {
		List<Product> products = prodRepo.findAll();
		return products.stream()
				.filter(p -> p.getExpiryDate().isBefore(LocalDate.now()) || p.getExpiryDate().equals(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public void insertProduct(Long id) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		product.setAvailable(true);
		prodRepo.save(product);
	}

	@Override
	public void modifyProduct(Long id, int disc) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		product.setDiscount(disc);
		prodRepo.save(product);
	}

	@Override
	public void removeProduct(Long id) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		product.setAvailable(false);
		prodRepo.save(product);
	}

	@Override
	public List<Vendor> fetchVendors() {
		List<Vendor> vendors = venRepo.findAll();
		return vendors;
	}

	@Override
	public Vendor fetchVendorById(Long id) {
		return venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
	}

	@Override
	public void insertVendor(Long id) {
		Vendor vendor = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		vendor.setAuthenticate(true);
		venRepo.save(vendor);
	}

	@Override
	public void removeVendor(Long id) {
		Vendor vendor = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		vendor.setAuthenticate(false);
		venRepo.save(vendor);
	}

	@Override
	public List<Customer> fetchCustomers() {
		List<Customer> customers = custRepo.findAll();
		return customers;
	}

	@Override
	public Customer fetchCustomerById(Long id) {
		return custRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", id));
	}

	@Override
	public void removeCustomer(Long id) {
		Customer customer = custRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", id));
		customer.setAuthenticated(false);
		custRepo.save(customer);
	}

	@Override
	public List<Order> fetchOrders() {
		List<Order> orders = orderRepo.findAll();
		return orders.stream().filter(o -> o.getOrderStatus() == OrderStatus.DELIVERED).collect(Collectors.toList());
	}

	@Override
	public List<Order> fetchPendingOrders() {
		List<Order> orders = orderRepo.findAll();
		return orders.stream().filter(o -> o.getOrderStatus() == OrderStatus.PENDING).collect(Collectors.toList());
	}

	@Override
	public List<Order> fetchCancelledOrders() {
		List<Order> orders = orderRepo.findAll();
		return orders.stream().filter(o -> o.getOrderStatus() == OrderStatus.CANCELLED).collect(Collectors.toList());
	}

	@Override
	public List<Order> fetchOrdersByCustomer(Long id) {
		Customer customer = custRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", " id ", id));
		return orderRepo.findByCustomer(customer);
	}

	@Override
	public List<OrderDetail> fetchOrderDetailsByVendor(Long id) {
		Vendor vendor = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return orderDetailRepo.findByVendor(vendor);
	}

	@Override
	public List<OrderDetail> fetchOrderDetailsByProduct(Long id) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		return orderDetailRepo.findByProduct(product);
	}

	@Override
	public List<OrderDetail> fetchOrderDetailsByCategory(Long id) {
		Category category = catRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category", " id ", id));
		List<Product> products = prodRepo.findByCategory(category);
		List<OrderDetail> orderDetails = new ArrayList<OrderDetail>();
		products.forEach(p -> {
			orderDetails.addAll(orderDetailRepo.findByProduct(p));
		});
		return orderDetails;
	}

	@Override
	public List<VendorEarning> fetchVendorDailyVendorEarnings(Long id) {
		Vendor v = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByDateAndVendor(LocalDate.now(), v);
	}

	@Override
	public List<VendorEarning> fetchVendorMonthlyVendorEarnings(Long id, int num) {
		Vendor vendor = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByVendor(vendor).stream().filter(v -> v.getDate().getMonthValue() == num)
				.collect(Collectors.toList());
	}

	@Override
	public List<VendorEarning> fetchVendorYearlyVendorEarnings(Long id, int num) {
		Vendor vendor = venRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByVendor(vendor).stream().filter(v -> v.getDate().getYear() == num)
				.collect(Collectors.toList());
	}

	@Override
	public List<VendorEarning> fetchDailyVendorEarnings() {
		return vendorEarningRepo.findByDate(LocalDate.now()).stream().collect(Collectors.toList());
	}

	@Override
	public List<VendorEarning> fetchMonthlyVendorEarnings(int num) {
		return vendorEarningRepo.findAll().stream().filter(v -> v.getDate().getMonthValue() == num)
				.collect(Collectors.toList());
	}

	@Override
	public List<VendorEarning> fetchYearlyVendorEarnings(int num) {
		return vendorEarningRepo.findAll().stream().filter(v -> v.getDate().getYear() == num)
				.collect(Collectors.toList());
	}

}
