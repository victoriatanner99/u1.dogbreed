//här ska åtminstone funktionen som inkluderar fetch-anropet finnas
"use strict";

async function fetch_data(request) {
  let response = await fetch(request);
  return response;
}
