import React from 'react';
import axios from 'axios';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.state = { current: {} };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat;
      let long;
      [lat, long] = [position.coords.latitude, position.coords.longitude];
      this.fetchWeather(lat,long);
    });

  }

  fetchWeather(lat, long) {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const pos = `lat=${lat}&lon=${long}`;
    const fullURL = baseURL + pos + "&appid=670e6d2b31b62201dc47b79f5a87b500";
    axios.get(fullURL).then((weather) => {
      this.parseWeather(weather);
    }, (error) => {

    });
  }

  parseWeather(weather) {
    let current = {};
    Object.keys(weather.data.main).forEach((item) => {
      if (item === "humidity") {
        current[item] = weather.data.main[item];
      } else if (item === "temp" || item === "temp_min" || item === "temp_max") {
        const temp = Math.floor((weather.data.main[item] * 9/5) - 459.67);
        current[item] = temp;
      }
    });
    this.setState({ current });
  }

  render() {
    return (
      <article className="currentWeather">
      <section>
        <h3>Currently:</h3>
        <p>{ this.state.current.temp }</p><small>F</small>
      </section>
      <section>
        <h3>High Of:</h3>
        <p>{ this.state.current.temp_max }</p><small>F</small>
      </section>
      <section>
        <h3>Low Of:</h3>
        <p>{ this.state.current.temp_min }</p><small>F</small>
      </section>
        <style jsx>{`
          article {
            border-left: 1px solid white;
            border-bottom: 1px solid white;
            position: absolute;
            display: flex;
            flex-direction: column;
            right: 0;
          }
          section {
            display flex;
            margin-right: 10px;
          }
          h3, p, small {
            color: white;
          }
          p {
            margin: 0;
            font-size: 35px;
            position: relative;
            font-family: Tiempos;
          }
          h3 {
            margin: 12px 5px 5px;
            font-weight: 100;
          }
          small {
            margin-top: 18px;
          }
        `}</style>
      </article>
    )
  }
}

export default CurrentWeather;
