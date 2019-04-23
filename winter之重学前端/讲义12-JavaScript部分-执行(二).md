
#闭包和执行上下文

## 闭包
闭包其实**只是一个绑定了执行环境的函数**，闭包与普通函数的区别是，它携带了执行的环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境。

## 执行上下文
JavaScript 标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。  

执行上下文在 ES2018 中，包含以下部分：

- lexical environment：词法环境，当获取变量或者 this 值时使用。
- variable environment：变量环境，当声明变量时使用
- code evaluation state：用于恢复代码执行位置。
- Function：执行的任务是函数时使用，表示正在被执行的函数。
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
- Realm：使用的基础库和内置对象实例。
- Generator：仅生成器上下文有这个属性，表示当前生成器。

在js中任何语句的执行都会依赖特定的上下文。一旦上下文被切换，整个语句的效果可能都会发生改变。在 JavaScript，切换上下文最主要的场景是函数调用。

## 函数
>补充:仅普通函数和类能够跟 new 搭配使用

### 1 普通函数
用 function 关键字定义的函数。

	function foo(){
	    // code
	}


	

### 2 箭头函数：
用 => 运算符定义的函数。
	
	const foo = () => {
	    // code
	}


### 3 方法：
在 class 中定义的函数。

	class C {
	    foo(){
	        //code
	    }
		
	}

### 4 生成器函数：
用 function * 定义的函数。

	function* foo(){
	    // code
	}


### 5 类：
用 class 定义的类，实际上也是函数。

	class Foo {
	    constructor(){
	        //code
	    }
	}

### 6/7/8 异步函数：
普通函数、箭头函数和生成器函数加上 async 关键字。

	
	async function foo(){
	    // code
	}
	
	
		
	const foo = async () => {
	    // code
	}
	
	
		
	async function foo*(){{
	    // code
	}


对普通变量而言，这些函数并没有本质区别，它们的一个行为差异在于 this 关键字。

## this 关键字
this 是执行上下文中很重要的一个组成部分。同一个函数调用方式不同，得到的 this 值也不同。

调用函数时使用的引用，决定了函数执行时刻的 this 值。实际上从运行时的角度来看，this 跟面向对象毫无关联，它是与函数调用时使用的表达式相关。


## 语句

![](https://static001.geekbang.org/resource/image/98/d5/98ce53be306344c018cddd6c083392d5.jpg)