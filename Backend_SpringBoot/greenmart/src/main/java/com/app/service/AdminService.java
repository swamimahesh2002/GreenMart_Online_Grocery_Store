package com.app.service;

import java.util.List;

import com.app.pojos.Customer;
import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.Product;
import com.app.pojos.Vendor;
import com.app.pojos.VendorEarning;

public interface AdminService {

//	public LoginResponse authenticateAdmin(String email, String password);

	public List<Product> fetchProducts();

	public Product fetchProductById(Long id);

	public List<Product> fetchProductByCategory(Long catId);

	public List<Product> fetchProductByVendor(Long venId);

	public List<Product> fetchNewProducts();

	public List<Product> fetchExpiredProducts();

	public void insertProduct(Long id);

	public void modifyProduct(Long id, int disc);

	public void removeProduct(Long id);

	public List<Vendor> fetchVendors();

	public Vendor fetchVendorById(Long id);

	public void insertVendor(Long id);

	public void removeVendor(Long id);

	public List<Customer> fetchCustomers();

	public Customer fetchCustomerById(Long id);

	public void removeCustomer(Long id);

	public List<Order> fetchOrders();

	public List<Order> fetchPendingOrders();

	public List<Order> fetchCancelledOrders();

	public List<Order> fetchOrdersByCustomer(Long id);

	public List<OrderDetail> fetchOrderDetailsByVendor(Long id);

	public List<OrderDetail> fetchOrderDetailsByProduct(Long id);

	public List<OrderDetail> fetchOrderDetailsByCategory(Long id);

	public List<VendorEarning> fetchVendorDailyVendorEarnings(Long id);

	public List<VendorEarning> fetchVendorMonthlyVendorEarnings(Long id, int num);

	public List<VendorEarning> fetchVendorYearlyVendorEarnings(Long id, int num);

	public List<VendorEarning> fetchDailyVendorEarnings();

	public List<VendorEarning> fetchMonthlyVendorEarnings(int num);

	public List<VendorEarning> fetchYearlyVendorEarnings(int num);

}
