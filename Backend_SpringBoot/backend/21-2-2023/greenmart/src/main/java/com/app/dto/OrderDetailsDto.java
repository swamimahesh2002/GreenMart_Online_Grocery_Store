package com.app.dto;

import com.app.pojos.BaseEntity;
import com.app.pojos.Product;
import com.app.pojos.Vendor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_EMPTY)
public class OrderDetailsDto extends BaseEntity {

	private int quantity;

	@JsonIgnoreProperties({ "vendor", "cartItem" })
	private Product product;

	@JsonIgnoreProperties({ "admin", "products", "vendorEarnings" })
	private Vendor vendor;
}
