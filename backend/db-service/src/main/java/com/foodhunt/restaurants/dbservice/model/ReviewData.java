package com.foodhunt.restaurants.dbservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="review_data", catalog="db")
public class ReviewData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name ="id")
	private Integer id;
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="res_id")
	private Integer resId;
	
	@Column(name="review_text")
	private String reviewText;
	
	@Column(name="rating")
	private Integer rating;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getResId() {
		return resId;
	}

	public void setResId(Integer resId) {
		this.resId = resId;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}
	public ReviewData() {
		
	}
public ReviewData(


		String userId,


		String resId,

 String reviewText,


 String rating) {
		
		this.userId=Integer.parseInt(userId);
		this.resId=Integer.parseInt(resId);
		this.reviewText=reviewText;
		this.rating=Integer.parseInt(rating);
	}
	
	
}
