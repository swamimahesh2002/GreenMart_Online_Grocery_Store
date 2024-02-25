package com.app.exceptions;

public class UsernameNotFoundException extends RuntimeException {

	String email;

	public UsernameNotFoundException(String email) {
		super(String.format("%s not found  ", email));
		this.email = email;
	}
}
