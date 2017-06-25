<font face="微软雅黑" size="4" >
<font size="6">JS权威指南笔记</font>


## 1  概述

1. javascript 早已经超出了脚本语言的范畴，成为一种健壮性，高效性和通用性于一身的语言。

## 2 词法结构
1. js是区分大小写的语言
2. HTML不区分大小写
3. js标识符必须以字母，下划线或美元符（$）开始。


## 3  第三章 类型，值，变量
### 3.1 概述
1. js按数据类型可以分为原始类型和对象类型，原始类型（string,number,Boolean,null,undefined）的值都是不可修改的，对象类型（obj/arr等）的属于可变类型
2. 任何不在函数内部的声明的变量都是全局变量，其他为局部变量

### 3.2 原始数据类型
### A. 字符串
双引号或单引号括起来的字符序列

#### 字符串属性：
str.length

#### 字符串方法:

1. charAt(索引值)；以字符串形式，返回索引位置的字符；
2. charCodeAt(索引值)；以字符编码形式，返回索引位置的字符。
3. concat(字符串1, 字符串2, ...)：拼接一个或多个字符串。但实际应用中"+"(加号)用的更多，也更简洁；
4. slice( 开始位置 [,结束位置] )： 截取字符串片段。
5. substring( 开始位置 [,结束位置] ): 截取字符串片段。参数顺序可以交换，可以自动识别起始与结束；
6. substr( 开始位置 [,返回字符长度] )： 截取特定长度的字符串片段
7. indexOf(字符 [,起始位置]):从字符串的开头向后搜索子字符串，找不到返回-1。
8. lastIndexOf(字符 [,起始位置])：从字符串的尾部向前搜索子字符串，找不到返回-1。
9. trim()方法：该方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。
10. toLowerCase()：转化为小写字符；
11. toLocaleLowerCase()转化为小写字符；针对特定地区；
12. toUpperCase()：转化为大写字符；
13. toLocaleUpperCase()：转化为大写字符；针对特定地区；
14. match( 正则表达式/RegExp对象 )：字符串的匹配模式，本质上与调用 RegExp 对象的exec()方法相同。
15. search( 正则表达式/RegExp对象 )：返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。
16. replace(正则表达式/RegExp对象/字符串, 字符串/函数)：对匹配成功字符串进行替换子字符串的操作。
17. localeCompare()方法比较两个字符串，并返回-1，0或1
18. fromCharCode()方法：String 构造函数下的方法（注意区分）, 与charCodeAt()执行相反的操作。

### B. 数字

1. js不区分整数数值和浮点数值，所有数字都是用浮点值来表示的。
2. ECMAScript标准支持十六进制，不支持八进制，而有些浏览器是支持八进制的。在严格模式下八进制是无效。
3. 被0整除，js不会报错，而是返回Infinity
4. NaN 与任何值都不相等，包含他自身，通过`isNaN()`函数来判断
5. js采用IEEE-754浮点数表示法，是二进制表示法，可以很好表示，1/8, 1/1024等，但不能精确表示诸如：1/100, 1/1000等，建议换算成整数再计算

### C. Boolean
1. 只有两个值，是保留字：true 和 false
### D. null && undefined
1. 未初始化的变量

		var age;
		console.log(age);//undefined
		console.log(typeof age);//undefined
2. 对象属性或数组元素不存在时，都会返回undefined
3. 函数没有返回值时，也会默认返回undefined
4. undefined是预定义的全局变量，不是关键字，他的值就是未定义
5. null是一个特殊对象值，可以表示字符串，数字，对象是“无值”的
   
		console.log(typeof null)//object
6. null和undefined的相等

		console.log(undefined==null)//true
		console.log(undefined===null)//false

###3.3. 全局对象
1. 全局属性：undefined, Infinity, NaN
2. 全局函数：isNaN(), parseInt(), parseFloat(), eval()
3. 构造函数：Date(), RegExp(), String(), Object(), Array()
4. 全局对象：Math, JSON
5. window对象的有一个window属性指向自身：window.window===window（其实，测试发现可以挂载无数个window属性....）

###3.4 包装对象
字符串，数字，布尔值可以像下面这样使用

	var str="components";
	str.substring(1,4)//"omp"

	var num=88.666;
	num.toFixed(1)//88.7

    var bool=true;
	true.valueOf()//true
他们明明不是对象，但却可以调用方法。这是因为在对字符串，数字，布尔值调用方法时，js做了转换（以字符串为例）：

1. 通过new String(str)将基本数据类型转化成对象，该对象可以继承字符串对象的所有方法。
2. 通过对象调用对应方法/属性。
3. 调用结束销毁创建的临时对象。

整个过程是无感的，在具体实现上不一定是按上述步骤去执行的，但我们可以这么去理解。而其他两个基本数据类型null和undefined是没有包装对象的，访问他们的属性就会报错。

	null.toString()//报错
	undefined.toString()//报错

我们运行下面代码

	var str="components";
	str.len=4; 
    console.log(str.len)
结果输出 undefined。这说明包装对象的转换只发生在读取阶段，而写入阶段是不会表现的像对象一样。我们改写成下面代码

	var str= new String("components");
	str.len=4; 
    console.log(str.len)
则输出预期结果：4。

可以通过 String(), Number(), Boolean()构造函数来显示创建包装对象。js会在必要时把包装对象转换成原始值，但底部的表现其实还是不一样的。

	new String("components")=="components";//true
	new String("components")==="components";//false
	typeof new String("components"); //"object"
	typeof "components"; //"string"

###3.5 值的可变与不可变

1. 原始类型的值（string,number,Boolean,null,undefined）是不可更改的
2. 原始类型值的比较是值的比较，只有值相等才会相等。
2. 对象类型（Array,Object）的值是可以修改的
3. 对象类型值的比较是引用的比较，除了值完全相等外，引用的内存地址也相等才会相等

		var obj1={
			name:"jack"
		}
		var obj2={
			name:"jack"
		}
		console.log(obj1==obj2)//false

###3.6 变量作用域
1. 函数体内局部变量优先级高于同名的全局变量，全局变量可以被函数体内同名变量覆盖。

###3.7 函数作用域&&提前声明

1. ES5 只有全局作用域和函数作用域，没有块级作用域。
2. 自执行函数在通常情况下被用来模拟块级作用域。
3. js引擎在预编译时会将函数体内的变量声明提前，具体表现是：

		var fn=function (){
			console.log(name);//undefined
			var name="jack";
			console.log(name);//jack
		}()
`name` 变量在声明前已经被提前声明了，只是没有被赋值。其实就是js引擎预编译的时候把所有变量声明都提前了。即：

		var fn=function (){
				var name;
				console.log(name);//undefined
				name="jack";
				console.log(name);//jack
			}()
4. 函数体内的变量声明提前，使得变量在整个函数体内都有效。这就可以理解为什么函数体的for循环初始化，在函数体内其他地方也可以访问的到。


###3.8 作为属性的全局变量

1. ECMAScript规范中强制规定：js全局变量是全局对象的属性。
2. 通过给未声明变量赋值创建的全局变量，可以通过delect语句删除

###3.9 作用域链

1. 当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。这个链表是一个对象链表，并不是绑定的栈。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。

		function changeColor() {
		    var anotherColor = "red";
		
		    function swapColors() {
		        var tempColor = anotherColor;
		        anotherColor = color;
		        color = tempColor;
		        // 这里可以访问 color、 anotherColor 和 tempColor
		    }
		    // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
		    swapColors();
		}
		// 这里只能访问 color
		changeColor();
上述代码的作用域链的示意图为：  
![作用域链](http://i.imgur.com/b0AenR7.png)
2. 每个环境都可以向上搜索作用域链，以查询变量和函数名。
3. 但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。

###3.10 延长作用域链
1. try-catch 语句的 catch 块；
2. with 语句。

## 第4章 表达式和运算符

### 4.1 表达式和语句的区别

1. 表达式：是由运算元和运算符(可选)构成，并产生运算结果的语法结构。
2. 表达式总有返回值，其中，单值表达式的结果是值本身，其他表达式结果是根据运算符进行运算的结果值。
3. 语句：表明了代码执行过程的流程、限定和约定，形式上可以是单行语句，也可以是由大括号括起来的复合语句。
4. 语句由分号来分隔。语句是“使某事发生”的指令，不存在返回值一说

关于表达式和语句的详细总结，请点击 [js中的语句和表达式](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/js%E4%B8%AD%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%92%8C%E8%AF%AD%E5%8F%A5.md)

## 第五章 数组

### 4.1 概述

1. js数组是对象的特殊形式
2. 数组的实现是经过优化的，通过索引访问数组对象比访问常规的对象属性方式要快很多
3. 数组索引可以理解为对象的属性名，只不过是用正整数来表示罢了

    	a["-2.13"] = true; //索引不能为负数，这将创建一个名为"-2.13"的属性
    	a["10"]= 0; //等同于a[10]=0
    	a[1.68]; //等同于a[1]
4. 稀疏数组：
   
	       var a1=new Array(5);//创建长度为5的稀疏数组，每一项为undefined
	       var a2=[,,,,]; //创建长度为4的稀疏数组，每一项为undefined
5. 数组的长度：js可以通过设置数组长度（arr.length=n）来删除数组中索引大于等于n的元素。
  
         var arr=[1,2,3];
         Object.defineProperty(arr, "length", {writable:false})
         //ES5语法，显示声明数组arr的length为只读属性
         arr.length=1;
         arr.length;//仍旧是3
6. 数组的添加与删除
   
       	//添加元素
       	arr[4]=4;
       	arr.push('4');
       	arr.unshift('4');
       	
       	//删除元素
       	arr.length=2;//属性为可写时才有效
       	arr.pop(); //没有参数，后面删除
       	arr.shift();//没有参数，前面删除
       	
       	//delete 删除数组，并不改变数组长度，变成了稀疏数组
       	var arr=[1,2,3]; 
       	delete arr[1];
       	1 in arr;    //false
       	console.log(arr);//[1, undefined, 3], 
7. 数组的遍历：for循环：

	      for(var i=0,len=arr.lenght;i<len;i++){
	         //do something...
	         //注意把len提取出来，提高循环速度
	      }
ES5新增的forEach()也可以：

        var arr2=[3,4,5];
        arr2.forEach(function(x){
        	console.log(x*2)
        })

### 4.2 数组方法

1. join(): 将数组按指定字符串拼接成字符串，是String.split()方法的逆方法。

2. reverse()：逆序

3. sort()：排序，不过默认是按每一项toString后的比较：

       [4,5,2,0].sort(function(a,b){
          return a-b
       };//[0, 2, 4, 5]

4. concat()：拼接两个数组

5. slice(起始位置,结束位置)：返回指定区间的数组片段

6. splice(起始位置，删除/替换个数[, 替换/添加内容]):强大的数组方法，返回原数组中被删除或替换的项。

7. push() && pop()：进栈/出栈方法。

8. unshift() && shift()：队列进入/离开方法

9. toString() && toLocalString()：

      [1,2,3].toString(); //"1,2,3"，等同于不加参数的join方法。
      [1,2,3].join(); //"1,2,3" 

### 4.3 ES5新增的数组方法

1. forEach(): 

	    var result=[1,2,3].forEach(function(value, index, arr){
	       console.log(arr[index]===value);//输出三次true
	       return value*2
	    })
	    // result值为undefined
但无法像for一样中间用于break终止，可以使用try catch终止，不过比较繁琐，建议此种情况下直接用for循环
   
2. map()：与forEach基本一样，但map有返回值

		 var result=[1,2,3].map(function(value, index, arr){
	       console.log(arr[index]===value);//输出三次true
	       return value*2
	    }
	    //result 值为[2,4,6]
3. filter():对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。

		 var numbers = [1,2,3,4,5,4,3,2,1];
		 var filterResult = numbers.filter(function(item, index, array){
		 return (item > 2);
		 });
		 console.log(filterResult); //[3,4,5,4,3]
		 //通过调用 filter()方法创建并返回了包含 3、 4、 5、 4、 3 的数组
4. every() && some(): 对数组中的每一项运行给定函数，如果该函数对 每一项都/至少一项 返回 true，则返回 true。
		
		 //1.every()
		 var numbers = [1,2,3,4,5,4,3,2,1];
		 var everyResult = numbers.every(function(item, index, array){
		 return (item > 2);
		 });
		 console.log(everyResult); //false
		 //对于 every()，它返回的是 false，因为只有部分数组项符合条件。
		 
		 //2.some()
		 var numbers = [1,2,3,4,5,4,3,2,1];
		 var everyResult = numbers.some(function(item, index, array){
		 return (item > 2);
		 });
		 console.log(everyResult); //true
		 //对于 some()，结果就是 true，因为至少有一项是大于 2 的。
5. reduce() && reduceRight():

		 //reduce()，从前向后，使用该方法可以用于求和：
		 var values = [1,2,3,4,5];
		 var sum = values.reduce(function(prev, cur, index, array){
		 return prev + cur;
		 });
		 console.log(sum); //15
		 
		 //reduceRight 从右向左
6. indexOf(value) && lastIndexOf(value)：从前向后/从后向前 查找指定元素的索引，存在则返回索引值，不存在则返回 -1

### 4.4 判断是否为数组
1. ES5: Array.isArray()
    
    	Array.isArray([1,2,3]);//true
2. Object.prototype.toString.call()

        Object.prototype.toString.call([1,2,3])==="[object Array]"

### 4.5 类数组
对于符合数组特点的对象：
1. 有length属性，且会自动更新
2. 属性的key为number字符串，且>=0  

我们也可以调用数组的原生方法，来处理对象，并且比自己实现的代码效率更高：

		var arrObj={0:"a",1:"b",2:"c",length:3};
		Array.prototype.join.call(arrObj,"&")
		"a&b&c"
### 4.6 作为数组的字符串
字符串的某些行为跟数组特别相似，例如我们可以这样读取字符串某个特定位置的内容：

      var str="javascript";
      str.charAt(2);// "v"
      str[2]; //"v"
我们甚至可以调用一些原生的数组方法来操作字符串：
      var str="javascript";
      Array.prototype.join.call(str,"-"); //"j-a-v-a-s-c-r-i-p-t"
      Array.prototype.filter.call(str,function(item, index, array){
		 return (index > 5);
	  }) //["r", "i", "p", "t"]
但我们要知道原始数据类型都是只读的，不可写，所以push,splice等改变原始数据的方法都是无法用在字符串上的，强制使用就会报错.
## 第六章 对象
对象常见的方法是：创建，设置，查找，删除，检查，枚举

### 4.1 创建对象

1. 字面量方式创建
    
	      var obj={
	       name:"jack",//正常情况下属性名可以不用引号
	       for:"test", //如果用保留字做属性名，必须用引号
	       "sub-title":"测试", // 连接符必须用引号
	       sex:"man", //最后一个逗号 ES5会忽略，ES3的部分实现（IE）会报错
	      }
2. new创建

	     var obj=new Object();//空对象
	     var arr=new Array();
3. Object.creat(proto [, propertiesObject ])：第一个参数是要继承的原型，第二个参数是对象的属性描述符（可选）。

	    function Car (desc) {
		    this.desc = desc;
		    this.color = "red";
		}
	 
		Car.prototype = {
		    getInfo: function() {
		      return 'A ' + this.color + ' ' + this.desc + '.';
		    }
		}
		var car =  Object.create(Car.prototype);
	
		console.log(car);
		//运行结果:
		//创建了一个新对象，同时继承了Car.prototype下的getInfo方法
		Object {
		 __proto__: Object {
		      getInfo: function (){...},
		      __proto__: Object{...}
		   }
        }  
4. 上述方式创建的对象基本上都会有一个原型对象，`Object.prototype`则不存在原型对象，`Object.create(null)`也不存在原型对象。

### 4.2 属性的查询与设置
1. 属性的访问可以通过点(.)或方括号([])运算。
2. 对于方括号，方括号内必须是一个计算结果为字符串的表达式或可以转化为字符串的值。
3. ECAM3中点运算符后面的标识符不能是保留字。
4. 只有在查询属性的时候才能体会到继承的存在。属性设置与继承无关。
5. 防止访问属性错误时我们可以这么写(无需写三目运算)：
   
      	var len=book && book.subtitle && book.subtitle.length
6. delete可以删除属性，只能删除自有属性，无法删除继承属性。

		var o={x:1};
		delete o.x; //删除成功，返回true
		delete o.x; //o.x已经不存在，什么也不做，返回true
		delete o.toString;// 无法删除继承属性，返回true
7. js对象都是关联数组，即，我们可以通过类似访问数组的方式来访问对象属性：`obj["name"]`
	- 点运算符来访问对象属性时，属性名用一个标志符来表示，而这个标识符不是数据类型，js无法修改
	- 括号来访问对象属性时，括号内是一个字符串，js可以修改，我们可以在程序运行时再创建和修改。
### 4.3 属性的删除

### 4.4 属性的检测
1. in运算符 
    
	    var o={x:1,y:2};
	    x in o;//true
	    o.x!== undefined;//true，
	    //也可以通过比较运算符来判断，但'!=='无法判断值为undefined的属性，他会认为不存在，in运算符则可以
    
2. hasOwnProperty(): 检测对象自有属性

		var o={x:1,y:2};
		o.toString();  //"[object Object]"
		o.hasOwnProperty("x"); //true
		o.hasOwnProperty("toString"); //false

3. propertyIsEnumberable(): 是hasOwnProperty的增强版，检测对象自有属性且该属性可枚举
		
		var o={x:1,y:2};
		o.propertyIsEnumerable("x"); //true,自有属性且可枚举
			
		//代码中添加的属性正常情况下都是可枚举的，除非强制设置为不可枚举：
		Object.defineProperty(o, "z",{value:3,enumberable:false})
		o.hasOwnProperty("z"); //true，自有属性
		o.propertyIsEnumerable("z"); //false, 自有属性但不可枚举

### 4.5 属性的枚举
上面讲过代码中添加的属性正常情况下都是可枚举的，除非强制通过`Object.defineProperty`设置为不可枚举。要得到对象中所有的枚举属性有三种方式：  

1. for in 循环
2. Object.keys：返回数组，数组元素为可枚举属性名称。
3. Object.getOwnPropertyNames：与Object.keys类似，不过返回的不仅仅是可枚举属性了，是对象的所有自有属性名称。


### 4.6 getter && setter（访问器属性）

1. 当程序查询存储器属性的值时，js调用setter方法，这个方法返回值就是属性存取表达式的值2. 当程序设置一个存储器属性的值时，js调用getter方法，将赋值表达式的右侧的值作为参数传递给setter
3. 属性同时具有getter/setter方法时，属性就是可读/可写的，否则只有一个就是只读，或只写了。
4. 通过getter/setter定义一个可读写的属性:
				
				var obj={
				x:"1",
				y:"1",
				get r(){
					return this.x*this.x + this.y*this.y
				},
				set r(val){
					this.x=Math.sqrt(val/2);
					this.y=Math.sqrt(val/2);
				}
				   
				};
				obj.r://输出 2
				obj.r=18;
				obj.x// 输出 3
函数定义没使用function关键字，而是使用的set和get。				
5. 通过Object.defineProperties定义一个属性：

		var obj={};
		Object.defineProperties(obj,{
			_name:{
				value:"undeined",
				writable:true
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
		obj.name;//默认情况下是 "undefined"
		obj.name="jack";
		obj.name;  //"new_jack"
更多可点击[js的getter和setter](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/getter%26setter.md)
5. 老式getter/setter API

		__defineGetter__
		__defineSetter__
		
		__lookupGetter__
		__lookupSetter__
	

### 4.7 数据属性
#### 数据属性有以下四个描述其行为的特性：

- [[Configurable]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认值为true。
- [[Enumerable]]：表示能否通过for-in 循环返回属性。默认值为true。
- [[Writable]]：表示能否修改属性的值。默认值为true。
- [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为undefined。

#### 数据属性相关的方法（ES5新增，ES3都没有）：  

- Object.definedProperty()  
接受三个参数：表示要定义属性的对象；要定义或者更改的属性名字；属性的具体描述。

		var obj={
			name:"jack",
			age:"25"
		};
		Object.defineProperty(obj,"name",{
			writable:false,
			value: "Nicholas"
		});
- Object.defineProperties():  
接受两个参数：对其添加或修改属性的对象；包含一个或多个描述符对象的 JavaScript 对象。 每个描述符对象描述一个数据属性或访问器属性;


		var obj={};
		Object.defineProperties(obj,{
			name:{
				value:"jack",
				writable:true
			},
			age:{
				value:"25"
			}
		 }）
- Object.getOwnPropertyDescriptor()
获取指定对象的自身属性描述符；接受两个参数：包含属性的对象。属性的名称。

        //对上述代码运行：
		Object.getOwnPropertyDescriptor(obj,"name");
		//{value: "jack", writable: true, enumerable: false, configurable: false}

### 4.8 对象的三个属性
1. 原型属性
        var o={x:1};
		var c=Object.create(o);
		o.isPrototypeOf(c); //true,o是c的原型
		Object.getPrototypeOf(c);// {x:1} 输出c的原型（o）
        Object.prototype;// 得到Object对象的原型
		
2. 类属性:对象的类属性是一个字符串
   
		 Object.prototype.toString.call("str")

3. 可扩展性

		Object.preventExtensions()//将对象设置为属性不可扩展，即无法添加新属性
		Object.seal()// preventExtensions的升级版，同时原有属性也无法删除或配置
		Object.freeze()//seal的升级版，所有数据属性都是只读
		
		Object.esExtensible()//检测对象是否可扩展
		Object.isSealed() //检测对象是否封闭
		Object.isFrozen() //检测对象是都冻结

### 4.9 序列化对象 

1. JSON.parse(): 序列化对象
2. JSON.strignify(): 还原js对象

### 4.10 对象方法
1. tostring()
2. toLocalString()
3. valueOf()

## 第七章 函数
js中除了基本数据外，其他的都是对象，所以函数也是对象，函数作为属性挂在对象下就变成的方法。

### 4.1 定义

1. 函数表达式定义函数时候，通常用于只会用到一次的函数，且函数名是可选的。
2. 函数声明定义时，函数声明语句会"被提前"。

### 4.2 函数嵌套

1. ECMA一般不允许通过函数声明定义的函数嵌套在循环，判断，try/catch等语句中。个别实现下函数声明还是会被提前，但有些实现下会报错。
2. 函数表达式定义没有特殊限制，可以出现在js代码中的任何地方。

### 4.3 函数调用

有四种方式来调用js函数

#### 方式1：作为函数调用

1. 最简单常用的调用方式：fn(x，y)
2. ECMA3和非严格模式的ECMA5对函数调用规定：调用this返回的是全局对象，但严格模式下，this返回的是undefinded
3. 以函数形式调用的函数通常不使用关键字this, 所以可以用来判断是否处于严格模式下：

		"use strict"; 
		var strict=(function(){ return !this}());
		console.log(strict);//true ,没有严格模式声明时就是false

#### 方式2：作为方法调用
1. 此时函数是挂载在对象属性下的，调用方式为： o.m(x, y)。
2. 跟作为函数调用的最大区别就是this的指向,函数内的this始终指向调用他的对象（就是点离他最近的调用者）
3. 关于JQ的链式调用，其实就是在每个方法中将this作为返回值return出去了：

		   function Person(){};
			Person.prototype={
			  setName:function(name){
			    this.name=name;
			     return this;
			  },
			  getName:function(){
			   return this.name
			}
			}
			var p1=new Person();
			p1.setName("blue").getName()://"blue"
#### 方式3：作为构造函数调用
1. 上面例子已经展示了作为构造函数的调用方式，通过new关键字进行调用。
2. 一上述例子为例子，返回值是 Person.prototype的内容，构造函数内部一般不会使用return语句，就算使用了通过new Person()调用时会被忽略。

#### 方式4：间接调用： 通过call()和apply()

### 4.4 函数的形参和实参
1. 函数的形参，相当于已经在函数体内被声明了一次，只是他的值等于实参，所以函数体内我们可以这样写：

	     function add(a,b){
	        b=parseInt(b)||0; //这种给参数添加默认值的方式，只适用于b已经被声明过
	        a=parseInt(a)||0;
	        console.log(a,b);
	        return a-b
	     }
2. 省略的实参都是undefined, 多出的参数会被自动省略。
3. 函数内部可以通过实参对象 `arguments` 来获取是实参的引用值，该对象是一个类数组对象。ECMA5严格模式无效。
4. callee 和 caller属性(ECMA5 严格模式下报错)

		function outer(){
			inner();
		}
		function inner(){
			console.log(inner.caller===arguments.callee.caller);//true
		}
		outer();
`fnName.caller` 引用调用fnName的函数。  
`arguments.callee` 引用arguments对象所在函数的函数对象。 
			
### 4.5 作为返回值的函数
1. 函数调用后的值可以作为参数传递到另一个函数中。
2. Array.sort方法就接受一个函数返回值来进行排序

		[4,5,2,0].sort(function(a,b){
          	return a-b
      		 };//[0, 2, 4, 5]
3. 函数也可以拥有属性，我们尝经常用函数下的属性来缓存数据，不用创建全局变量就可以实现数据的缓存。譬如我们实现一个阶乘函数:

		//n的阶乘：1*2*3*....*n
		function factorial(n){
		 if(isFinite(n) && n>0 && n==Math.round(n)){//确保n是有限正整数
		    if(!(n in factorial))  factorial[n]= n*factorial(n-1);
		    return factorial[n];
		 }
		  else return NaN
		}
		factorial[1]=1;//将属性初始化，必须操作。
输入factorial(5)时，函数会生成factorial[4],factorial[3],factorial[2]属性，最后将属性actorial[5]作为返回值返回出去。这样做的好处是不用每次都走循环，而且数据都被缓存起来，可以有效提高运行速度！

### 4.6 作为命名空间的函数
js中没有块级作用域，取而代之是函数作用域，可以利用函数作用域形成一个命名空间：

		(function(){
		//my code...
		}())
### 4.7 闭包
1. 通常一个函数执行完毕后，内部的局部变量都就会被销毁。也就是被JS的垃圾回收机制回收掉。
2. 每次调用函数的时候，都会为函数创建一个新的对象来保存局部变量，并把这个对象添加到作用域链对象上。如果一个函数定义了嵌套函数，并将他作为返回值返回或者存在某处的属性中，此时就会有一个外部引用指向了这个嵌套的函数，因而就不会被垃圾回收机制所回收。

		var scope="global";
		function fn1(){
			var scope="local";
			function f(){
		      return scope
		    };
		    return f()//返回一个值
		}
		function fn2(){
			var scope="local";
			function f(){
		      return scope
		    };
		    return f //闭包
		}
		fn1();//local
		//调用函数fn1时候,函数f顺着作用域链查找到了局部变量scope，于是返回了它的值"local"
		
		var m=fn2();//m就是函数fn的函数体，保存着fn2的内部函数f的引用
		m();//因为f被m引用，而f又引用了父函数fn2作用域中的变量，所以scope不会被垃圾回收机制回收，此时扔可以访问的到。这就形成了闭包。
3. 垃圾回收机制如下：
   - 全局变量不会被回收
   - 局部变量会被回收，也就是函数一旦运行结束，函数内部的东西都会被销毁
   - 只要被另外一个作用域所引用就不会被回收
4.	闭包的一个例子	

		var addOne((function(){
			var count=0;
			return function(){
				return count++
			}
		})());
		addOne();//1
		addOne();//2
		addOne();//3
		//局部变量始终在内存中，不会被回收，实现了累加
### 4.8 函数的属性、方法和构造函数
js中一切都是对象，函数也是对象，因此它也拥有属性和方法

1. length属性：表示函数期望接受的参数个数（形参）
    
	    function add(a,b,c){
	      console.log("实参长度为："+arguments.length)
	    }
	    add.length;//3, 形参个数
	    add(1,2)//实参长度为：2
2. prototype属性：指向原型对象，每个函数都有不同的原型对象。

3. call() 和 apply()方法：在特定作用域内调用函数，通过第一个参数来设置调用函数的母对象。区别在于第二个参数。可参见[js高级程序设计](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E7%9F%A5%E8%AF%86%E7%82%B9%EF%BC%881%EF%BC%89.md)

4. bind()方法：ECMA5新增，同样可以实现call,apply的功能，多了一些附加功能（略）

5. toString()方法：返回函数体代码

6. Function构造函数：实际中用到较少


### 4.9 函数式编程：

1. 用命令式的方式编写代码，而非指令式（个人理解）
2. gitBook开源书 [js函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html)

## 第八章 类和模块

### 4.1 面向对象的理解

1. 面向对象的语言都有一个标志就是有类的概念，通过类创建任意多个具有相同属性和方法的对象，但是js没有类的概念，我们可以通过工厂模式，构造函数模式等来创建"类"对象。
2. 面向对象的三大特性：封装（创建对象），继承，多态）。可以参考[js高级程序设计知识点2](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E7%9F%A5%E8%AF%86%E7%82%B9%EF%BC%882%EF%BC%89.md)

### 4.2 构造函数
1. 原型对象是类的唯一标识，当且仅当两个对象继承同一个原型对象时，他们才属于同一个类的实例。
2. 对于构造函数一般约定首字母是大写，用来与普通函数做区分，并且通过new 进行调用。当然也可以普通函数进行调用，但往往会无法正常工作。
		
		var F=function(){};
		var p=F.prototype; //构造函数的原型
		var c=p.constructor; //原型的构造函数
		c===F// true,二者恒等
3. 通过字面量方式创建原型对象会引发构造函数被重写的问题
    
		 function Person(){
		  }
		 Person.prototype = {
		   constructor:Person, //重新指回来,否则就变成了function Object(){}
		 	name : "Nicholas",
		 	age : 29,
		 	job: "Software Engineer",
		 	sayName : function () {
		 		console.log(this.name);
		 	}
		 };
4. js基于原型链的继承是动态的，如果创建对象之后原型的属性发生了改变，也会影响到继承这个原型的所有的实例对象。，这样就可以给原始类型添加一些他们原本不支持的方法：

		String.prototype._trim = function() {
		    return this.replace(/(^\s*)(\s*$)/g, "");
		    //移除多余空格，所有字符串都可用。
		};

### 4.3 模块
ECMA5和ECMA3模块化的原生模块化的几种方案：

1. 用作命名空间的对象  

		//将属性和方法等都挂在一个对象下
	      var obj={
	         getName:function(){
	           // your code
	         }
	       }

2. 用作私有命名空间的函数

	      (function(){
	        //your code
	      }());

## Date 对象
1. GMT时间：英国格林威治时间（0时区），也就是世界标准时间，北京时间=GMT时间+8小时
2. UTC时间：协调世界时，又称世界统一时间，世界标准时间，UTC时间可以认为等于GTM时间，只是前者作为新的标准时间更精准
3. Date.parse( )
 - 月/日/年 : '2000/2/1 00:00:00'
 - 英文月名 日,年：'Feb 1,2000 00:00:00'
 - 英文星期几 英文月名 日 年 时:分:秒 时区：'Tue Feb 01 2000 00:00:00 GMT+0800'(星期可以省略)
4. Date.UTC( )
 - 年份、基于 0 的月份（一月是 0，二月是 1，以此类推）、月中的哪一天（1 到 31）、小时数（0 到 23）、分钟、秒以及毫秒数
 - 前两个必填，后面可省略
5. 对比：

		Date.parse('2000/2/1 00:00:00')//949334400000
		Date.UTC(2000,1,1,0,0,0)//949363200000
相差八个小时，parse是基于0时区计算，返回一个标准时间1970/01/01 0点开始计算的毫秒数；UTC是基于本地时区计算，返回一个标准时间到现在的毫秒数。所以前者要小于后者，因为北京时间早上八点时，格林尼治时间才是0点。
6. new Date()
	- 不传参数：返回格式化后的本地时间：Thu Jun 15 2017 13:08:49 GMT+0800 (中国标准时间)
	- 传入毫秒数：返回格林尼治时间+毫秒后的格式化时间：
	
			new Date(949363200000)//Tue Feb 01 2000 08:00:00 GMT+0800 (中国标准时间)
			new Date(0)//Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
7. cookie中的expires时间是一个 GMT 格式的日期（Wdy, DD-Mon-YYYY HH:MM:SS GMT）

##正则对象
待补充....

## Object.prototype.toString 检测类型原理
### 一、Object对象下的 toString方法
首先说下toString()方法，js所有对象下都有改方法，只要是对象，都可以从Object.prototype上继承toString方法：

		var obj= new Object();
		obj.toString();//"[object Object]"
1. 输出一个字符串类型的数组，数组第一项统一为"[object]",第二项就是对象的[[Class]]属性的值。
2. [[Class]]是一个内部属性（只读）,所有的对象(原生对象和宿主对象)都拥有该属性.在规范中,[[Class]]是这么定义的

		内部属性	   描述
		[[Class]]	一个字符串值,表明了该对象的类型.
3. [[Class]]内部属性的值一共有以下几种(ES6或许会添加)： 

		"Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String"，"Null", "Undefined", "JSON", "Arguments"

### 二、被重写的 toString方法
对于Object的子类型：Array类型、Date类型、RegExp类型以及Number、Boolean、String三个包装类型，我们调用他们的toString()方法：

1. Array类型：

		var arr = ["tom",12,"rose",18];
		console.log(arr.toString());//"tom,12,rose,18"
2. RegExp类型

		var patten = new RegExp("\\[hbc\\]at", "gi");
		console.log(patten.toString());//"/\[hbc\]at/gi"
3. Date类型

		var date = new Date(2014,02,26);//注意这种格式创建的日期，其月份是3月
		console.log(date.toString());//"Wed Mar 26 2014 00:00:00 GMT+0800"输出格式因浏览器不同而不同，此为firefox的输出格式；
4. number类型

		var num = 16;
		console.log(num.toString(2));//10000 二进制
		console.log(num.toString(8));//20 八进制
		console.log(num.toString(16));//10 十六进制
		console.log(num.toString(5));//31 虽然没有五进制，但是这样传参是可以被toString()方法接受的
5. Boolean 和 String 类型

	      var str="jack";
	      console.log(str.toString());//"jack"
	      var bool=true;
		  console.log(bool.toString());//"true"
会发现各自构造函数下的toString方法都被改写了，并没有继承Object对象下的方法，所有如果要通过toString()来判断类型，此时就需要调用Object.prototype.toString。

### 三、 Object.prototype.toString
首先重温一下call/apply方法：

1. 另个方法可以简单理解为改变函数运行作用于的方法
2. 在函数/方法名称后面加上call/apply就等同于调用执行了函数/方法
3. call接受的第一个参数为运行函数的作用域，其余参数都直接传递给了函数
4. apply接受的第一个参数仍是运行函数的作用域，第二个是参数数组，或arguments对象


		function sum(num1, num2){
			return num1 + num2;
		}
        sum(1,2);//3
        sum.call(this,1,2)//3
        sum.apply(this,[1,2])//3

既然子类的toString()方法被重写，我们直接通过call/apply使对象直接通过原型链调用 Object.prototype.toString():

      Object.prototype.toString();//"[object Object]"
      Object.prototype.toString.call(this)//"[object Window]"
      Object.prototype.toString.call([])//"[object Array]"
	  Object.prototype.toString.apply([])//"[object Array]"
 
需要注意的是：  

1. Object 的 toString()方法只能检测原生构造函数的构造函数名。
2. 定义的任何构造函数都将返回[object Object]，建议使用 instanceOf 判断。
3. instanceof 操作符在存在多个全局作用域（像一个页面包含多个 frame）的情况下，会存在问题。
4. typeof 对于基本类型的判断还可以，对于对象类型判断就比较糟糕了。一般返回的都是 "object"。
5. 三种判断方式（typeof instanceof Object.prototype.toString.call）按需要使用。

****
## 客户端的javaScript

## 第一章 window对象
### 1.1 计时器 
window对象下有两个定时器方法，每个方法下都有对应的清除定时器方法：  

1. setTimeout()：xxx毫秒后，只执行一次

	    var timer=setTimeout(function(){
			console.log('1')
		}, 1000)
		
		clearTimeout(timer)；//可以不清除，但养成良好习惯，还是清除一下

2. setInterval()：每隔xxx毫秒，执行一次

		 var timer=setInterval(function(){
				console.log('1')
			}, 1000)
			
			clearInterval(timer)

### 1.2 location
window对象下的location属性引用的是Location对象，document对象下的location属相也引用的是Location对象，因而有：

		window.location===document.location;//true
1. 属性：对于 http://localhost:3004/?name=jack#/edit?_k=3rzy8a，window.location对象下的结果为：

		hash:"#/edit?_k=3rzy8a"
		host:"localhost:3004"
		hostname:"localhost"
		href:"http://localhost:3004/#/edit?_k=3rzy8a"
		origin:"http://localhost:3004"
		pathname:"/"
		port:"3004"
		protocol:"http:"
		search:"?name=jack"
window.location.toString()会返回href属性的值，而直接调用window.location时会同时隐式调用toString()方法，因而：

		window.location.toString()===window.location.href;//true
		window.location===window.location.href;//false
		window.location==window.location.href;//true
2. 方法

		window.location.assign("http://m.58.com/bj");//当前窗打开新url， 保留原始页面的历史记录
        //window.open(）会打开一个新窗口，而非当前窗口
		window.location.replace("http://m.58.com/bj");//当前窗打开新url，同时替换原始页面的历史记录
		window.location.reload();//刷新当前页面
3. 属性重写

		window.location="http://m.58.com/bj";等同assign方法
		window.location.href="http://m.58.com/bj";等同assign方法
		window.location.hash="#/";
		window.location.search="?name=lilei";
以上的assign，replace，以及window.open方法，和window.location,window.location.href属性均支持相对路径参数和相对协议写法（"//m.58.com/bj"）

### 1.3 history
window对象下的history属性引用的是History对象

包含的属性和方法（为了防止浏览信息被窃取，历史记录的url是不可读的）

1. history.length：当前历史列表中的历史记录数（IE6+是从0开始的，其他的是从1开始的）；
2. history.go(n)：前进或后退n条记录，当n=0或空时会刷新当前页；
3. history.back()：后退一步；
4. history.forward()：前进一步;
5. html5新增的api请参见[HTML5之五--历史管理.md](https://github.com/wangminghuan/MyNotes/blob/master/HTML/HTML5%E4%B9%8B%E4%BA%94--%E5%8E%86%E5%8F%B2%E7%AE%A1%E7%90%86.md)

### 1.4 navigator
window对象下的navigator属性引用的是包含浏览器厂商和版本信息的Navigator对象。
该对象下有多个属性，不过因为兼容性问题，一般常用的只有userAgent属性。

#### E. screen
window对象下的screen属性引用的是Screen对象：
window.screen输出结果为：

	availHeight:1040 //实际可用的显示大小，排除了像桌面任务栏占用遮挡的部分
	availLeft:0
	availTop:0
	availWidth:1920
	colorDepth:24
	height:1080 // 像素为单位的窗口大小
	pixelDepth:24 //(bits-per-pixel,16,24,32等)
	width:1920

### 1.5 对话框
1. alert()
2. confirm():展示含有确定跟取消两个按钮的弹窗

		var result=confirm("今天是星期天吗");
		result?console.log("yes"):console.log("no");//点击确定或取消后会返回true或false
3. prompt(): 展示的是含有确定跟取消两个按钮，同时有一个输入框的弹窗

		var val=prompt();
		console.log("你刚才输入的是："+val)//点击确定返回输入内容，点击取消返回null

三个方法均会阻塞代码执行。

### 1.6 onerror
早期遗物，可以忽略，基本不会使用，可以用try/catch异常处理语句来替代。

### 1.7 open/close方法
1. window.open();//打开一个新窗口，接受一个url字符串，可以是相对地址或相对协议
2. window.close();//chrome下只有通过open打开的窗口才可以通过close关闭，否则无效

##  参考文献

1. [关于 this 你想知道的一切都在这里](https://segmentfault.com/a/1190000008156495)

