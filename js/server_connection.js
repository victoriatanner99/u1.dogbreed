//här ska åtminstone funktionen som inkluderar fetch-anropet finnas
"use strict";

async function fetch_data(type, dog_object) {
  const username = document.querySelector(".input_username");
  const password = document.querySelector(".input_password");
  const post_request = new Request("https://teaching.maumt.se/apis/access/");

  const get_request = new Request(
    `https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username.value}&password=${password.value}`
  );

  const dog_request = new Request(
    `https://dog.ceo/api/breed/${dog_object.url}/images/random`
  );

  if (type === "get") {
    try {
      let response = await fetch(get_request);
      let resource = await response.json();
      console.log(response);
      console.log(resource);
    } catch (error) {
      console.log(error);
      fetch_data("get", get_request);
    }
  }

  if (type === "post") {
    try {
      const post_input = {
        action: "register",
        user_name: username.value,
        password: password.value,
      };

      const options = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(post_input),
      };

      let response = await fetch(post_request, options);
      let resource = await response.json();
      console.log(resource);
      return resource;
    } catch (error) {
      console.log(error);
    }
  }

  if (type === "dog") {
    try {
        let response = await fetch(dog_request);
        let resource = await response.json();
        console.log(resource);
        return resource;
    } catch (error) {
        console.log(error);
    }
  }

}

fetch_data("dog", ALL_BREEDS[4]);
