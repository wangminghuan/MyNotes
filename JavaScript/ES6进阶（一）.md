<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 第一章 let和const

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
例子2：

		for (let i = 0; i < 3; i++) {
		  let i = 100;
		  console.log(i);
		}
		//输出 三次100，说明循环体内部是一个单独的作用域，如果换成var,则只会输出一次100。
特别对于for循环绑定事件获取索引问题可以很好的解决[点我了解更多](https://github.com/wangminghuan/MyNotes/blob/master/%E5%85%B6%E4%BB%96/for%E5%BE%AA%E7%8E%AF%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6%E8%8E%B7%E5%8F%96%E7%B4%A2%E5%BC%95%E9%97%AE%E9%A2%98.md)

2. ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

3. let声明，一个代码块内不可重复声明，否则会报错，而var命名则不会。

		function func(arg) {
		  let arg; // 报错
		}
		
		function func(arg) {
		  {
		    let arg; // 不报错
		  }
		}

### 1.2 const

1. const声明一个只读的常量。一旦声明，常量的值就不能改变, 
2. const一旦声明变量，就必须立即初始化，不能留到以后赋值。
3. const如果赋值一个对象时，保存的只是一个指向实际数据的指针

	      const obj={};
	      obj.name="123";//可以修改指针指向对象的数据
	      obj=null；//报错！，不可修改指针的指向

### 1.3 顶层对象属性
ES5中顶层对象的属性与全局变量挂钩，这也被认为是js语言设计最大的败笔之一，各种命名冲突，很多只有在运行过程中才被暴露出来。

    let a=1;
    var b=2;
    const c=3;
    console.log(window.a);//undefined
    console.log(window.b);//2
	console.log(window.c);//undefined

目前在ES6中顶层对象依旧没有统一。

1. 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
2. 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
3. Node 里面，顶层对象是global，但其他环境都不支持。
### 1.4 变量声明的六种方式



### 1.5 块级作用域
1. es6 支持通过 `{}`（花括号）创建块级作用域
2. es6 允许块级作用域的任意嵌套，外层作用域无法读取内层作用域的变量。
3. es5的块级作用域一般通过自执行函数（IIFE）来创建，块级作用域的出现，IIFE不再必要了。
4. ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。ES6进行了修正，允许块级作用域内声明函数，但该函数只能在当前作用域内生效。外部无法访问（具体不同的浏览器实现会不一样）


## 3 箭头函数  

	var add= (arg1,arg2)=>arg1+arg2;
	console.log(add(5,4));//9
	
等同于
	
	var add= (arg1,arg2)=>{
	  return arg1+arg2
	}
	console.log(add(5,4));//9

## 第二章 变量的解构赋值

### 2.1 数组的解构赋值

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

## 8 Class （类）

### 概述
ES6 引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类，这样更优雅，易于理解。

	class Person{
	  constructor(x) {
	    this.name = x;
	  }
	
	  toSayHi() {
	    return 'Hello '+this.name;
	  }
	}
	const p1=new Person("jack");
	p1.name; //"jack"
	p1.toSayHi();//"Hello jack"

等同于：

	function Person(x){
	  this.name = x;
	}
	Person.prototype.toSayHi=function(){
	  return 'Hello '+this.name;
	}
	
	const p1=new Person("jack");
	p1.name; //"jack"
	p1.toSayHi();//"Hello jack"

以上两种模式都满足：

	p1.constructor===Person;//true,等式一
	Person===Person.prototype.constructor;//true,等式二
	p1.constructor===Person.prototype.constructor;//true,等式三

说明：

1. 每个实例对象都有一个 constructor（构造函数）属性，该属性指向创建它的构造函数，即有等式一成立；
2. 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。即有等式二成立；

## 9 新的数据结构：set和map

ES6新增了两种数据结构，set结构和map结构

### 9.1 Set
#### 9.1.1概述
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。`Set`本身是一个构造函数，用来生成 Set 数据结构。  
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

	[...new Set([1,2,3,5,6,7,2,3])] //[1, 2, 3, 5, 6, 7] 可以用来对数组去重
通过set加入值时，不会发生类型转换，所以5和'5'是两个不同的值  

	[...new Set([1,2,3,5,6,7,2,3]).add("5")] //[1, 2, 3, 5, 6, 7, "5"]

#### 9.1.2实例的属性和方法
1. Set 结构的实例有以下属性。

		Set.prototype.constructor：构造函数，默认就是Set函数。
		Set.prototype.size：返回Set实例的成员总数。

2. Set 实例的方法分为两大类： 
   
		//四个操作方法（用于操作数据）
		add(value)：添加某个值，返回 Set 结构本身。
		delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
		has(value)：返回一个布尔值，表示该值是否为Set的成员。
		clear()：清除所有成员，没有返回值。
		
		//四个遍历方法（用于遍历成员）。
		keys()：返回键名的遍历器
		values()：返回键值的遍历器
		entries()：返回键值对的遍历器
		forEach()：使用回调函数遍历每个成员
		需要特别指出的是，Set的遍历顺序就是插入顺序。
举个例子：

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

