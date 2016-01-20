(function(){
	var me = {};
	me.addEvent = function(el,type,fn,capture) {
		el.addEventListener(type,fn,!!capture);
	};
	me.offset = function(el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		while(el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}

		return {
			left: left,
			top : top
		}
	};
	me.supportTouch = function() {
		return 'ontouchstart' in window;
	};
	me.rAF = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(callback){
			window.setTimeout(callback,1000/60); //模拟60帧
		};
	window.utils = me;
})(window);