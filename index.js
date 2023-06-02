"use strict";

function add_css_changer(event) {
  document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
}

if (localStorage.getItem("user_name") !== null) {
  start_quiz(localStorage.getItem("user_name"));
}