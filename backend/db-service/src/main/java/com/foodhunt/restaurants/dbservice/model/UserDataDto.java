package com.foodhunt.restaurants.dbservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDataDto {
	@JsonProperty("userName")
	String userName;
	
	@JsonProperty("password")
	String password;
	
	@JsonCreator
	public UserDataDto(@JsonProperty String userName,@JsonProperty String password) {
		this.userName=userName;
		this.password=password;
		
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
