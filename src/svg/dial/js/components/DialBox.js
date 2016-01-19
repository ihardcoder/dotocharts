import React,{PropTypes} from 'react';

// 容器dom
const DialBox = React.createClass({
  propTypes:{
  	size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired
  },
  render(){
    return(
    <svg width={this.props.size} height={this.props.size} style={{
        fontSize: this.props.fontSize,
        fontFamily: this.props.fontFamily
      }}>
      {this.props.children}
    </svg>
    );
  }
});

export default DialBox;