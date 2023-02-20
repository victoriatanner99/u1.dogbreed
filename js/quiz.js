"use strict";

async function get_dog(dog_object_link) {
  let correct_dog = await fetch_data("dog", random_dog);

  console.log(correct_dog);

  document.querySelector(
    ".dog_image"
  ).style.backgroundImage = `url(${correct_dog.message})`;
}

get_dog();



function get_random_dogname () {
    document.querySelectorAll(".box").forEach(new_name => {
        let random_number = Math.floor(Math.random() * ALL_BREEDS.length)
        let dog_name = ALL_BREEDS[random_number];
        new_name.textContent = dog_name.name;
    });   
}

get_random_dogname();

