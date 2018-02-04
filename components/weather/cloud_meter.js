import { Component } from 'react';

const CloudMeter = ({ humidity }) => {
  return (
    <section>
      <style jsx<{`
          section {
            width: ${humidity};
            height: 5px;
          }
        `}
      </style>
    </section>
  );
};

export default CloudMeter;
