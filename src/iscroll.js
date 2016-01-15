 (function(window,document,Math) {
	 function IScroll(el,options) {
	 	//拿到外层wrapper
	 	this.wrapper = document.querySelector(el);
	 	//拿到里层的scroller
	 	this.scroller = this.wrapper.children[0];
	 	//加入监听器
	 	this._initEvents();
	 }

	 IScroll.prototype = {
	 	enable : function() {
	 		this.enabled = true;
	 	},
	 	disable : function() {
	 		this.enabled = false;
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
	 		console.log(e.type + ' start');
	 		this.enable();
	 	},
	 	_move : function(e) {
	 		if(!this.enabled) return;
	 		console.log(e.type + ' move');
	 	},
	 	_end : function(e) {
	 		this.disable();
	 	},
	 };
	 window.IScroll = IScroll;
})(window, document, Math);
