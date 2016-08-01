##<font face="微软雅黑" size="4" >JavaScript高级程序设计阅读笔记（1）

**<font size="5" color="red" >一. 基本概念</font>**  
**<font color="blue">1.1 数据类型</font>**   
A) ECMAScript 中有 5 种简单数据类型（也称为基本数据类型）：**Undefined、Null、Boolean、Number 和 String**。

B) <font color="red">typeof</font> 用于检测变量的数据类型：  

	"undefined"——如果这个值未定义；
	"boolean"——如果这个值是布尔值；
	"string"——如果这个值是字符串；
	"number"——如果这个值是数值；
	"object"——如果这个值是对象或 null；//特殊值 null 被认为是一个空的对象引用
	"function"——如果这个值是函数。

C) 对于<font color="red">null</font>对象，如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为 null 而不是其他值；    

D) <font color="red">Boolean</font>类型：ECMAScript 中所有类型的值都有与这两个 Boolean 值
等价的值。可以调用转型函数 Boolean()，将数据强制转换为布尔值:  

	false、""(空字符串)、0、NaN、null、undefined均会被转化为布尔值中的false

E） <font color="red">Number</font>对象下：  

	Number.MIN_VALUE：js可以保存的最小值；
	Number.MAX_VALUE：js可以保存的最大值；
	超过这个范围会被判定为Infinity或-Infinity（正、负无穷）；
	isFinite()函数用于检测是否为无穷，将返回一个布尔值；

F) <font color="red">NaN</font>:即非数值（Not a Number）是一个特殊的数值：  
首先，任何涉及 NaN 的操作（例如 NaN/10）都会返回 NaN；  
其次，NaN 与任何值都不相等，包括 NaN 本身；  
isNaN()函数：任何不能被转换为数值的值都会导致这个函数返回 true，例如：

	alert(isNaN("blue")); //true（不能转换成数值）

G) <font color="red">数值转换</font>：有 3 个函数可以把非数值转换为数值： Number()、 parseInt()和 parseFloat()。  
<font color="red">Number()</font>：可以用于任何数据类型  

	如果是 Boolean 值， true 和 false 将分别被转换为 1 和 0。
	如果是数字值，只是简单的传入和返回。
	如果是 null 值，返回 0。
	如果是 undefined，返回 NaN。
	如果是字符串，遵循特定规则转换（省略，可参照书籍）。  
<font color="red">parseInt()</font>： 专门用于转换数值类型  

	var num1 = parseInt("1234blue"); // 1234
	var num2 = parseInt(""); // NaN
	var num3 = parseInt("0xA"); // 10（十六进制数）
	var num4 = parseInt(22.5); // 22
	var num5 = parseInt("070"); // 56（八进制数）
	var num6 = parseInt("70"); // 70（十进制数）
	var num7 = parseInt("0xf"); // 15（十六进制数） 
还可以接受第二个参数：转换时使用的基数（即多少进制）：  
 
	var num1 = parseInt("10", 2); //2 （按二进制解析）
	var num2 = parseInt("10", 8); //8 （按八进制解析）
	var num3 = parseInt("10", 10); //10 （按十进制解析）
	var num4 = parseInt("10", 16); //16 （按十六进制解析）  
<font color="red">parseFloat()</font>与parseInt()类似，只是转换为的浮点数，且不接受第二个参数；  

	var num1 = parseFloat("1234blue"); //1234 （整数）
	var num2 = parseFloat("0xA"); //0
	var num3 = parseFloat("22.5"); //22.5
	var num4 = parseFloat("22.34.5"); //22.34
	var num5 = parseFloat("0908.5"); //908.5
	var num6 = parseFloat("3.125e7"); //31250000  

H) <font color="red">字符串</font>：由零或多个 16 位 Unicode 字符组成的字符序列。转义字符无论字符长度，均按转义后的字符长度计算（1个字符），如\u03a3，转义后为：Σ，长度为1。  

<font color="red">toString()</font>:将其他类型转换为字符串类型  

	  1.数值、布尔值、对象和字符串值都有 toString()方法。但 null 和 undefined 值没有这个方法。
	  2.toString()还可以接受一个参数：输出数值的基数：
		var num = 10;
		alert(num.toString()); // "10"
		alert(num.toString(2)); // "1010"
		alert(num.toString(8)); // "12"
		alert(num.toString(10)); // "10"
		alert(num.toString(16)); // "a"
<font color="red">String()</font>： 能够将任何类型的值转换为字符串(对于不知道转换数据是否为null或undefined情况下)，转换遵循以下规则：  
  
	如果值有 toString()方法，则调用该方法（没有参数）并返回相应的结果；
	如果值是 null，则返回"null"；
	如果值是 undefined，则返回"undefined"

**<font color="blue">1.2 操作符</font>**   
A） 布尔操作符：   
对于特殊类型的处理：
   
    //1.逻辑非
    alert(!null);    //true
	alert(!NaN);     //true
	alert(undefined); //true
    //2.逻辑与
	alert(null && 其他);  //null
    alert(NaN && 其他);    //NaN
    alert(undefined && 其他); //undefined
    //3.逻辑或
    alert(null || null);  //null
    alert(NaN || NaN);    //NaN
    alert(undefined || undefined); //undefined

B） 乘性操作符  	
乘法，除法，只要涉及到NaN，结果都是NaN

C） 关系操作符  

	1.如果两个操作数都是数值，则执行数值比较。
	2.如果两个操作数都是字符串，则比较两个字符串对应的字符编码值。
      （大写字母的字符编码全部小于小写字母的字符编码，所以：
        var result = "Brick" < "alphabet"; 为true）
	3.如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较。
	4.如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面的规则执行比较。
      如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面的规则执行比较。
	5.如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。
补充：  
<font size="2">ASCII码：美国信息交换标准代码，计算机中的数据都是以二进制数据进行存储的，所以对于a、b、c、d这样的52个字母（包括大写）、以及一些常用的符号（例如*、#、@等）在计算机中存储时也要使用二进制数来表示，为了统一规范，有关的标准化组织就出台了ASCII编码，统一规定了上述常用符号用哪些二进制数来表示。但ASCII码只有八位（一个字节），只能表示256种单个字符（英文数字和常用标点符号）。  

Unicode码：扩展自ASCII字元集，它用两个字节来编码一个字符，囊括了世界上所有的语言（如中，韩，日等）。在表示一个Unicode的字符时，通常会用“U+”然后紧接着一组十六进制的数字来表示这一个字符；
</font>
 
D）相等操作符  
相等（==）和不相等（！=）——先转换再比较  

	这两个操作符在进行比较时则要遵循下列规则。
	1.null 和 undefined 是相等的。
	2.要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。
	3.如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true。重要提示：
	即使两个操作数都是 NaN，相等操作符也返回 false；因为按照规则， NaN 不等于 NaN。
	4.如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true；否则，返回 false。
    例子：
	     null == undefined  //true 
	     "5"==5  			//true
	     true == 1 			//true
	     true == 2 			//false
		NaN == NaN 			//false  

全等（===）和不全等（！==）——仅比较而不转换  

	null === undefined  //false
	"5"===5  			//true

E）赋值操作符   
 
	乘/赋值（*=）
	乘/赋值（*=）
	除/赋值（/=）
	模/赋值（%=）
	加/赋值（+=）
	减/赋值（-=）
	左移/赋值（<<=）
	有符号右移/赋值（>>=）
	无符号右移/赋值（>>>=）
	//这些操作符主要目的是简化操作，不会带来任何性能的提升

F）逗号操作符    
逗号操作符多用于声明多个变量；但除此之外，逗号操作符还可以用于赋值。在用于赋值时，逗号操作符总会返回表达式中的最后一项，如下面的例子所示 

	var num = (5, 1, 4, 8, 0); // num 的值为 0（这种使用方式并不常见）

**<font color="blue">1.3 语句</font>**   
A) if语句

B) do-while语句   
后测试循环语句；在对条件表达式求值之前，循环体内的代码至少会被执行一次。  

C） while语句  
前测试循环语句；在循环体内的代码被执行之前，就会对出口条件求值。  

	if和while的异同：
    相同：if()和while()括号内都是是判定句，为true后才会执行主体；
	不同：if没有循环的特性，一旦执行过后就跳出语句；而while判定为真后执行它下面的语句，执行完后返回括号里继续判定，判定为真继续执行语句知道括号里判定为假才会跳出语句。
D) for循环  

	var count = 10;
	for (var i = 0; i < count; i++){
	alert(i);
	}
    //while语句，与上述for循环功能相同
	var count = 10;
	var i = 0;
	while (i < count){
	alert(i);
	i++;
	}
注意：由于 ECMAScript 中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到，即：

	var count = 10;
	for (var i = 0; i < count; i++){
	alert(i);
	}
	alert(i)//结果为10
E) for-in 语句  
是一种精准的迭代语句，可以用来枚举对象的属性。  
  
	for (var propName in window) {
	  console.log(propName);
	}
由于ECMAScript 对象的属性没有顺序。因此，通过 for-in 循环输出的属性名的顺序是不可预测的。即：所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异。  

同时，ECMA5之前的解释器，对于对象属性为null或undefined时会抛出错误，而ECMA5则不抛出错误，而只是不执行循环体；  
**<font size="5" color="red" >二. 标题2</font>**  
**<font color="blue">2.1 二级标题</font>**   
**A)** 

**B)**  
**<font size="5" color="red" >三. 标题3</font>**  
**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   
**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

