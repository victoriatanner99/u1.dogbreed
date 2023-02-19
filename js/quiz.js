"use strict";

async function get_dog(dog_object_link) {
  let correct_dog = await fetch_data("dog", random_dog);

  console.log(correct_dog);

  document.querySelector("#dog_image").style.backgroundImage = `url(${correct_dog.message})`;
}

get_dog();

