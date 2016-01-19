import Raphael from 'webpack-raphael';

Raphael.fn.arc = function(centerX,centerY,radius,startAngle,endAngle){
  let _arcStr='';
  let _startX = centerX-radius*Math.cos(startAngle*Math.PI/180);
  let _startY = centerY-radius*Math.sin(startAngle*Math.PI/180);
  let _endX = centerX-radius*Math.cos(endAngle*Math.PI/180); 
  let _endY = centerY-radius*Math.sin(endAngle*Math.PI/180);
  _arcStr = [radius, radius, 0, 0, 1, _endX, _endY].join(' ');
  
  return 'M'+_startX+' '+_startY +' A '+_arcStr;
}

Raphael.fn.dialzone = function(centerX,centerY,radius,startAngle,endAngle){
  let _arcStr=this.arc(centerX,centerY,radius,startAngle,endAngle);
  
  return this.path(_arcStr);
}

Raphael.fn.dialtick = function(centerX,centerY,innerRadius,outerRadius,startAngle,endAngle){
  let _arc_outer = this.arc(centerX,centerY,outerRadius,startAngle,endAngle);
  let _arc_inner = this.arc(centerX,centerY,innerRadius,endAngle,startAngle);
  // 右上角坐标
  let _rigntTopX = centerX-outerRadius*Math.cos(endAngle*Math.PI/180);
  let _rightTopY = centerY-outerRadius*Math.sin(endAngle*Math.PI/180);
  // 右下角坐标
  let _rigntBottomX = centerX-innerRadius*Math.cos(endAngle*Math.PI/180);
  let _rightBottomY = centerY-innerRadius*Math.sin(endAngle*Math.PI/180);
  // 左上角坐标
  let _leftTopX = centerX-outerRadius*Math.cos(startAngle*Math.PI/180);
  let _leftTopY = centerY-outerRadius*Math.sin(startAngle*Math.PI/180);
  // 左下角坐标
  let _leftBottomX = centerX-innerRadius*Math.cos(startAngle*Math.PI/180);
  let _leftBottomY = centerY-innerRadius*Math.sin(startAngle*Math.PI/180);
  
  const _path = _arc_outer+'L'+_rigntBottomX+' '+_rightBottomY+_arc_inner+'L'+_leftTopX+' '+_leftTopY;
  return this.path(_path);
}