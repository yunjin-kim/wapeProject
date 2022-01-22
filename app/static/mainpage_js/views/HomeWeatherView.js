import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWeatherView extends View {
  constructor() {
    super(qs(".mainpage__weather"));

    this.template = new Template();
  }

  loadWeather(weatherData, tempData, maxTempData, minTempData) {
    this.temperatureWrap = qs(".mainpage__weather__condi");
    this.temperatureWrap.innerHTML = this.template.weatherTemplate(weatherData, tempData, maxTempData, minTempData);
  }

}

class Template {
  weatherTemplate(weatherData, tempData, maxTempData, minTempData) {
    return `
      <h4 class="mainpage__weather__weather">${weatherData}</h4>
        <div class="mainpage__weather__flex">
          <h2 class="mainpage__weather__temp">${tempData}</h2>
          <p>
            (<span class="mainpage__weather__lowtemp">${minTempData}</span>,
            <span class="mainpage__weather__hightemp">${maxTempData}</span>)
          </p>
        </div>
    `;
  }
}