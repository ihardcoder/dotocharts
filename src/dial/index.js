import React from 'react';
import {render} from 'react-dom';
import {DialDOM} from './js';

// default configurations
const default_conf = {};


/**
 * @desc 入口函数
 * @param container-{DOM Element}: chart外层容器，一般由模板指定
 * @param opts-{Object}: 数据和配置选型的集合对象
 * @return chart实例-{React Object}
 **/
class Dial {
  constructor(container,opts){
    this.container = container;
    this.conf = Object.assign({},default_conf,opts&&opts.conf);
    this.dataset = Object.assign({},opts&&opts.dataset);
    this.DOM = null;
    this.init();
  }
  init(){
    let _size = this.conf.size || parseInt(d3.select(this.container).style('width'));
    let _fontSize,_fontFamily;
    if(this.conf.fontSize){
      _fontSize = this.conf.fontSize || 12;
    }
    if(this.conf.fontFamily){
      _fontFamily = this.conf.fontFamily || 'yahei,sans-serif';
    }
    this.DOM = render(
      <DialDOM size={_size} fontSize={_fontSize} fontFamily={_fontFamily} dataset={this.dataset}/>,
      this.container
    );
  }
  /**
   * @desc 更新组件的state，可用于响应式
   * @param opts-{Object}: 配置参数
   **/
  update(opts){
    if(!opts){
      return;
    }
    if(opts.fontSize){
      this.DOM.setState({
        fontSize: opts.fontSize
      });
    }
    if(opts.size){
      this.DOM.setState({
        size: opts.size
      });
    }
  }
}

export default Dial;