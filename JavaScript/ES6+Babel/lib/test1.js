"use strict";

/*(function (item) {
	return item + 1;
});
var a = [];

var _loop = function _loop(i) {
	a[i] = function () {
		console.log(i);
	};
};

for (var i = 0; i < 10; i++) {
	_loop(i);
}
a[6]();
//参数为v，返回v
var fn = function fn(v) {
	return v;
};
//没有参数，返回

var f2 = function f2() {
	return g;
};

//多个参数，返回

var f3 = function f3(arg1, arg2) {
	return h;
};

var sum = function sum(num1, num2) {
	return num1 + num2;
};

var sum2 = function sum2(num1, num2) {
	return num1 + num2;
};

var sum3 = function sum3(num1, num2) {
	if (num1 > 0) {
		return num1;
	} else {
		return num1 + num2;
	}
};
*/
function fn2(){
	var arr=[1,3];
	for (let i = 0; i < arr.length; i++) {
		console.log('d')
	}
	console.log("i="+i)
}
//fn2()
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve,ms,"done");
  });
}

timeout(4000).then((value) => {
  console.log(value);
});