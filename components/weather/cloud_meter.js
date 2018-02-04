import { Component } from 'react';

const CloudMeter = ({ cloudiness }) => {
  return (
    <section>
      <small>{ cloudiness }%</small>
      <div className="outer">
        <div></div>
      </div>
      <small>Cloudiness</small>
      <style jsx>{`
        .outer, .outer div {
          border-radius: 5px;
          margin: 0 auto;
        }
        small {
          font-family: Apercu;
          color: #fff;
        }
        .outer {
          width: 90%;
          background: gray;
        }
        .outer div {
          width: ${cloudiness * 0.9}%;
          height: 5px;
          background: #d34c34;
          margin-left: 0;
        }
        @media only screen and (max-width: 768px) {
          section {
            display: none;
          }
        }
        `}
      </style>
    </section>
  );
};

export default CloudMeter;
