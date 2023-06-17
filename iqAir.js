function search(name) {
  console.log(name);
  const state_dictionary = {
    AL: "Alabama",
    AK: "Alaska",
    AS: "American Samoa",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    DC: "District Of Columbia",
    FM: "Federated States Of Micronesia",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MH: "Marshall Islands",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    MP: "Northern Mariana Islands",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PW: "Palau",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VI: "Virgin Islands",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };
  const stateCapitals = {
    AL: "Montgomery",
    AK: "Juneau",
    AZ: "Phoenix",
    AR: "Little Rock",
    CA: "Sacramento",
    CO: "Denver",
    CT: "Hartford",
    DE: "Dover",
    FL: "Tallahassee",
    GA: "Atlanta",
    HI: "Honolulu",
    ID: "Boise",
    IL: "Springfield",
    IN: "Indianapolis",
    IA: "Des Moines",
    KS: "Topeka",
    KY: "Jeffersontown",
    LA: "Baton Rouge",
    ME: "Rumford",
    MD: "Annapolis",
    MA: "Boston",
    MI: "Lansing",
    MN: "Saint Paul",
    MS: "Jackson",
    MO: "Saint Louis",
    MT: "Helena",
    NE: "Lincoln",
    NV: "Carson City",
    NH: "Concord",
    NJ: "Trenton",
    NM: "Santa Fe",
    NY: "Albany",
    NC: "Raleigh",
    ND: "Bismarck",
    OH: "Columbus",
    OK: "Oklahoma City",
    OR: "Salem",
    PA: "Harrisburg",
    RI: "Providence",
    SC: "Columbia",
    SD: "Pierre",
    TN: "Nashville",
    TX: "Austin",
    UT: "Salt Lake City",
    VT: "Washington",
    VA: "Richmond",
    WA: "Olympia",
    WV: "Charleston",
    WI: "Madison",
    WY: "Cheyenne",
  };
  const state_unabbreviated = state_dictionary[name];
  const state_city = stateCapitals[name];

  const iqAirKey1 = "12959be2-9929-4223-8da0-235c21ceb242";
  const iqAirKey2 = "641a0a1c-7768-4c72-8fa8-b0915b0ff70f";
  const iqAirKey3 = "f73474b4-eacd-43eb-aa05-a57de4b3b04c";
  const iqAirKey4 = "0a66e69f-e3d9-4583-a8fb-13df84f88d56";
  const iqAirKey5 = "355bb222-3ba6-4874-86e7-85e1bddb4afa";
  const iqAirKey6 = "dd1e1e6e-e734-4b3a-9c44-d43a889d54f3";

  const keys = [
    iqAirKey1,
    iqAirKey2,
    iqAirKey3,
    iqAirKey4,
    iqAirKey5,
    iqAirKey6,
  ];

  const randomKeyIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomKeyIndex];
  console.log(randomKey);
  fetch(
    ` http://api.airvisual.com/v2/city?city=${state_city}&state=${state_unabbreviated}&country=USA&key=${randomKey}
    `
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const template = `
      <div id="state_title">
        ${state_city}, ${state_unabbreviated}
      </div>
      <div id="Map-Item">
        <div id="text-ctnr">
          <div id="space"></div>
          <div id="aqius">Air Quality Index of the United States: ${data.data.current.pollution.aqius}</div>
          <div id="mainus">Main Pollutant of the United States: ${data.data.current.pollution.mainus}</div>
          <div id="humidity">Humidity: ${data.data.current.weather.hu}%</div>
          <div id="hPa">hPa: ${data.data.current.weather.pr}</div>
          <div id="temperature">Temperature: ${data.data.current.weather.tp} Celsius</div>
          <div id="windspeed">Wind Speed: ${data.data.current.weather.ws} meters/second</div>
          <div id="winddirection">Wind Direction: ${data.data.current.weather.wd} degrees</div>
        </div>
        <div id="weather_icon">Weather Icon:</div>
        <div id="weather_img"><img src="https://www.airvisual.com/images/${data.data.current.weather.ic}.png"></img></div>
      </div>
        `;
      document.querySelector("#iqAirCtnr").innerHTML = template;
    });
}
