"use strict"

function change_page (event) {
    if (document.querySelector("#register").textContent === "Already have an account? Go to login") {
        document.querySelector("#register").textContent = "New to this? Register for free";
        document.querySelector("h1").textContent = "LOGIN";
        document.querySelector("#comment").textContent = "Let the magic start!";
        document.querySelector("button").textContent = "Login";
        document.querySelector("#wrapper").style.animationName = "loginpage";
    } else {
        document.querySelector("#register").textContent = "Already have an account? Go to login";
        document.querySelector("h1").textContent = "REGISTER";
        document.querySelector("#comment").textContent = "Ready when you are...";
        document.querySelector("button").textContent = "Register";
        document.querySelector("#wrapper").style.animationName = "registerpage";
    } 
   
};

document.querySelector("#register").addEventListener("click", change_page);

