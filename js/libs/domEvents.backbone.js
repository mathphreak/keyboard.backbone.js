(function() {
	var use = function(obj) {
		_.extend(obj, Backbone.Events);
		
		jQuery(obj).keydown(function(e) {
			obj.trigger("key", e);
			obj.trigger("key:down", e);
		}).keypress(function(e) {
			obj.trigger("key", e);
			obj.trigger("key:press", e);
		}).keyup(function(e) {
			obj.trigger("key", e);
			obj.trigger("key:up", e);
		}).focusin(function(e) {
			obj.trigger("focus", e);
			obj.trigger("focus:in", e);
		}).focusout(function(e) {
			obj.trigger("focus", e);
			obj.trigger("focus:out", e);
		}).error(function(e) {
			obj.trigger("browser", e);
			obj.trigger("browser:error", e);
		}).resize(function(e) {
			obj.trigger("browser", e);
			obj.trigger("browser:resize", e);
		}).scroll(function(e) {
			obj.trigger("browser", e);
			obj.trigger("browser:scroll", e);
		}).load(function(e) {
			obj.trigger("status", e);
			obj.trigger("status:load", e);
		}).ready(function(e) {
			obj.trigger("status", e);
			obj.trigger("status:ready", e);
		}).unload(function(e) {
			obj.trigger("status", e);
			obj.trigger("status:unload", e);
		}).blur(function(e) {
			obj.trigger("form", e);
			obj.trigger("form:blur", e);
		}).change(function(e) {
			obj.trigger("form", e);
			obj.trigger("form:change", e);
		}).focus(function(e) {
			obj.trigger("form", e);
			obj.trigger("form:focus", e);
		}).select(function(e) {
			obj.trigger("form", e);
			obj.trigger("form:select", e);
		}).submit(function(e) {
			obj.trigger("form", e);
			obj.trigger("form:submit", e);
		}).click(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:click", e);
		}).dblclick(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:dblclick", e);
		}).mousedown(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:down", e);
		}).mouseenter(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:enter", e);
		}).mouseleave(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:leave", e);
		}).mousemove(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:move", e);
		}).mouseout(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:out", e);
		}).mouseover(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:over", e);
		}).mouseup(function(e) {
			obj.trigger("mouse", e);
			obj.trigger("mouse:up", e);
		});
	};
	
	this.use = function() {
		var args = _.toArray(arguments);
		_.each(args, use);
	}
}).call(this);
