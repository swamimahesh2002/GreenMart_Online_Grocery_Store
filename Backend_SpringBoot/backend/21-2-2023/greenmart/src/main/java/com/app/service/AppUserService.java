package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.pojos.AppUser;
import com.app.repository.AppUserRepo;

@Service
public class AppUserService implements UserDetailsService {

	@Autowired
	private AppUserRepo appUserRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(" email "));
		return appUser.toUser();
	}

}
