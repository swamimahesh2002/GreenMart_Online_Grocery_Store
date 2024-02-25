package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Vendor;

@Repository
public interface VendorRepo extends JpaRepository<Vendor, Long> {
	Optional<Vendor> findByEmail(String email);

}
