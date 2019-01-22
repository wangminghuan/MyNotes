<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习之异步方案</font>


## 第一章  Class （类）

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

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

