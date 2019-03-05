<font face="微软雅黑" size="4" >
<font size="6">JavaScript对象</font>

## 第一部分 面向对象与基于对象
### 1. 什么是面向对象
Object（对象）在英文中，是一切事物的总称，这和面向对象编程的抽象思维有互通之处。

在《面向对象分析与设计》这本书中，Grady Booch 替我们做了总结，他认为，从人类的认知角度来说，对象应该是下列事物之一：

1. 一个可以触摸或者可以看见的东西；
2. 人的智力可以理解的东西；
3. 可以指导思考或行动（进行想象或施加动作）的东西。

有了对象的自然定义后，我们就可以描述编程语言中的对象了。在不同的编程语言中，设计者也利用各种不同的语言特性来抽象描述对象，最为成功的流派是使用“类”的方式来描述对象，这诞生了诸如 C++、Java 等流行的编程语言。而 JavaScript 早年却选择了一个更为冷门的方式：原型。

### 2. JavaScript对象的特征

1. 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
2. 对象有状态：对象具有状态，同一对象可能处于不同状态之下。
3. 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

我们先来看第一个特征，对象具有唯一标识性。一般而言，各种语言的对象唯一标识性都是用内存地址来体现的， 对象具有唯一标识的内存地址，所以具有唯一的标识。

关于对象的第二个和第三个特征“状态和行为”，不同语言会使用不同的术语来抽象描述它们，比如 C++ 中称它们为“成员变量”和“成员函数”，Java 中则称它们为“属性”和“方法”。 

在 JavaScript 中，将状态和行为统一抽象为“属性”，考虑到 JavaScript 中将函数设计成一种特殊对象，所以 JavaScript 中的行为和状态都能用属性来抽象。

    var o = { 
        d: 1,
        f() {
            console.log(this.d);
        }    
    };
    //o 是对象，d 是一个属性，而函数 f 也是一个属性。


**在实现了对象基本特征的基础上, winter认为，JavaScript 中对象独有的特色是：对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。**

    var o = { a: 1 };
    o.b = 2;
    console.log(o.a, o.b); //1 2

JavaScript 允许运行时向对象添加属性，这就跟绝大多数基于类的、静态的对象设计完全不同(如Java)。

### 3. JavaScript 对象的两类属性
#### 数据属性。
它比较接近于其它语言的属性概念。数据属性具有四个特征:

1. value：就是属性的值。
2. writable：决定属性能否被赋值。
3. enumerable：决定 for in 能否枚举该属性。
4. configurable：决定该属性能否被删除或者改变特征值。

在大多数情况下，我们只关心数据属性的值即可。我们可以使用`Object.defineProperty`来定义属性：  


	var o = {
	  a: 1
	};
	Object.defineProperty(o, "b", {
	  value: 2,
	  writable: false,
	  enumerable: false,
	  configurable: true
	});
	//a 和 b 都是数据属性，但特征值变化了
	Object.getOwnPropertyDescriptor(o, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
	Object.getOwnPropertyDescriptor(o, "b"); // {value: 2, writable: false, enumerable: false, configurable: true}
	o.b = 3;
	console.log(o.b); // 2，b的值不会发生变化
#### 访问器（getter/setter）属性，
访问器属性也有四个特征:

1. getter：函数或 undefined，在取属性值时被调用。
2. setter：函数或 undefined，在设置属性值时被调用。
3. enumerable：决定 for in 能否枚举该属性。
4. configurable：决定该属性能否被删除或者改变特征值。

访问器属性使得属性在读和写时执行代码，它允许使用者在写和读属性时，得到完全不同的值，它可以视为一种函数的语法糖。

    const k={
	  get age(){
	   console.log("get")
	   return 5
	  },
	  set age(val){
	    console.log("set:"+val)
	  }
	}
	k.age=2;// set:2
	k.age;// 5

访问器属性跟数据属性不同，每次访问属性都会执行 getter 或者 setter 函数。

### 4. 结束语
实际上 JavaScript 对象的运行时是一个“属性的集合”，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。

## 第二部分 原型与类

### 1. 基于类和基于原型的差异
第一部分提到过：在不同的编程语言中，设计者也利用各种不同的语言特性来抽象描述对象：  

最为成功的流派是使用“类”的方式来描述对象，这诞生了诸如 C++、Java 等流行的编程语言。这个流派叫做**基于类的编程语言**。   

还有一种就是**基于原型的编程语言**，它们利用原型来描述对象。我们的 JavaScript 就是其中代表。

“基于类”的编程提倡使用一个关注分类和类之间关系开发模型。在这类语言中，总是先有类，再从类去实例化一个对象。类与类之间又可能会形成继承、组合等关系。类又往往与语言的类型系统整合，形成一定编译时的能力。

而“基于原型”的编程看起来更为提倡程序员去关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类。


JavaScript 并非第一个使用原型的语言，在它之前，self、kevo 等语言已经开始使用原型来描述对象了。原型系统的“复制操作”有两种实现思路：

1. 一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；
2. 另一个是切实地复制对象，从此两个对象再无关联。

显然JavaScript选择的是第一种方案。

### 2. JavaScript的原型

原型系统可以说相当简单，可以用两条概括：

1. 如果所有对象都有私有字段 [[prototype]]，就是对象的原型；
2. 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

这个模型在ES的各个版本中并没有很大改变，但在ES6中提供了一系列的内置函数，可以更直接的访问操作原型。三个方法分别是：

1. Object.create 根据指定的原型创建新对象，原型可以是 null；
		
		//关于Object.create的补充
		ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承。
        这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。
		在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。
        //object 方法如下：
		function object(o){
			function F(){}
			F.prototype = o;
			return new F();
		}
2. Object.getPrototypeOf 获得一个对象的原型；
3. Object.setPrototypeOf 设置一个对象的原型。

		
利用这三个方法，可以安全抛开类的思想，利用原型链来实现抽象和复用：

	var cat = {
	  say(){
	      console.log("meow~");
	  },
	  jump(){
	      console.log("jump");
	  }
	}
		
	var tiger = Object.create(cat,  {
	  say:{
	      writable:true,
	      configurable:true,
	      enumerable:true,
	      value:function(){
	          console.log("roar!");
	      }
	  }
	})
	
	
	var anotherCat = Object.create(cat);
	
	anotherCat.say();//"meow~"
	var anotherTiger = Object.create(tiger);
	
	anotherTiger.say();//"roar!"

### 3. 早期版本中的类与原型
在早期版本的 JavaScript 中，“类”的定义是一个私有属性 [[class]]，语言标准为内置类型诸如 Number、String、Date 等指定了 [[class]] 属性，以表示它们的类。语言使用者唯一可以访问 [[class]] 属性的方式是 Object.prototype.toString。  

	var o = new Object;
	var n = new Number;
	var s = new String;
	var b = new Boolean;
	var d = new Date;
	var arg = function(){ return arguments }();
	var r = new RegExp;
	var f = new Function;
	var arr = new Array;
	var e = new Error;
	console.log([o, n, s, b, d, arg, r, f, arr, e].map(v => Object.prototype.toString.call(v))); 
	//运行结果：
	//["[object Object]", "[object Number]", "[object String]", "[object Boolean]", "[object Date]", "[object Arguments]", "[object RegExp]", "[object Function]", "[object Array]", "[object Error]"]

在 ES3 和之前的版本，JS 中类的概念是相当弱的，它仅仅是运行时的一个字符串属性。在 ES5 开始，[[class]] 私有属性被 Symbol.toStringTag 代替，Object.prototype.toString 的意义从命名上不再跟 class 相关。我们甚至可以自定义 Object.prototype.toString 的行为:

	var o = { [Symbol.toStringTag]: "MyObject" };
	console.log(Object.prototype.toString.call(o));//[object MyObject]
    console.log(o + "");//[object MyObject] 对于Object类型,如果toString方法没有被改写过（如Number类型），通过加法也可以触发；

对于new运算符：它接受一个构造器和一组调用参数，实际上做了几件事：

1. 以构造器的 prototype 属性（注意与私有字段 [[prototype]] 的区分）为原型，创建新对象；
2. 将 this 和调用参数传给构造器，执行；
3. 如果构造器返回的是对象，则返回，否则返回第一步创建的对象。

没有 Object.create、Object.setPrototypeOf 的早期版本中，new 运算是唯一一个可以指定 [[prototype]] 的方法，我们甚至可以用它来实现一个 Object.create 的不完整的 pollyfill，见以下代码（同上面object方法）：

	function object(o){
		function F(){}
		F.prototype = o;
		return new F();
	}
但是这个函数无法做到与原生的 Object.create 一致，一个是不支持第二个参数，另一个是不支持 null 作为原型，所以意义已经不大了。


### 4. ES6中的类与原型

ES6 中加入了新特性 class，new 跟 function 搭配的怪异行为终于可以退休了。在任何场景，推荐使用 ES6 的语法来定义类，而令 function 回归原本的函数语义。

同时，ES6 中引入了 class 关键字，并且在标准中删除了所有 [[class]] 相关的私有属性描述，类的概念正式从属性升级成语言的基础设施，从此，基于类的编程方式成为了 JavaScript 的官方编程范式。

此外，最重要的是，类提供了继承能力（extends）


## 第三部分 JavaScript对象分类
### 1. 分类

我们可以把对象分为以下种类：

1. 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
2. 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象
   - 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
   - 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。  
   - 普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。
   
这里主要介绍处理普通对象之外的其他对象

### 2 宿主对象
JavaScript 宿主对象千奇百怪，但是前端最熟悉的无疑是浏览器环境中的宿主了。浏览器对象中有一个window全局对象，实际上，这个全局对象 window 上的属性，一部分来自 JavaScript 语言，一部分来自浏览器环境。  

宿主对象也分为固有的和用户可创建的两种，比如 document.createElement 就可以创建一些 dom 对象。    

宿主也会提供一些构造器，比如我们可以使用 new Image 来创建 img 元素，这些我们会在浏览器的 API 部分详细讲解。  

### 3 内置对象-固有对象
固有对象是由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。

可以点击[这个链接](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-well-known-intrinsic-objects)查看固有对象。


### 4 内置对象-原生对象
我们把 JavaScript 中，能够通过语言本身的构造器创建的对象称作原生对象。在 JavaScript 标准中，提供了 30 多个构造器。按照winter的理解，按照不同应用场景，可以把原生对象分成了以下几个种类：

![](https://i.imgur.com/3fpEMMi.png)
通过这些构造器，我们可以用 new 运算创建新的对象，所以我们把这些对象称作原生对象。几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承（作者说的不能继承是指无法完全一模一样，只能继承部分方法，具体可以参见[原生构造函数的继承](http://es6.ruanyifeng.com/#docs/class-extends#%E5%8E%9F%E7%94%9F%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E7%BB%A7%E6%89%BF)）
### 5 特殊行为的对象
除了上面介绍的对象之外，在固有对象和原生对象中，有一些对象的行为跟正常对象有很大区别。

1. Array：Array 的 length 属性根据最大的下标自动发生变化。
2. Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
3. String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
4. Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
5. 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
6. 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
7. bind 后的 function：跟原来的函数相关联。

### 6 用对象来模拟函数与构造器：函数对象与构造器对象
在 JavaScript 中，还有一个看待对象的不同视角，这就是用对象来模拟函数和构造器。  

函数对象的定义是：具有 [[call]] 私有字段的对象; 

构造器对象的定义是：具有私有字段 [[construct]] 的对象;

任何对象只需要实现 [[call]]，它就是一个函数对象，可以去作为函数被调用。而如果它能实现 [[construct]]，它就是一个构造器对象，可以作为构造器被调用。

用户用 function 关键字创建的函数必定同时是函数和构造器。不过，它们表现出来的行为效果却并不相同。

对于宿主和内置对象来说，它们实现 [[call]]（作为函数被调用）和 [[construct]]（作为构造器被调用）不总是一致的。比如内置对象 Date 在作为构造器调用时产生新的对象，作为函数时，则产生字符串，见以下代码：

    console.log(new Date,typeof new Date); // Tue Mar 05 2019 18:09:07 GMT+0800 (中国标准时间) "object"
    console.log( Date(),typeof Date()); // Tue Mar 05 2019 18:09:07 GMT+0800 (中国标准时间) string
而浏览器宿主环境中，提供的 Image 构造器，则根本不允许被作为函数调用。

	console.log(new Image); 
	console.log(Image());// 抛出错误

再比如基本类型（String、Number、Boolean），它们的构造器被当作函数调用，则产生类型转换的效果。

在 ES6 之后 => 语法创建的函数仅仅是函数，它们无法被当作构造器使用，见以下代码：

    new (a => 0) // error


对于用户使用 function 语法或者 Function 构造器创建的对象来说，[[call]] 和 [[construct]] 行为总是相似的，它们执行同一段代码。我们大致可以认为，它们 [[construct]] 的执行过程如下：

1. 以 Object.protoype 为原型创建一个新对象；
2. 以新对象为 this，执行函数的 [[call]]；
3. 如果 [[call]] 的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。

这样的规则造成了个有趣的现象，如果我们的构造器返回了一个新的对象，那么 new 创建的新对象就变成了一个构造函数之外完全无法访问的对象，这一定程度上可以实现“私有”。

	function cls(){
	  this.a = 100;
	  return {
	      getValue:() => this.a
	  }
	}
	var o = new cls();
	o.getValue(); //100
	//a 在外面永远无法访问到

### 7 JavaScript 全局对象的属性

1. 三个值：

		Infinity、NaN、undefined。
2. 九个函数：

		eval、isFinite、isNaN、parseFloat、parseInt、decodeURI、decodeURIComponent、
		encodeURI、encodeURIComponent
3. 一些构造器：  

		Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeapSet、
		Function、Boolean、String、Number、Symbol、Object、Error、EvalError、
		RangeError、ReferenceError、SyntaxError、TypeError
4. 四个用于当作命名空间的对象：

		Atomics、JSON、Math、Reflect

</font>
