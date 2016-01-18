import React,{PropTypes} from 'react';
import d3 from 'ykd3';
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
	mainFontSize: PropTypes.number.isRequired,
	subFontSize: PropTypes.number.isRequired,
	mainDy:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	subDy:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
  },	
  render(){
  	let _rankText = '超越了全国'+this.props.rank+'的团队';
  	let _rankTextTransform = d3.transform('scale(0.1)');
    return(
    <g transform={this.props.transform} >
      <text style={{
      	fontSize: this.props.mainFontSize
      }} textAnchor='middle' y={this.props.mainDy} >{this.props.finalscore}</text>
      <text style={{
      	fontSize: this.props.subFontSize
      }} textAnchor='middle' y={this.props.subDy} >{_rankText}</text>
    </g>
    );
  }
});

export default DialMidText;