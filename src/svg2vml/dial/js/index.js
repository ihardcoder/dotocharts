import Raphael from 'webpack-raphael';
import  './extends';

// default configurations
const default_conf = {
	
};


/**
 * @desc 入口函数
 * @param container-{DOM Element}: chart外层容器，一般由模板指定
 * @param opts-{Object}: 数据和配置选型的集合对象
 * @return chart实例-{React Object}
 **/
export class Dial {
  constructor(container,opts){
    this.container = container;
    this.dataset = Object.assign({},opts&&opts.dataset);
    this.conf = Object.assign({},default_conf,opts&&opts.conf);
    let centreX = this.conf.size/2;
    let centreY = this.conf.size/2;
    this.conf = Object.assign({},this.conf,{
    	centre: {
    		x: centreX,
    		y: centreY
    	}
    })
    this.DOM = null;
    this.init();
  }
  init(){
    let _size = this.conf.size;
    let _fontSize,_fontFamily;
    if(this.conf.fontSize){
      _fontSize = this.conf.fontSize || 'inherit';
    }
    if(this.conf.fontFamily){
      _fontFamily = this.conf.fontFamily || 'inherit';
    }
    this.DOM = Raphael(this.container,this.conf.size,this.conf.size);
    this.generateArcs();
  }
  generateArcs(){
  	let _seperation = this.dataset.children.length;
  	let averageAngle = 360/_seperation;
  	let maxGap = 5;
  	let step = averageAngle*0.1>maxGap? averageAngle-maxGap: averageAngle*0.9;
  	let rotate = step/2;
    // 刻度个数
    let _ticksum = 20;
    //刻度弧度
    let _tickstep = step/_ticksum;
    
  	for(let i=0;i<_seperation;i++){
      let _startAngle = averageAngle * i - rotate + 90;
      let _endAngle = _startAngle + step;
      this.DOM.dialzone(this.conf.centre.x, this.conf.centre.y, this.conf.size / 2 - 40,
        _startAngle, _endAngle).attr({
        "stroke-width": '2',
        "stroke": '#BECBD2'
      });
      let _tickAnimation = Raphael.animation({
        'fill':this.dataset.children[i].color,
        'stroke':this.dataset.children[i].color
      },50);
      let _coloredTicksNum = Math.floor(this.dataset.children[i].score*_ticksum/100);
      for (let j = 0; j < _ticksum; j++) {
        if (j + 1 <= _coloredTicksNum) {
          this.DOM.dialtick(this.conf.centre.x, this.conf.centre.y, this.conf.size / 2 - 55, this.conf.size / 2 - 45,
            _startAngle + _tickstep * j, _startAngle + _tickstep * (j + 2 / 3)).attr({
            "stroke": '#BECBD2',
            "fill": '#BECBD2'
          }).animate(_tickAnimation.delay(50 * j));
        } else {
          this.DOM.dialtick(this.conf.centre.x, this.conf.centre.y, this.conf.size / 2 - 55, this.conf.size / 2 - 45,
            _startAngle + _tickstep * j, _startAngle + _tickstep * (j + 2 / 3)).attr({
            "stroke": '#BECBD2',
            "fill": '#BECBD2'
          });
        }
      }
  	}
  }
  /**
   * @desc 更新组件的state，可用于响应式
   * @param opts-{Object}: 配置参数
   **/
  // update(opts){
  //   if(!opts){
  //     return;
  //   }
  // }
}

