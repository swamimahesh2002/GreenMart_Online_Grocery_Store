package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {

}
