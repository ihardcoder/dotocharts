import React,{PropTypes} from 'react';
import d3 from 'ykd3';

import DialBox from './DialBox';
import DialArc from './DialArc';
import DialMidText from './DialMidText';

// 整体组件入口
const DialDOM = React.createClass({
  propTypes:{
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    fontColor: PropTypes.string,
    dataset: PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
        fontSize: 12,
        fontFamily: 'inherit',
        fontColor: 'inherit'  
    };
  },
  getInitialState() {
    // size和fontSize可以改变，所以作为组件的state使用
    return {
      size: this.props.size,
      fontSize: this.props.fontSize        
    };
  },
  render(){
    const _data = this.props.dataset.children;
    let _Arcs = [];
    let _total = _data.length;
    let _average = 2/_total*Math.PI;
    // 最大间距不超过5度
    let _maxGap = 5*Math.PI/180;
    // 实体狐仙的跨度
    let _step = _average*0.1>_maxGap?_average-_maxGap:_average*0.9;
    // 旋转负角度
    let _rotate = _step/2;
    // 刻度个数
    let _ticksum = 20;
    //刻度弧度
    let _tickstep = _step/_ticksum;
    // 标签的字号
    let _nameFontSize = this.state.fontSize;
    // 中间文字的主标题字号
    let _midMainFontSize = this.state.fontSize * 3;
    // 中间文字的副标题字号
    let _midSubFontSize = this.state.fontSize;
    // 中间文字垂直偏移
    let _mainDy = this.state.fontSize/10;
    // 中间文字副标题字号
    let _subDy = this.state.fontSize*1.5;
    if(_data){
      for(let i=0;i<_total;i++){
        let _startAngle = _average*i - _rotate;
        let _endAngle = _startAngle + _step;        
        _Arcs.push(<DialArc radius={this.state.size/2} 
                   dataset={_data[i]} 
                   key={i} 
                   range={i} 
                   startAngle={_startAngle} 
                   endAngle={_endAngle} 
                   padding='30' 
                   border='2'
                   ticksum = {_ticksum}
                   tickstep={_tickstep}
                   fontSize={_nameFontSize}
                   fontColor={this.props.fontColor}/>);
      }
    }
    let _transform = d3.transform('translate('+this.state.size/2+','+this.state.size/2+')');               
    return(
      <DialBox size={this.state.size} fontSize={this.props.fontSize} fontFamily={this.props.fontFamily} >
        {_Arcs}
        <DialMidText 
        finalscore={this.props.dataset.score} 
        rank={this.props.dataset.rank} 
        transform={_transform}
        mainFontSize={_midMainFontSize}
        subFontSize={_midSubFontSize}
        fontColor={this.props.fontColor}
        mainDy={_mainDy}
        subDy={_subDy}/>
      </DialBox>
    );
  }
});

export default DialDOM;

