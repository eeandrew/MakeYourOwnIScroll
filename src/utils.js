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
	window.utils = me;
})(window);