 (function(window,document,Math) {
	 function IScroll(el,options) {
	 	//拿到外层wrapper
	 	this.wrapper = document.querySelector(el);
	 	//拿到里层的scroller
	 	this.scroller = this.wrapper.children[0];
	 	//拿到里层scroller的style
		this.scrollerStyle = this.scroller.style;	 	
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
	 		this.wrapperOffset = utils.offset(this.wrapper);
	 	},
	 	_initEvents : function() {
	 		utils.addEvent(this.wrapper,'mousedown',this);
	 		utils.addEvent(window,'mousemove',this);
	 		utils.addEvent(window,'mousecancel',this);
	 		utils.addEvent(window,'mouseup',this);
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
	 		}
	 	},
	 	_start : function(e) {
	 		this.enable();
	 		console.log(e.type + ' start');
	 		this.distX = 0;
	 		this.distY = 0;
	 		
	 		this.pointX = 0;
	 		this.pointY = 0;
	 	},
	 	_move : function(e) {
	 		if(!this.enabled) return;
	 		var point = e,newX,newY;
	 		newX = this.wrapperOffset.left + point.pageX;
	 		newY = this.wrapperOffset.top + point.pageY;
	 		this._translate(newX,newY);
	 	},
	 	_translate : function(x,y) {
	 		this.scrollerStyle.transform = 'translate(' + x + 'px,' + y + 'px)';
	 	},
	 	_end : function(e) {
	 		this.disable();
	 	},
	 };
	 window.IScroll = IScroll;
})(window, document, Math);
