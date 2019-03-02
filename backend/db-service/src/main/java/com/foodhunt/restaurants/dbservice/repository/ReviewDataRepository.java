package com.foodhunt.restaurants.dbservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodhunt.restaurants.dbservice.model.ReviewData;


public interface ReviewDataRepository extends JpaRepository<ReviewData, Integer> {
	
	Optional<ReviewData> findById(Integer id);

	List<ReviewData> findByUserId(Integer userId);
	
	List<ReviewData> findByResId(Integer resId);
}
