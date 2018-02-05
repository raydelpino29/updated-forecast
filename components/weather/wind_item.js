import { Component } from 'react';

class WindItem extends Component {

  convertMetersPerSecondToMph(speed) {
    return (speed / 0.44704).toPrecision(2);
  }

  render() {
    const { speed, deg } = this.props.wind;
    // console.log(speed, deg);
    return (
      <div>
        <img src='../../static/arrow.svg' alt="" />
        <h4>{ this.convertMetersPerSecondToMph(speed) } MPH</h4>
        <style jsx>{`
          img {
            transform: rotate(${deg}deg);
          }
          h4 {
            color: #fff;
            font-family: Apercu;
            font-weight: 100;
          }
        `}
        </style>
      </div>
    );
  }
}

export default WindItem;
