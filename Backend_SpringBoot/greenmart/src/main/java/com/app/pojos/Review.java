package com.app.pojos;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review extends BaseEntity{

	private int rating;
	
	
	@ManyToOne
	@JoinColumn(name = "cust_id", nullable = false)
	private Customer customer;
	
	
	@ManyToOne
	@JoinColumn(name = "prod_id", nullable = false)
	private Product product;
}
