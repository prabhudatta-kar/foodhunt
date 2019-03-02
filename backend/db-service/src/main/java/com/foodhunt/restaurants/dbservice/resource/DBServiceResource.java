package com.foodhunt.restaurants.dbservice.resource;




import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.foodhunt.restaurants.dbservice.model.ReviewData;
import com.foodhunt.restaurants.dbservice.model.ReviewDataDto;
import com.foodhunt.restaurants.dbservice.model.UserData;
import com.foodhunt.restaurants.dbservice.model.UserDataDto;
import com.foodhunt.restaurants.dbservice.repository.ReviewDataRepository;
import com.foodhunt.restaurants.dbservice.repository.UserDataRepository;

@RestController
@RequestMapping("rest/db")
@CrossOrigin
public class DBServiceResource {

	@Autowired
	private UserDataRepository userDataRepository;
	
	@Autowired
	private ReviewDataRepository reviewDataRepository;
	
	
	@RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
	public ResponseEntity<UserData> getUserData(@PathVariable("userId") final String userId){
		
		Optional<UserData> u=userDataRepository.findById(Integer.parseInt(userId));
		if(u.isPresent()) {
			return new ResponseEntity<UserData>(u.get(),HttpStatus.OK);
		}else {
			return new ResponseEntity<UserData>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<String> signUp(@RequestBody final UserData userData) {
	
		if(userDataRepository.findByUserName(userData.getUserName()).isPresent()) {
			return new ResponseEntity<String>("username already exists",HttpStatus.UNAUTHORIZED);
		}
		
		try {
			
		 userDataRepository.save(userData);
		 return new ResponseEntity<String>("success",HttpStatus.OK);
		}catch(Exception e) {
			 return new ResponseEntity<String>("failed",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<UserData> logIn(@RequestBody final UserDataDto userData) {
		String userName=userData.getUserName();
		Optional<UserData> u=userDataRepository.findByUserName(userName);
		if(u.isPresent()) {
			UserData dbUserData=u.get();
			String password=userData.getPassword();
			
			System.out.println("----------"+userName+"----"+password);
			if(password.equals(dbUserData.getPassword())){
				return new ResponseEntity<UserData>(dbUserData,HttpStatus.OK);
			}
		}
		
			return new ResponseEntity<UserData>(HttpStatus.UNAUTHORIZED);
		
		
	}
	
	@RequestMapping(value = "/add/review", method = RequestMethod.POST)
	public ResponseEntity<String> addReview(@RequestBody final ReviewDataDto reviewDataDto) {
		
		ReviewData reviewData= new ReviewData(reviewDataDto.getUserId(),reviewDataDto.getResId(),
				reviewDataDto.getReviewText(),reviewDataDto.getRating()
				);
		
		try {
		reviewDataRepository.save(reviewData);
		
		return new ResponseEntity<String>("success",HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping(value = "/get/reviews/{resId}", method = RequestMethod.GET)
	public ResponseEntity<List<ReviewData>> getReviews(@PathVariable("resId") final String resId){
		
		try {
		List<ReviewData> 		
		reviews=reviewDataRepository.findByResId(Integer.parseInt(resId));
		
		
		
		return new ResponseEntity<List<ReviewData>>(reviews,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<List<ReviewData>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
}
