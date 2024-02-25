package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "vendors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class Vendor extends BaseEntity {

	@Length(min = 4, max = 20, message = "Invalid or Blank first name!!!!!!")
	@Column(name = "first_name", length = 20)
	private String firstName;

	@Column(name = "last_name", length = 20)
	@NotBlank(message = "Last  name can't be blank")
	private String lastName;

	// @Pattern(regexp = "^(.+)@(\\S+)$", message = "Please provide a valid email
	// address")
	@Column(length = 30, unique = true)
	private String email;

	// @Pattern(regexp = "((?=.\\d)(?=.[a-z])(?=.[#@$]).{5,20})", message = "Blank
	// or Invalid password")
	@Column(length = 20, nullable = false)
	private String password;

	@Column(name = "mob_no", length = 10)
	private String mobNo;

	@Column(length = 100)
	private String address;

	@Enumerated(EnumType.STRING)
	@Column(name = "user_role", length = 30)
	private Role userRole;

	@CreationTimestamp
	@Column(name = "reg_date")
	private LocalDate regDate;

	@Column(name = "is_authenticate")
	private boolean isAuthenticate;

	@ManyToOne
	@JoinColumn(name = "admin_id", nullable = false)
	private Admin admin;

	@OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<Product> products = new ArrayList<Product>();

	@OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<VendorEarning> vendorEarnings = new ArrayList<VendorEarning>();

}