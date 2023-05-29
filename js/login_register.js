"use strict";

let request = "https://teaching.maumt.se/apis/access/";


document.querySelector("#register").addEventListener("click", change_page);


function get_username(){
  if(localStorage.getItem("user_name") === null){
    change_page();
  } else {
    start_quiz(localStorage.getItem("user_name"));
  }
}


function change_page(event) {
  if (
    document.querySelector("#register").textContent ===
    "Already have an account? Go to login" ) 
    
    {
    document.querySelector("#register").textContent =
      "New to this? Register for free";
    document.querySelector("h1").textContent = "LOGIN";
    document.querySelector("#comment").textContent = "Let the magic start!";
    document.querySelector("#wrapper").style.animationName = "loginpage";
    document.querySelector("#login_button").textContent = "Login";
    document.querySelector("#comment").classList.remove("registration")
    document.querySelector("#comment").classList.add("login")

    document
      .querySelector("#login_button")
  } else {
    document.querySelector("#register").textContent =
      "Already have an account? Go to login";
      document.querySelector("#comment").classList.remove("login")
    document.querySelector("#comment").classList.add("registration");
    document.querySelector("h1").textContent = "REGISTER";
    document.querySelector("#comment").textContent = "Ready when you are...";
    document.querySelector("#wrapper").style.animationName = "registerpage";
    document.querySelector("#login_button").textContent = "Registration";
    document
      .querySelector("#login_button")
  }
};

document.querySelector("#login_button").addEventListener("click", e => {

  if(document.querySelector("#login_button").innerText === "Login"){
    get_request(); 
  }else {
    add_new_user();
    }

});


async function get_request() {
  const username = document.querySelector("input[type='username']");
  const password = document.querySelector("input[type='password']");

  const get_req = new Request(
    `${request}?action=check_credentials&user_name=${username.value}&password=${password.value}`
  );
    let response = await fetch_data(get_req);

    if(response.status == 200){

    //  localStorage.setIem("user_name", username.value); 

      start_quiz(username.value);

    } else {
      document.querySelector("#comment").textContent = "Wrong username or password";
      document.querySelector("#comment").style.backgroundColor = "white";
    }

}

async function add_new_user(post) {
  console.log("inne");
  const username = document.querySelector("input[type='username']");
  const password = document.querySelector("input[type='password']");

  const post_req = await fetch_data(
    new Request(request, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        action: "register",
        user_name: username.value,
        password: password.value,
      }),
    })
  );

  console.log(post_req)

  if (post_req.status == 200) {
    let feedback = document.querySelector(".feedback");
    let feedback_background = document.querySelector(".feedback_background");
    feedback_background.classList.add("show");
    feedback.classList.add("show");  
    feedback.innerHTML = `
    <p> Registration complete <br>
    Please proceed to login. </p>
    <button> close</button>`
  
    feedback.querySelector("button").addEventListener("click", e => { 
      feedback.classList.remove("show")
      feedback_background.classList.remove("show");
    })

  } else {
    switch(post_req.status) {

      case 418:
        console.log("The server thinks it's not a teapot!")
        break;

      case 409:
        console.log("Sorry, that name already exists. Please try with another one.")
        break;

      case 400:
        console.log("There seems to be a NetworkError, please check you're connection.")
        break;
    }
  }
}
