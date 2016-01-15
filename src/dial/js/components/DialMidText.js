import React,{PropTypes} from 'react';
import d3 from 'd3';
// 中心文字
const DialMidText = React.createClass({
  propTypes: {
	transform: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]).isRequired,
	finalscore: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	fontSize: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	midDy:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
  },	
  render(){
  	let _rankText = '超越了全国'+this.props.rank+'的团队';
  	let _rankTextTransform = d3.transform('scale(0.1)');
    return(
    <g transform={this.props.transform} style={{
      	fontSize: this.props.fontSize
      }}>
      <text textAnchor='middle' y={this.props.midDy} >{this.props.finalscore}</text>
      <text textAnchor='middle' y='7em' transform={_rankTextTransform}>{_rankText}</text>
    </g>
    );
  }
});

export default DialMidText;