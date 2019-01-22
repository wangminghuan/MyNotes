<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习之异步方案</font>


## 第一章 Promise

promise的英语意思就是“承诺”,Promise是一个对象，异步编程的一种解决方案。

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
### 起步例子  

	var promise=new Promise(function(resolve, reject){
		// some code
		if(/*异步请求成功*/){
	     resolve(val)
		}else{
	     reject(error)
		}
	})
then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用（可选）。

	function timeout(ms) {
	  return new Promise((resolve, reject) => {
	    setTimeout(resolve, ms, 'done');
	  });
	}
	
	timeout(2000).then((value) => {
	  console.log(value);
	});
Promise不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

## 第二章 Generator 
generator的英语意思就是“发动机”, Generator函数是ES6提供的一种异步编程解决方案。  
形式上，Generator函数是一个普通函数，但是有两个特征：  
1. function关键字与函数名之间有一个星号；  
2. 函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）

	function* helloWorldGenerator() {
      console.log("start");
	  yield 'hello';
	  yield 'world';
	  return 'ending';
	}
	
	var hw = helloWorldGenerator();
    //必须先调用一下这个函数,但此时函数并不会执行。
    //只有通过next方法才会执行。

	hw.next()
	// "start"；此时才会执行函数体，遇到yield停止
    //{ value: 'hello', done: false }
	
	hw.next()
	// { value: 'world', done: false }
	
	hw.next()
	// { value: 'ending', done: true }
	
	hw.next()
	// { value: undefined, done: true }
每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

