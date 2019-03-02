var rating=0;
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
    async searchReviews(resId){
        const apiReviewURL=`https://developers.zomato.com/api/v2.1/reviews?res_id=${resId}`;
        const dbReviewURL =`http://localhost:8302/rest/db/get/reviews/${resId}`;

        const reviewInfo = await fetch(apiReviewURL,this.header);
        const reviewJSON =  await reviewInfo.json();
        const reviews = await reviewJSON.user_reviews;


        const dbHeader={
            method:"GET",
            headers:{
                
                "Content-Type" : "application/json"
            }
        }
      
        const dbReviewInfo = await fetch(dbReviewURL,dbHeader);
        const dbReviewJSON =  await dbReviewInfo.json();

        return {
            reviews,
            dbReviewJSON

        }
    }

    async getRestaurantData(resId){
        const resURL=`https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`;

        const resInfo = await fetch(resURL,this.header);
        const resJSON = await resInfo.json();
       
        return resJSON;



    }
     
   async  postReview(userId,reviewText,rating,resId){
   
    const addURL = "http://localhost:8302/rest/db/add/review";

    const data={
        "userId" : `${userId}`,
	    "resId" : `${resId}`,
	    "reviewText": `${reviewText}`,
	    "rating" : `${rating}`
    };
    
    const param = {
        method:"post",
        headers:{
            
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    };
    console.log(param);

    var status=false;
    await fetch(addURL, param)
    .then( response =>{
        
    })
    .catch(error => {
       console.log(error); 
       status=false});
   
        return status;



    }

}

class UI{


    showRestaurantData(resData){
        const div=document.getElementById('main-div');
        div.innerHTML=`
                    
                    <div class="header">
                    <div class="image">
                            <img src="${resData.thumb}"  style="height: 50%;"alt="">
                        </div>
                        <div class="restaurant-name col-md-10 row">
                                
                                <div class="details col-md-10">
                                        <div class="col-9 text-capitalize">
                                                <h2>${resData.name}</h2>
                                                <p>${resData.location.address}</p>
                                            </div>
                                    <div class="col-1">
                                        <div class="badge badge-success">
                                               ${resData.user_rating.aggregate_rating}
                                        </div>
                                    </div>
                                    <div class="row text-center no-gutters pb-3">
                                        <div class="col-6">
                                        <a href="${resData.menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> menu</a>
                                        </div>
                                        <div class="col-6">
                                        <a href="${resData.url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> website</a>
                                    </div>
                                </div>
                        </div>
                
                    </div>
            
        `


    }

    getReviews(reviews,dbReviews){
        console.log(dbReviews);
        const div=document.getElementById('review-div');
        var output="";
       // console.log(reviews.length);
       dbReviews.forEach(element => {

        console.log(element);
        
        output = `<br><hr>
        <div class="reviews">
            

            <div class="show-reviews">
                    <div class="rating badge badge-success">
                        <p>Rating:${element.rating}</p>
                    </div>
                    <div class="review-text">
                        <p>${element.reviewText}</p>
                    </div>
                    <div class="reviewd-by">
                        
                    </div>
            </div>

        </div>`+output;
    });
        reviews.forEach(element => {

          //  console.log(element);
            output += `<br><hr>
            <div class="reviews">
                

                <div class="show-reviews">
                        <div class="rating badge badge-success">
                            <p>Rating:${element.review.rating}</p>
                        </div>
                        <div class="review-text">
                            <p>${element.review.rating_text}<br>${element.review.review_text}</p>
                        </div>
                        <div class="reviewd-by">
                            
                        </div>
                </div>

            </div>`
        });
       // console.log(output);
       
        div.innerHTML = output;

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





(function(){
   

    const zomato=new ZOMATO();
    const ui=new UI();
    var resId=getQueryVariable("resId");
    console.log(resId);
    document.addEventListener('DOMContentLoaded',()=>{
      //  alert(resId);
        resId= parseInt(getQueryVariable("resId"));
        zomato.getRestaurantData(resId).then(resData =>{
                ui.showRestaurantData(resData);
        });
        zomato.searchReviews(resId).then(data => {
           // console.log(data);
                ui.getReviews(data.reviews,data.dbReviewJSON);
        });


    });
   



   

})();


    $(':radio').change(function() {
       rating= this.value;
      });




function addReview(){
    const textbox=document.getElementById('review-text-box');
    const userId=getQueryVariable("userId");
    const resId= parseInt(getQueryVariable("resId"));
    const zomato=new ZOMATO();
    zomato.postReview(userId,textbox.value,rating,resId).then(data =>{
        window.location.reload();
    });





}
