import React from 'react';
import axios from 'axios';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.state = { current: null, loading: true, error: null };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat;
      let long;
      [lat, long] = [position.coords.latitude, position.coords.longitude];
      this.fetchWeather(lat,long);
    }, (error) => {
      this.setState({ error: "Couldn't obtain location.", loading: false });
    });
  }

  fetchWeather(lat, long) {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const pos = `lat=${lat}&lon=${long}`;
    const fullURL = baseURL + pos + "&appid=670e6d2b31b62201dc47b79f5a87b500";
    axios.get(fullURL).then((weather) => {
      this.parseWeather(weather);
    });
  }

  parseWeather(weather) {
    let current = {};
    Object.keys(weather.data.main).forEach((item) => {
       if (item === "temp" || item === "temp_min" || item === "temp_max") {
        const temp = Math.floor((weather.data.main[item] * 9/5) - 459.67);
        current[item] = temp;
      }
    });
    this.setState({ current, loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <p className="status">Finding location...
        <style jsx>{`
        p {
          position: absolute;
          color: white;
          font-family: Apercu;
          margin-left: 5%;
        }
        `}</style>
        </p>
      );
    } else if (this.state.error) {
      return (
        <p className="status">{ this.state.error }
        <style jsx>{`
        p {
          position: absolute;
          color: white;
          font-family: Apercu;
          margin-left: 5%;
        }
        `}</style>
        </p>
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
              opacity: 0.9;
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
