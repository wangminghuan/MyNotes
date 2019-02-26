<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习之Class和Module</font>


## 第一章  Class （类）
JavaScript 语言中，生成实例对象的传统方法是通过构造函数实现的，但这种写法跟传统面向对象的语法（c++/java）等差异很大，ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
### 简介
### 1.1 概述
通过class关键字，可以定义类，这样更优雅，易于理解。

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
	console.log(Object.keys(Person.prototype));//[] toSayHi方法是Person类内部定义的方法，它是不可枚举的

上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，this关键字则代表实例对象。**注意：**定义“类”的方法不需要function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。  
上述代码等同于：

	function Person(x){
	  this.name = x;
	}
	Person.prototype.toSayHi=function(){
	  return 'Hello '+this.name;
	}
	
	const p1=new Person("jack");
	p1.name; //"jack"
	p1.toSayHi();//"Hello jack"
	console.log(Object.keys(Person.prototype));//["toSayHi"] ES5写法下，toSayHi方法是可以枚举的，
	//注意ES6和ES5下此处的行为不一致

以上两种模式都满足：

	//等式1
	p1.constructor===Person;//true  
	
	//等式2
	Person===Person.prototype.constructor;//true 

	//等式3
	p1.constructor===Person.prototype.constructor;//true


说明：

1. 每个实例对象都有一个 constructor（构造函数）属性，该属性指向创建它的构造函数，也就是说constructor始终指向创建当前对象的构造函数，所以等式1成立；
2. 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针，即指向函数本身。所以等式2成立（参见下图）；
![](https://i.imgur.com/TfZEe48.png)
3. 将等式1和等式2合并即可得到等式3成立。

另外：类的内部所有定义的方法，都是不可枚举的（demo代码中已经标明）。  

**可以看到：**ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法：

	class Person{
	  constructor(x) {
	    this.name = x;
	  }
	}
	Object.assign(Person.prototype,{
	  toSayHi() {
	    return 'Hello '+this.name;
	  },
	  toValue(){
	    return 'value ' +this.name
	  }
	})
	const p1=new Person("jack");
	console.log(p1.toSayHi()); //"Hello jack"
	console.log(p1.toValue()); //"value jack"


### 1.2 constructor 方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加:

	function Person(x){
	  this.name = x;
	}
	console.log(Person.prototype)
	class Person2{
	 
	}
	console.log(Person2.prototype)
![](https://i.imgur.com/TevaPJa.png)
### 1.3 类的实例
同ES5一致，生成类的实例的写法，也是使用new命令。实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）


	//定义类
	class Point {
	
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	
	  toString() {
	    return '(' + this.x + ', ' + this.y + ')';
	  }
	
	}
	
	var point = new Point(2, 3);
	
	point.toString() // (2, 3)
	
	point.hasOwnProperty('x') // true
	point.hasOwnProperty('y') // true
	point.hasOwnProperty('toString') // false
	point.__proto__.hasOwnProperty('toString') // true
### 1.4 取值函数（getter）和存值函数（setter）
与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。


	class Person{
	    constructor(){
	    }
	    get name(){
	        return "getter"
	    }
	    set name(val){
	        console.log("setter")
	    }
	}
	const p = new Person()
	console.log(p.name) ;// getter
	p.name="x";// setter
	console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'name'))
存值函数和取值函数是设置在属性的 Descriptor 对象上的:
![](https://i.imgur.com/yh6pLru.jpg)
### 1.5 属性表达式
类的属性名，可以采用表达式。

	let methodName = 'getArea';
	
	class Square {
	  constructor(length) {
	    // ...
	  }
	
	  [methodName]() {
	    // ...
	  }
	}
### 1.6 Class 表达式

	const MyPerson = class Person {
    getClassName() {
      return Person.name;
    }
  	};
	const p =new MyPerson();
	console.log(p.getClassName());//"Person"
	const p1 =new Person(); // 报错 Uncaught ReferenceError: Person is not defined
类的名字是Person，但是Person只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyPerson引用;

如果类内部用不到 Person ，完全可以省略不写，也可以采用 Class 表达式，可以写出立即执行的 Class：  

	const p = new class {
	    constructor(name) {
	        this.name = name;
	      }
	    getClassName() {
	      console.log(this.name)
	    }
	  }('张三');
	p.getClassName();//"张三"
### 1.6 注意点
1. 不存在提升

		new Person();
		class Person{};
	    //会报错

        new Person();
		function Person(){}
        //运行正常
2. name属性：  
name属性总是返回紧跟在class关键字后面的类名：这点同ES5一样。
3. this 的指向  
类的方法内部如果含有this，它默认指向类的实例。但如果单独使用该方法，那么很可能报错。推荐使用箭头函数：

		class Logger {
		  constructor() {
		    this.printName = (name = 'there') => {
		      this.print(`Hello ${name}`);
		    };
		  }
		
		  // ...
		}
### 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是**直接通过类来调用**，这就称为“静态方法”。

	 class Person {
	    static bar() {
	        this.baz();
	      }
	    static baz() {
	        console.log('hello');
	      }
	      baz() {
	        console.log('world');
	      }
	  }
	  const p = new Person();
	  Person.baz() // 'hello'
	  p.baz() //'world'
	  Person.bar(); //hello 静态方法的this指的是类，而不是实例！！！
	  p.bar() //报错 p.bar is not a function
可以看到：静态方法中的this关键字，指的是类，而不是实例。  

父类的静态方法，可以被子类继承。

	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	}
	
	Bar.classMethod() // 'hello'
### 实例属性的新写法
实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性：

	class foo {
	  bar = 'hello';
	  baz = 'world';
	
	  constructor() {
	    // ...
	  }
	}
ps：上述写法目前在chrome中直接运行会报错。2019-02-24标注
### 静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。  

	class Foo {
	}
	
	Foo.prop = 1;
	Foo.prop // 1
目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。  

现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上static关键字(目前chrome未实现)：

	class Foo {
	  static prop=1
	}
### 私有方法和私有属性
私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。    
具体实现方法可参见，目前还没有特别完美的方案[私有属性和方法](http://es6.ruanyifeng.com/#docs/class#%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95%E5%92%8C%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7)，新版的提案（前面加#号）暂时还未实现。

### new.target 属性

new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

	function Person(name) {
	  if (new.target !== undefined) {
	    this.name = name;
	  } else {
	    throw new Error('必须使用 new 命令生成实例');
	  }
	}
	
	// 另一种写法
	function Person(name) {
	  if (new.target === Person) {
	    this.name = name;
	  } else {
	    throw new Error('必须使用 new 命令生成实例');
	  }
	}
	
	var person = new Person('张三'); // 正确
	var notAPerson = Person.call(person, '张三');  // 报错
## 第二章 类的继承
### 2.1 extends
Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多：

	class Animal{
	  constructor(){
	    this.food="meat"
	  }
	  sayHi(){
	    console.log("I am animal, I eat "+ this.food)
	  }
	  food(){
	    return this.food
	  }
	}
	
	class Cat extends Animal{
	  constructor(){
	    super(); //子类必须在constructor方法中调用super方法，否则新建实例时会报错
	    this.color="black";
	  }
	  sayHi(){
	    console.log("I am cat, I eat "+ super.food() + ", my color is "+this.color )
        console.log("I am cat, I eat "+ this.food + ", my color is "+this.color );
        //继承了父级的food属性
        // 子类方法中调用父类方法，必须通过super关键字，super.food()
	  }
	}
	const cat=new Cat();
	const ani= new Animal();
	ani.sayHi(); //I am animal, I eat meat
	cat.sayHi(); 
    //I am cat, I eat meat, my color is black
    //I am cat, I eat meat, my color is black
注意：  

1. 子类方法中super关键字的调用：子类必须在constructor方法中调用super方法，否则新建实例时会报错。子类方法中如果需要调用父级的方法，需通过super关键字。  
2. ES6继承机制同ES5完全不同：先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。而ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）
3. 不管有没有显式定义，任何一个子类都有constructor方法（会被默认添加）。

		class ColorPoint extends Point {
		}
		
		// 等同于
		class ColorPoint extends Point {
		  constructor(...args) {
		    super(...args);
		  }
		}
4. 通过子类创建的实例，同时是Cat和Animal两个类的实例，这与 ES5 的行为完全一致。

		const cat=new Cat();
		cat instanceof Cat;//true
		cat instanceof Animal; //true
5. 父类的静态方法，也会被子类继承。

		class A {
		  static hello() {
		    console.log('hello world');
		  }
		}
		
		class B extends A {
		}
		
		B.hello()  // hello world
### 2.2 Object.getPrototypeOf()

Object.getPrototypeOf方法可以用来从子类上获取父类，可以使用这个方法判断，一个类是否继承了另一个类：

	Object.getPrototypeOf(Cat) === Animal

### 2.3 super 关键字
super这个关键字，既可以当作函数使用，也可以当作对象使用： 
 
1. super作为函数调用时，代表父类的构造函数。并且`super()`只能用在子类的构造函数之中，用在其他地方就会报错。
2. super作为对象时（在普通方法中）：指向父类的原型对象（`A.prototype`）；

		class A {
		  p() {
		    return 2;
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    console.log(super.p()); // 2  相当于A.prototype.p()。
		  }
		}
		
		let b = new B();
		b.m // undefined  super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

		class A {
		  constructor() {
		    this.x = 1;
		  }
		  print() {
		    console.log(this.x);
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		    super.x = 3;
		    console.log(super.x); // undefined 
		    console.log(this.x); // 3
		  }
		  m() {
		    super.print();
		  }
		}
		
		let b = new B();
		b.m() // 3  A.prototype.print()内部的this指向子类B的实例，而不是A.prototype
上面代码中可以看到：如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性：`super.x`赋值为3，这时等同于对`this.x`赋值为3。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回undefined。  

3. super作为对象时（在静态方法中）：指向父类。而不是父类的原型对象。

		class Parent {
		  static myMethod(msg) {
		    console.log('static', msg);
            //静态方法中的this指向Parent而不是Parent的实例
		  }
		
		  myMethod(msg) {
		    console.log('instance', msg);
		  }
		}
		
		class Child extends Parent {
		  static myMethod(msg) {
		    super.myMethod(msg);
		  }
		
		  myMethod(msg) {
		    super.myMethod(msg);
		  }
		}
		
		Child.myMethod(1); // static 1  父类直接调用，会返回静态方法
		
		var child = new Child();
		child.myMethod(2); // instance 2 实例调用，会返回父类的原型对象方法
在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。

		class A {
		  constructor() {
		    this.x = 1;
		  }
		  static print() {
		    console.log(this.x);
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		  }
		  static m() {
		    super.print();
		  }
		}
		
		B.x = 3;
		B.m() // 3  B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例。
4. 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
5. 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

### 2.4 原生构造函数的继承
原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

	Boolean()
	Number()
	String()
	Array()
	Date()
	Function()
	RegExp()
	Error()
	Object()
ES6之前这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。  
	function MyArray() {
	    Array.apply(this, arguments);
	  }
	  
	  MyArray.prototype = Object.create(Array.prototype, {
	    constructor: {
	      value: MyArray,
	      writable: true,
	      configurable: true,
	      enumerable: true
	    }
	  });
	
	  var colors = new MyArray();
	  colors[0] = "red";
	  colors.length  // 0
但是，在ES6中，通过class关键字可以实现原生构造函数的继承：

	class MyArray extends Array {
	  constructor(...args) {
	    super(...args);
	  }
	}
	
	var arr = new MyArray();
	arr[0] = 12;
	arr.length // 1
	
	arr.length = 0;
	arr[0] // undefined
extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
### 补充 —— 实例，构造函数和原型链
简单回顾一下构造函数、原型和实例的关系：**每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针**

	class Person{
	  constructor(x) {
	    this.name = x;
	  }
	
	  toSayHi() {
	    return 'Hello '+this.name;
	  }
	}
	const p1=new Person("jack");
	
	//每个构造函数都有一个原型对象(prototype)
	console.log(0,Person.prototype);
		//0,{
        //  constructor: class Person
		//	toSayHi: ƒ toSayHi()
		//	__proto__: Object
		//	}
	
	//原型对象都包含一个指向构造函数的指针(constructor)
	console.log(1,Person===Person.prototype.constructor);
	
	//实例都包含一个指向原型对象的内部指针(这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间)
	console.log(2,p1.__proto__===Person.prototype);//true
	 
    

![](https://i.imgur.com/cm7ZlKj.jpg)

同时以上代码还满足

 
	//实例会自动含有一个constructor属性，指向它们的构造函数,
	console.log(3,p1.constructor===Person);//true
	
	// instanceof运算符，验证原型对象与实例对象之间的关系。
	console.log(4,p1 instanceof Person); //true
	console.log(5,p1 instanceof Object); //true

## 第三章 Module 的语法
### 3.1 概述
ES6 模块的设计思想是尽量的静态化，而commonJS则是使用“运行时加载”，因为只有运行时才能得到这个对象。

	// CommonJS模块
	let { stat, exists, readFile } = require('fs');
	
	// 等同于
	let _fs = require('fs');
	let stat = _fs.stat;
	let exists = _fs.exists;
	let readfile = _fs.readfile;
上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”。

**ES6 模块不是对象**，而是通过export命令显式指定输出的代码，再通过import命令输入。

	// ES6模块
	import { stat, exists, readFile } from 'fs';
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。同时这也使得静态分析成为可能（如引入宏或类型检验）。

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict"。

### 3.2 export 命令
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

	//写法一
	// profile.js
	export var firstName = 'Michael';
	export var lastName = 'Jackson';
	export var multiply = function (x, y) {
		  return x * y;
	};

    //写法二
	var firstName = 'Michael';
	var lastName = 'Jackson';
	var multiply = function (x, y) {
		  return x * y;
	};
	
	export {firstName, lastName, multiply};
通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。

	function v1() { ... }
	function v2() { ... }
	
	export {
	  v1 as streamV1,
	  v2 as streamV2,
	  v2 as streamLatestVersion
	};
上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。(这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新)。  

export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。
### 3.3 import 命令
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

	// main.js
	import {firstName, lastName, year} from './profile.js';

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。

	import { lastName as surname } from './profile.js';
import命令输入的变量都是只读的，不允许在加载模块的脚本里面，改写接口。
	
	import {a} from './xxx.js'
	a = {}; // Syntax Error : 'a' is read-only;不允许重新赋值
    a.foo = 'hello'; // 合法操作，改写属性是允许的
import命令具有提升效果，会提升到整个模块的头部，会首先执行。

	foo();
	
	import { foo } from 'my_module';
由于import是静态执行，所以不能使用表达式和变量

	// 报错
	import { 'f' + 'oo' } from 'my_module';
import语句会执行所加载的模块：

	import 'lodash';
如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。

	import 'lodash';
	import 'lodash';
模块加载时会自动判断：

	import { foo } from 'my_module';
	import { bar } from 'my_module';
	
	// 等同于
	import { foo, bar } from 'my_module';
## 第四章 Module 的加载实现




## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [一句话总结JS构造函数、原型和实例的关系](https://blog.csdn.net/u012443286/article/details/78823955)
3. [构造函数，原型对象，实例对象三者之间的关系](http://www.cnblogs.com/liyusmile/p/8820443.html)

