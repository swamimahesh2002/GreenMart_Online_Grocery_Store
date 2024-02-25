package com.app.pojos;

import java.util.Collections;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppUser extends BaseEntity {

	private String email;

	private String password;

	private String role;

	public User toUser() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
		User user = new User(email, password, Collections.singletonList(authority));
		return user;
	}
}
