package com.app.service;

import java.util.List;

import com.app.dto.ProductDto;
import com.app.dto.VendorDto;
import com.app.pojos.Product;
import com.app.pojos.Vendor;
import com.app.pojos.VendorEarning;

public interface VendorService {

	public void addVendor(VendorDto venDto);

	public void modifyProfile(VendorDto venDto, Long id);

	public void modifyPassword(VendorDto venDto, Long id);

	public void removeProfile(Long id);

	public List<Product> fetchApprovedProducts(Long id);

	public List<Product> fetchNotApprovedProducts(Long id);

	public List<Product> fetchExpiredProducts(Long id);

	public List<Product> fetchProductsByCategory(Long catId, Long id);

	public List<Product> fetchProductsByRating(Long id);

	public void insertProduct(ProductDto prodDto, Long catId, Long id);

	public void modifyProduct(ProductDto prodDto, Long catId, Long id);

	public void removeProduct(Long id);

	public List<VendorEarning> fetchDailyVendorEarnings(Long id);

	public List<VendorEarning> fetchMonthlyVendorEarnings(Long id, int num);

	public List<VendorEarning> fetchYearlyVendorEarnings(Long id, int num);

	public Vendor fetchVendorById(Long id);

}
