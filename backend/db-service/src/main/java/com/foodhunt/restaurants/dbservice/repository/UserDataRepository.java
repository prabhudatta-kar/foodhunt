package com.foodhunt.restaurants.dbservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodhunt.restaurants.dbservice.model.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Integer> {
	
	Optional<UserData> findById(Integer id);

	Optional<UserData> findByUserName(String userName);

	
}

