 (function(window,document,Math) {
	 function IScroll(el,options) {
	 	//拿到外层wrapper
	 	this.wrapper = document.querySelector(el);
	 	//拿到里层的scroller
	 	this.scroller = this.wrapper.children[0];
	 	//拿到里层scroller的style
		this.scrollerStyle = this.scroller.style;	
		//配置
		this.options = {
			bounce : true,
		}; 	
	 	//加入监听器
	 	this._initEvents();
	 	//初始值
	 	this.x = 0;
	 	this.y = 0;
	 	this.directionX = 0;
	 	this.directionY = 0;

	 	this.refresh();
	 }

	 IScroll.prototype = {
	 	enable : function() {
	 		this.enabled = true;
	 	},
	 	disable : function() {
	 		this.enabled = false;
	 	},
	 	refresh : function() {
	 		this.wrapperWidth = this.wrapper.clientWidth;
	 		this.wrapperHeight = this.wrapper.clientHeight;

	 		this.scrollerWidth = this.scroller.offsetWidth;
	 		this.scrollerHeight = this.scroller.offsetHeight;

	 		this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
	 		this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

	 		this.wrapperOffset = utils.offset(this.wrapper);
	 	},
	 	_initEvents : function() {
	 		utils.addEvent(this.wrapper,'mousedown',this);
	 		utils.addEvent(window,'mousemove',this);
	 		utils.addEvent(window,'mousecancel',this);
	 		utils.addEvent(window,'mouseup',this);
	 		utils.addEvent(this.scroller,'transitionend',this);
	 	},
	 	handleEvent : function(e) {
	 		switch(e.type) {
	 			case 'mousedown' :
	 				this._start(e);
	 				break;
	 			case 'mousemove' :
	 				this._move(e);
	 				break;
	 			case 'mousecancel':
	 			case 'mouseup':
	 				this._end(e);
	 				break;
	 			case 'transitionend':
	 				this._transitionTime(0);
	 				break;
	 		}
	 	},
	 	_start : function(e) {
	 		var point = e;
	 		this.enable();
	 		console.log(e.type + ' start');
	 		this.distX = 0;
	 		this.distY = 0;
	 		
	 		this.pointX    = point.pageX;
			this.pointY    = point.pageY;

			this.startX = this.x;
			this.startY = this.y;
	 	},
	 	_move : function(e) {
	 		if(!this.enabled) return;
	 		var point = e,
	 		deltaX = point.pageX - this.pointX,
	 		deltaY = point.pageY - this.pointY,
	 		newX,newY;

	 		this.pointX = point.pageX;
	 		this.pointY = point.pageY;

	 		newX = this.x + deltaX;
	 		newY = this.y + deltaY;

	 		//处于可滑动边缘以外时，减速
	 		if(newY > 0 || newY < this.maxScrollY){
	 			newY = this.options.bounce ? this.y + deltaY /3 : newY > 0 ? 0 :this.maxScrollY;
	 		}
	 		this._translate(0,newY);
	 	},
	 	_translate : function(x,y) {
	 		this.scrollerStyle.transform = 'translate(' + x + 'px,' + y + 'px)';
	 		this.x = x;
	 		this.y = y;
	 	},
	 	scrollTo : function(x,y,time,easing) {
	 		this.scrollerStyle.transitionTimingFunction = easing.style;
	 		this._transitionTime(time);
	 		this._translate(x,y);
	 	}, 
	 	_end : function(e) {
	 		var point = e,
	 		newX = Math.round(this.x),
	 		newY = Math.round(this.y),
	 		distanceX = Math.abs(newX - this.startX),
	 		distanceY = Math.abs(newY - this.startY);
	 		//超出边缘
	 		if(newY > 0 || newY < this.maxScrollY) {
	 			this.scrollTo(0,newY>0?0:this.maxScrollY,300,{style:'cubic-bezier(0.25, 0.46, 0.45, 0.94)'});
	 		}
	 		this.disable();
	 	},
	 	_transitionTime : function(time) {
	 		this.scrollerStyle.transitionDuration = time + 'ms';
	 	},
	 };
	 window.IScroll = IScroll;
})(window, document, Math);
