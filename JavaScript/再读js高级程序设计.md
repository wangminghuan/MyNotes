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
## 2 引用类型

### 2.1 Object类型
方括号和“.”都可以访问对象属性，但方括号有以下两点是“.”做不到的：

 - 访问变量：
 - 访问带空格的属性名称，如：`obj["first name"]`
### 2.2 Array类型
1. ECMA的数组有以下特点：

	- 数组每项都可以保存任何类型数据
	- 数组大小动态调整
2. 

##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


