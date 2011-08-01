keyboard.backbone.js
====================

Keyboard shortcuts are a royal pain in JavaScript.  This should help.

Live Demo
---------
Go mess around with the [live demo](http://mathphreak.github.com/keyboard.backbone.js/).

Usage
-----
keyboard.backbone.js is sort of hard to explain without an example or two.

### Standard string actions
	Backbone.Keyboard.keyMeans(40, 'down');
	Backbone.Keyboard.keyMeans(83, 'down'); // 83 is S
	Backbone.Keyboard.bindAction('down', 'down'); // this part is unneeded, but it proves a point
	// because we can always do something creative, like:
	Backbone.Keyboard.bindAction('down', 'up'); // holy snap, this would be a cool game design idea...
	// later, when we're checking for down in one way or another...
	if (Backbone.Keyboard.status['down']) { 
		// use brackets rather than dot because minifiers tend to rename everything with a dot, and they don't touch strings
		moveDown();
	}

### Callback actions
	Backbone.Keyboard.callback = true;
	Backbone.Keyboard.keyMeans(40, 'down');
	Backbone.Keyboard.keyMeans(83, 'down'); // 83 is S
	Backbone.Keyboard.bindAction('down', moveDown);

Documentation
-------------
keyboard.backbone.js depends on [domEvents.backbone.js](http://github.com/mathphreak/domEvents.backbone.js/),
which in turn depends on jQuery and Backbone.  There's no particular reason for the dependency on domEvents,
apart from the fact that keyboard.backbone.js only binds on keyDown and keyUp (well, `key:down` and `key:up`),
so if you want to take a different action on `key:press`, you're going to need a different library for it, and
you might as well use something else I wrote.  And while we're discussing unreasonable things, why on Earth
does this tie itself to the Backbone object?  Because I don't want to pollute the global namespace even more
by having a global `Keyboard` object.  And because I wanted to make sure you don't forget to add Backbone *first*.

### `Backbone.Keyboard.keyMeans(keyCode, meaning)`
Binds a keyCode to a meaning.  (Well, duh.)

### `Backbone.Keyboard.bindAction(meaning, action)`
Binds a meaning to an action.  If `meaning` and `action` are the same string, then it's not necessary to call this.
`action` can be a string or a function with two parameters: if the key is going down (keydown true/keyup false) and
the event object itself, as recieved from jQuery, just in case it's needed.

### Meanings and actions
The difference between a meaning and an action is simple, especially with callbacks.  Meanings are associated with
a particular key, whereas actions are associated to particular meanings. That explanation doesn't make much sense,
so let me try again.  Meanings and actions are connected behind-the-scenes so that they can be swapped around
without much work.  An example:

	Backbone.Keyboard.keyMeans(40, 'down');
	Backbone.Keyboard.keyMeans(83, 'down');
	Backbone.Keyboard.keyMeans(98, 'kp-down'); // numpad 2
	// don't need to say that 'down' means 'down'...
	Backbone.Keyboard.bindAction('kp-down', 'down'); // but we do need to say that 'kp-down' means 'down'
	// but later, when something changes with the current state...
	Backbone.Keyboard.bindAction('kp-down', 'alt-down'); // we just say that 'kp-down' doesn't mean 'down' anymore

### `Backbone.onNextKey(callback)`
A convenience function, for (for example) changing a keyboard shortcut.  `callback` is given two parameters, one of which
is the keycode and the other is the meaning previously assigned to the keycode, or `false` if there was no previous meaning.
