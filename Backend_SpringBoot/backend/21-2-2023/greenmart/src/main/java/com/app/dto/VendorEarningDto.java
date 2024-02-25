package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.BaseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_EMPTY)
public class VendorEarningDto extends BaseEntity {

	private LocalDate date;

	private double amount;

	public VendorEarningDto(LocalDate date, double amount) {
		super();
		this.date = date;
		this.amount = amount;
	}

	
}
