package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ProductDto;
import com.app.dto.VendorDto;
import com.app.exceptions.ResourceNotFoundException;
import com.app.exceptions.UsernameNotFoundException;
import com.app.pojos.AppUser;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.Role;
import com.app.pojos.Vendor;
import com.app.pojos.VendorEarning;
import com.app.repository.AdminRepository;
import com.app.repository.AppUserRepo;
import com.app.repository.CategoryRepo;
import com.app.repository.ProductRepo;
import com.app.repository.VendorEarningRepository;
import com.app.repository.VendorRepo;

@Service
@Transactional
public class VendorServiceImpl implements VendorService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private VendorRepo vendRepo;

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private ProductRepo prodRepo;

	@Autowired
	private CategoryRepo catRepo;

	@Autowired
	private VendorEarningRepository vendorEarningRepo;

	@Autowired
	private AppUserRepo appUserRepo;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Vendor fetchVendorById(Long id) {
		return vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
	}

	@Override
	public void addVendor(VendorDto venDto) {
		Vendor vendor = modelMapper.map(venDto, Vendor.class);
		vendor.setAuthenticate(true);
		vendor.setRegDate(LocalDate.now());
		vendor.setAdmin(
				adminRepo.findById((long) 1).orElseThrow(() -> new ResourceNotFoundException("admin", " id ", 1)));
		vendor.setUserRole(Role.VENDOR);
		vendRepo.save(vendor);
		String role = "ROLE_VENDOR";

		AppUser appUser = new AppUser();

		appUser.setEmail(vendor.getEmail());
		String password = this.bCryptPasswordEncoder.encode(vendor.getPassword());
		appUser.setPassword(password);
		appUser.setRole(role);

		this.appUserRepo.save(appUser);
	}

	@Override
	public void modifyProfile(VendorDto venDto, Long id) {
		Vendor oldVendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		Vendor vendor = modelMapper.map(venDto, Vendor.class);
		oldVendor.setFirstName(vendor.getFirstName());
		oldVendor.setLastName(vendor.getLastName());
		oldVendor.setAddress(vendor.getAddress());
		oldVendor.setEmail(vendor.getEmail());
		oldVendor.setMobNo(vendor.getMobNo());
		vendRepo.save(oldVendor);
	}

	@Override
	public void modifyPassword(VendorDto venDto, Long id) {
		Vendor oldVendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		Vendor vendor = modelMapper.map(venDto, Vendor.class);
		oldVendor.setPassword(vendor.getPassword());
		AppUser appUser = appUserRepo.findByEmail(oldVendor.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User", " id ", id));
		String encodedPassword = bCryptPasswordEncoder.encode(vendor.getPassword());
		appUser.setPassword(encodedPassword);
		appUserRepo.save(appUser);
		vendRepo.save(oldVendor);
	}

	@Override
	public void removeProfile(Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		vendor.setAuthenticate(false);
		vendRepo.save(vendor);
		AppUser appUser = this.appUserRepo.findByEmail(vendor.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException(" email "));

		appUserRepo.delete(appUser);
	}

	@Override
	public List<Product> fetchApprovedProducts(Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		List<Product> products = prodRepo.findByVendor(vendor);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchNotApprovedProducts(Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		List<Product> products = prodRepo.findByVendor(vendor);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == false).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchExpiredProducts(Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		List<Product> products = prodRepo.findByVendor(vendor);
		return products.stream()
				.filter((prod) -> prod.getExpiryDate().isBefore(LocalDate.now())
						|| prod.getExpiryDate().equals(LocalDate.now()))
				.filter(p -> p.isAvailable() == false).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchProductsByCategory(Long catId, Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		Category category = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("category", " id ", catId));
		List<Product> products = prodRepo.findByVendorAndCategory(vendor, category);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true).collect(Collectors.toList());
	}

	@Override
	public List<Product> fetchProductsByRating(Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		List<Product> products = prodRepo.findByVendor(vendor);
		return products.stream().filter((prod) -> prod.getExpiryDate().isAfter(LocalDate.now()))
				.filter(p -> p.isAvailable() == true)
				.sorted((x, y) -> Double.compare(y.getAverageRating(), x.getAverageRating()))
				.collect(Collectors.toList());
	}

	@Override
	public void insertProduct(ProductDto prodDto, Long catId, Long id) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		Category category = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("category", " id ", catId));
		Product product = modelMapper.map(prodDto, Product.class);
		product.setAvailable(false);
		product.setAverageRating(0.0);
		product.setDiscount(0);
		product.setVendor(vendor);
		product.setCategory(category);
		prodRepo.save(product);
	}

	@Override
	public void modifyProduct(ProductDto prodDto, Long catId, Long id) {
		Product oldProduct = prodRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		Category category = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("category", " id ", catId));
		Product product = modelMapper.map(prodDto, Product.class);
		oldProduct.setProductName(product.getProductName());
		oldProduct.setRate(product.getRate());
		oldProduct.setProductDescription(product.getProductDescription());
		oldProduct.setImage(product.getImage());
		oldProduct.setExpiryDate(product.getExpiryDate());
		oldProduct.setProductQuantity(product.getProductQuantity());
		oldProduct.setCategory(category);
		prodRepo.save(oldProduct);
	}

	@Override
	public void removeProduct(Long id) {
		Product product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", " id ", id));
		product.setAvailable(false);
		this.prodRepo.save(product);
	}

	@Override
	public List<VendorEarning> fetchDailyVendorEarnings(Long id) {
		Vendor v = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByDateAndVendor(LocalDate.now(), v);
	}

	@Override
	public List<VendorEarning> fetchMonthlyVendorEarnings(Long id, int num) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByVendor(vendor).stream().filter(v -> v.getDate().getMonthValue() == num)
				.collect(Collectors.toList());
	}

	@Override
	public List<VendorEarning> fetchYearlyVendorEarnings(Long id, int num) {
		Vendor vendor = vendRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vendor", " id ", id));
		return vendorEarningRepo.findByVendor(vendor).stream().filter(v -> v.getDate().getYear() == num)
				.collect(Collectors.toList());
	}

}
