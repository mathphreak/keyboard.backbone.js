$(function() {
	var mutated = false;
	var asciiToChar = String.fromCharCode;
	var mutate = 77;
	
	var position = {
		left: 15,
		top: 15
	};
	
	Backbone.Keyboard.bindArrowWASD();
	Backbone.Keyboard.keyMeans(77, 'mutate');
	Backbone.Keyboard.bindAction('mutate', function(state) {
		if (state) {
			if (mutated) {
				Backbone.Keyboard.bindAction('left', 'left');
				Backbone.Keyboard.bindAction('right', 'right');
				Backbone.Keyboard.bindAction('down', 'down');
				Backbone.Keyboard.bindAction('up', 'up');
				$("#un").text("")
			} else {
				Backbone.Keyboard.bindAction('left', 'right');
				Backbone.Keyboard.bindAction('right', 'left');
				Backbone.Keyboard.bindAction('down', 'up');
				Backbone.Keyboard.bindAction('up', 'down');
				$("#un").text("un-");
			}
			mutated = !mutated;
		}
	});
	window.changeShortcut = function() {
		$("#mutate-key").text("CHANGING");
		Backbone.Keyboard.onNextKey(function(code, fail) {
			if (!!fail) {
				$("#mutate-key").text("FAIL");
				setTimeout(function() {
					$("#mutate-key").fadeOut(function() {
						$("#mutate-key").text(String.fromCharCode(mutate)).fadeIn();
					});
				}, 3000);
				return;
			}
			Backbone.Keyboard.keyMeans(mutate, undefined);
			Backbone.Keyboard.keyMeans(code, 'mutate');
			mutate = code;
			$("#mutate-key").text(String.fromCharCode(mutate));
		});
	}
	setInterval(function() {
		var status = Backbone.Keyboard.status;
		if (status.left) {
			position.left--;
		}
		if (status.right) {
			position.left++;
		}
		if (status.up) {
			position.top--;
		}
		if (status.down) {
			position.top++;
		}
		$("#target").css("left", position.left).css("top", position.top);
	}, 100)
});
