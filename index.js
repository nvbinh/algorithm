'use strict';

/*
* 1. Find an item that occurs once in an array
*/

/*
2. Write a function groupedMap(a, b, ...) that returns a new function that when executed, invokes each function with the same arguments, and returns an array of the result of the functions. Described another way, this function should compose a set of functions, then return a new one which exposes the map operation over the composed result.
EX 1:
function double(x) { return x * 2; }
function triple(x) { return x * 3; }
groupedMap(double, triple)(5)
result: [10, 15]

EX 2:
function add(x, y) { return x + y; }
function multiply(x, y) {return x * y; }
groupedMap(double, triple)(5, 10)
result: [15, 50]
*/ 

function double(x) {
	return x * 2;
}

function triple(x) {
	return x * 3;
}

function add(x, y) {
	return x + y;
}

function multiply(x, y) {
	return x * y;
}

function groupedMap() {
	var i = 0,
	j = 0,
	array = [],
	temp = [],
	callback = null;
	for (i; i < arguments.length; i++) {
		if (arguments[i] instanceof Function) {
			j += 1;
			callback = arguments[i];
			temp.push(callback);
		}
	}

	i = 0;

	function groupInner() {
		pushToArray(arguments);
		return array;
	}

	i = 0;
	function pushToArray(arrayArg) {
		var kq = null;
		for (i; i < temp.length; i++) {
			/*2 parameters*/
			if (arrayArg.length > 1) {
				kq = temp[i](arrayArg[0], arrayArg[1]);
			} else {
				/*1 parameter*/
				kq = temp[i](arrayArg[0]);
			}
			array.push(kq);
		}
	}

	return groupInner;
}

/*
* 3. We want to implement "extend" function which allow us to create a new class which contains all functions belong to its parents. For example:
var Human = function() {};
Human.prototype.canLearn = function() {};
var Wizard = function() {};
Wizard.prototype.canCastMagic = function() {};
var HalfHumanHalfWizard = Human.extends(Wizard);
//or HalfHumanHalfWizard = Wizard.extends(Human);
var potter = new HalfHumanHalfWizard();
potter.canLearn();
potter.canCastMagic();

TODO: Inherits from multi-objects with prototype with javascript
*/
var Human = function() {};
Human.prototype.canLearn = function() {
	console.log('canLearn');
};

var Wizard = function() {};
Wizard.prototype.canCastMagic = function() {
	console.log('canCastMagic');
};

Function.prototype.extends = function(dest) {
	var self = this;

	// function Middle() {

	// }

	// Middle.prototype = new Self();

	// Self.prototype = new Dest();

	for (var prop in dest.prototype) {
		self.prototype[prop] = dest.prototype[prop];
	}
	// args = Array.prototype.slice.call(arguments),
	// object = args.shift();
	// self.prototype = dest.prototype;
	// for (var property in dest.prototype) {
	// 	if (dest.prototype.hasOwnProperty(property)) {
	// 		self.prototype.property = dest[property];
	// 	}
	// }

	return self;
};


$(document).ready(function() {

	var global = {
		$container: $('.count-function'),

		init: function() {
			one.init();
			two.init();
			three.init();
		}
	};

	var one = {
		singles: function(array) {
			for( var index = 0, single = []; index < array.length; index++ ) {
				if( array.indexOf( array[index], array.indexOf( array[index] ) + 1 ) == -1 )
					single.push( array[index] );    
			}
			return single;
		},

		init: function() {
			if (global.$container.length > 0) {
				global.$container.append('<p>Element occurs once: ' + this.singles([1,2,1,4,5,4,5]) + ' in array [1,2,1,4,5,4,5]</p>');

			}
		}
	};

	var two = {
		oneParam: function() {
			var j = groupedMap(double, triple)(5);
			global.$container.append('<p>One Parameter: ' + j + '</p>');
		},

		twoParam: function() {
			var j = groupedMap(add, multiply)(5, 10);
			global.$container.append('<p>Two Parameter: ' + j + '</p>');
		},

		init: function() {
			this.oneParam();
			this.twoParam();
		}
	};

	var three = {
		init: function() {
			var HalfHumanHalfWizard = Wizard.extends(Human);
			var poster = new HalfHumanHalfWizard();
			poster.canLearn();
			poster.canCastMagic();
		}
	};
	
	global.init();
});