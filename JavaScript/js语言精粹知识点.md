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
6. `delete`可以删除对象属性，可能会将来自原型链的属性暴露出来。
   
		Object.prototype.name="1";
	    var obj={name:2};
		delete obj.name
	    console.log(obj.name)//1

##  参考文献

1. [文献1](http://codeguide.bootcss.com/)

