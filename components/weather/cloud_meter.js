import { Component } from 'react';

const CloudMeter = ({ cloudiness }) => {
  debugger
  return (
    <section>
      <style jsx>{`
          section {
            width: ${cloudiness}%;
            height: 5px;
            background: black;
          }
        `}
      </style>
    </section>
  );
};

export default CloudMeter;
