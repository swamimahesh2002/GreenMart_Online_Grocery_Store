package com.app.dto;

import com.app.pojos.BaseEntity;
import com.app.pojos.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@AllArgsConstructor
@JsonInclude(Include.NON_EMPTY)
public class CartItemsDto extends BaseEntity {

	@JsonIgnoreProperties("vendor")
	private Product product;

	@JsonProperty("quantity")
	private int qty;
}
