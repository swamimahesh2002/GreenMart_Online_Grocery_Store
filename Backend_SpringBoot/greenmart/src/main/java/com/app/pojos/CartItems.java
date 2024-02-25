package com.app.pojos;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartItems extends BaseEntity {

	@JoinColumn(name = "cart_id", nullable = false)
	@ManyToOne
	private CustomerCart cart;

	@JoinColumn(name = "prod_id", nullable = false)
	@OneToOne
	private Product product;

	private int qty;
}