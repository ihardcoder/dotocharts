import React,{PropTypes} from 'react';

// 容器dom
const DialBox = React.createClass({
  propTypes:{
  	size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  },
  render(){
    return(
    <svg width={this.props.size} height={this.props.size} style={{
        fontSize: this.props.fontSize || 'auto'
      }}>
      {this.props.children}
    </svg>
    );
  }
});

export default DialBox;