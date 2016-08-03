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
A) <font color="red">if</font>语句

B) <font color="red">do-while</font>语句   
后测试循环语句；在对条件表达式求值之前，循环体内的代码至少会被执行一次。  

C） while语句  
前测试循环语句；在循环体内的代码被执行之前，就会对出口条件求值。  

	if和while的异同：
    相同：if()和while()括号内都是是判定句，为true后才会执行主体；
	不同：if没有循环的特性，一旦执行过后就跳出语句；而while判定为真后执行它下面的语句，执行完后返回括号里继续判定，判定为真继续执行语句知道括号里判定为假才会跳出语句。
D) <font color="red">for</font>循环  

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
E) <font color="red">for-in</font>语句  
是一种精准的迭代语句，可以用来枚举对象的属性。  
  
	for (var propName in window) {
	  console.log(propName);
	}
由于ECMAScript 对象的属性没有顺序。因此，通过 for-in 循环输出的属性名的顺序是不可预测的。即：所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异。  

同时，ECMA5之前的解释器，对于对象属性为null或undefined时会抛出错误，而ECMA5则不抛出错误，而只是不执行循环体；    

F) <font color="red">label</font>语句  

	start: for (var i=0; i < count; i++) {
	alert(i);
	}
相当于为这段代码添加了一个锚点名称，该标签可以在将来由 break 或 continue 语句引用。  

G) <font color="red">break & continue</font>语句      
break 语句会立即退出循环，
强制继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。  

break 和 continue 语句都可以与 label 语句联合使用，从而返回代码中特定的位置。这种联合使用的情况多发生在循环嵌套的情况下。  

H) <font color="red">with</font>语句   

with 语句的作用是将代码的作用域设置到一个特定的对象中。定义 with 语句的目的主要是为了简化多次编写同一个对象的工作，如下面的例子所示：  

	var qs = location.search.substring(1);
	var hostName = location.hostname;
	var url = location.href;
上面几行代码都包含 location 对象。如果使用 with 语句，可以把上面的代码改写成如下所示：  

	with(location){
	var qs = search.substring(1);
	var hostName = hostname;
	var url = href;
	}
    //严格模式不允许with语句，同时大量with语句会导致性能下降，大型开发时不建议使用
   	

I) <font color="red">switch</font>语句  
ECMAScript 中的 switch 语句借鉴自其他语言，但这个语句也有自己的特色。首先，可以在switch 语句中使用任何数据类型（在很多其他语言中只能使用数值），无论是字符串，还是对象都没有问题。其次，每个 case 的值不一定是常量，可以是变量，甚至是表达式：  

	switch ("hello world") {
	case "hello" + " world":
	alert("Greeting was found.");
	break;
	case "goodbye":
	alert("Closing was found.");
	break;
	default:
	alert("Unexpected message was found.");
	}
switch 语句在比较值时使用的是全等操作符，因此不会发生类型转换。  

**<font color="blue">1.4 函数</font>**   
A) return语句之后的任何代码都不会被执行 
 
	function sum(num1, num2) {
	return num1 + num2;
	alert("Hello world"); // 永远不会执行
	}  
实际上，未指定返回值的函数返回的是一个特殊的 undefined 值；  

B) 理解参数（arguments）  
ECMAScript 中的参数在内部是用一个数组来表示的。函数接收
到的始终都是这个数组，而不关心数组中包含哪些参数（如果有参数的话）。我们可以在函数体内可以通过 <font color="red">arguments</font> 对象来访问这个参数数组，从而获取传递给函数的每一个参数。  

arguments 对象只是与数组类似（它并不是 Array 的实例），但可以通过[]的方式来访问其下的每一个元素，使用length来返回长度。我们甚至无需显式地使用命名参数：  

	function sayHi() {
	alert("Hello " + arguments[0] + "," + arguments[1]);
	}

arguments 对象可以与命名参数一起混用：  

	function doAdd(num1, num2) {
	if(arguments.length == 1) {
	alert(num1 + 10);
	} else if (arguments.length == 2) {
	alert(arguments[0] + num2);
	}
	}//num1的值与arguement[0]的值相同，它们可以互换使用  

arguments对象中的值会自动反映到对应的命名参数，所以修改arguments[1]，也就修改了 num2。但二者的内存空间是独立的，只是它们的值会同步（严格模式下，即使把 arguments[1]设置为 10， num2 的值仍然还是 undefined）。同时，arguments 对象的长度是由传入的参数个数决定的。  

C) ECMAScript 函数不能重载;  

**<font size="5" color="red" >二.基本类型和引用类型</font>**   
**<font color="blue">1.1 基本类型</font>**    
5种基本数据类型（Undefined、 Null、 Boolean、 Number 和 String）是按值访问
的，因为可以操作保存在变量中的实际的值。  
基本类型复制操作时，是按值传递的，即：  

	var num1 = 5;
	var num2 = num1;
num2中的 5 与 num1 中的 5 是完全独立的，该值只是 num1 中 5 的一个副本,两个变量互不影响；   

**<font color="blue">1.2 引用类型</font>**   
引用类型值指那些可能由多个值构成的对象。而操作对象时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是按引用访问的（这种说法不严密，当复制保存着对象的某个变量时，操作的是对象的引用。但在为对象添加属性时，操作的是实际的对象）。  

引用类型进行复制操作时，其实只是把指针的传递。复制操作结束后，两个变量实际上将引用同一个对象。  

	var obj1 = new Object();
	var obj2 = obj1;
	obj1.name = "Nicholas";
	alert(obj2.name); //"Nicholas"   

**<font color="blue">1.3 传递参数</font>**  
 ECMAScript 中所有函数的参数都是按值传递的。因为访问变量有按值和按引用两种方式，而参数只能按值传递。 
当参数传递基本类型值时:

    function addTen(num) {
	num += 10;
	}
	var count = 20;
	addTen(count);
	console.log(count);//20
当参数传递引用类型时（不太好理解）：
    
	function setName(obj) {
	obj.name = "Nicholas";
	}
	var person = new Object();
	setName(person);
	console.log(person.name);//Nicholas

解读：  
<font size="3">
1.数组、对象等按值传递，是指变量地址的值。  
2.数组、对象等的按值传递与数字、字符串还是有所不同的。数字、字符串是把值直接复制进去了，而数组、对象是把变量地址复制进去的。  
3.我们进行举例说明：

	var v1 = []
	var v2 = {};
	var v3 = {};
	function foo(v1, v2, v3)
	{
	    v1 = [1];
	    v2 = [2];
	    v3 = {a:3}
	}
	
	foo(v1, v2, v3);
	alert (v1); // 空白 
	alert (v2); // [object Object] 
	alert (v3.a); // undefined  
v1、v2、v3 作为参数进入函数后，就有了地址副本，这些变量地址副本的指向和外面的 v1、v2、v3 的地址指向是相同的。但我们为 v1、v2、v3 赋了值，也就是说我们把地址副本的指向改变了，指向了新的数组和对象。这样内部的 v1、v2、v3 和外部的 v1、v2、v3 就完全断了，也可以这样理解：<font color="red">不管是基本类型还是对象类型，只要是用等号进行实际赋值，将重新分配内存空间。</font>  
4. 我们改写下上述例子：  

	var v1 = []
	var v2 = {};
	var v3 = {a:0};
	function foo(v1, v2, v3)
	{
	    v1.push (1);
	    v2.a = 2;
	    v3.a = 3;
	}
	
	foo(v1, v2, v3);
	alert (v1); // 1 
	alert (v2.a); // 2 
	alert (v3.a); // 3
故：<font color="red">参数只能按值传递</font>
</font>  

**<font color="blue">1.4 检测类型</font>**  
typeof 操作符是确定一个变量是字符串、数值、布尔值，还是 undefined 的最佳工具。但对于对象（含null），typeof的返回都是object。此时，我们就需要用到instanceof 操作符。返回结果为true/false  

	alert(person instanceof Object); // 变量 person 是 Object 吗？
	alert(colors instanceof Array); // 变量 colors 是 Array 吗？
	alert(pattern instanceof RegExp); // 变量 pattern 是 RegExp 吗？

**<font size="5" color="red" >三. 引用类型</font>**    
>对象是特定引用类型的实例  
>引用类型包含：Object类型、Array类型、Date类型、RegExp类型、Function类型、基本包装类型、单体内置对象  

**<font color="blue">3.1 Object类型</font>**   
我们看到的大多数引用类型值都是 Object 类型的实例，是ECMA中用的最多的一个类型，Object实例本身不具备多少功能。  
**A)Object 的每个实例都具有下列属性和方法** 。  

	1. constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（constructor）就是 Object()。
	2. hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例如： o.hasOwnProperty("name")）。
	3. isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型（第 5 章将讨论原型） 。
	4. propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用 for-in 语句来枚举。与 hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定。
	5. toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
	6. toString()：返回对象的字符串表示。
	7. valueOf()：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。  
**B)创建Object对象**   
方法1:

	var person = new Object();
	//var person = {} 与 new Object()相同
	person.name = "Nicholas";
	person.age = 29;
方法2: <font color="red" size="3">对象字面量表示法</font>  

	var person = {
	name : "Nicholas",
	age : 29
	}; 
**C)使用对象字面量语法时，属性名也可以使用字符串**    

	var person = {
	"name" : "Nicholas",
	"age" : 29,
	5 : true //5会自动转化为"5"
	}
日常使用中，更推荐字面量表示法，因为这种语法要求的代码量少，而且能够给人封装数据的感觉。  

**<font color="blue">3.2 Array类型</font>**   
**A)ECMAScript 数组的自有特点**：  
1. 每一项可以保存任何类型的数据。也就是说，可以用数组的第一个位置来保存字符串，用第二位置来保存数值，用第三个位置来保存对象。  
2. ECMAScript 数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。  


**B)创建Array对象**   
方法1:

	var colors = new Array();  //创建一个数组对象，长度不定
	var colors = new Array(3); // 创建一个包含 3 项的数组
	var colors = new Array("Greg"); // 创建一个包含 1 项，即字符串"Greg"的数组

方法2: <font color="red" size="3">数组字面量表示法</font>  

	var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
	var names = []; // 创建一个空数组
	var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
	var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组 
与对象一样，在使用数组字面量表示法时，也不会调用 Array 构造函数（Firefox 3
及更早版本除外）  

**C)** 数组的 length 属性很有特点——它不是只读的。可以动态修改。 

	var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
	colors.length = 2;
	alert(colors[2]); //undefined  
**D)检测数组:**  ECMAScript 5 新增了 Array.isArray()方法。  

	var value=[];
	if (Array.isArray(value)){
	  console.log("yes")
	}else{
	  console.log("no")
	} 

**E)**  <font color="red">栈方法</font>    
栈是一种**后进先出**的数据结构。<font color="red">即在数组的末端添加项，从数组末端移除项</font>;    
进栈： push();返回值是进栈元素的个数  
出栈： pop(); 返回值是出栈的元素

	var colors = new Array(); // 创建一个数组
	var count = colors.push("red", "green"); // 推入两项
	alert(count); //2
	count = colors.push("black"); // 推入另一项
	alert(count); //3
	var item = colors.pop(); // 取得最后一项 
	alert(item); //"black"
	alert(colors.length); //2
**F)**  <font color="red">队列方法</font>   
队列是一种**先进先出**数据结构。<font color="red">即在数组的末端添加项，从数组前端移除项</font>;     
进队：push();返回值是进对元素的个数（同堆栈）   
出队：shift();返回值是出队元素  

	var colors = new Array(); //创建一个数组
	var count = colors.push("red", "green"); //推入两项
	alert(count); //2
	count = colors.push("black"); //推入另一项
	alert(count); //3
	var item = colors.shift(); //取得第一项
	alert(item); //"red"
	alert(colors.length); //2  

使用 unshift()和 pop()方法，可以从**相反的方向**来模拟队列，<font color="red">即在数组的前端添加项，从数组末端移除项</font>;   

	var colors = new Array(); //创建一个数组
	var count = colors.unshift("red", "green"); //推入两项
	alert(count); //2
	count = colors.unshift("black"); //推入另一项
	alert(count); //3
	var item = colors.pop(); //取得最后一项
	alert(item); //"green"
	alert(colors.length); //2  

**G)重排序方法**   
<font color="red">1. sort()</font>：按升序排列数组项，但该方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。  

	var values = [0, 1, 5, 10, 15];
	values.sort();
	alert(values); //0,1,10,15,5  
<font color="red">2. reverse()</font>：按降序排列数组项，同样比较的是通过toString()得到的字符串。    
sort()和reverse()方法显然不能够满足多数需求。两个方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。  

	function compare(value1, value2) {
		if (value1 > value2) {
			return 1;
		} else if (value1 < value2) {
			return -1;
		} else {
			return 0;
		}
	}
	var values = [0, 5, 2, 3, 9];
	values.sort(compare);
	console.log(values); //[0, 2, 3, 5, 9]

对于简单的比较我们也可以简写为：  

	var values = [0, 5, 2, 3, 9];
	values.sort(function(a,b){
      return a-b;	
    });
	console.log(values); //[0, 2, 3, 5, 9]
同样，上述方法同样适用于reverse();  

**H)操作方法**   
<font color="red">1. concat(拼接元素，拼接元素，拼接元素，...)</font>：拼接数组，接受的参数为要拼接到对象数组中的元素；  
  
	var colors = ["red", "green", "blue"];
	var colors2 = colors.concat("yellow", ["black", "brown"]);
	alert(colors); //red,green,blue
	alert(colors2); //red,green,blue,yellow,black,brown
<font color="red">2. splice()</font>:强大的数组方法。  

	arr.splice(起始位置， 删除个数);
	arr.splice(起始位置， 替换个数， 替换内容)；
	arr.splice(起始位置， 删除个数， 添加内容)；
splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。  


**I)位置方法**  （ECMA5）  
<font color="red">1. indexOf(查找元素 [,起始点索引])</font>：从开头向末尾查询  

<font color="red">2. lastIndexOf(查找元素 [,起始点索引]</font>：从末尾向开头查询  

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符；  

**I)迭代方法**  （ECMA5）  
共有5个方法： 每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。  

运行的函数会接收三个参数：function（数组项的值，该项在数组中的位置， 数组对象本身）。   
<font color="red">1. every()</font>  
对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。

	var numbers = [1,2,3,4,5,4,3,2,1];
	var everyResult = numbers.every(function(item, index, array){
	return (item > 2);
	});
	alert(everyResult); //false
	//对于 every()，它返回的是 false，因为只有部分数组项符合条件。
<font color="red">2.some()</font>  
对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。

	var numbers = [1,2,3,4,5,4,3,2,1];
	var everyResult = numbers.some(function(item, index, array){
	return (item > 2);
	});
	alert(everyResult); //true
	//对于 some()，结果就是 true，因为至少有一项是大于 2 的。
<font color="red">3. filter()</font>    
对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。  

	var numbers = [1,2,3,4,5,4,3,2,1];
	var filterResult = numbers.filter(function(item, index, array){
	return (item > 2);
	});
	alert(filterResult); //[3,4,5,4,3]
    //通过调用 filter()方法创建并返回了包含 3、 4、 5、 4、 3 的数组
<font color="red">4. map()</font>  
对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

	var numbers = [1,2,3,4,5,4,3,2,1];
	var mapResult = numbers.map(function(item, index, array){
	return item * 2;
	});
	alert(mapResult); //[2,4,6,8,10,8,6,4,2]
	//数组中的每一项乘以 2，然后返回这些乘积组成的数组
<font color="red">5. forEach()</font>    
对数组中的每一项运行给定函数。这个方法没有返回值。

	var numbers = [1,2,3,4,5,4,3,2,1];
	numbers.forEach(function(item, index, array){
	//do something...
	});
	//该方法没有返回值，本质上与使用 for 循环迭代数组一样  

**I)归并方法**  （ECMA5）  
共2个方法，这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值；

调用函数接收四个参数: function(前一个值，当前值， 项的索引， 数组对象)  

<font color="red">1. reduce()</font>，从前向后，使用该方法可以用于求和：   

	var values = [1,2,3,4,5];
	var sum = values.reduce(function(prev, cur, index, array){
	return prev + cur;
	});
	alert(sum); //15
<font color="red">2. reduceRight()</font>，同上，只是顺序为反向：从后向前；  

**<font color="blue">3.3 Date类型</font>**   
**A)创建日期对象** ： 

	var now = new Date();

**B)常用方法**：  

	getTime()     返回表示日期的毫秒数；与valueOf()方法返回的值相同
	getFullYear() 取得4位数的年份（如2007而非仅07）
	getMonth()    返回日期中的月份，其中0表示一月， 11表示十二月 
	getDate()     返回日期月份中的天数（1到31）
	getDay()      返回日期中星期的星期几（其中0表示星期日， 6表示星期六）
	getHours()    返回日期中的小时数（0到23）
	getMinutes()  返回日期中的分钟数（0到59）
	getSeconds()  返回日期中的秒数（0到59）

上述方法还都有对应的set方法（如：setMonth(月份)），此处不再赘述。  

**<font color="blue">3.4 RegExp类型</font>**    
ECMAScript 通过 RegExp 类型来支持正则表达式。  
**A)创建正则表达式** ：<font color="red">通过使用字面量形式</font> 

	var expression = / pattern / flags   
一个正则表达式就是一个模式与上述 3 个标志的组合体。每个正则表达式都可带有一或多个标志（flags）：  

	g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
	i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
	m：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项

模式中使用的所有元字符都必须转义，正则表达式中的元字符包括：  

	( [ { \ ^ $ | ) ? * + .]}

**B)创建正则表达式** ：<font color="red">通过使用RegExp构造函数</font>    
它接收两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。使用字面量定义的任何表达式，都可以使用构造函数来定义：

	//匹配第一个"bat"或"cat"，不区分大小写
	var pattern1 = /[bc]at/i;
	
	//与 pattern1 相同，只不过是使用构造函数创建的
	var pattern2 = new RegExp("[bc]at", "i"); 

因为RegExp构造函数接收的两个参数都是字符串，所有元字符都必须双重转义（`\`在正则表达式字符串中就变成`\\\\`）

在ECMA3中，正则表达式字面量始终会共享同一个 RegExp 实例，而使用构造函数创建的实例则每次都是新的；  

	var re = null,i;
	for (i=0; i < 10; i++){
		re = /cat/g;
		console.log(re.test("catastrophe"));
        //ECMA3下只打印出1次true，因为第一次调用 test()找到了"cat"，
        //但第二次调用因为共享一个实例，则从上一次匹配的末尾开始的，故无法再次匹配
	}
	for (i=0; i < 10; i++){
		re = new RegExp("cat", "g");
		re.test("catastrophe");
       //ECMA3下，构造函数方式则不共享实例，每次都会新创建，将打印出10次true
	}
ECMA5已经重新进行了修正，两种方式下均每次都创建新的实例；

**C)RegExp实例属性（用处不大）**   
1. global：布尔值，表示是否设置了 g 标志。  
2. ignoreCase：布尔值，表示是否设置了 i 标志。  
3. lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。  
4. multiline：布尔值，表示是否设置了 m 标志。  
5. source：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回  

**D)RegExp实例方法** ：  
<font color="red">1.exec()</font>   
**参数**：即要应用正则匹配的字符串；   
**返回值**： 包含第一个匹配项信息的数组（为空返回null）  

	该数组虽然是Array的实例，但包含两个额外的属性： 
	index：表示匹配项在字符串中的位置   
	input：表示应用正则表达式的字符串。      
	
	返回数组第一项是与整个模式匹配的字符串；
    其他项是与模式中的捕获组匹配的字符串（若无捕获组，则该数组只包含一项）

对于exec()方法，在模式中是否设置全局标志（g）,在多次调用时是有差别的；  

	var text = "cat, bat, sat, fat";
	// 非全局模式 第1次执行exec()
	var pattern1 = /.at/;
	var matches = pattern1.exec(text);
	alert(matches.index); //0
	alert(matches[0]); //cat
	alert(pattern1.lastIndex); //0
    // 非全局模式 第2次执行exec()
	matches = pattern1.exec(text);
	alert(matches.index); //0
	alert(matches[0]); //cat
	alert(pattern1.lastIndex); //0 lastIndex始终不会变化

    // 全局模式 第1次执行exec()
	var pattern2 = /.at/g;
	var matches = pattern2.exec(text);
	alert(matches.index); //0
	alert(matches[0]); //cat
	alert(pattern2.lastIndex); //3  
	// 全局模式 第2次执行exec()
	matches = pattern2.exec(text);
	alert(matches.index); //5
	alert(matches[0]); //bat
	alert(pattern2.lastIndex); //8 lastIndex变化，说明每次执行位置是不同的
<font color="red">2.test()</font>   
**参数**：即要应用正则匹配的字符串；   
**返回值**：true/false,用于检测目标字符串与某个模式是否匹配；  

	var text = "000-00-0000";
	var pattern = /\d{3}-\d{2}-\d{4}/;
	if (pattern.test(text)){
	alert("The pattern was matched.");
	}

3.toLocaleString()和 toString()方法  
返回正则表达式的字面量，与创建正则表达式的方式无关。

	var pattern = new RegExp("\\[bc\\]at", "gi");
	alert(pattern.toString()); // /\[bc\]at/gi
	alert(pattern.toLocaleString()); // /\[bc\]at/gi  

4.valueOf()方法：返回正则表达式本身；  

**E)** RegExp构造函数的属性（注意与上面的RegExp实例属性区分） 
   
	input        $_  最近一次要匹配的字符串。 Opera未实现此属性
	lastMatch    $&  最近一次的匹配项。 Opera未实现此属性
	lastParen    $+  最近一次匹配的捕获组。 Opera未实现此属性
	leftContext  $`  input字符串中lastMatch之前的文本
	multiline    $*  布尔值，表示是否所有表达式都使用多行模式。 IE和Opera未实现此属性
	rightContext $'  Input字符串中lastMatch之后的文本
  
**<font color="blue">3.5 Function类型</font>**   
**A) 函数的创建**   

	//方式1：
	function sum (num1, num2) {
	return num1 + num2;
	}

	//方式2：	
	var sum = function(num1, num2){
	return num1 + num2;
	};

	//方式3： （函数是对象，函数名是指针）
	var sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
Function构造函数可以接收任意数量的参数，最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。   

**B) 函数不会重载的原因** ：

	function fn(num){
	  return num + 100;
	}
	function fn(num) {
	  return num + 200;
	}
	var result = fn(100); //300

等价于：

	var fn=function(num){
	  return num + 100;
	}
	fn=function(num) {
	  return num + 200;
	}
	var result = fn(100); //300  
我们创建第二个函数时，实际上覆盖了引用第一个函数的变量fn。所以，JS中函数不会重载

**C)** **函数声明和函数表达式**：  
解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

**D)** **作为值的函数**  
函数名本身就是变量，所以函数也可以作为值来使用，可以将函数按参数进行传递，同时将一个函数作为另一个函数的值来返回：

	function callSomeFunction(someFunction, someArgument){
		return someFunction(someArgument);
	}
    function add10(num){
		return num + 10;
	}
	var result1 = callSomeFunction(add10, 10);
	alert(result1); //20

<font color="red" size="2">注：访问函数的指针而不执行函数的话，必须去掉函数名后面的那对圆括号</font>  

**E)** **函数内部属性**  
在函数内部，有两个特殊的对象：arguments 和this，还有一个ECMA5规范的属性caller。  
<font color="red">1.arguments</font>  
其主要用途是保存函数参数(前面已经介绍)，但这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments 对象的函数。  

	function factorial(num){
		if (num <=1) {
			return 1;
		} else {
			return num * factorial(num-1)
		}
	}
对于上述递归调用的函数，函数的执行与函数名factorial紧紧耦合在了一起，为了解决这种耦合，就用到了callee属性：

	function factorial(num){
		if (num <=1) {
			return 1;
		} else {
			return num * arguements.callee(num-1)//消除递归调用函数名的耦合关系
		}
	}
<font color="red">2.this</font>    
引用的是函数据以执行的环境对象——或者也可以说是this值  

<font color="red">3.caller</font>（Opera 9.6以下不支持）    
这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为null。

	function outer(){
		inner();
	}
	function inner(){
		console.log(inner.caller);
      //console.log(arguements.callee.caller); 解决函数名的耦合
	}
	outer(); //输出function outer(){inner();}
 

**F)** **函数的属性和方法**  
每个函数都包含两个属性：length 和prototype。  
<font color="red">1.length属性 </font>：表示函数希望接收的命名参数的个数。  

<font color="red">2.prototype属性（重点） </font>：保存了ECMAScript 中引用类型的所有实例方法（诸如toString()和valueOf()等方法实际上都保存在prototype 名下）。  

ECMA5中，prototype 属性是不可枚举的，因此使用for-in 无法发现。


**<font color="blue">3.6 基本包装类型</font>**   
>为了便于操作基本类型值，ECMAScript 还提供了3 个特殊的引用类型：Boolean、Number 和
String。 

s  
**A)** 

**B)** 

**<font color="blue">3.7 单体内置对象</font>**   
**A)** 

**B)** 



<font color="red"></font>
<font color="red"></font>
<font color="red"></font>


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   

**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 

**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 

**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 


**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)** 
</font>  
******

