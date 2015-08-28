'use strict';

function singles(array) {
	var i = 0, single = [];
	for (i; i < array.length; i++) {
		if (array.indexOf(array[i], array.indexOf(array[i]) + 1) == -1) {
			single.push(array[i]);
		}
	}

	return single;
}

console.log(singles([1,2,3,2,1,2,6,8,9]));

Function.prototype.extend = function(parent) {
	var self = this;

	for (var prop in parent.prototype) {
		self.prototype[prop] = parent.prototype[prop];
	}

	return self;
};


function groupMapped() {
	var i = 0,
		funcArrays = [],
		result = [],
		len = 0;


	for (i; i < arguments.length; i++) {
		funcArrays.push(arguments[i]);
	}

	i = 0;
	function innerGroupMapped() {
		len = arguments.length; /*params for inner function*/
		for (i; i < funcArrays.length; i++) {
			if (len > 1) {
				/*Call function with 2 params*/
				result.push(funcArrays[i](arguments[0], arguments[1]));
			} else {
				/*Call function with 1 param*/
				result.push(funcArrays[i](arguments[0]));
			}
		}
		return result;
	}

	return innerGroupMapped;
}

function double(x) {
	return x * 2;
}
function multiply(x) {
	return x * 3;
}

groupMapped(double, multiply)(10);


var i = 0,
	j = 0,
	array = [];

for (i=0; i++; i<10) {
	array.push(function() {
		console.log(i);
	});
}

for (i=0; i++; i<10) {
	array[i]();
}


var testA = new Class();
console.log(testA);
console.log(testA.value);

function Class() {
	this.value = "hello";

	return new Date();
}