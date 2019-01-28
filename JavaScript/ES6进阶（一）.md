<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 第一章 let和const

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1  let
1. ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的**代码块内有效**。也就是其声明的变量就绑定在这个区域中，不会再受到外界影响。

		{
		  let a = 10;
		  var b = 1;
		}
		console.log(b);//1
		console.log(a);//报错: a is not defined.
例子2：

		for (let i = 0; i < 3; i++) {
		  let i = 100;
		  console.log(i);
		}
		//输出 三次100，说明循环体内部是一个单独的作用域，如果换成var,则只会输出一次100。
特别对于for循环绑定事件获取索引问题可以很好的解决[点我了解更多](https://github.com/wangminghuan/MyNotes/blob/master/%E5%85%B6%E4%BB%96/for%E5%BE%AA%E7%8E%AF%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6%E8%8E%B7%E5%8F%96%E7%B4%A2%E5%BC%95%E9%97%AE%E9%A2%98.md)

2. ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

3. let声明，一个代码块内不可重复声明，否则会报错，而var命名则不会。

		function func(arg) {
		  let arg; // 报错
		}
		
		function func(arg) {
		  {
		    let arg; // 不报错
		  }
		}

### 1.2 const

1. const声明一个只读的常量。一旦声明，常量的值就不能改变, 
2. const一旦声明变量，就必须立即初始化，不能留到以后赋值。
3. const如果赋值一个对象时，保存的只是一个指向实际数据的指针

	      const obj={};
	      obj.name="123";//可以修改指针指向对象的数据
	      obj=null；//报错！，不可修改指针的指向

### 1.3 顶层对象属性
ES5中顶层对象的属性与全局变量挂钩，这也被认为是js语言设计最大的败笔之一，各种命名冲突，很多只有在运行过程中才被暴露出来。

    let a=1;
    var b=2;
    const c=3;
    console.log(window.a);//undefined
    console.log(window.b);//2
	console.log(window.c);//undefined

目前在ES6中顶层对象依旧没有统一。

1. 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
2. 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
3. Node 里面，顶层对象是global，但其他环境都不支持。
### 1.4 变量声明的六种方式

### 1.5 块级作用域
1. es6 支持通过 `{}`（花括号）创建块级作用域
2. es6 允许块级作用域的任意嵌套，外层作用域无法读取内层作用域的变量。
3. es5的块级作用域一般通过自执行函数（IIFE）来创建，块级作用域的出现，IIFE不再必要了。
4. ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。ES6进行了修正，允许块级作用域内声明函数，但该函数只能在当前作用域内生效。外部无法访问（具体不同的浏览器实现会不一样）



## 第二章 变量的解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
### 2.1 数组的解构赋值
将等号右边的数组，按照一定的匹配模式赋值给左边的变量。
####  基本用法

我们通常给变量赋值，采用下面写法：

	let a = 1;
	let b = 2;
	let c = 3;
ES6 允许这样赋值

	let [a, b, c] = [1, 2, 3];

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

#### 注意
1. 如果解构不成功，变量的值就等于undefined。  
2. 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。  
3. 如果等号的右边不是数组，（或者严格地说，不是可遍历的结构），那么将会报错。
 
		// 报错
		let [foo] = 1;
		let [foo] = false;
		let [foo] = NaN;
		let [foo] = undefined;
		let [foo] = null;
		let [foo] = {};

### 2.2 默认值
解构赋值允许指定默认值。

	let [foo = true] = [];
	foo // true
	
	let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

### 2.3 对象的解构赋值
解构不仅可以用于数组，还可以用于对象。    
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值（也可以将数组的索引认为是唯一的key，这样与对象的属性其实也是相通的）

	let { bar, foo } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"
	
	let { baz } = { foo: "aaa", bar: "bbb" };
	baz // undefined
	//可以这样理解：前面的部分只是变量声明，声明了变量foo和bar, 等号后面是对这两个变量进行赋值，foo的值为'aaa'，bar的为'bbb'。  

如果变量名与属性名不一致，必须写成下面这样(可以理解为变量名映射）

	let { foo: baz } = { foo: "aaa", bar: "bbb" };
	console.log(baz);//foo是匹配的模式，baz才是变量。真正被赋值的是变量baz

与数组一样，解构也可以用于嵌套结构的对象:

	let obj = {
	  p: [
	    'Hello',
	    { y: 'World' }
	  ]
	};
	
	let { p: [x, { y }] } = obj;
	
	console.log(x,y);// Hello World
	console.log(p);// 报错
这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以这样写：

	let obj = {
	  p: [
	    'Hello',
	    { y: 'World' }
	  ]
	};
	
	let { p, p: [x, { y }] } = obj;
	
	console.log(x,y);// Hello World
	console.log(p);// ["Hello", {y: "World"}]
如果层级比较多，需要每一级都赋值的话，需要多次匹配

		const node = {
		  loc: {
		    start: {
		      line: 1,
		      column: 5
		    }
		  }
		};
		
		let { loc, loc: { start }, loc: { start: { line }} } = node;
		line // 1
		loc  // Object {start: Object}
		start // Object {line: 1, column: 5}
### 2.4 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

### 2.5 数值和布尔值的解构赋值
### 2.6 函数参数的解构赋值
### 2.7 圆括号问题

### 2.8 解构赋值的用途




## 第三章  Symbol

### 3.1 基本属性
1. ES5 的对象属性名都是字符串，这容易造成属性名的冲突。所以ES6新引入了一种全新的原始数据类型Symbol。
2. Symbol不是对象，所以不同通过创建对象的方式来创建（譬如 new），它的值通过Symbol函数生成。基本上，它是一种类似于字符串的数据类型。
3. 举个例子

        let s1 = Symbol('foo');
        let s2 = Symbol('bar');
        console.log([s1,s2])//[Symbol(foo), Symbol(bar)]
         //Symbol 值不能与其他类型的值进行运算
        console.log("s1的值为"+s1) //报错，Cannot convert a Symbol value to a string
        console.log("s1的值为"+s1.toString()) // s1的值为Symbol(foo)

        let s3 = Symbol();
        let s4 = Symbol();
        console.log(s3===s4);//false ,就算参数相同，symbol函数每次返回的值都是不相等的，这就可以用于对象属性命名上

        let s5="hello";
        let s6="hello";
        console.log(s5===s6);//true
        

### 3.2 作为属性名
1. 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，可以防止改写或者覆盖

		let symbol1=Symbol(),symbol2=Symbol(),symbol3=Symbol();
		let myObject = { 
		    publicProperty: 'Value of myObject[ "publicProperty" ]',
            [symbol1]:'Value of myObject[ symbol1 ]'
		};
		 
		myObject[ symbol2 ] = 'value of myObject[ symbol2 ]';
		Object.defineProperty(myObject, symbol3, { value: 'Value of myObject[ symbol1 ]' });
		console.log(myObject)
![](https://i.imgur.com/668jPPT.jpg)
2. Symbol 值作为对象属性名时，不能用点运算符,所以读取该属性时，必须通过`myObject[ symbol2 ]`来读取。
3. Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys(`)、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回，
4. 可以通过`Object.getOwnPropertySymbols`来进行读取symbol属性，他返回一个数据

		[Symbol(), Symbol(), Symbol()]
5. 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
6. Symbol.for()，Symbol.keyFor()（略）

## 第四章 对象新增方法

### 4.1 Object.is
ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，且+0等于-0，因此需要一个新算法来解决这个问题，`Object.is`接收两个参数，除了刚才提到的两个异常，其他均与`===`运算符结果一致：

		+0 === -0 //true
		NaN === NaN // false
		
		Object.is(+0, -0) // false
		Object.is(NaN, NaN) // true

### 4.2 Object.assign

`Object.assign`方法用于对象的合并，第一个参数是目标对象，后面的参数都是源对象

	const target = { a: 1, b: 1 };
    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };
    Object.assign(target,source1,source2);//{a: 1, b: 2, c: 3}
如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。 
 
1. 如果只有一个参数，如果该参数不是对象，则会先转成对象，然后返回（无法转换null 和 undefined）：

	
		Object.assign(2)
		Object.assign("2")
		Object.assign(false)
		Object.assign(undefined) // 报错
		Object.assign(null) // 报错

2. 如果非对象参数出现在源对象的位置（即非首参数）,无法转成对象的参数，就会跳过（null 和 undefined不会报错）

		let obj = {a: 1};
		Object.assign(obj, undefined) === obj // true
		Object.assign(obj, null) === obj // true
3. 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）

		const v1 = 'abc';
		const v2 = true;
		const v3 = 10;
		
		const obj = Object.assign({}, v1, v2, v3);
		console.log(obj); // { "0": "a", "1": "b", "2": "c" }，只有字符串的包装对象，会产生可枚举属性。
4. 属性名为 Symbol 值的属性，也会被Object.assign拷贝。

#### 其他注意事项：
1. `Object.assign`方法实行的是浅拷贝，而不是深拷贝。
2. 对于嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加：

		const target = { a: { b: 'c', d: 'e' } }
		const source = { a: { b: 'hello' } }
		Object.assign(target, source)// { a: { b: 'hello' } }
3. 可以用来处理数组，但是会把数组视为对象

	 	Object.assign([1, 2, 3], [4, 5])// [4, 5, 3]
4. 取值函数的处理：`Object.assig`n只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

### 用途：
1. 为对象添加属性/方法
1. 克隆对象

	 	const copy1=source;
	    const copy2=Object.assign({},source);
	    source.name="lilei";
	    console.log(copy1);//{name: "lilei", sex: "man"}
	    console.log(copy2);//{name: "jack", sex: "man"}
原始对象拷贝到一个空对象，就得到了原始对象的克隆；不过只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

		function clone(origin) {
		  let originProto = Object.getPrototypeOf(origin);
		  return Object.assign(Object.create(originProto), origin);
		}
2. 合并多个对象
3. 为属性指定默认值

		const DEFAULTS = {
		  logLevel: 0,
		  outputFormat: 'html'
		};
		
		function processContent(options) {
		  options = Object.assign({}, DEFAULTS, options);
		}
### 4.3 Object.keys
ES5 引入了`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。  
ES2017 引入了跟`Object.keys`配套的`Object.values和Object.entries`，作为遍历一个对象的补充手段，供for...of循环使用；

		const source={
		      name:"jack",
		      sex:"man"
		    }
		console.log(Object.keys(source));//["name", "sex"]
### 4.4 Object.values
方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值：

		const source={
		      name:"jack",
		      sex:"man"
		    }
		console.log(Object.values(source));//["jack", "man"]
### 4.5 Object.entries()
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

			const source={
		      name:"jack",
		      sex:"man",
              age:20
		    }
		console.log(Object.entries(source));//[["name", "jack"],["sex", "man"],["age", 20]]
返回值只输出属性名非 Symbol 值的属性：

          const source1={
              name:"jack",
              [Symbol()]:"12"
		    }
         const source2={
              [Symbol()]:"12"
		    }
		console.log(Object.entries(source1));//["name", "jack"]
		console.log(Object.entries(source2));//[]
### 4.6 Object.fromEntries()
`Object.fromEntries()`方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

		Object.fromEntries([
			["name", "jack"],
			["sex", "man"]
		]);//{name:"jack",sex:"man"}

该方法的主要作用是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象

	const entries = new Map([
	  ['foo', 'bar'],
	  ['baz', 42]
	]);

	Object.fromEntries(entries)
	// { foo: "bar", baz: 42 }
ps:截止目前（2019.1.23 chrome和火狐均未实现该方法）

### 4.7 Object.getOwnPropertyDescriptor()

ES5 的`Object.getOwnPropertyDescriptor()`方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了`Object.getOwnPropertyDescriptors()`方法，返回指定对象所有自身属性（非继承属性）的描述对象。

	   const source={
	    name:"jack",
	    sex:"man",
	    _age:18,
	    get age(){
	        return this._age
	    },
	    set age(val){
	        this._age=val>10?10:val;
	    }
	  };
	console.log(Object.getOwnPropertyDescriptor(source, 'sex'));
	console.log(Object.getOwnPropertyDescriptors(source))
![](https://i.imgur.com/jSEns0n.png)
#### 作用:
1. 解决Object.assign()无法正确拷贝get属性和set属性的问题(主要目的)：
	
		const source={
		    name:"jack",
		    sex:"man",
		    _age:18,
		    get age(){
		        return this._age
		    },
		    set age(val){
		        this._age=val>10?10:val;
		    }
		  };
		const target=Object.assign({},source);
		console.log(target)
		console.log(Object.getOwnPropertyDescriptor(source, 'age'))
		console.log(Object.getOwnPropertyDescriptor(target, 'age'))
![](https://i.imgur.com/QjUJljy.png)  
我们可以这样解决：

		const source={
		    name:"jack",
		    sex:"man",
		    _age:18,
		    get age(){
		        return this._age
		    },
		    set age(val){
		        this._age=val>10?10:val;
		    }
		  };
		const target = {};
		Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
2. 是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝:
 
		const source={
		    name:"jack",
		    sex:"man",
		    _age:18,
		    get age(){
		        return this._age
		    },
		    set age(val){
		        this._age=val>10?10:val;
		    }
		  };
		const clone=(obj)=>Object.create(
		 Object.getPrototypeOf(obj),
		 Object.getOwnPropertyDescriptors(obj))
		 source.sex="women";
		 console.log(clone(source));
          //{name: "jack", sex: "women", _age: 18}
3. 可以实现一个对象继承另一个对象:

		const prot={
		    x:1
		}
		const obj = Object.create(
		    prot,
		    Object.getOwnPropertyDescriptors({
		      foo: 123,
		    })
		  );
		  console.log(obj.x);//1
		  console.log(obj.foo);//123
### 4.8 __proto__属性
`__proto__`属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。该属性没有写入 ES6 的正文，而是写入了附录，原因是`__proto__`前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6（`__proto__`调用的是`Object.prototype.__proto__`）。简易使用使用下面的`Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替。

### 4.9 Object.setPrototypeOf()
Object.setPrototypeOf方法的作用与`__proto__`相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法：

	let proto = {};
	let obj = { x: 10 };
	Object.setPrototypeOf(obj, proto);
	
	proto.y = 20;
	proto.z = 40;
	
	obj.x // 10
	obj.y // 20
	obj.z // 40
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果,但是第一个参数如果是undefined或null，就会报错。

		Object.setPrototypeOf(1, {}) === 1 // true
		Object.setPrototypeOf('foo', {}) === 'foo' // true
		Object.setPrototypeOf(true, {}) === true // true

### 4.10 Object.getPrototypeOf()
与`Object.setPrototypeOf`方法配套，用于读取一个对象的原型对象。

		function Obj(){};
		const newObj=new Obj();
		console.log(Object.getPrototypeOf(newObj)===Obj.prototype);//true
		const prop={};
		Object.setPrototypeOf(newObj,prop)
		prop.x=1;
		console.log(newObj.x);//1
		console.log(Object.getPrototypeOf(newObj));//{x: 1}
如果参数不是对象，会被自动转为对象。如果是undefined或null，就会报错。
## 第五章 新的数据结构：set和map

ES6新增了两种数据结构，set结构和map结构

### 5.1 Set
#### 5.1.1概述
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。`Set`本身是一个构造函数，用来生成 Set 数据结构。  
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

	[...new Set([1,2,3,5,6,7,2,3])] //[1, 2, 3, 5, 6, 7] 可以用来对数组去重
通过set加入值时，不会发生类型转换，所以5和'5'是两个不同的值  

	[...new Set([1,2,3,5,6,7,2,3]).add("5")] //[1, 2, 3, 5, 6, 7, "5"]

#### 5.1.2实例的属性和方法
1. Set 结构的实例有以下属性。

		Set.prototype.constructor：构造函数，默认就是Set函数。
		Set.prototype.size：返回Set实例的成员总数。

2. Set 实例的方法分为两大类： 
   
		//四个操作方法（用于操作数据）
		add(value)：添加某个值，返回 Set 结构本身。
		delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
		has(value)：返回一个布尔值，表示该值是否为Set的成员。
		clear()：清除所有成员，没有返回值。
		
		//四个遍历方法（用于遍历成员）。
		keys()：返回键名的遍历器
		values()：返回键值的遍历器
		entries()：返回键值对的遍历器
		forEach()：使用回调函数遍历每个成员
		需要特别指出的是，Set的遍历顺序就是插入顺序。
   
举个例子：

## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

