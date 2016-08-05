##<font face="微软雅黑" size="4" >JavaScript高级程序设计阅读笔记-中级部分

**<font size="5" color="red" >一. 面向对象</font>**  
**<font color="blue">1.1 二级标题</font>**   
**A)** 

**B)**  
**<font size="5" color="red" >二. 函数表达式</font>**  
**<font color="blue">2.1 递归</font>**   
递归函数是在一个函数通过名字调用自身的情况下构成的，如下所示。  

		function factorial(num){
			if (num <= 1){
				return 1;
			} else {
				return num * factorial(num-1);
			}
		}
通常会将返回值改为`num * arguments.callee(num-1)`，但严格模式下会报错，所以我们也可以这样改写,在严格模式和非严格模式下都可以运行：  

	var factorial = (function f(num){
		if (num <= 1){
			return 1;
		} else {
			return num * f(num-1);
		}
	});  

**<font color="blue">2.2 闭包</font>**  
详见其他文档  
**A)** 

**B)**  
**<font size="5" color="red" >三. BOM</font>**  
BOM是指浏览器对象模型。BOM 提供了很多对象，用于访问浏览器的功能。H5中已经规范了BOM的主要内容。  

**<font color="blue">3.1 window对象</font>**  
  
**A)** BOM 的核心对象是 window，在浏览器中， window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

**B)** 前面讲过，定义的全局变量其实就是window对象下的属性，但定义全局变量与直接在 window 对象上直接定义属性还有一点差别的：全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。    

		var age = 29;
		window.color = "red";
		//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 false
		delete window.age;
		//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 true
		delete window.color; //returns true 可以删除
		alert(window.age); //29
		alert(window.color); //undefined  

**C) 窗口位置**   
screenLeft 和 screenTop 属性：IE、 Safari、 Opera 和 Chrome支持  

screenX 和 screenY 属性： Firefox，Safari、和 Chrome支持

兼容处理的例子：  

		var leftPos = (typeof window.screenLeft == "number") ?
		window.screenLeft : window.screenX;
		var topPos = (typeof window.screenTop == "number") ?
		window.screenTop : window.screenY;
获得浏览器相对于显示器屏幕左上角的x,y方向距离；但这个值每个浏览器下的值不一致，不建议使用；        

**D) 窗口大小**  

1. 浏览器窗口大小  
outerWidth、 outerHeight：浏览器窗口大小  
innerWidth、 innerHeight：浏览器窗口大小（不含边框）  
区别：outerWidth和innerWidth在浏览器全屏模式下相等，非全屏模式：innerWidth+边框（十几px）=outerWidth。  
兼容：IE8以下不支持，用途不大；

2. 页面视口大小（viewPort）  
`document.documentElement.clientWidth` ，` document.documentElement.clientHeight` ：IE（IE6必须在标准模式下）、 Firefox、 Safari、 Opera 和 Chrome 支持；  
`document.body.clientWidth` ， `document.body.clientHeight`：IE6混杂模式支持；

3. 将上述两条针对各个浏览器做一个兼容处理，来获取视口（viewPort）的大小：（浏览器窗口各个浏览器差异较大，无法兼容处理）  

		var pageWidth = window.innerWidth,
			pageHeight = window.innerHeight;
		if (typeof pageWidth != "number"){
			if (document.compatMode == "CSS1Compat"){
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
				} else {
					pageWidth = document.body.clientWidth;
		k			pageHeight = document.body.clientHeight;
				}
		}

<font size="3">  
对于移动设备情况的补充：<a href="./其他/移动端viewPort.md">移动端viewPort</a>  
</font>
**<font color="blue">3.2 二级标题</font>**   
**A)** 

**B)**  

**<font color="blue">3.3 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">3.4 二级标题</font>**   
**A)** 

**B)**  

**<font color="blue">3.5 二级标题</font>**   
**A)** 

**B)**   

**<font size="5" color="red" >四. DOM</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

