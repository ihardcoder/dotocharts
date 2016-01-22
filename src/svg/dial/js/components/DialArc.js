import React,{PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import d3 from 'ykd3';

import DialTick from './DialTick';

// 表盘外围圆弧
const DialArc = React.createClass({
  propTypes: {
    radius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    padding: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    border: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    ticksum: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    tickstep: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    range: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fontSize: PropTypes.number.isRequired,
    fontColor: PropTypes.string.isRequired,
  },
  getInitialState() {
      return {
          pathArc:'',
          arcID: 'arc_'+this.props.range+(new Date()).getTime()  
      };
  },
  componentDidMount(){
    let _arcAniTime = 600,_textAniTime = 300,_tickAniTime=50;
    // path动画
    let _endAngle =  this.props.endAngle;
    let _arc = d3.svg.arc().innerRadius(this.props.radius-this.props.padding-this.props.border).outerRadius(this.props.radius-this.props.padding).startAngle(this.props.startAngle);
    let path = d3.select(this.refs.path);
    path.datum({endAngle: this.props.startAngle});
    path.transition().duration(_arcAniTime).attrTween('d', function(d){
      let interpolate = d3.interpolate(d.endAngle,_endAngle);
      return function(t){
        d.endAngle = interpolate(t);
        return _arc(d);
      }
    });  
    //text动画
    let text = d3.select(this.refs.text);
    text.transition().delay(_arcAniTime).duration(_textAniTime).style('opacity','1');
    // ticks动画
    let _textShowtime = _arcAniTime/this.props.ticksum;
    for (let i = 0; i < this.props.ticksum; i++) {
      d3.select(findDOMNode(this.refs['tick_' + i])).transition().delay(_textShowtime * i).duration(_textShowtime*2/3).style('opacity', 0.4);
    }
    let score_ticks_num = Math.floor(this.props.dataset.score*this.props.ticksum/100);
    for(let i=0;i<score_ticks_num;i++){
      d3.select(findDOMNode(this.refs['tick_'+i])).transition().delay(_arcAniTime+_tickAniTime*i).duration(_tickAniTime).style('opacity',1);
    }
  },
  render(){
    let _arc = d3.svg.arc().innerRadius(this.props.radius-this.props.padding-this.props.border).outerRadius(this.props.radius-this.props.padding).startAngle(this.props.startAngle).endAngle(this.props.endAngle);
    let _transform = d3.transform('translate('+this.props.radius+','+this.props.radius+')');
    let ticks = [];
    for(let i=0;i<this.props.ticksum;i++){
      let _ref = 'tick_'+i;
      ticks.push(<DialTick startAngle={this.props.startAngle+this.props.tickstep*i}
                 endAngle={this.props.startAngle+this.props.tickstep*(i+2/3)}
                 radius = {this.props.radius-this.props.padding-this.props.border}
                 color = {this.props.dataset.color}
                 key={i}
                 ref={_ref}/>);
    }
    return(
      <g transform = {_transform}>
      <path ref='path'
       id = {this.state.arcID}
       d={_arc()}
       fill={this.props.dataset.color}></path> 
      <text ref='text' dx='50%' dy='-10px'textAnchor='end' style={{
        opacity:0,
        fontSize: this.props.fontSize
      }}
       fill={this.props.fontColor}>
       <textPath xlinkHref={'#'+this.state.arcID}>{this.props.dataset.name}</textPath>
      </text>
      {ticks}
      </g>
    ); 
  } 
});

export default DialArc;