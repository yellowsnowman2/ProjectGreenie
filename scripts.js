$(document).ready(function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides((slideIndex = n));
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
  var states = document.getElementsByClassName("state");
  var areas = $.map($(states), function (el) {
    return {
      key: $(el).attr("id"),
      n: $(el).attr("data-info"),
      intake: $(el).attr("data-in"),
      adopt: $(el).attr("data-adopt"),
      euth: $(el).attr("data-euth"),
    };
  });

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  var states = document.getElementsByClassName("state");
  var areas = $.map($(states), function (el) {
    return {
      key: $(el).attr("id"),
      n: $(el).attr("data-info"),
      intake: $(el).attr("data-in"),
      adopt: $(el).attr("data-adopt"),
      euth: $(el).attr("data-euth"),
    };
  });

  console.log("areas", areas);

  var list = areas.map((a) => a.key);
  console.log("list", list);

  $("g").click(function () {
    var style = this.style.fill;

    const name = this.id;
    fetch(
      `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=DEMO_KEY&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10&address=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);

        $("#info-box").css("display", "block");
        $("#info-box").html(
          "<center><b>" +
            data.station_info.state +
            "</center></b><br>Ac_Annual: " +
            data.outputs.ac_annual +
            "<br>Solrad_Annual: " +
            data.outputs.solrad_annual +
            "<br>Capacity_Factor: " +
            data.outputs.capacity_factor
        );
      });

    if (slideIndex == 1) {
      this.classList.add("active");
      this.setAttribute(
        "style",
        "fill:" + style + ";opacity:.8;stroke:#BF0A30;stroke-width:3;"
      );
      slideIndex = 2;
    } else {
      this.classList.remove("active");
      this.setAttribute("style", "fill:" + style + ";opacity:.5;");
      slideIndex = 1;
    }

    search(name);
  });

  $("g").hover(function (e) {
    var index = list.indexOf(this.id);
    //this.id.css("outline", "solid");
    var tt = areas[index];

    var intake = parseInt(tt.intake);
  });

  $("g").mouseleave(function (e) {
    $("#info-box").css("display", "none");
  });

  $(document)
    .mousemove(function (e) {
      $("#info-box").css("top", e.pageY - $("#info-box").height() - 30);
      $("#info-box").css("left", e.pageX - $("#info-box").width() / 2);
    })
    .mouseover();

  $("#map_picker").on("change", function () {
    picker(this.value);
  });

  var color = d3.scale
    .linear()
    .domain([0, 0.5, 1])
    .range(["#21ba45", "#fbbd08", "#db2828"]);

  function picker(select) {
    for (var i = 0; i <= 50; i++) {
      var st = states[i].id;
      var index = list.indexOf(st);
      var info;
      if (select == "Intake") {
        info = areas[index].intake / 10000;
      }
      if (select == "Adoptions") {
        info = areas[index].adopt / areas[index].intake;
      }
      if (select == "Euthanasia") {
        info = areas[index].euth / areas[index].adopt;
      }
      states[i].setAttribute(
        "style",
        "fill:" + color(info) + "!important; opacity:.5;"
      );
    }
  }

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
      KY: "Frankfort",
      LA: "Baton Rouge",
      ME: "Augusta",
      MD: "Annapolis",
      MA: "Boston",
      MI: "Lansing",
      MN: "St. Paul",
      MS: "Jackson",
      MO: "Jefferson City",
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
      VT: "Montpelier",
      VA: "Richmond",
      WA: "Olympia",
      WV: "Charleston",
      WI: "Madison",
      WY: "Cheyenne",
    };
    const state_unabbreviated = state_dictionary[name];
    const state_city = stateCapitals[name];
    console.log(state_unabbreviated);
    fetch(
      ` http://api.airvisual.com/v2/city?city=${state_city}&state=${state_unabbreviated}&country=USA&key=641a0a1c-7768-4c72-8fa8-b0915b0ff70f
      `
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const template = `
        <div id="text-ctnr">
          <div id="aqius">Air Quality Index of the United States: ${data.data.current.pollution.aqius}</div>
          <div id="mainus">Main Pollutant of the United States: ${data.data.current.pollution.mainus}</div>
          <div id="humidity">Humidity: ${data.data.current.weather.hu}%</div>
          <div id="hPa">hPa: ${data.data.current.weather.pr}</div>
          <div id="temperature">Temperature: ${data.data.current.weather.tp} Celsius</div>
          <div id="windspeed">Wind Speed: ${data.data.current.weather.ws} meters/second</div>
          <div id="winddirection">Wind Direction: ${data.data.current.weather.wd} degrees</div>
        </div>
        <div id="weather_icon">Weather Icon: <img src="https://www.airvisual.com/images/${data.data.current.weather.ic}.png"></img></div>
  
        
          `;
        document.querySelector("#Map-Item").innerHTML = template;
      });
  }

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
      KY: "Frankfort",
      LA: "Baton Rouge",
      ME: "Augusta",
      MD: "Annapolis",
      MA: "Boston",
      MI: "Lansing",
      MN: "St. Paul",
      MS: "Jackson",
      MO: "Jefferson City",
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
      VT: "Montpelier",
      VA: "Richmond",
      WA: "Olympia",
      WV: "Charleston",
      WI: "Madison",
      WY: "Cheyenne",
    };
    const state_unabbreviated = state_dictionary[name];
    const state_city = stateCapitals[name];
    console.log(state_unabbreviated);
    fetch(
      ` http://api.airvisual.com/v2/city?city=${state_city}&state=${state_unabbreviated}&country=USA&key=641a0a1c-7768-4c72-8fa8-b0915b0ff70f
    `
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const template = `
      <div id="title-card">${state_city}, ${state_unabbreviated}</div>
      <div>
        <div id="text-ctnr">
        <div id="aqius">Air Quality Index of the United States: ${data.data.current.pollution.aqius}</div>
        <div id="mainus">Main Pollutant of the United States: ${data.data.current.pollution.mainus}</div>
        <div id="humidity">Humidity: ${data.data.current.weather.hu}%</div>
        <div id="hPa">hPa: ${data.data.current.weather.pr}</div>
        <div id="temperature">Temperature: ${data.data.current.weather.tp} Celsius</div>
        <div id="windspeed">Wind Speed: ${data.data.current.weather.ws} meters/second</div>
        <div id="winddirection">Wind Direction: ${data.data.current.weather.wd} degrees</div>
      </div>
      <div id="weather_icon">Weather Icon: </div>
      <div id="weather_image"><img src="https://www.airvisual.com/images/${data.data.current.weather.ic}.png"></img></div>
      </div>
      
        `;
        document.querySelector("#Map-Item").innerHTML = template;
      });
  }

  picker("Intake");
});
