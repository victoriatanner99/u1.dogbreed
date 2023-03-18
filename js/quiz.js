"use strict";

async function start_quiz(){

add_css_changer();

  let options = []
  while(options.length < 4){
    let option = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
    if(!options.includes(option)){
      options.push(option);
    }
  }


const dog_object = options[Math.floor(Math.random() * options.length)];
console.log(dog_object);
const dog_request = `https://dog.ceo/api/breed/${dog_object.url}/images/random`;
const dog_response = await (await fetch_data(dog_request)).json();


console.log(dog_response);

document.querySelector(".dog_image").src = `${dog_response.message}`;

for (let i = 0; i < options.length; i++){
  let answer_dom = document.createElement("button");
  answer_dom.textContent = options[i].name;
  answer_dom.addEventListener("click", response);
  document.querySelector(".option_boxes").append(answer_dom);

  function response(){ 
    if(answer_dom.innerText === dog_object.name){
     let feedback = document.querySelector(".feedback");
     let feedback_button = document.querySelector(".feedback_button");
     feedback.style.backgroundColor = "green";
     feedback.classList.add("show");  
     feedback_button.classList.add("show");
     feedback.innerText = "Right answer!";

    feedback_button.textContent = "OK";
    feedback.addEventListener("click", e => { 
      feedback.classList.remove("show")
      feedback_button.classList.remove("show");

      start_quiz()


    });
  
    } else { 
      let feedback = document.querySelector(".feedback");
      feedback.style.backgroundColor = "red";
      feedback.classList.add("show");  
      feedback.innerText = "Wrong Answer!";
      let feedback_button = document.querySelector(".feedback_button");
      feedback_button.textContent = "TRY AGAIN";
      feedback.addEventListener("click", e => { 
        feedback.classList.remove("show")

        start_quiz()

      });

    }
  }
}
}




//let random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
//console.log(random_dog);
//
//async function get_dog(dog_object_link) {
//  let correct_dog = await fetch_data("dog", random_dog);
//  document.querySelector("img").src = `${correct_dog.message}`;
//}
//
//get_dog();
//
//function get_random_dogname() {
//  
//  });
//}
//
//get_random_dogname();
//
//async function dog_data(dog_object) {
//
//  
//      document.querySelectorAll(".box").forEach((new_name) => {
 // new_name.textContent = option.name;

//});
//  console.log(dog_response);
//
//  document.querySelector(".dog_image").setAttribute("src", dog_response.message);
//
//  };
//
//  dog_data(random_dog);