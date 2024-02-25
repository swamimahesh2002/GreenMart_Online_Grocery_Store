package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.AppUser;

public interface AppUserRepo extends JpaRepository<AppUser, Long> {

	Optional<AppUser> findByEmail(String email);
}
