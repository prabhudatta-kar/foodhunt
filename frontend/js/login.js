jQuery(document).ready(function($) {
	tab = $('.tabs h3 a');

	tab.on('click', function(event) {
		event.preventDefault();
		tab.removeClass('active');
		$(this).addClass('active');

		tab_content = $(this).attr('href');
		$('div[id$="tab-content"]').removeClass('active');
		$(tab_content).addClass('active');
	});
});
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
    return null;
}

function eraseCookie(name) {
    writeCookie(name,"",-999);
}
class LogInSignUp{
    constructor(){
        this.header = {
            method:"POST",
            headers:{
                
                "Content-Type" : "application/json",
                
            }
        };

    }

    async validatelogin(userName,password){
        const loginURL = "http://localhost:8302/rest/db/login/";
        const data={
            "userName" : `${userName}`,
            "password" : `${password}`
        }
    
      const param = {
            method:"post",
            headers:{
                
                "Content-Type" : "application/json"
            },
            body :JSON.stringify(data)
        };
        
      //  console.log(param);
       
        var result="fail";
        var status=false;
     await fetch(loginURL, param)
     .then( response =>{
            if(response.ok){
                response.json().then(res => {
                    console.log(res);
                    result=res;
                    status=true;
                });
            }else{
               
                status=false;
            }
     })
     .catch(error => {
        console.log(error); 
        status=false});
    
     
      
        return {
            status,
            result
        }
       
 

    }
    

    async newUser(userName,password){
        const loginURL = "http://localhost:8302/rest/db/signup/";
        const data={
            "userName" : `${userName}`,
            "password" : `${password}`
        }
    
      const param = {
            method:"post",
            headers:{
                
                "Content-Type" : "application/json"
            },
            body :JSON.stringify(data)
        };
        
      //  console.log(param);
       
        var result="fail";
        var status=false;
     await fetch(loginURL, param)
     .then( response =>{
         console.log(Response);
            if(response.ok){
                response.json().then(res => {
                    console.log(res);
                    result=res;
                    status=true;
                });
            }else{
               
                status=false;
            }
     })
     .catch(error => {
        console.log(error); 
        status=false});
    
     
      
        return {
            status,
            result
        }
       

    }

}

class UI{

   
    
}


(function(){
    document.addEventListener('DOMContentLoaded',()=>{
        if(readCookie("foodHuntUser") === null){
            //window.location.replace("search.html");
           // console.log("here null");
        }
        else{
            console.log(readCookie("foodHuntUser"));
        }
    });

})();


function login(){
    const userName = document.getElementById('userNameLogIn');
        const userPass = document.getElementById('userPassLogIn');
        const logInSignUp=new LogInSignUp();
    
        if(userName.value === "" || userPass.value === ""){
                alert("please enter valid username and password");
        }else{

            //console.log(userName.value);
            logInSignUp.validatelogin(userName.value
                ,userPass.value).then(validation =>{
                    console.log(validation);
                    if(validation.status === true){
                        writeCookie("foodHuntUser",""+validation.result.id+"",3);
                        window.location.replace("search.html?userId="+validation.result.id);
                    }else{
                        alert("invalid username or password");
                    }


                });
            

        }
       
}

function signup(){
    const userName = document.getElementById("userNameSignUp");
    const userPass = document.getElementById("userPassSignUp");
    const logInSignUp=new LogInSignUp();
        if(userName.value === "" || userPass.value === ""){
                alert("please enter valid username and password");
        }else{
            console.log(userName.value+"-"+userPass.value);
            logInSignUp.newUser(userName.value,userPass.value).then(data =>{
                
                alert("New user Created! Login to continue");

            });
        }
       
}