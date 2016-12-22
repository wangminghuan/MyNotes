<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 1 let和const

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1 let
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

	{
	  let a = 10;
	  var b = 1;
	}
	console.log(b);//1
	console.log(a);//ReferenceError: a is not defined.

特别对于for循环中i参数的锁定问题：

	for (let i = 0; i < 10; i++) {}
	
	console.log(i)//

## 箭头函数  

	var add= (arg1,arg2)=>arg1+arg2;
	console.log(add(5,4));//9
	
等同于
	
	var add= (arg1,arg2)=>{
	  return arg1+arg2
	}
	console.log(add(5,4));//9

## Generator 
generator的英语意思就是“发动机”, Generator函数是ES6提供的一种异步编程解决方案。  
形式上，Generator函数是一个普通函数，但是有两个特征：  
1. function关键字与函数名之间有一个星号；  
2. 函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）

	function* helloWorldGenerator() {
	  yield 'hello';
	  yield 'world';
	  return 'ending';
	}
	
	var hw = helloWorldGenerator();

	hw.next()
	// { value: 'hello', done: false }
	
	hw.next()
	// { value: 'world', done: false }
	
	hw.next()
	// { value: 'ending', done: true }
	
	hw.next()
	// { value: undefined, done: true }
每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。
## Promise  
promise的英语意思就是“承诺”,Promise是一个对象，异步编程的一种解决方案。

### 起步例子  

	var promise=new Promise(function(resolve, reject){
		// some code
		if(/*异步请求成功*/){
	     resolve(val)
		}else{
	     reject(error)
		}
	})

##  参考文献

1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)


