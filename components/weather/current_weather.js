import React from 'react';
import axios from 'axios';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.state = { current: {}, error: null, loading: true };
  }

  componentDidMount() {
    let indicator = false;
    navigator.geolocation.getCurrentPosition((position) => {
      indicator = true;
      let lat;
      let long;
      [lat, long] = [position.coords.latitude, position.coords.longitude];
      this.fetchWeather(lat,long);
    });
    if (indicator) {
      this.setState({ error: "Couldn't find your location." });
    }
  }

  fetchWeather(lat, long) {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const pos = `lat=${lat}&lon=${long}`;
    const fullURL = baseURL + pos + "&appid=670e6d2b31b62201dc47b79f5a87b500";
    axios.get(fullURL).then((weather) => {
      this.parseWeather(weather);
    }, (error) => {
      this.setState({ error: "Couldn't find your location." });
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
    if (this.state.error) {
      return (
        <article>
          <p>{ this.state.error }</p>
        </article>
      );
    } else {
      return (
        <article>
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
              position: absolute;
              display: flex;
              flex-direction: row;
              left: 0;
              margin-left: 5%;
            }
            section {
              display: flex;
              margin-right: 10px;
            }
            h3, p, small {
              color: white;
            }
            p {
              margin: 0;
              margin-top: 13px;
              margin-right: 2px;
              font-size: 17px;
              position: relative;
              font-family: Tiempos;
              letter-spacing: 1px;
            }
            h3 {
              margin: 11px 5px 5px;
              margin-left: 0;
              font-size: 17px;
              font-weight: 100;
              font-family: Apercu;
            }
            small {
              margin-top: 14px;
              font-family: Apercu;
            }
            `}</style>
          </article>
        )

    }
  }
}

export default CurrentWeather;
