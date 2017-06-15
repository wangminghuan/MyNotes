<font face="微软雅黑" size="4" >
<font size="6">JS权威指南笔记</font>


## 1  一级标题

### 1.1 二级标题 

#### 1.1.1 三级标题

1. 列表1

2. 列表2

## 2  一级标题

### 1.1 二级标题 

#### 1.1.1 三级标题

1. 列表1

2. 列表2

*******

#### 日期
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

*****
## 3  第三章 类型，值，变量
### 3.1 概述
1. js按数据类型可以分为原始类型和对象类型，原始类型（string,number,Boolean,null,undefined）的值都是不可修改的，对象类型（obj/arr等）的属于可变类型
2. 任何不在函数内部的声明的变量都是全局变量，其他为局部变量
3. 
### 3.2 原始数据类型
#### 字符串
1. 双引号或单引号括起来的字符序列
#### 数字

1. js不区分整数数值和浮点数值，所有数字都是用浮点值来表示的。
2. ECMAScript标准支持十六进制，不支持八进制，而有些浏览器是支持八进制的。在严格模式下八进制是无效。
3. 被0整除，js不会报错，而是返回Infinity
4. NaN 与任何值都不相等，包含他自身，通过`isNaN()`函数来判断
5. js采用IEEE-754浮点数表示法，是二进制表示法，可以很好表示，1/8, 1/1024等，但不能精确表示诸如：1/100, 1/1000等，建议换算成整数再计算

#### Boolean
1. 只有两个值，是保留字：true 和 false
#### null && undefined
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

#### 全局对象
1. 全局属性：undefined, Infinity, NaN
2. 全局函数：isNaN(), parseInt(),eval()
3. 构造函数：Date(), RegExp(), String(), Object(), Array()
4. 全局对象：Math, JSON
5. window对象的有一个window属性指向自身：window.window===window（其实，测试发现可以挂载无数个window属性....）

#### 包装对象
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

#### 值的可变与不可变

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

#### 变量作用域
1. 函数体内局部变量优先级高于同名的全局变量，全局变量可以被函数体内同名变量覆盖。

#### 函数作用域&&提前声明

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


#### 作为属性的全局变量

1. ECMAScript规范中强制规定：js全局变量是全局对象的属性。
2. 通过给未声明变量赋值创建的全局变量，可以通过delect语句删除

#### 作用域链

1. 当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。

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

#### 延长作用域链
1. try-catch 语句的 catch 块；
2. with 语句。
#### 1.1.1 三级标题

1. 列表1

2. 列表2

## 客户端的javaScript

### window对象
#### 计时器 
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
#### location
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

#### history
window对象下的history属性引用的是History对象

包含的属性和方法（为了防止浏览信息被窃取，历史记录的url是不可读的）

1. history.length：当前历史列表中的历史记录数（IE6+是从0开始的，其他的是从1开始的）；
2. history.go(n)：前进或后退n条记录，当n=0或空时会刷新当前页；
3. history.back()：后退一步；
4. history.forward()：前进一步;
5. html5新增的api请参见[HTML5之五--历史管理.md](https://github.com/wangminghuan/MyNotes/blob/master/HTML/HTML5%E4%B9%8B%E4%BA%94--%E5%8E%86%E5%8F%B2%E7%AE%A1%E7%90%86.md)

#### navigator
window对象下的navigator属性引用的是包含浏览器厂商和版本信息的Navigator对象。
该对象下有多个属性，不过因为兼容性问题，一般常用的只有userAgent属性。

#### screen
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

#### 对话框
1. alert()
2. confirm():展示含有确定跟取消两个按钮的弹窗

		var result=confirm("今天是星期天吗");
		result?console.log("yes"):console.log("no");//点击确定或取消后会返回true或false
3. prompt(): 展示的是含有确定跟取消两个按钮，同时有一个输入框的弹窗

		var val=prompt();
		console.log("你刚才输入的是："+val)//点击确定返回输入内容，点击取消返回null

三个方法均会阻塞代码执行。
#### onerror
早期遗物，可以忽略，基本不会使用，可以用try/catch异常处理语句来替代。
#### open/close方法
1. window.open();//打开一个新窗口，接受一个url字符串，可以是相对地址或相对协议
2. window.close();//chrome下只有通过open打开的窗口才可以通过close关闭，否则无效
#### 1.1.1 三级标题

1. 列表1

2. 列表2

##  参考文献



