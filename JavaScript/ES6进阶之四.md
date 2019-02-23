<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习之Class和Module</font>


## 第一章  Class （类）
JavaScript 语言中，生成实例对象的传统方法是通过构造函数实现的，但这种写法跟传统面向对象的语法（c++/java）等差异很大，ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

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
同ES5一致，
### 1.4 取值函数（getter）和存值函数（setter）

### 1.5 类的实例
## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

