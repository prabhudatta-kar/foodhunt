package com.foodhunt.restaurants.dbservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewDataDto {
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	@JsonProperty("userId")
	String userId;
	
	@JsonProperty("resId")
	String resId;
	@JsonProperty("reviewText")
	String reviewText;
	@JsonProperty("rating")
	String rating;
	
	@JsonCreator
	public ReviewDataDto(@JsonProperty("userId")
	String userId, @JsonProperty("resId")
	String resId,
	@JsonProperty("reviewText")
	String reviewText,
	@JsonProperty("rating")
	String rating) {
		this.userId=userId;
		this.resId=resId;
		this.reviewText=reviewText;
		this.rating=rating;
	}
}
