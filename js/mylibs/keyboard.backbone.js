$(function() {
	var keyMeanings = {};
	var meaningActions = {};
	var detail = false;
	
	var oldKeyboard = Keyboard;
	
	var Keyboard = {};
	
	var nextKey = null;
	
	Keyboard.status = {};
	
	var keyMeans = Keyboard.keyMeans = function(keyCode, meaning) {
		keyMeanings[keyCode] = meaning;
	}
	
	var bindAction = Keyboard.bindAction = function(meaning, action) {
		meaningActions[meaning] = action;
	}
	
	var onNextKey = Keyboard.onNextKey = function(functor) {
		nextKey = functor;
	}
	
	var process = function(keyCode, state, ev) {
		var meaning = keyMeanings[keyCode];
		var noNextKey = (nextKey === null)
		if (!meaning) {
			if (noNextKey) {
				return;
			} else {
				nextKey.call(this, keyCode, false);
				nextKey = null;
				return;
			}
		}
		if (!noNextKey) {
			nextKey.call(this, keyCode, meaning);
			nextKey = null;
			return;
		}
		var action = meaningActions[meaning];
		if (_.isFunction(action)) {
			action.call(this, state, ev);
		} else {
			if (action === undefined) {
				Keyboard.status[meaning] = state;
			} else {
				Keyboard.status[action] = state;
			}
		}
	}
	
	use(window);
	window.bind("key:down", function(ev) {
		var kc = ev.which;
		process(kc, true, ev);
	});
	window.bind("key:up", function(ev) {
		var kc = ev.which;
		process(kc, false, ev);
	});
	
	Backbone.Keyboard = Keyboard;
});
