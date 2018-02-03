import { Component } from 'react';
import Forecast from './forecast';
import axios from 'axios';
import $ from 'jquery';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {zip: "", forecast: {}, loading: false, error: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.parseFiveDays = this.parseFiveDays.bind(this);
  }

  handleChange (e) {
    this.setState({ zip: e.target.value });
  }

  parseFiveDays (date, monthLength) {
    let fiveDays = [];
    let count = 0;
    while (fiveDays.length < 5) {
      const day = parseInt(date[2]);
      if ((day + count) > monthLength) {
        fiveDays.push((day + count) % monthLength); // account for end of the month, when days will start at 1 again
      } else {
        fiveDays.push(day + count);
      }
      count++;
    }
    return fiveDays;
  }

  parseForecast (weather) {
    const date = new Date(weather.data.list[0].dt*1000).toString().split(" "); // grab first available day for forecast (current day or next if it's late in the day)
    // ex: ["Sat", "Sep", "09", "2017", "00:00:00", "GMT-0400", "(EDT)"]
    let monthLength = 31;
    const thirtyMonths = ["Sep", "Apr", "Jun", "Nov"]; // months with 30 days

    if (date[1] === "Feb") {
       monthLength = parseInt(date[3]) % 4 === 0 ? 29 : 28; // if it's february, then monthLength = 28, unless it's a leap year (monthLength = 29)
    } else if (thirtyMonths.includes(date[1])) {
      monthLength = 30; // monthLength = 30 days if it's in our thirtyMonths array
    }

    const fiveDays = this.parseFiveDays(date, monthLength);  // create an array of the five dates we want the weather for

    let forecast = {}; // create a hash of the temperature and day { day: temp }
    Object.values(weather.data.list).forEach((info) => {
      const date = new Date(info.dt*1000).toString().split(" ");
      const dayNumber = parseInt(date[2]);
      const weekDay = date[0];

      if (forecast[dayNumber]) { // immediately return if we have already gotten forecast for this day
        return;
      } else if (fiveDays.includes(dayNumber)) { // otherwise if this day is in our fiveDays array, add the forecast to our hash
        const temp = Math.floor((info.main.temp * 9/5) - 459.67); // convert temp in Kelvin to Fahrenheit
        forecast[weekDay] = temp;
      }

    });
    this.setState({ forecast, loading: false }); // trigger a render that stops the loading spinner, and sets local state with forecast
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({ error: "", forecast: {}, loading: true }); // trigger a render to show loading bar, and remove previous forecast/error
    const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=";
    const zip = `${this.state.zip}`;
    const fullUrl = baseUrl + zip + "&appid=670e6d2b31b62201dc47b79f5a87b500";
    axios.get(fullUrl).then((weather) => {
      this.parseForecast(weather);
    }, (error) => {
      this.setState({error: "This is not a valid US zip code. Please enter your code again.",
        loading: false});
    });
    this.handleClick();
  }

  handleClick () {
    $('html, body').animate({
      scrollTop: $("#forecast").offset().top
    }, 1000);
  }

  render() {
    return (
      <div>
        <article>
          <form onSubmit={ this.handleSubmit }>
              <h1>Weather app</h1>
              <p>Type in your zip code to see how awful the weather is in your area this week.</p>
              <input placeholder="000000" onChange={ this.handleChange } value={ this.state.zip } />
              <img onClick={ this.handleClick } src="https://s3.us-east-2.amazonaws.com/icons123/downarrow+(1).png" />
          </form>
        </article>
        <Forecast forecast={ this.state.forecast } loading={ this.state.loading }/>
        <p className="error">{ this.state.error }</p>
        <style jsx>{`
          div {
            min-width: 320px;
            min-height: 568px;
            margin-bottom: 0;
            height: 100%;
          }
          article {
            height: 100%;
            background: #d34c34;
          }
          form {
            margin-left: 5%;
            position: relative;
            position: relative;
            justify-content: center;
            top: 45%;
            transform: translateY(-50%);
          }
          h1 {
            font: 35px "Tiempos", serif;
            color: #fff;
            margin-top: 0;
          }
          p {
            display: block;
            color: #fff;
            width: 420px;
            font: 17px "Apercu", sans-serif;
            font-weight: lighter;
            margin-bottom: 40px;
          }
          input {
            padding: 2% 2%;
            width: 50%;
            background: transparent;
            border: 2px solid white;
            font-size: 40px;
            font-weight: 300;
            color: #fff;
            letter-spacing: 4px;
          }
          img {
            cursor: pointer;
            height: 35px;
            display: table-header-group;
            position: absolute;
            top: 120%;
          }
          .error {
            position: relative;
            margin: 0 auto;
            top: -50%;
            transform: translateY(-50%);
          }
          @media only screen and (max-width: 768px) {
            input {
              width: 60%;
            }
          }
          @media only screen and (max-width: 480px) {
            input {
              width: 90%;
            }
            p {
              width: 300px;;
              font-size: 15px;
            }
          }
        `}</style>
      </div>
    )
  }
}
export default SearchInput
