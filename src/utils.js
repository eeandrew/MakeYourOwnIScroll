(function(){
	var me = {};
	me.addEvent = function(el,type,fn,capture) {
		el.addEventListener(type,fn,!!capture);
	};
	window.utils = me;
})(window);