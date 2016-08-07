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

**<font size="5" color="red" >三. DOM</font>**  
DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口），描述了处理网页内容的方法和接口。DOM本身是与语言无关的API。
   
**<font color="blue">3.1 节点</font>**   

**A) Node类型**  

1. JavaScript 中的所有节点类型都继承自Node 类型，因此所有节点类型都共享着相同的基本属性和方法。DOM中最基本的节点类型就是Node。
2. nodeType 属性:  
每个节点都有一个nodeType 属性，用于表明节点的类型，共有12种，其值由12个数值常量来表示（1,2,3...,12）
3. nodeName 属性：对于元素节点, nodeName 中保存的始终都是元素的标签名； 
4. nodeValue 属性： 对于元素节点, nodeType 的值始终为空； 

		var ohed=document.getElementById("head");
		console.log(ohed.nodeType)//1
		console.log(ohed.nodeName)//DIV
		console.log(ohed.nodeValue)//Null

5. childNodes 属性 : 表明节点元素中的所有兄弟节点（会把回车也算进去），每个节点均有，其中保存着一个NodeList 对象和length属性；childNodes 列表中的每个节点相互之间都是同胞节点。通过使用列表中每个节点的previousSibling和nextSibling 属性，可以访问同一列表中的其他节点。
6. parentNode 属性 ： 指向文档树中的父节点。

		var oul=document.getElementById('ul1');//一个包含4个li的ul标签
		console.log(oul.childNodes.length);
		console.log(oul.childNodes[2].previousSibling.innerHTML);//2222
		
		var oli=document.getElementById("li1");
		console.log(oli.parentNode.nodeName);//ul
		
		console.log(oli.parentNode.firstChild);//<li>1111</li>
7. firstChild和lastChild属性：父节点的第一个子节点和最后一个子节点，每个节点均有该属性。并且：  

		someNode.firstChild === someNode.childNodes[0]; 
       	someNode.lastChild === someNode.childNodes.[someNode.childNodes.length-1]。

8. ownerDocument属性：直接访问文档节点
9. hasChildNodes()方法： 这个方法在节点包含一或多个子节点的情况下返回true；这是比查询childNodes列表的length 属性更简单的方法。

		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.childNodes.length);//4,前提是html中不含回车符号，否者回车也算节点
		console.log(aLi[0].parentNode);//返回整个ul的dom结构
		console.log(aLi[0].parentNode.firstChild);//<li>1111</li>
		console.log(oUl.childNodes[2].previousSibling);//<li>2222</li>
		console.log(oUl.childNodes[2].ownerDocument);//整个document结构
		console.log(oUl.hasChildNodes());//true

10. appendChild()方法：向末尾添加节点；向childNodes列表的末尾添加（多数情况为移动）一个节点；  

		var oUl=document.getElementById('ul1');
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.appendChild(aLi[0]));//<li>1111</li>
        //因为任何DOM节点也不能同时出现在文档中的多个位置上。所以运行结果是1111节点移动到末尾

11. insertBefore()方法：向特定位置添加节点；向childNodes列表的任意位置添加（多数情况为移动）一个节点；接受两个参数：（要插入的节点，要替换的节点）。

		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.insertBefore(aLi[2],aLi[0]));//<li>3333</li>
        //aLi[2]节点替换在了aLi[0]的位置，aLi[0]并不会被移出,只发生顺延。
上述两个方法只是移动节点，并不会删除节点，下面介绍两个删除节点的方法：
12. replaceChild()方法： 将某个节点替换到特定位置；接受两个参数：（要插入的节点，要替换的节点）。与insertBefore()相同，只是被替换的节点将被移出文档树； 
  
		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.replaceChild(aLi[2],aLi[0]));//<li>1111</li>
        //aLi[2]节点替换aLi[2]节点替换在了aLi[0]的位置，aLi[0]被移出；
13. removeChild()方法：删除某个节点；

14. cloneNode()方法：节点克隆；克隆一个现有节点，需要开发者进一步操作才会被添加到文档中；接受一个布尔参数，true:表示深复制（复制节点和节点树）；false:表示浅复制（只复制节点）

15. normalize()方法：所有文本节点合并成一个节点；参见文本类型；

**B) Document类型**    
在浏览器中，document对象就表示整个HTML页面，因为document对象是window对象的一个属性，所以可以把他当做全局对象来访问。 
 
1. 两个内置属性：下面两个属性所有浏览器均支持；   
**document.documentElement**：指向文档的<html\>元素；也可以通过document.childNodes来访问，但存在一定兼容性，有些浏览器会将文档声明也放在document.childNodes中。      
**document.body**：指向<body\>元素；

2. doctype属性：获取文档声明，各个浏览器下有差别  
 
		IE8 及之前版本：如果存在文档类型声明，会将其错误地解释为一个注释并把它当作Comment节点；而document.doctype 的值始终为null。
		IE9+及Firefox：如果存在文档类型声明，则将其作为文档的第一个子节点；document.doctype是一个DocumentType 节点，也可以通过document.firstChild 或document.childNodes[0]访问同一个节点。
		Safari、Chrome 和Opera：如果存在文档类型声明，则将其解析，但不作为文档的子节点。document.doctype 是一个DocumentType 节点，但该节点不会出现在document.childNodes 中（实测会出现在document.childNodes[0]中）。 
3. document.title属性：获取文档的title标题。  

4. document.domain属性：获取页面的域名；可用于解决跨域；

5. document.URL属性：获取当前页面url；

6. document.reffer属性：获取链接到当前页面的那个页面的URL，有时候会为空字符串；

7. 查找元素的方法：  

		getElementById()；
		
		getElementByTagName()；
		
		getElementsByName()：返回带有给定name 特性的所有元素。  
 
8. 特殊的集合属性：  

		document.anchors，包含文档中所有带name 特性的<a>元素；
		document.applets，包含文档中所有的<applet>元素，因为不再推荐使用<applet>元素，所以这个集合已经不建议使用了；
		document.forms，包含文档中所有的<form>元素，与document.getElementsByTagName("form")得到的结果相同；
		document.images，包含文档中所有的<img>元素，与document.getElementsByTagName("img")得到的结果相同；
		document.links，包含文档中所有带href 特性的<a>元素

9. DOM一致性检测方法  
document.implementation 属性提供了相应信息和功能，用于检测浏览器实现了DOM的哪些部分。通过该对象下的hasFeature()方法，其接受两个参数：（要检测的DOM功能的名称，版本号）  

		var hasXmlDom = document.implementation.hasFeature("XML", "1.0");//返回true或false;
但是容易被浏览器厂商改写，结果不一定准备。

10. 文档写入功能：将输出流写入到网页中的四个方法。 

		write()：原样写入
		writeln():在字符串的末尾添加一个换行符（\n）
		open()：打开网页的输出流
		close()：关闭网页的输出流
一个小例子：  

		var new_doc = document.open("text/html","replace");
	    var txt = "<html><body>这是新的文档</body></html>";
	    new_doc.write(txt);
	    new_doc.close();  
对于那些按照application/xml+xhtml内容类型提供的页面(譬如：百度)，这四个方法都无效。  

**C) Element类型**   
除了Document 类型之外，Element 类型就要算是Web 编程中最常用的类型了。  
<font size="3">补充：关于节点和元素:  

	根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：  
	整个文档是一个文档节点  
	每个 HTML 元素是元素节点  
	HTML 元素内的文本是文本节点  
	每个 HTML 属性是属性节点  
	注释是注释节点  
</font>  

1. 元素的标签名，可以使用nodeName 属性，也可以使用tagName 属性；  

		var div = document.getElementById("myDiv");
		alert(div.tagName); //"DIV"。在HTML 中，标签名始终都以全部大写表示。
		alert(div.tagName == div.nodeName); //true
2. HTML元素的常用属性：  

		id，元素在文档中的唯一标识符。
	    title，有关元素的附加说明信息，一般通过工具提示条显示出来。
	    lang，元素内容的语言代码，很少使用。
		dir，语言的方向，值为"ltr"（left-to-right，从左至右）或"rtl"（right-to-left，从右至左），也很少使用。
		className，即为元素指定的CSS类。没有将这个属性命名为class，是因为class 是ECMAScript 的保留字
3. 获取HTML元素属性的方法：getAttribute()；

		<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
		
		var div = document.getElementById("myDiv");

		console.log(div.id); //"myDiv""
		console.log(div.className); //"bd"，通过属性className访问；
		
		console.log(div.getAttribute("id")); //"myDiv"
		console.log(div.getAttribute("class")); //"bd",注意这与直接通过对象属性访问不同。
属性的名称是不区分大小写的，也可以通过getAttribute()获得自定义属性（直接通过 `对象.自定义属性` 的方式有些浏览器获取不到）。同时，根据HTML5 规范，自定义特性应该加上data-前缀以便验证。

	还有两中特殊的html属性获取：

		style属性： 通过getAttribute()访问，返回的style特性值中包含的是CSS文本，而通过属性来访问它则会返回一个对象。
		
		onclick等事件处理程序属性： 通过getAttribute()访问，则会返回相应代码的字符串。而在访问onclick 属性时，则会返回一个Js 函数（若无，则返回null）  
由于存在这些差别，在通过Jst 以编程方式操作DOM 时，开发人员经常不使用getAttribute()，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用getAttribute()方法。
4. 设置HTML元素属性的方法：setAttribute()；接受两个参数：（要设置的特性名，特性值）；如果该特性名已存在，则覆盖，否则，添加； 通过这个方法设置的特性名会被统一转换为小写形式。  
也可以通过属性复制的方式设置：  

		div.id = "someOtherId";
		div.mycolor = "red";
		console.log(div.getAttribute("id")); //someOtherId
		console.log(div.getAttribute("mycolor")); //null（IE 除外）
可以看到通过属性复制的方法，对于自定义属性我们无法通过getAttribute()获得，但固有属性却可以；
5. 删除HTML元素属性的方法：removeAttribute()； 

6. HTML元素的attributes 属性：Element 类型是使用attributes 属性的唯一一个DOM 节点类型。  
attributes 属性中包含一系列节点，每个节点对象有两个属性：nodeName（属性名），和nodeValue（属性值）。要取得元素的id 特性，可以使用以下代码：

		var id = element.attributes.getNamedItem("id").nodeValue;//方式1
		var id = element.attributes["id"].nodeValue;//方式2
attributes 属性中的每一个对象还有如下方法（存在兼容性）：

		getNamedItem(name)：返回nodeName 属性等于name 的节点；
		removeNamedItem(name)：从列表中移除nodeName 属性等于name 的节点；
		setNamedItem(node)：向列表中添加节点，以节点的nodeName 属性为索引；
		item(pos)：返回位于数字pos 位置处的节点。
7. 创建HTML元素   
createElement()方法可以创建新元素。只接受一个参数：即要创建元
素的标签名（不区分大小写）。

		var div = document.createElement("div");
		div.id = "myNewDiv";
		div.className = "box";
		//在添加到Dom树之前可以添加各种属性，浏览器不会渲染
		document.body.appendChild(div);
IE7以前版本还支持如下写法（现代浏览器均不支持）：  

		var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >");       
8. 元素子节点解析差异：  
上面例子提到过元素的childNodes 属性在有些浏览器下会解析回车和空白（解析为文本节点），因此遍历元素的childNodes 属性前，通常都要先检查一下nodeTpye 属性，如下所示：  

		var oUl=document.getElementById('ul1');
   		for (var i=0, len=oUl.childNodes.length; i < len; i++){
			if (oUl.childNodes[i].nodeType == 1){ //空白和回车noteType=3
				//执行某些操作
			} 
		}



**D) Text类型**   
文本节点由Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的
HTML 字符，但不能包含HTML 代码。正常情况下每个元素只有一个文本子节点。

1. 创建文本节点：document.createTextNode()  
该方法接受一个参数——要插入节点中的文本。

		var textNode = document.createTextNode("<strong>Hello</strong> world!");
会被转义，按照字符输出，标签不会被html解析；  

2. 规范文本节点：normalize()方法（见node类型）   
将所有文本节点合并成一个节点，结果节点的nodeValue 等于将合并前每个文本节点的nodeValue 值拼接起来的值。   
3. 分割文本节点：：splitText()。将一个文本节点分成两个文本节点，与normalize()方法相反。  

 
**E) Comment类型**  
注释在DOM中是通过Comment类型来表示的。

**F) CDATAAection类型**   
CDATASection 类型只针对基于XML 的文档，表示的是CDATA 区域。  

**G) DocumentType类型**   
文档声明类型

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
**H) DocumentFragment类型**   
DocumentFragment 在文档中没有对应的标记。通常把它作为一个“仓库”来使用，可以在里面保存将
来可能会添加到文档中的节点。可以使用document.createDocumentFragment()方法创建：

	var fragment = document.createDocumentFragment();

**I) Attr类型**   
元素的特性在DOM 中以Attr 类型来表示。特性就是存在于元素的attributes 属性中的节点。
 
**<font color="blue">3.2 DOM操作</font>**  

1. 动态添加js的两种方式：  

		//方法1： 
		function loadScript(url){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			document.body.appendChild(script);
		}
		//方法1调用
		loadScript("client.js");
		
		//方法2
		function loadScriptString(code){
			var script = document.createElement("script");
			script.type = "text/javascript";
			try {
				script.appendChild(document.createTextNode(code));
			} catch (ex){
				script.text = code;
			}
			document.body.appendChild(script);
		}
		//方法2调用
		loadScriptString("function sayHi(){alert('hi');}");

2. 动态添加css的两种方式

		//方式1 
		function loadStyles(url){
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = url;
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(link);
		}
		//调用方式1
		loadStyles("styles.css");
		
		//方式2
		function loadStyleString(css){
			var style = document.createElement("style");
			style.type = "text/css";
			try{
				style.appendChild(document.createTextNode(css));
			} catch (ex){
				style.styleSheet.cssText = css;
			}
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(style);
		}
		//调用方式2
		loadStyleString("body{background-color:red}");
3. 使用NodeList  
NodeList 对象都是“动态的”，这就意味着每次访问NodeList 对象，都会运行一次查询。有鉴于此，最好的办法就是尽量减少DOM操作。同时可以考虑将从NodeList 中取得的值缓存起来。


**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   
**<font size="5" color="red" >四. BOM</font>**  
BOM是指浏览器对象模型。描述了与浏览器进行交互的方法和接口。BOM 提供了很多对象，用于访问浏览器的功能。H5中已经规范了BOM的主要内容。  

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

**E) 导航和打开窗口**        
window.open()：接收4 个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览
器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情
况下使用。

	var wroxWin=window.open("http://www.w3school.com.cn","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");

    wroxWin.close();//关闭通过open打开的窗口
  
**F) 间歇调用和超时调用**   

1. setTimeout() 

		//设置超时调用
		var timeoutId = setTimeout(function() {
		alert("Hello world!");
		}, 1000);
		//注意：把它取消
		clearTimeout(timeoutId);

2. setInterval()    

		var timer=null;
		clearInterval(timer);
		timer=setInterval (function() {
		alert("Hello world!");
		}, 10000);
 
**G) 系统对话框**      

1. alert(字符串)   
显示一个系统对话框，其中包含指定的文本和一个OK（"确定"）按钮

2. confirm(字符串)   
对话框除了显示OK 按钮外，还会显示一个Cancel（"取消"）按钮   
![](http://i.imgur.com/wFUjq4z.jpg)

3. prompt(字符串，默认文本值)  
prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）。  
![](http://i.imgur.com/b2PTWuq.jpg)

**H) windows对象下的方法**  
resizeTo()和resizeBy()：调整浏览器窗口的大小，接受两个参数：  

		//调整到100×100
		window.resizeTo(100, 100);
		//调整到200×150
		window.resizeBy(100, 50);
		//调整到 300×300
		window.resizeTo(300, 300);  
但在高版本浏览器中，两个方法基本都已经无效；

**<font color="blue">3.2 location 对象</font>**   
location 是最有用的BOM对象之一。location 对象既是window对象的属性，也是document对象的属性。  
**A) 属性** 

	属 性 名 		例 子					说 明
	hash 		"#contents" 			返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，则返回空字符串
	host 		"www.wrox.com:80" 		返回服务器名称和端口号（如果有）
	hostname 	"www.wrox.com" 			返回不带端口号的服务器名称
	href 		"http:/www.wrox.com" 	返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值
	pathname 	"/WileyCDA/" 			返回URL中的目录和（或）文件名
	port 		"8080"					返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串
	protocol 	"http:"					返回页面使用的协议。通常是http:或https:
	search 		"?q=javascript" 		返回URL的查询字符串。这个字符串以问号开头  


**B) 方法**  
   
1. assign() : 打开新URL 并在浏览器的历史记录中生成一条记录。  
		
		location.assign("http://www.wrox.com");
		window.location = "http://www.wrox.com";
		location.href = "http://www.wrox.com";
		//此3种方法均可打开一个地址,效果都一样；
另外，修改location 对象的其他属性也可以改变当前加载的页面：

		//假设初始URL 为http://www.wrox.com/WileyCDA/
		//将URL 修改为"http://www.wrox.com/WileyCDA/#section1"
		location.hash = "#section1";
		//将URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"
		location.search = "?q=javascript";
		//将URL 修改为"http://www.yahoo.com/WileyCDA/"
		location.hostname = "www.yahoo.com";
		//将URL 修改为"http://www.yahoo.com/mydir/"
		location.pathname = "mydir";
		//将URL 修改为"http://www.yahoo.com:8080/WileyCDA/"
		location.port = 8080;
每次修改location 的属性（hash 除外），页面都会以新URL 重新加载，并产生历史记录（可通过前进后退按钮来切换页面）。
2. replace()：同assign()相同，只是不会产生历史记录；  
3. reload() ： 重新加载页面；

		location.reload(); //重新加载（有可能从缓存中加载）
		location.reload(true); //重新加载（从服务器重新加载）

**<font color="blue">3.3 navigator 对象</font>**   
navigator 对象的属性通常用于检测显示网页的浏览器类型

**<font color="blue">3.4 screen 对象</font>**  
该对象在编程中用处不大； 

**<font color="blue">3.5 history 对象</font>**    
history 对象保存着用户上网的历史记录。     
**A) 属性**   
length 属性：保存着历史记录的数量

**B) 方法**   
出于安全方面的考虑，开发人员无法得知用户浏览过的URL，但可以通过前进后退方法访问用户浏览过的页面；

1. go() : 可以在用户的历史记录中任意跳转，前进或者后退。该方法接收一个参数。
		
		//参数为负数，后退一页
		history.go(-1);
		//参数为正数，前进一页
		history.go(1);
		//参数为正2，前进两页
		history.go(2); 
		//跳转到最近的包含"wrox.com"字符的页面，若无，则什么都不做；
		history.go("wrox.com");
2. back()和forward()：这两个方法可以模仿浏览器的"后退"和"前进"按钮。  

		//后退一页
		history.back();
		//前进一页
		history.forward();

**<font size="5" color="red" >五. 浏览器检测</font>**

 
**<font color="blue">5.1 能力检测</font>**  
通过确定浏览器支持特定的能力，来给出解决方案，推荐！。   
在可能的情况下，要尽量使用typeof 进行能力检测。 

**<font color="blue">5.2 怪癖检测</font>**  
怪癖检测（quirks detection）的目标是识别浏览器的特殊行为（bug）,它无法怪癖检测无法精确地检测特定的浏览器和版本。  

**<font color="blue">5.3 用户代理检测</font>**  
通过检测用户代理字符串（navigator.userAgent）来识别浏览器，但这最好作为第三个选择，因为一些历史原因浏览器厂商会在用户代理字符串中添加一些欺骗性信息，导致该字符串信息不一定准确。   

</font>  
******

