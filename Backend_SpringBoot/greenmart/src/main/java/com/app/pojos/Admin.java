package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "admin")
@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends BaseEntity {

	@Length(min = 4, max = 20, message = "message length min= 4 max 20 !!!!!!")
	@Column(name = "first_name", length = 20)
	@NotBlank(message = "First name can't be blank")
	private String firstName;

	@Column(name = "last_name", length = 20)
	@NotBlank(message = "Last name can't be blank")
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

	@CreationTimestamp
	@Column(name = "reg_date")
	private LocalDate regDate;

	@Column(name = "is_authenticate")
	private boolean isAuthenticate;

	@OneToMany(mappedBy = "admin")
	private List<Vendor> vendors = new ArrayList<Vendor>();
}
