import React,{PropTypes} from 'react';
import d3 from 'ykd3';

// 时刻小圆弧
const DialTick = React.createClass({
  propTypes:{
    radius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  },
  render(){
    let _arc = d3.svg.arc().innerRadius(this.props.radius-15).outerRadius(this.props.radius-5).startAngle(this.props.startAngle).endAngle(this.props.endAngle);
    return(
      <g style={{opacity:0.4}}>
        <path ref='tickpath'
         d={_arc()}
         fill={this.props.color}
         ></path>
      </g>
    );
  }
});

export default DialTick;