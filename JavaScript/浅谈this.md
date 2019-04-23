# this
this是 JavaScript 语言的一个关键字。

它是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用

关于this的指向，可以通过以下六条 绑定规则来判断

### new绑定
使用 new 关键字创建对象时，this 会绑定到创建的对象上。

	class Person{
	    constructor(name){
	      this.name=name
	    }
	    getThis(){
	      return this
	    }
	  }
	  var p1=new Person("Tom")
	  console.log(p1.getThis()===p1) //true
	  console.log(p1.name==="Tom")  //true

### 显式绑定
使用 call、apply 或 bind 方法显式绑定时， this 为其第一个参数。

     function getColor(){
        console.log(this===obj)
      }
      var obj={
        color:"red"
      }
      getColor(); //false
      getColor.call(obj) //true
### 隐式绑定
当函数挂在对象上执行时，系统会隐式地将 this 绑定到该对象上。

	function bar() {
	  console.log( this === obj );
	}
	
	const obj = {
	  foo: function () {
	    console.log( this === obj );
	  },
	  bar: bar
	};
	
	obj.foo(); // true
	obj.bar(); // true

### 默认绑定
当函数独立执行时，严格模式 this 的默认绑定值为 undefined，否则为全局对象。

非严格模式：

	function foo() {
	  console.log( this === window); // true
	}
	
	foo();//true

严格模式：

	"use strict";
	
	function foo() {
	  console.log( this === undefined );
	}
	
	foo();               // true
	foo.call(undefined); // true
	foo.call(null);      // false

### 箭头函数绑定
使用箭头函数时，this的绑定值等于其外层的普通函数（或者全局对象本身）的this。

    var obj={
    foo:function(){
      setTimeout(()=>{
        console.log(this===obj)
      })
    }
  }
  obj.foo();//true

### 系统或第三方绑定
当函数作为参数，传入系统或者第三方提供的接口时，传入函数中的 this 是由系统或者第三方绑定的。

	// 浏览器
	setTimeout(function () {
	  console.log(this === window); // true
	},0)
	
	// node
	setTimeout(function () {
	  console.log(this === global); // false
	  console.log(this); // Timeout
	},0)

## 参考文献

1. [关于 this 你想知道的一切都在这里](https://segmentfault.com/a/1190000008156495)
2. []()


