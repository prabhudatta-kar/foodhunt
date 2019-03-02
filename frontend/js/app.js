class ZOMATO{
    constructor(){
        this.api = "6ad1f672205dc8be918d50e9f614ce4d";
        this.header = {
            method:"GET",
            headers:{
                "user-key" : this.api,
                "Content-Type" : "application/json"
            },
           // credentials = "same-origin"


        };
    }
    async searchCategories(){
        const categoryURL = 'https://developers.zomato.com/api/v2.1/categories';
        const categoryInfo = await fetch(categoryURL,this.header);
        const categoryJSON = await categoryInfo.json();
        const categories  = await categoryJSON.categories; 
        return categories;
    }

    async searchCuisines(){
        const cuisineURL = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=4';
        const cuisineInfo = await fetch(cuisineURL,this.header);
        const cuisineJSON = await cuisineInfo.json();
        const cuisines  = await cuisineJSON.cuisines; 
      //  console.log(cuisines);
        return cuisines;
    }

    async searchEstablishmentTypes(){
        const establishmentURL = 'https://developers.zomato.com/api/v2.1/establishments?city_id=4';
        const establishmentInfo = await fetch(establishmentURL,this.header);
        const establishmentJSON = await establishmentInfo.json();
        const establishments  = await establishmentJSON.establishments; 
        return establishments;
    }

    async searchRestaurants(categoryId,establishmentId,cuisineId){

       // console.log("func"+categoryId);
        const cityId=4;//for bangalore
        const resturantURL = `https://developers.zomato.com/api/v2.1/search?
        entity_id=${cityId}&entity_type=city&cuisines=%5B${cuisineId}%5D&establishment_type=${establishmentId}&category=${categoryId}&sort=rating` ;
        

        
        const restaurantInfo = await fetch(resturantURL,this.header);
        const restaurantJSON =  await restaurantInfo.json();
        const restaurants = await restaurantJSON.restaurants;

        return restaurants;
    }

    async searchReviews(resId){
        const apiReviewURL=`https://developers.zomato.com/api/v2.1/reviews?res_id=${resId}`;
        const dbReviewURL =`http://localhost:8302/rest/db/get/reviews/${resId}`;

        const reviewInfo = await fetch(apiReviewURL,this.header);
        const reviewJSON =  await reviewInfo.json();
        const reviews = await reviewJSON.user_reviews;


        const dbReviewInfo = await fetch(dbReviewURL,this.header);
        const dbReviewJSON =  await dbReviewInfo.json();

        return {
            reviews,
            dbReviewJSON

        }

    }


   

}

class UI{
    constructor(){
        this.loader = document.querySelector('.loader');
        this.restaurantList = document.getElementById('restaurant-list');
    }

    addCategorySelectOptions(categories){
        const search=document.getElementById("searchCategory");
        let output = `<option value='0' selected>select category</option>`;
        categories.forEach( (category) => {
            output += `<option value="${category.categories.id}">
            ${category.categories.name}</option> `;
            
        });

        search.innerHTML = output;

    }
    addCuisineSelectOptions(cuisines){
        const search=document.getElementById("searchCuisine");
       // console.log(cuisines[0].cuisine.cuisine_name);
        let output = `<option value='0' selected>select Cuisine</option>`;


        cuisines.forEach( (cuis) =>
         {
            output += `<option value="${cuis.cuisine.cuisine_id}">
            ${cuis.cuisine.cuisine_name}</option>`;
           // console.log(cuis.cuisine.cuisine_id);
            
        });

        search.innerHTML = output;
    }
    addEstablishmentSelectOptions(establishments){
        const search=document.getElementById("searchEstablishmentType");
        let output = `<option value='0' selected>select Restaurant Type</option>`;
        establishments.forEach( (establishment) => {
            output += `<option value="${establishment.establishment.id}">
            ${establishment.establishment.name}</option> `;
            
        });

        search.innerHTML = output;
    }

    showFeedback(text){

        const feedback = document.querySelector('.feedback');
        feedback.classList.add('showItem');
        feedback.innerHTML = `<p>${text}</p>`;
        setTimeout(() => {
            feedback.classList.remove('showItem');
        },3000);
    }

    showLoader(){
        this.loader.classList.add("showItem");
    }
    hideLoader(){
        this.loader.classList.remove("showItem");
    }
    getRestaurants(restaurants){
       
        if(restaurants.length === 0){
            ui.showFeedback('no restaurants found');
        }
        else{
            this.restaurantList.innerHTML = '';
            restaurants.forEach((restaurant) =>{
                const {thumb:img,name,location:{address},user_rating:{aggregate_rating},
                cuisines,average_cost_for_two:cost,menu_url,url,id}
                 = restaurant.restaurant;
                 if(img !== ''){
                     this.showRestaurant(img,name,address,aggregate_rating,cuisines,cost,menu_url,url,id);
                 }

            });
        }
        this.hideLoader();
        


    }
    showRestaurant(img,name,address,aggregate_rating,cuisines,cost,menu_url,url,resId){
        const userId=getQueryVariable("userId");
        console.log(userId);
        const div =document.createElement('div');
        div.classList.add('col-11','mx-auto','my-3','col-md-4');
        div.innerHTML=`<div class="card">
        <div class="card">
        <a style="text-decoration:none" href="restaurant.html?resId=${resId}&userId=${userId}">
         <div class="row p-3">
          <div class="col-5">
           <img src="${img}" class="img-fluid img-thumbnail" alt="">
          </div>
          <div class="col-5 text-capitalize">
           <h6 class="text-uppercase pt-2 redText">${name}</h6>
           <p>${address}</p>
          </div>
          <div class="col-1">
           <div class="badge badge-success">
            ${aggregate_rating}
           </div>
          </div>
         </div>
         </a>
         <hr>
         <div class="row py-3 ml-1">
          <div class="col-5 text-uppercase ">
           <p>cuisines :</p>
           <p>cost for two :</p>
          </div>
          <div class="col-7 text-uppercase">
           <p>${cuisines}</p>
           <p>${cost}</p>
          </div>
         </div>
         <hr>
         <div class="row text-center no-gutters pb-3">
          <div class="col-6">
           <a href="${menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> menu</a>
          </div>
          <div class="col-6">
           <a href="${url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> website</a>
          </div>
         </div>
        </div>`;

        this.restaurantList.appendChild(div);

    }



}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}

    }
    return 0;
}
function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}
function eraseCookie(name) {
    writeCookie(name,"",-1);
}
function logout(){
    console.log("here");
    eraseCookie("foodHuntUser");
}

(function(){
const searchForm = document.getElementById('searchForm');

const searchCuisine = document.getElementById('searchCuisine');
const searchEstablishmentType = document.getElementById('searchEstablishmentType');
const searchCategory = document.getElementById('searchCategory');

const zomato=new ZOMATO();

const ui= new UI();
//add select options 
document.addEventListener('DOMContentLoaded',()=>{
    console.log("hi");
    if(readCookie("foodHuntUser").length === 0){
       // window.location.replace("index.html");
    }
//logic goes here
    zomato.searchCategories().then(data => ui.addCategorySelectOptions(data));
    zomato.searchEstablishmentTypes().then(data => ui.addEstablishmentSelectOptions(data));
    zomato.searchCuisines().then(data => ui.addCuisineSelectOptions(data));
});

//submit form

searchForm.addEventListener("submit",event =>{
    event.preventDefault();
    ui.showLoader();
   
    const categoryID = parseInt(searchCategory.value);
    const cuisineId =parseInt(searchCuisine.value);
    const establishmentId =parseInt(searchEstablishmentType.value);

   // console.log(categoryID);
  //  console.log(city,categoryID);
    if( categoryID === 0 || cuisineId === 0 || establishmentId === 0){
        ui.showFeedback('please select a cuisine, Restaurant Type and  category');
    }
    else{
        //logic to search

        zomato.searchRestaurants(categoryID,establishmentId,cuisineId).then(restaurantData => {
            //console.log(cityData.cityID);
            
            
                
               
                ui.getRestaurants(restaurantData);
                   // console.log(data.reviewJSON);
              
            
        });


    }

})



})();