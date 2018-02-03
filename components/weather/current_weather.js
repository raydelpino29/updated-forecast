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
      if (item === "temp" || item === "pressure" || item === "humidity") {
        current[item] = weather.data.main[item];
      }
    });
    this.setState({ current });
  }

  render() {
    debugger
    return (
      <section className="currentWeather">
        <h1>{ this.state.current.pressure }</h1>
        <p>{ this.state.current.temp }</p>
        <p>{ this.state.current.humidity }</p>
        <style jsx>{`
          section {
            border: 1px solid black;
            position: relative;
          }
        `}</style>
      </section>
    )
  }
}

export default CurrentWeather;
