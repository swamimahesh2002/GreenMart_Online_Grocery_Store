package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(Include.NON_EMPTY)
public class ProductDto extends BaseEntity {

	private String productName;

	private double rate;

	private int discount;

	private String productDescription;

	private String image;

	private LocalDate expiryDate;

	private int productQuantity;

	private double averageRating;

	@JsonIgnore
	private boolean isAvailable;

}
