<font face="微软雅黑" size="4" >
<font size="6">JS语言精粹</font>

## 1 前言

### 1.1 词法作用域  
js的函数是基于词法作用域的，请看下面例子：

		var val=1;
		function foo(){
		console.log(val)
		}
		function bar(){
		var val=2;
		 foo()
		}
		bar() ;//运行结果为：1
这是因为函数foo在函数bar中调用，但其作用域在定义时已经确定，即只能访问到foo函数内部跟全局作用域。所以js是词法作用域：

### 1.2 静态作用域作用域和动态作用域

**静态（词法）作用域**：函数在定义的时候决定了函数的作用域，JavaScript采用词法作用域。  

**动态作用域**：函数在调用的时候决定函数的作用域，目前只有部分语言支持。

### 1.3 “欺骗”词法作用域

#### 1) eval
看下面的例子

		var a=1;
		function foo(str,b){
		eval(str);
		console.log(a,b)
		}
		var str="var a=2";
		foo(str,4)
运行结果为：2,4  
在执行eval之后，引擎并不知道eval是以动态的方式进入的，并对词法环境进行修改。所以这个时候词法作用域就会被破坏。

#### 2) with
with通常被当作重复引用一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。  
with将对象的属性当作作用域中的标识符来处理，从而创建了一个新的词法作用域（运行阶段）。

	function foo(obj){  
	    with(obj){  
	        a = 2;  
	    }  
	}  
	var o1 = { a : 3 };  
	var o2 = { b : 3 };  
	  
	foo(o1);  
	console.log( o1.a );    // 2
	  
	foo(o2);  
	console.log( o2.b );    // 3
	console.log( a );       // 2，表明a泄漏到全局作用域上了！

eval和with都是js的糟粕，应当摒弃使用

## 2 语法

### 2.1 注释

推荐只用//来注释，/**/容易跟正则表达式等产生冲突 
### 2.2 数字
js只有一个数字类型，它在内部表示为64位的浮点数，和java的double数字类型一样。 
### 2.1 字符串
js中所有字符都是16位的。js没有字符类型，要表示一个字符，之粗腰创建一个仅包含一个字符的字符串即可。字符串一经创建是不可改变的，所有字符串的改写方法都返回了一个新的字符串，原字符串并没有改变。


## 2 语句和表达式
[点我查看](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/js%E4%B8%AD%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%92%8C%E8%AF%AD%E5%8F%A5.md)

## 3 对象
1. 对象通过引用来传递，永远不会被复制。
2. 所有通过对象字面量创建的对象都会连接到`Object.prototype`。（通过`new Object()`的方式一样）。
3. 原型关系是一种动态的关系，如果添加一个新属性到原型中，那么该属性会对所有基于该原型创建的对象可见。
4. `hasOwnPrototype`方法不会检查原型链

	    Object.prototype.name="1";
	    var obj=new Object();
		console.log(obj.name);//1
	    console.log(obj.hasOwnProperty('name'))//false
5. 通过`for in`遍历对象时，顺序是不确定的。
6. `delete`可以删除对象属性，可能会将来自原型链的属性暴露出来（不会触及原型链中的任何属性）。
   
		Object.prototype.name="1";
	    var obj={name:2};
		delete obj.name
	    console.log(obj.name)//1
7. 减少全局变量的污染，最小化使用全局变量的方法之一是为应用创建一个唯一的全局变量：
		
		var myApp={};
		myApp.a={...}

将全局变量纳入到一个名称空间下，可以有效的降低命名冲突发生的可能性
## 4 转型函数
### 1 String()
可以将任意数据转化为字符串

		String(null) //"null"
		String(undefined) //"undefined"
		String(function(){}) //"function (){}"
得到的数据类型都是字符串类型，他与toString()方法的区别是，toString方法必须通过对象挂载来调用

       var a=0;
       a.toString();//"0"
       var b=function(){};
       b.toString();//"function (){}"
       null.toString();//报错
	   undefined.toString();//报错
### 2 Number()
可以将任意数据转化为数字类型

		Number(true);//1
		Number("-2");//-2
		Number(new Date());//1528368787850
		Number(new RegExp());//NaN
我们也可以调用全局方法：`parseInt()`和`parseFloat()` 来得到类似的结果

### 3 Boolean()
可以将任意数据转化为布尔类型
		
		Boolean(new RegExp());//true
		Boolean(0);//false
		Boolean(null);//false
		Boolean(undefined);//false
		Boolean("");//false
以上转型函数其实也可以作为构造函数，但是，作为构造函数他们生成的数据却不一样：


![](https://i.imgur.com/sR66OAs.jpg)

通过 typeof检测返回类型得到的都是 "object"

## 5 其他构造函数
通过构造函数创建对象，有时候也可以省略`new`操作符：

	RegExp(); //  /(?:)/
	new RegExp(); // 同上
    typeof RegExp();// "object"
	typeof new RegExp();// 同上

	Array(); //  []
	new Array(); //  同上
    typeof Array();// "object"
	typeof new Array();// 同上
	
	Function(); //  function anonymous() {} 匿名函数
	new Function(); //  同上
    typeof Function();// "function"
	typeof new Function();// 同上

	Object(); //  object对象
	new Function(); //  同上
    typeof Function();// "object"
	typeof new Function();// 同上

    Date("May 25, 2004"); // "Thu Jun 07 2018 22:00:39 GMT+0800 (中国标准时间)"
    new Date("May 25, 2004");//Tue May 25 2004 00:00:00 GMT+0800 (中国标准时间)
	typeof Date();//"string"
	typeof new Date();//"object"

可以发现，除了Date构造函数外，其他对象我们在创造对象的时候都可以省略new操作符。  
Date对象通过直接调用Date()方法时（它不接受任何参数，始终返回当前时间）返回的是一个字符串类型的时间对象，通过new 则得到一个时间对象。（原因未知）

同时，我们可以思考，以下代码的结果：

	typeof String
	typeof Function
	typeof Function()
	typeof Object

结果都为 "function"

## 5 函数
### 1 函数调用
每个函数执行时，除了声明时定义的形参外，还接收两个附加参数，`this` 和 `arguments`。下面先介绍this的四种调用模式：

#### 方法调用模式

		var obj={
			name:1,
			increment:function() {
				  this.name++;
			     console.log(this.name)	// body... 
			}
		}
		
		obj.increment();//2 ，this指向obj
		obj.increment();//3

方法调用时this指向为调用对象。

#### 函数调用模式

		function Fn(){
		   this.handler="wmh"
		}
		var obj=Fn();
		console.log(window.handler)//wmh

通过函数调用的方式，this指向的是函数运行的作用域，因为Fn作用域为全局，所以调用时等同于`window.Fn()`方式调用。

#### 构造器调用模式

		function Fn(){
		   this.handler="wmh"
		}
		var obj=new Fn();
		console.log(obj.handler)//wmh
我们将上面例子进行改写，将函数作为构造函数进行调用，通过new关键字创建一个新的实例，this则指向对象的实例。

#### apply/call/bind 调用模式



##  参考文献

1. [文献1](http://codeguide.bootcss.com/)

