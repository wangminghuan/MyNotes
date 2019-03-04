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
</font>
