import { Component } from 'react';
import Head from 'next/head';
import SearchInput from '../components/weather/search_input';
import CurrentWeather from '../components/weather/current_weather';
import 'babel-polyfill';

export default class Page extends Component {

  render() {
    return (
      <div className="root" >
        <Head>
          <title>Common Weather App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="/static/index.css" rel="stylesheet" />
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        </Head>
        <CurrentWeather />
        <SearchInput />
        <style jsx global>{`
          body {
            margin: 0;
          }
          html, body, div {
            height: 100%;
            width: 100%;
          }
          body > div:last-child {/* for purpose of removing an extra bottom div on chrome for windows */
            height: 0;
          }
          ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: rgba(255, 255, 255, 0.3);

          }
          ::-moz-placeholder { /* Firefox 19+ */
            color: rgba(255, 255, 255, 0.3);

          }
          input:-ms-input-placeholder { /* IE 10+ */
            color: rgba(255, 255, 255, 0.3) !important;

          }
          :-moz-placeholder { /* Firefox 18- */
            color: rgba(255, 255, 255, 0.3);

          }
        `}</style>
      </div>
    )
  }
}
