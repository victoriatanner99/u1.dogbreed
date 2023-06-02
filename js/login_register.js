"use strict";

document.querySelector("#register").addEventListener("click", change_page);

function get_username() {
  if (localStorage.getItem("user_name") === null) {
    change_page();
  } else {
    start_quiz(localStorage.getItem("user_name"));
  }
}

function change_page(event) {
  if (
    document.querySelector("#register").textContent ===
    "Already have an account? Go to login"
  ) {
    document.querySelector("#register").textContent =
      "New to this? Register for free";
    document.querySelector("h1").textContent = "LOGIN";
    document.querySelector("#comment").textContent = "Let the magic start!";
    document.querySelector("#wrapper").style.animationName = "loginpage";
    document.querySelector("#login_button").textContent = "Login";
    document.querySelector("#comment").classList.remove("registration");
    document.querySelector("#comment").classList.add("login");

    document.querySelector("#login_button");
  } else {
    document.querySelector("#register").textContent =
      "Already have an account? Go to login";
    document.querySelector("#comment").classList.remove("login");
    document.querySelector("#comment").classList.add("registration");
    document.querySelector("h1").textContent = "REGISTER";
    document.querySelector("#comment").textContent = "Ready when you are...";
    document.querySelector("#wrapper").style.animationName = "registerpage";
    document.querySelector("#login_button").textContent = "Registration";
    document.querySelector("#login_button");
  }
}

document.querySelector("#login_button").addEventListener("click", (event) => {
  if (document.querySelector("#login_button").textContent === "Login") {
    get_request();
  } else {
    post_request();
  }
});

async function get_request(request) {
  const username = document.querySelector("input[type='username']");
  const password = document.querySelector("input[type='password']");

  server_alert("Contacting Server...");

  const get_req = new Request(
    `https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username.value}&password=${password.value}`
  );
  let response = await fetch_data(get_req);
  let resource = await response.json();

  console.log(resource);
  remove_server_alert();

  if (response.status == 200) {
    start_quiz(username.value);
  } else {
    if (response.status === 404) {
      document.querySelector("#comment").textContent =
        "Wrong username or password";
      document.querySelector("#comment").style.backgroundColor = "white";
    }

    if (response.status === 409) {
      document.querySelector("#comment").textContent =
        "Wrong username or password";
      document.querySelector("#comment").style.backgroundColor = "white";
    }

    if (response.status === 418) {
      response_alert("The server thinks it's not a tepot.");
    }
  }
}

async function post_request(request) {
  const username = document.querySelector("input[type='username']");
  const password = document.querySelector("input[type='password']");

  server_alert("Contacting Server");

  try {
    const post = {
      action: "register",
      user_name: username.value,
      password: password.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-type": "application/json;" },
      body: JSON.stringify(post),
    };

    const post_req = new Request(
      `https://teaching.maumt.se/apis/access/`,
      options
    );
    let response = await fetch_data(post_req);
    let resource = await response.json();

    console.log(resource);
    remove_server_alert();

    if (response.status === 200) {
      response_alert("Registration Complete. Please proceed to login.");
    }

    if (response.status === 409) {
      response_alert("Sorry, that name is taken. Please try another one.");
    }

    if (response.status === 400) {
      response_alert(
        "There seems to be a Network Error, please check your connection."
      );
    }

    if (response.status === 418) {
      response_alert("The server thinks it's not a tepot.");
    }
  } catch (error) {
    console.log(error);
  }
}
