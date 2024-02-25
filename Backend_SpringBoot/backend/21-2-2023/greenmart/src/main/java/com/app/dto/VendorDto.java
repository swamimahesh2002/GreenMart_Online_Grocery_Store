package com.app.dto;

import com.app.pojos.BaseEntity;
import com.app.pojos.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_EMPTY)
public class VendorDto extends BaseEntity {

	private String firstName;

	private String lastName;

	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	private String mobNo;

	private String address;

	public VendorDto(String firstName, String lastName, String email, Role userRole, String mobNo, String address) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobNo = mobNo;
		this.address = address;
	}

	public VendorDto(String firstName, String lastName, String email, String password, Role userRole, String mobNo,
			String address) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.mobNo = mobNo;
		this.address = address;
	}

}
