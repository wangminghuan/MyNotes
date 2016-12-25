<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 1 let和const

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1  let
1. ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

		{
		  let a = 10;
		  var b = 1;
		}
		console.log(b);//1
		console.log(a);//报错: a is not defined.
特别对于for循环中i参数的锁定问题：

		for (let i = 0; i < 10; i++) {}
		
		console.log(i)//
2. ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
## 箭头函数  

	var add= (arg1,arg2)=>arg1+arg2;
	console.log(add(5,4));//9
	
等同于
	
	var add= (arg1,arg2)=>{
	  return arg1+arg2
	}
	console.log(add(5,4));//9
## Promise  
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

## Generator 
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


1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)


