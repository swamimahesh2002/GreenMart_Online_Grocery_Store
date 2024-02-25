package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product extends BaseEntity {

	@Length(min = 4, max = 20, message = "Invalid or Blank product name!!!!!!")
	@Column(name = "prod_name", length = 20)
	private String productName;

	@Column(precision = 10, scale = 2)
	private double rate;

	private int discount;

	@Column(name = "prod_desc", length = 200)
	private String productDescription;

	@Column(name = "is_available")
	private boolean isAvailable;

	@Column(length = 100)
	private String image;

	@Column(name = "exp_date")
	private LocalDate expiryDate;

	@Column(name = "prod_qty")
	private int productQuantity;

	@Column(name = "avg_rating", precision = 2, scale = 1)
	private double averageRating;

	@ManyToOne
	@JoinColumn(name = "cat_id", nullable = false)
	private Category category;

	@ManyToOne
	@JoinColumn(name = "vendor_id", nullable = false)
	private Vendor vendor;

}
