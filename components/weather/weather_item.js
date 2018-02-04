import { Component } from 'react';
import CloudMeter from './cloud_meter';

const WeatherItem = ({ forecast, day }) => {
  const weekDays = { "Mon":"Monday", "Tue": "Tuesday", "Wed":"Wednesday",
          "Thu":"Thursday", "Fri":"Friday", "Sat":"Saturday", "Sun":"Sunday" };
  return (
    <div>
      <p className="day">{ weekDays[day] }</p>
      <section>
        <p>{ forecast[day].temp }</p><small>F</small>
        <CloudMeter cloudiness={ forecast[day].cloudiness } />
      </section>
      <style jsx>{`
        div {
          border: 1px solid #e7e7e7;
          text-align: center;
          width: 17vw;
        }
        section {
          border-top: 1px solid #e7e7e7;
          padding-top: 18px;
        }
        p, small {
          font-family: "Apercu", sans-serif;
          color: #fff;
        }
        small {
          font-size: 2.5vw;
          color: #fff;
          position: relative;
          left: 5px;
        }
        section p {
          font-family: "Tiempos", serif;
          font-size: 6vw;
          display: inline;
          letter-spacing: 4px;
        }
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          section {
            padding-top: 15%;
            padding-bottom: 0px;
          }
          section p {
            font-size: 7vw;
          }
        }
        .day {
          font-size: 1.5vw;
        }
        @media only screen and (max-width: 768px) {
          div {
            min-width: 120px;
            height: 100%;
          }
          section {
            padding-top: 0.8em;
            padding-bottom: 0.5em;
          }
          small {
            font-size: 15px;
          }
          section p {
            font-size: 33px;
          }
          .day {
            font-size: 12px;
            margin: 9px;
          }
          @media only screen and (max-width: 480px) {
            div {
              min-width: 110px;
            }
            section p {
              font-size: 35px;
            }
          }
        }
      `}</style>
    </div>
  )
};

export default WeatherItem;
