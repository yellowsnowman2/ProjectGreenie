console.log("code working");

const carbon = document.querySelector('#carbon_form');
carbon.addEventListener("submit", function(event) {

// caputure 
const state = document.getElementById('state').value;
const unit = document.getElementById('unit').value;
const value = document.getElementById('value').value;

console.log(value, unit, state);

event.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 1CNu2NsLlW4ZGg9gRPIRQ");
  
  var raw = JSON.stringify({
    "type": "electricity",
    "electricity_unit": unit,
    "electricity_value": value,
    "country": "us",
    "state": state
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  
  fetch("https://www.carboninterface.com/api/v1/estimates", requestOptions)
    .then(response => response.json())
    .then(result =>{ console.log(result)
    const results = document.getElementById('results');
    results.innerHTML = `

    <h2>${result.data.attributes.carbon_lb} lbs. of carbon emitted<h2>
    <p>${result.data.attributes.carbon_kg} kilograms of carbon emitted<p>
    `
    })
    .catch(error => console.log('error', error));
})

const vehicle = document.querySelector('#vehicle_form');
