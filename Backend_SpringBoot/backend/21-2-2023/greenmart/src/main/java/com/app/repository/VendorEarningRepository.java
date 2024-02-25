package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Vendor;
import com.app.pojos.VendorEarning;

public interface VendorEarningRepository extends JpaRepository<VendorEarning, Long> {

	public List<VendorEarning> findByDateAndVendor(LocalDate date, Vendor v);
	
	public List<VendorEarning> findByVendor(Vendor vendor);
	
	public List<VendorEarning> findByDate(LocalDate date);
}
