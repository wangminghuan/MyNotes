<font face="微软雅黑" size="4" >
<font size="6">再读JS基础</font>


## 1  基本概念

### 1.1 数据类型  

1. 命名：第一个字符必须是字母，下划线 或 $
2. typeof 基本类型/对象的返回值有六种：  
"undefined"--未定义  
"boolean"--布尔   
"string"--字符串  
"number"--数字  
"object"--null或object  
"function"--函数：其实函数在 ECMAScript 中是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过 typeof 操作符来区分函数和其他对象是有必要的。（**对于正则，早期浏览器也返回function，目前多数返回object**） 
   
2. "use strict"; 就是一个编译提示，告诉js引擎切换到严格模式。
3. js可以表示十进制，八进制和十六进制；但在进行算术计算时，所有的八进制和十六进制最终都会被转换成十进制
4. 严格模式下八进制会报错，因为八进制的第一位必须为0；而十六进制则不会，十六进制以0x开头；
5. 基于IEEE754的浮点数计算都会产生舍入误差的问题，永远不要测试某个特定的浮点数
 
		var a=0.1;
		var b=0.2;
		console.log( Boolean(a+b==0.3));//false
6. parseInt(string [,number])：参数1是要转换的字符，参数2是number类型的要转换的进制数；  
   因为ES5默认都是十进制，所以推荐都还是加上第二个参数；  
   不建议使用Number（）进行转换；
7.  parseFloat(string):没有参数2，只能解析十进制，十六进制数都会被转换成0；
8.  toString([number]): 接受一个number类型的进制转换基数；   
数值、布尔值、对象和字符串值都有 toString()方法；  
json对象会返回"[object Object]"；  
function会返回函数内容；  
null, undefined则没有该方法，运行会报错；
9. object通过new创建：    

		var o=new Object()；
Object 的每个实例都具有下列属性和方法。  

		a)  constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（constructor）就是 Object()。
		
		b)  hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例
		的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例
		如： o.hasOwnProperty("name")）。

		c) isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型（第 5 章将讨论原型） 。
		
		d)  propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用 for-in 语句
		（本章后面将会讨论）来枚举。与 hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定。
		
		e)  toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
		
		f)  toString()：返回对象的字符串表示。
		
		g)  valueOf()：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。
### 1.2 操作符
11. 一元加&减操作符，非数值应用时候会像Number()转型函数一样，字符串按照已知的规则进行转换，对象则会先调用他们的valueOf() 或（和） toString()方法，再转换得到最终值。
12. ECMAscript 位操作符并不直接操作 64 位的值,先将 64 位的值转换成 32 位的整数，然后执行操作，最后再将结果转换回 64 位.
13. 位操作： 非(~), 与(&), 或(|), 异或(^, 两个数值对应位上只有一个 1 时才返回 1), 左移(<<), 右移(>>), 无符号右移(>>>)
14. 有时候代码中出现两个 **!!**:  
第一个！会将所有类型数据强制转换为布尔操作,相当于执行Boolean();  
 第二个！则对第一个得到的布尔值进行取反;
15. 逻辑与（&&）：  
	- 可以应用于任何类型的操作数，而不仅仅是布尔值;
	- 如果两个操作数都是对象(包含空对象{})，则返回第二个操作数;
	- 第一个是对象，直接返回第二个操作数（无论第二个操作数是啥）
	- 如果第二个是对象，只有在第一个返回true时候才会返回第二个，否则返回第一个(0,false,null,NaN,undefined)。
	- 两个都是对象，直接返回第二个对象；


16. 逻辑或  
	- 第一个是对象，直接返回第一个操作数（无论第二个操作数是啥）
	- 如果第一个操作数的求值结果为false(0,false,null,NaN,undefined)，则返回第二个操作数；
	- 两个都是对象，直接返回第一个对象；
	- 两个对象同时是(0,false,null,NaN,undefined)时，才会返回对应值
	- **常用于赋值语句**，避免出现(0,false,NaN,undefined)

17. 乘法(*)  
	- 如果有一个操作数是NaN，则结果是NaN；
	- Infinity 与0 相乘，则结果是NaN；

18. 除法(/)
	- 如果有一个操作数是NaN，则结果是NaN；
	- Infinity 被Infinity 除，则结果是NaN；
	- 如果是零被零除，则结果是NaN；

19. 求模(%)  
	- 也叫求余运算：26 % 5; 等于1；
	- 如果被除数是无穷大值而除数是有限大的数值，则结果是NaN；
	- 如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数；
	- 如果被除数是有限大的数值而除数是零，则结果是NaN；
	- 如果是Infinity 被Infinity 除，则结果是NaN；

20. 加法常见错误：  

		var message = "The sum of 5 and 10 is " + num1 + num2;//The sum of 5 and 10 is 510
		var message = "The sum of 5 and 10 is " + (num1 + num2);//The sum of 5 and 10 is 15

21. 加减法

		5 +(-) undefined=NaN;
		5 +(-) null=5;
		5 +(-) false=5;
		5 +(-) NaN=NaN;

22. 比较操作符
	- 两个操作数都是数值，执行数值比较。
   		
			5>3;//true
	- 两个操作数都是字符串，比较两个字符串对应的字符编码值。
	
  			"Brick" < "alphabet"; //true,B字符编码为66，a为97
	- 如果一个操作数是数值，则将另一个操作数转换为数值，再执行数值比较。
	
   			"5">3;//true
	- 如果一个操作数是对象，则调用这个对象的valueOf()方法，再用前面规则比较。如果该对象没有valueOf()方法，则调用toString()方法，再用前面规则比较。
	
			   "a" < 3; // false，因为"a"被转换成了NaN

			   var b={
			    valueOf:function(){
			      return 5
			    }
			   };
			   b>3;//true，调用valueOf()方法，写成toString()也适用；
	- 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。
  
			false<2;//true

23. 相等操作  
相等和不相等——先转换再比较:  
	- 如果有一个操作数是布尔值，则会转换为1或0；
	- 如果一个是字符串，另一个是数值，则会将字符串转换为数值；
	- 如果一个操作数是对象，另一个不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较；
	- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true；否则，返回false。
	- 其他：

			  null==undefined;//true
			  NaN==任何类型(含NaN);//false 
			  undefined == 0;// false
			  null == 0; //false
全等和不全等——仅比较而不转换:  

			"55" === 55; //false，因为不同的数据类型不相等  

14. 条件操作符(三目运算)；

15. 赋值操作符
	- 常规赋值；  
	- 复合操作，如(+=,/=,>>=);    
26. 逗号  
	- 在一条语句中执行多个操作：  
	
			var num1=1, num2=2, num3=3;
	- 在用于赋值时，逗号操作符总会返回表达式中的最后一项(不常见)：
	
			var num = (5, 1, 4, 8, 0); // num 的值为0
### 1.3 语句

1. for循环  
由于 ECMAScript 中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到。

			for(var k=0;k<2;k++){
				console.log("done")
			};
			console.log(k)；//k=2,循环体外部仍可以访问，ES6的let则不存在这个问题。
2. for in遍历  
早期时，如果要迭代的对象是null或undefined,for-in语句会抛出错误，ES5修正了该问题，只是不执行循环体，并不报错。
3. label语句  
联用 break、 continue 和 label 语句能够执行复杂的循环嵌套，但建议少用，影响阅读和调试；
4. width语句  
with 语句的作用是将代码的作用域设置到一个特定的对象中，改变代码作用域； 

		var qs = location.search.substring(1);
		var hostName = location.hostname;
		var url = location.href;
改写为  

		with(location){
		var qs = search.substring(1);
		var hostName = hostname;
		var url = href;
		}
每个变量首先认为是局部变量，如果局部环境找不到该变量，会自动转到location下，查看location下是否有同名属性。 大量使用会引起性能问题，不建议使用，strict模式下会报错。

5. switch语句  
虽然 ECMAScript 中的 switch 语句借鉴自其他语言，但也有自己的特色：  

	- 可以使用任何数据类型（很多其他语言中只能使用数值），无论是字符串，还是对象均可； 
	- 每个 case 的值不一定是常量，可以是变量，甚至是表达式；
	- 比较时使用全等，不会发生类型转换； 
### 1.4 函数
1. ECMAScript 中的参数在内部是用一个数组来表示的；
2. 函数接受的参数可以通过arguments来访问，该对象是一个数组；
3. ECMAScript 函数的参数形参和实参无需对应（解释器不会去验证）；
4. 关于重载：  
	- 重载的解释：C++的概念，可以指定几个同名函数，但形参必须不同，分别完成不同的功能；  
	- ECMAScript没有重载功能（不存在函数签名的特性），但通过arguments对象的使用，可以完成类似“重载”的功能：   
	
			function doAdd() {
				if(arguments.length == 1) {
				alert(arguments[0] + 10);
				} else if (arguments.length == 2) {
				alert(arguments[0] + arguments[1]);
				}
			}
			doAdd(10); //20
			doAdd(30, 20); //50
            //根据传入函数中参数的类型和数量，实现不同的逻辑，但这并非真正的重载。
    - arguments对象中的值会自动反映到对应的命名参数(stritc模式无效);
5. 在函数内部，有两个特殊的对象： arguments 和 this。
6.  arguments.callee 指向函数名本身，常用于循环调用。（严格模式下无效）
7.  arguments.callee.caller：保存着调用当前函数的函数的引用  

		function outer(){
		   inner();
		}
		function inner(){
		   console.log(inner.caller);
		}
		outer();//function outer(){inner()},打印出调用inner的函数，严格模式下报错
8. 每个函数都包含两个属性： length 和 prototype。  
 length属性表示函数希望接收的命名参数的个数；  
 prototype属性表示引用类型的原型；

		   function sum(num1, num2){
		     return num1 + num2;
		   }
		  console.log(sum.length)；//2

9. apply() 和 call()：二者作用相同，区别仅在于接收参数的方式不同。

a) 传递参数  

	function sum(num1, num2){
		return num1 + num2;
	}
	function callSum(num1, num2){
		return sum.call(this, num1, num2);//调用sum，并将参数传递过去
        //return sum.apply(this, arguments);//apply调用方式1
		//return sum.apply(this, [num1,num2]);//apply调用方式2
	    //return sum(num1,num2);//直接调用，效果跟通过call调用一样
	}
	console.log(callSum(10,10)); //20
b) 扩充函数赖以运行的作用域（重要）  

	    window.color = "red";
		var o = { color: "blue" };
		function sayColor(){
		console.log(this.color);
		}
		sayColor(); //red
		sayColor.call(this); //red
		sayColor.call(window); //red
		sayColor.call(o); //blue
### 1.5 变量的复制
1. ECMAScript中访问变量有按值传递和按引用传递。

2. ECMAScript中所有的函数的参数都是按值传递的，无论参数是基本数据类型还是引用数据类型

### 1.6 instanceof

引用类型的检测利用instanceof更准确，检测一个变量是否是引用类型的实例，返回布尔值。

    console.log(arr instanceof Array);//arr 是Array对象的实例？true
    console.log(arr instanceof Object);//所有引用类型都是Object对象的实例，永远返回true

## 2 引用类型

### 2.1 引用类型通用的方法
所有对象都有，`toLocaleString()`,`toString()`, `valueOf()`方法。  

1. toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。  
2. toString(): 返回对象的字符串表示。  
3. valueOf(): 返回对象的字符串，数值，或者布尔值，通常与toString()返回值相同。  
4. 通常情况下ECMAScript类型转换时会默认调用对象的`valueOf()`, `toString()`方法。


### 2.2 Object类型
方括号和“.”都可以访问对象属性，但方括号有以下两点是“.”做不到的：

 - 访问变量：
 - 访问带空格的属性名称，如：`obj["first name"]`

### 2.3 Array类型

#### 特点 
1. ECMA的数组有以下特点：

	- 数组每项都可以保存任何类型数据
	- 数组大小动态调整
2. 数组的检测有两种方式：`instanceof` 和 `Array.isArray()`(ECMA5新增)
#### 方法  
1. push():栈方法，从后推入。

2. pop():栈方法。从后删除，删除最后一项

3. unshift():队列方法。从前推入

4. shift():队列方法。从前删除,删除第一项

5. reverse():反转，倒序排列。

6. sort()：重排，默认是调用toString()方法，变成字符串，比较ASCII码，并不是我们想要的结果。但sort接受可以接受一个比较函数作为参数，譬如：
  
		var arr=[1,3,10,23];
		arr.sort(function(a,b){
		   return a-b;//比较函数通过返回一个小于0，等于0，大于0的值来影响排序结果
		})
		console.log(arr);//[ 1, 3, 10, 23 ]
7. concat():拼接数组。基于目前数组返回一个新数组

		var arr=[1,3,10,23];
		var arr1=arr.concat(2,[5,6]);//返回新数组,接受多个参数，参数为字符串，数字，或者数组。
		console.log(arr);//[ 1, 3, 10, 23 ]
		console.log(arr1);//[ 1, 3, 10, 23, 2, 5, 6 ]

8. slice():分割数组，接受一个或两个参数，即要返回项的起始或结束位置：

		var arr=[1,3,10,23];
		var arr1=arr.slice(2);//一个参数表示分割的起始位置
		var arr2=arr.slice(1,3);
		console.log(arr);//[ 1, 3, 10, 23 ]原数组不变 
		console.log(arr1);//[ 10, 23 ]
		console.log(arr2);//[ 3, 10 ]
        //还可以接受负数，arr.slice(-3,-1)=arr.slice(4-3,4-1)=arr.slice(1,3)
9. splice()：最强大的数组方法，具有删除，插入，替换三项功能。
       
        //删除功能
	    var arr=[1,3,10,23];
		var arr1=arr.splice(0,1);//要删除第一项的位置和删除的项数，不指定默认为0
		console.log(arr);//[ 3, 10, 23 ],直接在原数组上修改
		console.log(arr1);//[1]，数组形式返回被删掉的数据
       
        //插入功能
		var arr=[1,3,10,23];
		var arr1=arr.splice(0,0,"4");//要插入的位置，插入时替换几项数据，第三个参数以后部分为要插入的数据
		console.log(arr);//[ '4', 1, 3, 10, 23 ],直接在原数组上插入
		console.log(arr1);//[]，数组形式返回被删掉的数据

		//替换功能
		var arr=[1,3,10,23];
		var arr1=arr.splice(0,1,"4");//要插入的位置，插入时替换几项数据，第三个参数以后部分为要替换的数据
		console.log(arr);//[ '4', 3, 10, 23 ],直接在原数组上修改
		console.log(arr1);//[1]，数组形式返回被删掉的数据
9. indexOf():查找，参数为要查找的数组索引，从前向后

10. lastIndexOf()：查找，参数为要查找的数组索引，从后向前

11. map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

12. forEach()：对数组中的每一项运行给定函数。这个方法没有返回值

13. every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true

14. filter()：对数组中的每一项运行给定函数，返回该函数会返回true 的项组成的数

15. some()：对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true
   
        //以上迭代方法都接受一个函数,形参分别为，数组每项，索引，数组本身

		  numbers.map(function(item, index, array){ 
		   //some code
		   }）
16. reduce():从左向右迭代数组的所有项，然后构建一个最终返回的值

17. reduceRight():从右向左迭代数组的所有项，然后构建一个最终返回的值

		//以上归并方法都接收4 个参数：前一个值、当前值、项的索引和数组对象
		var sum = values.reduce(function(prev, cur, index, array){
			return prev + cur;
		});
### 2.4 Date类型

		var date=new Date();
		console.log(date.getFullYear());
		console.log(date.getMonth()+1);
		console.log(date.getDate());
		console.log(date.getHours());
		console.log(date.getMinutes());
		console.log(date.getSeconds());

### 2.5 RegExp类型  
1. exec(字符串)  
返回返回包含第一个匹配项信息的数组；（若无返回null）。
在不设置全局标志的情况下，在同一个字符串上多次调用 exec()将始终返回第一个匹配项的信息；即使设置了全局标志（g），它每次也只会返回一个匹配项。只不过再次调用都会在字符串中继续查找新匹配项。

		var pt=/.at/g;
		var text = "cat, bat, sat, fat";
		console.log(pt.exec(text));//[ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
		console.log(pt.exec(text));//[ 'bat', index: 5, input: 'cat, bat, sat, fat' ] 
返回的数组虽然是 Array 的实例，但包含两个额外的属性：  
   - index：表示匹配项在字符串中的位置。   
   - input：表示应用正则表达式的字符串。  

2. test(字符串)  
返回一个布尔值，常用于if语句。  

		var pt=/.at/g;
		var text = "cat, bat, sat, fat";
		console.log(pt.test(text));//true
### 基本包装类型（Boolean(略), Number, String）
### 2.6 Number类型
1. toFixed():按照指定的小数位返回数值的字符串表示
2. toExponential():按照指定的小数位返回数值的字符串表示(指数形式)    

		var num = 99.586;

		console.log(num.toFixed(1)); //"99.6"
		console.log(num.toFixed(2)); //"99.59"
		console.log(num.toFixed(3)); //"99.586"
		
		console.log(num.toPrecision(1)); //"1e+2"
		console.log(num.toPrecision(2)); //"1.0e+2"
		console.log(num.toPrecision(3)); //"99.6"
### 2.7 String类型
1. charAt(索引) 
   
		   var stringValue = "hello world";
		   alert(stringValue.charAt(1)); //"e"
2. substring(起始, 终止)  
和slice用法基本一样。二者在第一个参数为负数，起始大于截止时返回结果会不一样。

3. substr(起始, 返回字符串长度)  
 slice,substring,substr只有一个参数时，返回结果一模一样：

		var str = "hello world";
		console.log(str.slice(3)); //"lo world"
		console.log(str.substring(3)); //"lo world"
		console.log(str.substr(3)); //"lo world"
  
		//起始位置，到截止位置分割字符串，正常情况下slice跟substring是一样的
		console.log(str.slice(1,3));//el
		console.log(str.substring(1,3));//el
		
		//起始位置，返回指定长度的字符串
		console.log(str.substr(1,3));//ell
4. 大小写转换

		var str = "hello world";
		console.log(str.toLowerCase()); //"hello world"
		console.log(str.toUpperCase()); //"HELLO WORLD"  
5. 匹配方法  

	- **match**(正则表达式/RegExp对象/字符串)：本质上与调用 RegExp 的 exec()方法相同，返回一个包含匹配项的数组。
	- **search**(正则表达式/RegExp对象/字符串)：返回第一个匹配项的索引，若无返回-1
	- **replace**(参数1，参数2)：这个方法接受两个参数：第
一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。
	- **split**(字符串/正则，数组长度)：基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。  
例子：
 
			var text = "cat, bat, sat, fat";
			console.log(text.match(/.at/));//[ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
			console.log(text.match(/.at/g));//[ 'cat', 'bat', 'sat', 'fat' ]
			console.log(text.match(".at"));//[ 'cat', index: 0, input: 'cat, bat, sat, fat' ] 
            console.log((/.at/g).exec(text));//[ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
            //match与正则对象的exec方法很相似
         
			console.log(text.search(/at/));//1
			console.log(text.search(/at/g));//1
			console.log(text.search("at"));//1
            //match & search 方法中字符串参数会被强制转化为正则表达式   
           
            console.log(text.replace("at", "ond"));//cond, bat, sat, fat
			console.log(text.replace(/at/g, "ond"));//cond, bond, sond, fond
            //replace方法第一个参数为字符串时，不会全局匹配，全局匹配必须通过正则表达式来实现  

            console.log(text.split(","));//[ 'cat', 'bat', 'sat', 'fat' ] 
			console.log(text.split(",", 2));//[ 'cat', 'bat' ]
			console.log(text.split(/[^\,]+/));// [ '', ',', ',', ',', '' ]
            
6. 位置方法：indexOf() 和 lastIndexOf()
7. trim()方法：ECMAScript 5，这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。 
8. localeCompare()方法：比较两个字符串。
9. fromCharCode()方法：是接收一或多个字符编码，然后将它们转换成一个字符串

## 3 单体内置对象

### 3.1 Global对象  
1. URI方法  

		1. encodeURI()；不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号等进行编码。
		2. encodeURIComponent()；任何非标准字符均进行编码
		3. decodeURI()；解码
		4. decodeURIComponent()；解码
2. eval()    
该方法就像是一个完整的 ECMAScript 解析器，它只接受一个参数，即要执行的ECMAScript （或 JavaScript）字符串。慎用！！！

### 3.2 Math对象  
1. 获取最大（小）值  

		console.log(Math.max("3", "54", 32, 16));//54
		console.log(Math.min("3", "54", 32, 16));//3
        //接收多个数值参数，参数若不是Number类型会被强制转换

2. 舍入方法

		Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
		Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
		Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数；

3. random()方法  
Math.random()方法返回大于等于 0 小于 1 的一个随机数。

		//随机返回一个指定范围内的整数
		function selectFrom(lowerValue, upperValue) {
			var choices = upperValue - lowerValue + 1;
			return Math.floor(Math.random() * choices + lowerValue);
		}
		console.log(selectFrom(1,10));

4. 其他方法  

	    Math.abs(num)       返回num 的绝对值 
		Math.exp(num)       返回Math.E 的num 次幂 
		Math.log(num)       返回num 的自然对数 
		Math.pow(num,power) 返回num 的power 次幂 
		Math.sqrt(num)      返回num 的平方根 
		Math.acos(x)        返回x 的反余弦值  
		Math.asin(x)        返回x 的反正弦值 
		Math.atan(x)        返回x 的反正切值
		Math.atan2(y,x)     返回y/x 的反正切值
		Math.cos(x)         返回x 的余弦值
		Math.sin(x)         返回x 的正弦值
		Math.tan(x)         返回x 的正切值
##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


