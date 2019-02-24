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
	console.log(Object.keys(Person.prototype))；//[] toSayHi方法是Person类内部定义的方法，它是不可枚举的

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
	console.log(Object.keys(Person.prototype))；//["toSayHi"] ES5写法下，toSayHi方法是可以枚举的，
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

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

