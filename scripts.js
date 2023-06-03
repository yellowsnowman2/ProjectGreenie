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

var counter = 1;

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
          //parseInt(tt.intake).toFixed(0) +
          "<br>Capacity_Factor: " +
          data.outputs.capacity_factor
        //parseInt(tt.adopt).toFixed(0) +
      );
    });

  if (counter == 1) {
    this.classList.add("active");
    this.setAttribute(
      "style",
      "fill:" + style + ";opacity:.8;stroke:#BF0A30;stroke-width:3;"
    );
    counter = 2;
  } else {
    this.classList.remove("active");
    this.setAttribute("style", "fill:" + style + ";opacity:.5;");
    counter = 1;
  }
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
    var st2 = document.getElementById(st);
    states[i].setAttribute(
      "style",
      "fill:" + color(info) + "!important; opacity:.5;"
    );
  }
}
picker("Intake");
