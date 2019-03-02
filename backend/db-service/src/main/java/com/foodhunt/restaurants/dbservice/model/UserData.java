package com.foodhunt.restaurants.dbservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="user_data", catalog="db")

public class UserData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name ="user_id")
	public Integer id;
	
	@Column(name ="user_name")
	public String userName;
	
	@Column(name ="password")
	public String password;


	public UserData() {
		
	}
	
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
