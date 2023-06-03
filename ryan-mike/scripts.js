function search() {
  const state = document.querySelector("#state").value;
  console.log(state);
  fetch(
    `http://api.airvisual.com/v2/cities?state=${state}&country=USA&key=641a0a1c-7768-4c72-8fa8-b0915b0ff70f`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const template = `<span id="aqius">Air Quality Index of the United States: ${data.data.current.pollution.aqius}</span>
      <span id="mainus">Main Pollutant of the United States: ${data.data.current.pollution.mainus}</span>
      <span id="humidity">Humidity: ${data.data.current.weather.hu}%</span>
      <span id="weather_icon">Weather Icon: <img src="https://www.airvisual.com/images/${data.data.current.weather.ic}.png"></img></span> 
      <span id="hPa">hPa: ${data.data.current.weather.pr}</span>
      <span id="temperature">Temperature: ${data.data.current.weather.tp} Celsius</span>
      <span id="windspeed">Wind Speed: ${data.data.current.weather.ws} meters/second</span>
      <span id="winddirection">Wind Direction: ${data.data.current.weather.wd} degrees</span>

        `;
      document.querySelector("#Map-Item").innerHTML = template;
    });
}
