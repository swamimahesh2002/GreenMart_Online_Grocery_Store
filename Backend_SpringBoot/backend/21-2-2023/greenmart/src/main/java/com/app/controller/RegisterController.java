package com.app.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerDto;
import com.app.dto.RegisterDto;
import com.app.dto.VendorDto;
import com.app.service.CustomerService;
import com.app.service.VendorService;

@CrossOrigin
@RestController
@RequestMapping("/register")
public class RegisterController {

	@Autowired
	CustomerService customerService;

	@Autowired
	VendorService vendorService;

	@Autowired
	ModelMapper modelMapper;

	@PostMapping("/{num}")
	public void registerVendor(@RequestBody RegisterDto regDto, @PathVariable Integer num) {
		if (num == 1) {
			CustomerDto custDto = modelMapper.map(regDto, CustomerDto.class);
			customerService.registerCustomer(custDto);
		}
		if (num == 2) {
			VendorDto venDto = modelMapper.map(regDto, VendorDto.class);
			vendorService.addVendor(venDto);
		}
	}
}