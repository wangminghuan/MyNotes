<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 1 let和const

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1  let
1. ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的**代码块内有效**。也就是其声明的变量就绑定在这个区域中，不会再受到外界影响。

		{
		  let a = 10;
		  var b = 1;
		}
		console.log(b);//1
		console.log(a);//报错: a is not defined.
特别对于for循环中i参数的锁定问题：

		for (let i = 0; i < 10; i++) {
			console.log(i)//0,1,2,3,4....,9
		}
这是因为，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量（js引擎会记住上一轮循环的值），
2. ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
3. let声明，一个代码块内不可重复声明，否则会报错，而var命名则不会。
### 1.2 const
const声明一个只读的常量。一旦声明，常量的值就不能改变, 且一旦声明变量，就必须立即初始化，不能留到以后赋值。
## 2 块级作用域

## 3 箭头函数  

	var add= (arg1,arg2)=>arg1+arg2;
	console.log(add(5,4));//9
	
等同于
	
	var add= (arg1,arg2)=>{
	  return arg1+arg2
	}
	console.log(add(5,4));//9

## 4 变量的解构赋值

### 4.1 数组的解构赋值

ES6 允许这样赋值

	let [a, b, c] = [1, 2, 3];
上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

也可以指定默认值：

	let [a, b, c="0"] = [1, 2];
	console.log(c);//0

### 4.2 对象的解构赋值

	let { foo, bar } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"
可以这样理解：前面的部分只是变量声明，声明了变量foo和bar, 等号后面是对这两个变量进行赋值，foo的值为'aaa'，bar的为'bbb'。  

因为不是数组，不是通过索引对应起来，所以等号后面必须写上声明的变量名，

	let { bar, foo } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"
也可以将变量名做映射

	let { foo:bar  } = { foo: "aaa", bar: "bbb" };
	//console.log(foo) // 报错
	console.log(bar) // "aaa"
将foo映射为bar，然后去等号后面取名称为bar的变量的值。但foo始终是未声明的，所以就会报错。
## 5 Promise  
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

## 6 Generator 
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

## 7 Symbol

### 7.1 基本属性
1. ES5 的对象属性名都是字符串，这容易造成属性名的冲突。所以ES6新引入了一种全新的原始数据类型Symbol。
2. Symbol不是对象，所以不同通过创建对象的方式来创建（譬如 new），它的值通过Symbol函数生成。基本上，它是一种类似于字符串的数据类型。
3. 举个例子

        let s1 = Symbol('foo');
        let s2 = Symbol('bar');
        console.log([s1,s2])//[Symbol(foo), Symbol(bar)]
         //Symbol 值不能与其他类型的值进行运算
        console.log("s1的值为"+s1) //报错，Cannot convert a Symbol value to a string
        console.log("s1的值为"+s1.toString()) // s1的值为Symbol(foo)

        let s3 = Symbol();
        let s4 = Symbol();
        console.log(s3===s4);//false ,就算参数相同，symbol函数每次返回的值都是不相等的，这就可以用于对象属性命名上

        let s5="hello";
        let s6="hello";
        console.log(s5===s6);//true
        

### 7.2 作为属性名
1. 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，可以防止改写或者覆盖

		let symbol1=Symbol(),symbol2=Symbol(),symbol3=Symbol();
		let myObject = { 
		    publicProperty: 'Value of myObject[ "publicProperty" ]',
            [symbol1]:'Value of myObject[ symbol1 ]'
		};
		 
		myObject[ symbol2 ] = 'value of myObject[ symbol2 ]';
		Object.defineProperty(myObject, symbol3, { value: 'Value of myObject[ symbol1 ]' });
		console.log(myObject)
![](https://i.imgur.com/668jPPT.jpg)
2. Symbol 值作为对象属性名时，不能用点运算符,所以读取该属性时，必须通过`myObject[ symbol2 ]`来读取。
3. Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys(`)、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回，
4. 可以通过`Object.getOwnPropertySymbols`来进行读取symbol属性，他返回一个数据

		[Symbol(), Symbol(), Symbol()]
5. Symbol.for()，Symbol.keyFor()（略）

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)



