<font face="微软雅黑" size="4" >
<font size="6">Vue 数据绑定原理</font>

## 几种实现双向绑定的做法

1. 订阅者-发布者模式（backbone.js）  
   更新数据方式通常做法是 vm.set('property', value)，该方式有点 low，看起来没那么友好

2. 脏值检查（angular.js）

3. 数据劫持（vue.js）  
   Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调

## Object.defineProperty 方法
方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
#### 语法

	Object.defineProperty(obj,prop,descriptor)

#### 参数

	obj 需要定义属性的对象。
	
	prop 需定义或修改的属性的名字。
	
	descriptor 将被定义或修改的属性的描述符。
### 属性描述符

主要有两种形式： 数据描述符和存取描述符.

数据描述符： 拥有可写或不可写值的属性

	 可选键值：  
	 configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除） 
	 enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
	 writable: 当且仅当该属性的值为true时，该属性才能被赋值运算符改变， 默认为false。 
	 value： 该属性对应的值，可以是任意有效的javascript的值（数值，对象，函数等），默认为undefined
举个例子：

     var a={};
	 Object.defineProperty(a, "b", {
	      configurable: false, // 不可删除
	      enumerable: false,// 不可通过for in 枚举
	      writable: false, // 不可通过等号赋值改写
	      value: 8  //属性值
	    })

存取描述符： 由一对getter-setter函数功能来描述的属性

	  可选键值： 
	  configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除）
	  enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
	  get:  给属性提供getter的方法，如果没有 getter 则为undefined。当我们读取某个属性的时候，其实是在对象内部调用了该方法，此方法必须要有return语句。该方法返回值被用作属性值。默认为 undefined 。
	  set：设置属性值的方法， 如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。也就是说，当我们设置某个属性的时候，实际上是在对象的内部调用了该方法。

### 在 descriptor 中不能同时设置访问器（get 和 set）和 wriable 或 value，否则会错，就是说想用 get 和 set，就不能用 writable 或 value 中的任何一个。


### 参考文档

1. [Vue 数据绑定详细原理剖析](https://blog.csdn.net/itkingone/article/details/79152951)
