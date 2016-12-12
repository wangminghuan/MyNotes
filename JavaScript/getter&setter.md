<font face="微软雅黑" size="4" >
<font size="6">JS中的对象属性</font>

ECMAScript 中有两种属性：数据属性和访问器属性
## 数据属性 
数据属性包含一个**数据值的位置**。在这个位置可以读取和写入值。

### 1. 数据属性有以下四个描述其行为的特性：
- [[Configurable]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认值为true。
- [[Enumerable]]：表示能否通过for-in 循环返回属性。默认值为true。
- [[Writable]]：表示能否修改属性的值。默认值为true。
- [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为undefined。

要修改属性默认的特性，必须使用ECMAScript 5 的Object.defineProperty()方法。下面介绍该方法。

### 2. ES5的Object.definedProperty()
这个函数接受三个参数 Object.defineProperty(obj, prop, descriptor)：

- obj，表示要定义属性的对象,
- prop，是要定义或者更改的属性名字，
- descriptor,描述符，来定义属性的具体描述。

例子： 

	var obj={
			name:"jack",
			age:"25",
		};
	Object.defineProperty(obj,"name",{
		writable:false,
		value: "Nicholas"
	});
	obj.name="mike";
	console.log(obj.name);
运行结果：  
1.非严格模式下

	Nicholas
2.严格模式下，报错：
 
	TypeError: Cannot assign to read only property 'name' of #<Object>

### 2 ES5的Object.defineProperties() 
该方法可以通过描述符一次定义多个属性，接受两个参数：  

- 对其添加或修改属性的对象。 这可以是本机 JavaScript 对象或 DOM 对象。；
- 包含一个或多个描述符对象的 JavaScript 对象。 每个描述符对象描述一个数据属性或访问器属性;

例子：

	var obj={};
	Object.defineProperties(obj,{
		_name:{
			value:"jack",
			writable:true
		},
		age:{
			value:"25"
		},
		name:{
	      get:function(){
	      	return this._name;
	      },
	      set:function(val){
	      	this._name="new_"+val;
	      }
		}
	});
	obj.name="blues";
	console.log(obj.name);
运行结果：

	blues//必须设置_name的writable为true，否则严格无法改写属性。

### 3 ES5的Object.getOwnPropertyDescriptor()

获取指定对象的自身属性描述符；接受两个参数：

- 包含属性的对象。
- 属性的名称。

对上面例子执行：

	console.log(Object.getOwnPropertyDescriptor(obj,"name"));
chrome下运行结果：  
![getOwn](http://i.imgur.com/OETNt8S.jpg)  

可以获取name属性的所有属性描述；
## 访问器属性 
访问器属性不包含数据值；它们包含一对儿**getter 和setter 函数**
### 1 在ECMAScript 2015之前，JavaScript中的对象字面量（也称为对象初始化器）是非常基础的。能够定义两种类型的属性：

1. 成对出现的名称以及相应的值{ name1: value1 }

2. getters { get name(){..} } 以及setters { set name(val){..} } 可以用于动态的属性值。

### 2 举个例子：    
####例子1： 

	var obj={
		name:"jack",
		age:"25",
		getName(){
			return this.name;
		},
		setName(val){
	        this.name=val;
		}
	};
	console.log(obj);
	obj.setName("blues");
	console.log(obj);
	console.log(obj.name);
	console.log(obj.name==obj.getName())
运行结果：  
**chrome**下运行结果:  
![字面量1](http://i.imgur.com/KWg2XQ1.png)

**node**下运行结果：
![字面量2](http://i.imgur.com/owltzk9.png)

####例子2 （get和set语句）
	var obj={
		name:"jack",
		age:"25",
		//只可读，不可写
		get getName(){
			return this.name;
		},
		//只可写，不可读
		set setName(val){
	        this.name=val;
		}
	};
	console.log(obj);
	obj.setName="blues";
	console.log(obj);
	console.log(obj.name);
	console.log(obj.name==obj.getName)
**chrome**下运行结果是：

![字面量运行结果](http://i.imgur.com/fd6hCTN.png)

**node**下的运行结果： 

![字面量node下运行结果](http://i.imgur.com/fDKhML9.png)

#### 结论 
1. 例子1中的 getName，setName只是obj下的方法，而例子2下，通过set 和 get标识，getname和setName其实已经成为obj下的属性。
2. 对于例子 2，obj.name是对name变量的getter方法调用。
3. 对于例子2，obj.name和obj.getName可以理解为互相绑定，改动任何一个都会反应到对方上。
4. 不管是通过方法，还是属性改写name属性，均已经动态同步到了原始的数据上。
5. 一个对象内，每个变量只能有一个getter或setter。（因此value可以有一个getter和一个setter，但是value绝没有两个getters）
6. 删除getter或setter的唯一方法是：delete object[name]。delete可以删除一些常见的属性，getters和setters。

### ES5之前的getter和setter
在getter和setter出现之前，有两个非标准的方法：`__defineGetter__()`和`__defineSetter__()`，最初由fireFox引入。

	var obj={
		_name:"jack",
		age:"25"
	};
	
	obj.__defineGetter__("name", function(){
	return "get_"+this._name;
	});
	obj.__defineSetter__("name", function(newValue){
	 return this._name="new_"+newValue;
	});
	console.log(obj);
	obj.name="blues";//调用__defineSetter__
	console.log(obj);//调用__defineGetter__
	console.log(obj.name);//调用__defineGetter__
运行结果：
**chrome**下运行结果是：
![old](http://i.imgur.com/u8ZVDJd.png)

**node**下的运行结果： 
![old setter&getter 2](http://i.imgur.com/6Rn004D.png)
### 结论
1. 如果使用__defineGetter__或__defineSetter__，它会重写之前定义的相同名称的getter或setter，甚至是属性(property)。
2. _name 前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性。


##  参考文献

1. [vue.js关于Object.defineProperty的利用原理](http://www.jianshu.com/p/07ba2b0c8fca)


