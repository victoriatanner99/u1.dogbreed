//här ska åtminstone funktionen som inkluderar fetch-anropet finnas
"use strict";

async function fetch_data(request) {
  let response = await fetch(request);
  return response;
}

function server_alert (alert) {
  let message_container = document.createElement("div");
  message_container.id = "alert_background";
  document.querySelector("body").prepend(message_container); //prepend = läggs ovanpå body (lager)
  message_container.innerHTML = `<div class="server_text">${alert}</div>`;
}

function remove_server_alert (alert) {
  document.querySelector("#alert_background").remove();
}

function response_alert (alert) {
  let response_background = document.createElement("div");
  response_background.id = "alert_background";
  document.body.prepend(response_background);

  response_background.innerHTML = `<div> class="popup_resp">${alert}<button>CLOSE</button></div>`;

  document.querySelector(".popup_resp > button").addEventListener("click", () => response_background.remove());
}