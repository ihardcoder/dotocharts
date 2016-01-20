Raphael.fn.arc = function(centerX, centerY, radius, startAngle, endAngle) {
	var _arcStr = '';
	var _startX = centerX - radius * Math.cos(startAngle * Math.PI / 180);
	var _startY = centerY - radius * Math.sin(startAngle * Math.PI / 180);
	var _endX = centerX - radius * Math.cos(endAngle * Math.PI / 180);
	var _endY = centerY - radius * Math.sin(endAngle * Math.PI / 180);
	_arcStr = [radius, radius, 0, 0, 1, _endX, _endY].join(' ');

	return 'M' + _startX + ' ' + _startY + ' A ' + _arcStr;
}

Raphael.fn.dialzone = function(centerX, centerY, radius, startAngle, endAngle) {
	var _arcStr = this.arc(centerX, centerY, radius, startAngle, endAngle);

	return this.path(_arcStr);
}

Raphael.fn.dialtick = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) {
	var _arc_outer = this.arc(centerX, centerY, outerRadius, startAngle, endAngle);
	var _arc_inner = this.arc(centerX, centerY, innerRadius, endAngle, startAngle);
	// 右下角坐标
	var _rigntBottomX = centerX - innerRadius * Math.cos(endAngle * Math.PI / 180);
	var _rightBottomY = centerY - innerRadius * Math.sin(endAngle * Math.PI / 180);
	// 左上角坐标
	var _leftTopX = centerX - outerRadius * Math.cos(startAngle * Math.PI / 180);
	var _leftTopY = centerY - outerRadius * Math.sin(startAngle * Math.PI / 180);

	var _path = _arc_outer + 'L' + _rigntBottomX + ' ' + _rightBottomY + _arc_inner + 'L' + _leftTopX + ' ' + _leftTopY;
	return this.path(_path);
}
Raphael.fn.subTitle = function(){
	
}

/**
 * @desc 入口函数
 * @param container-{DOM Element}: chart外层容器，一般由模板指定
 * @param opts-{Object}: 数据和配置选型的集合对象
 * @return chart实例-{React Object}
 **/
var Dial = function(container, opts) {
	this.container = container;
	this.dataset = opts && opts.dataset;
	this.conf = opts && opts.conf;
	var centreX = this.conf.size / 2;
	var centreY = this.conf.size / 2;
	this.conf.centre = {
		x: centreX,
		y: centreY
	}
	this.DOM = null;
	this.init();
}

Dial.prototype.init = function() {
	var _size = this.conf.size;
	var _fontSize, _fontFamily;
	if (this.conf.fontSize) {
		_fontSize = this.conf.fontSize || 'inherit';
	}
	if (this.conf.fontFamily) {
		_fontFamily = this.conf.fontFamily || 'inherit';
	}
	this.DOM = Raphael(this.container, this.conf.size, this.conf.size);
	this.generateArcs();
}
Dial.prototype.generateArcs = function() {
	var _seperation = this.dataset.children.length;
	var averageAngle = 360 / _seperation;
	var maxGap = 5;
	var step = averageAngle * 0.1 > maxGap ? averageAngle - maxGap : averageAngle * 0.9;
	var rotate = step / 2;
	// 刻度个数
	var _ticksum = 20;
	//刻度弧度
	var _tickstep = step / _ticksum;

	for (var i = 0; i < _seperation; i++) {
		var _startAngle = averageAngle * i - rotate + 90;
		var _endAngle = _startAngle + step;
		this.DOM.dialzone(this.conf.centre.x, this.conf.centre.y, this.conf.size / 2 - 40,
			_startAngle, _endAngle).attr({
			"stroke-width": '2',
			"stroke": '#BECBD2'
		});
		var _tickAnimation = Raphael.animation({
			'fill': this.dataset.children[i].color,
			'stroke': this.dataset.children[i].color
		}, 50);
		var _coloredTicksNum = Math.floor(this.dataset.children[i].score * _ticksum / 100);
		for (var j = 0; j < _ticksum; j++) {
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