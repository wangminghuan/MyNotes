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

5. childNodes 属性 : 表明节点元素中的所有兄弟节点（会把回车也算进去），每个节点均有，其中保存着一个NodeList 对象和length属性；childNodes 列表中的每个节点相互之间都是同胞节点。通过使用列表中每个节点的previousSibling和nextSibling 属性，可以访问同一列表中的其他节点。我们可以通过方括号或者item()来访问保存在 NodeList 中的节点：

		var firstChild = someNode.childNodes[0];
		var secondChild = someNode.childNodes.item(1);
		var count = someNode.childNodes.length;
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


**<font color="blue">3.3 DOM扩展之新增选择符</font>**    
Selectors API（www.w3.org/TR/selectors-api/）是由 W3C 发起制定的一个标准，致力于让浏览器原生支持 CSS 查询。目前已完全支持 Selectors API Level 1
的浏览器有 IE 8+、 Firefox 3.5+、 Safari 3.1+、 Chrome 和 Opera 10+。  
**A) querySelector()方法**：选择某个元素 

	//取得 body 元素
	var body = document.querySelector("body");
	//取得 ID 为"myDiv"的元素
	var myDiv = document.querySelector("#myDiv");
	//取得类为"selected"的第一个元素
	var selected = document.querySelector(".selected");
	//取得类为"button"的第一个图像元素
	var img = document.body.querySelector("img.button");
**B) querySelectorAll()方法**：选择一组元素   

	//取得某<div>中的所有<em>元素（类似于 getElementsByTagName("em")）
	var ems = document.getElementById("myDiv").querySelectorAll("em");
	//取得类为"selected"的所有元素
	var selecteds = document.querySelectorAll(".selected");
	//取得所有<p>元素中的所有<strong>元素
	var strongs = document.querySelectorAll("p strong");


**C）matchesSelector()方法**  
Level 2 规范为 Element 类型新增的一个方法，目前支持的浏览器不是很多，参见 [Can I Use:matchesSelector](http://caniuse.com/#search=matchesSelector)。

接收一个参数，即 CSS 选择符，如果调用元素与该选择符匹配，返回 true；否则，返回 false。

	if (document.body.matchesSelector("body.page1")){
	//true
	}
**<font color="blue">3.4 DOM扩展之元素遍历</font>**     
对于元素间的空格， IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这就导致了在使用 childNodes 和 firstChild 等属性时的行为不一致。Element Traversal 规范（www.w3.org/TR/ElementTraversal/）新定义了一组属性。 

Element Traversal API 为 DOM 元素添加了以下 5 个属性。  

		childElementCount：返回子元素（不包括文本节点和注释）的个数。
		firstElementChild：指向第一个子元素； firstChild 的元素版。
		lastElementChild：指向最后一个子元素； lastChild 的元素版。
		previousElementSibling：指向前一个同辈元素； previousSibling 的元素版。
		nextElementSibling：指向后一个同辈元素； nextSibling 的元素版。
通过新增的 DOM 属性，可以不必担心空白文本节点，从而可以更方便的查找元素了。  
支持 Element Traversal 规范的浏览器有 IE 9+、 Firefox 3.5+、 Safari 4+、 Chrome 和 Opera 10+。

**<font color="blue">3.5 DOM扩展之H5规范新增</font>**   
**A) getElementsByClassName()方法**：返回一组特定class的元素；支持的浏览器有 IE 9+、 Firefox 3+、 Safari 3.1+、 Chrome 和Opera 9.5+。 

**B) classList 属性**   

1. className 中是一个字符串，如果只修改字符串一部分，也必须设置整个字符串的值，譬如：  

		<div class="bd user disabled">...</div>
div元素一共有三个类名。要从中删除一个类名，需要将三个类名拆开，删除，然后再拼接。classList 属性可以很好的解决这个问题。 
2. 可以通过 length 属性获取classList的长度，获取得每个元素可以使用 item()方
法，或方括号语法。  
3. classList获取到的对象拥有的方法：

		add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
		contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。
		remove(value)：从列表中删除给定的字符串。
		toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。
4. 支持 classList 属性的浏览器有 Firefox 3.6+和 Chrome  


**C) 焦点管理**   

1. document.activeElement 属性：该属性始终会引用 DOM 中当前获得了焦点的元素。

2. 元素获得焦点的方式有：页面加载、用户输入（通常是通过按 Tab 键）和在代码中调用 focus()方法。  

3. document.hasFocus()方法：用于检测文档是否获得了焦点。

		var button = document.getElementById("myButton");
		button.focus();
		alert(document.activeElement === button); //true
		alert(document.hasFocus(); //true  
4. 实现了这两个属性的浏览器的包括 IE 4+、 Firefox 3+、 Safari 4+、 Chrome 和 Opera 8+。  


**D) HTMLDocument的变化** 

1. readyState 属性 :
Document 的 readyState 属性有两个可能的值：

		loading，正在加载文档；
		complete，已经加载完文档 
指示文档是否已经加载完成：  

		if (document.readyState == "complete"){
		//执行操作
		}
支持 readyState 属性的浏览器有 IE4+、 Firefox 3.6+、 Safari、 Chrome 和 Opera 9+。  

2. compatMode属性: 检测渲染页面的模式是标准的还是混杂的。在标准模式下， document.compatMode 的值等于"CSS1Compat"，而在混杂模式下， document.compatMode 的值等于"BackCompat"。支持浏览器：IE6+, Firefox、 Safari 3.1+、 Opera 和 Chrome。 


3. head属性：作为document.body 引用文档的<body>元素的补充，H5新增了 document.head 属性，用来引用文档的<head>元素。  
支持的浏览器仅有 Chrome 和 Safari 5，下面为兼容写法：  

		var head = document.head || document.getElementsByTagName("head")[0];

**E) 字符集属性**：   

1. charset 属性:表示文档中实际使用的字符集,默认情况下，这个属性的值为"UTF-16"，但可以通过<meta>元素、响应头部或直接设置 charset 属性修改这个值（支持浏览器有IE、 Firefox、 Safari、 Opera 和 Chrome）：

		alert(document.charset); //"UTF-16"
		document.charset = "UTF-8";
2. defaultCharset属性:根据默认浏览器及操作系统的设置，当前文档默认的字符集应该是什么。如果文档没有使用默认的字符集，那 charset 和 defaultCharset 属性的值可能会不一样。支持浏览器：IE、 Safari 和 Chrome。

**F) 自定义数据属性**  
HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-。添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值：

		<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
		
		var div = document.getElementById("myDiv");
		//取得自定义属性的值
		var appId = div.dataset.appId;
		var myName = div.dataset.myname;
		//设置值
		div.dataset.appId = 23456;
		div.dataset.myname = "Michael";
目前主流浏览器均支持；

**F) 插入标记**   

1. innerHTML 属性：读取/写入HTML节点。所有浏览器返回的 innerHTML 值并不完全相同。  

	兼容性：在大多数浏览器中，通过 innerHTML 插入<script\>元素并不会执行其中的脚本。但大多数浏览器（除了IE8及其以下版本）都支持以直观的方式通过 innerHTML 插入<style\>元素。  

	并不是所有元素都支持 innerHTML 属性。不支持的元素有： <col\>、 <colgroup\>、<frameset\>、 <head\>、 <html\>、 <style\>、 <table\>、 <tbody\>、 <thead\>、 <tfoot\>和<tr\>。  

	IE8下有一个window.toStaticHTML()方法，用于处理HTML字符串，将其处理为"无害"版本，再放入DOM树中。 

2. outerHTML 属性：读模式下，返回调用它的元素及所有子节点的HTM标签（包含其自身，注意与innerHTML区别开）；写模式下，根据指定的HTML字符串创建新的DOM子树（会将调用元素自身也覆盖掉，注意与innerHTML区别开）。   
支持 的浏览器有：IE4+、 Safari 4+、 Chrome 和 Opera 8+。 Firefox 7+ 

3. insertAdjacentHTML()方法：    
它接收两个参数：(插入位置, 要插入的HTML文本):

		第一个参数必须是下列值之一：(小写)	
		"beforebegin"，在当前元素之前插入一个紧邻的同辈元素；
		"afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
		"beforeend"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；
		"afterend"，在当前元素之后插入一个紧邻的同辈元素。
		
		第二个参数是一个 HTML 字符串（与 innerHTML 和 outerHTML的值相同）
支持浏览器有 IE、 Firefox 8+、 Safari、 Opera 和 Chrome。

使用上述方法时候注意性能问题。  

**G) scrollIntoView()方法** : 支持性较差。忽略；  

**<font color="blue">3.6 DOM扩展之专有扩展</font>**   
**A) 文档模式** ：  
IE8 引入了一个新的概念叫“文档模式”（document mode）。
要强制浏览器以某种模式渲染页面，可以使用HTTP 头部信息X-UA-Compatible，或通过等价的
<meta>标签来设置：

	<meta http-equiv="X-UA-Compatible" content="IE=IEVersion">
IE 的版本（IEVersion）有以下一些不同的值：  

	Edge：始终以最新的文档模式来渲染页面。忽略文档类型声明。对于IE8，始终保持以IE8 标准模式渲染页面。对于IE9，则以IE9 标准模式渲染页面。
	EmulateIE9：如果有文档类型声明，则以IE9 标准模式渲染页面，否则将文档模式设置为IE5。
	EmulateIE8：如果有文档类型声明，则以IE8 标准模式渲染页面，否则将文档模式设置为IE5。
	EmulateIE7：如果有文档类型声明，则以IE7 标准模式渲染页面，否则将文档模式设置为IE5。
	9：强制以IE9 标准模式渲染页面，忽略文档类型声明。
	8：强制以IE8 标准模式渲染页面，忽略文档类型声明。
	7：强制以IE7 标准模式渲染页面，忽略文档类型声明。
	5：强制将文档模式设置为IE5，忽略文档类型声明。
**B)children属性**   
由于IE9 之前的版本与其他浏览器在处理文本节点中的空白符时有差异。在元素只包含元素子节点时，children 属性与childNodes 没有什么区别。

**E）contains()方法**  
该方法接收一个参数，即要检测的后代节点。调用contains()方法的应该是祖先节点，方法返回true表示后代节点是父节点的子节点；否则，返回false；

	alert(document.documentElement.contains(document.body)); //true
支持contains()方法的浏览器有IE、Firefox 9+、Safari、Opera 和Chrome。  

DOM Level 3 的 `compareDocumentPosition()`也能够确定节点间的关系；  

**F）插入文本**   
 
1. innerText  
innerText属性会过滤掉子节点中所有的HTML标签，只会生成一个子文本节点。  
支持浏览器包括IE4+、Safari 3+、Opera 8+和Chrome。Firefox 虽然不支持innerText，但支持作用类似的textContent 属性。

2. outerText  
除了作用范围扩大到了包含调用它的节点之外，与innerText 基本上没有多大区别。

**<font size="5" color="red" >四. DOM2和DOM3</font>**  
DOM1 级主要定义的是 HTML 和 XML 文档的底层结构。 DOM2 和 DOM3 级则在这个结构
的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。  

DOM2 和 DOM3级分为许多模块（模块之间具有某种关联），分别描述了 DOM 的某个非常具体的子集。这些模块如下。

- DOM2 级核心（DOM Level 2 Core）：在 1 级核心基础上构建，为节点添加了更多方法和属性。
- DOM2 级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图。
- DOM2 级事件（DOM Level 2 Events）：说明了如何使用事件与 DOM 文档交互。
- DOM2 级样式（DOM Level 2 Style）：定义了如何以编程方式来访问和改变 CSS 样式信息。
- DOM2 级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历 DOM 文档和选择其特定部分的新接口。
- DOM2 级 HTML（DOM Level 2 HTML）：在 1 级 HTML 基础上构建，添加了更多属性、方法和新接口。    

**<font color="blue">4.1 DOM 变化</font>**   
**A)** 有了 XML 命名空间，不同 XML 文档的元素就可以混合在一起，共同构成格式良好的文档，而不必担心发生命名冲突。HTML 不支持 XML 命名空间，但 XHTML 支持 XML 命名空间。

**B)** DOM2中增加了许多针对命名空间的属性和方法，用途不大，此处不再详细介绍；  

**C)** 其他方面的变化（框架变化）  
其他变化这里不再介绍，重点讲一下框架的变化：   
DOM1级中，框架和内嵌框架分别用 HTMLFrameElement 和 HTMLIFrameElement 表示，它们在 DOM2 级中都有了一个新属性，名叫 contentDocument。这个属性包含一个指针，指向表示框架内容的文档对象：  

	var iframe = document.getElementById("myIframe");
	var iframeDoc = iframe.contentDocument; //在 IE8 以前的版本中无效

对于IE8以前的版本虽然不支持 contentDocument 属性，但支持一个名叫 contentWindow 的属性，该属性返回框架的 window 对象，该 window 对象又有一个 document 属性。可以做如下兼容：  

	var iframe = document.getElementById("myIframe");
	var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

**<font color="blue">4.2 样式</font>**   

**A) 访问元素样式**   
任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性，该属性包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。  

对于使用短划线（分隔不同的词汇，例如 background-image）的 CSS 属性名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。  

		CSS属性 					JavaScript属性
		background-image 		style.backgroundImage
		color 					style.color
		display 				style.display
		font-family 			style.fontFamily
        float(特殊)             style.cssFloat/style.styleFloat(IE)

1. DOM 样式属性和方法  

		cssText：如前所述，通过它能够访问到 style 特性中的 CSS 代码。
		length：应用给元素的 CSS 属性的数量。
		parentRule：表示 CSS 信息的 CSSRule 对象。后面将讨论 CSSRule 类型。
		getPropertyCSSValue(propertyName)：返回包含给定属性值的 CSSValue 对象。该对象有两个属性： cssText 和 cssValueType。
		getPropertyPriority(propertyName)：如果给定的属性使用了!important 设置，则返回"important"；否则，返回空字符串。
		getPropertyValue(propertyName)：返回给定属性的字符串值(css字符串，如background-image)。
		item(index)：返回给定位置的 CSS 属性的名称。
		removeProperty(propertyName)：从样式中删除给定属性。
		setProperty(propertyName,value,priority)：将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）  
2. 计算的样式  
getComputedStyle()方法。接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如":after"，如不需要可以为nunll）。

		var myDiv = document.getElementById("myDiv");
		var computedStyle = document.defaultView.getComputedStyle(myDiv, null);
		alert(computedStyle.backgroundColor); 
		alert(computedStyle.width); 
		alert(computedStyle.height); 
		alert(computedStyle.border); // 在某些浏览器中会有返回值，因为这是一个综合属性
IE不支持getComputedStyle()方法，但它有一种类似的概念。在 IE 中，每个具有 style 属性的元素还有一个 currentStyle 属性。  

		var myDiv = document.getElementById("myDiv");
		var computedStyle = myDiv.currentStyle; //是属性不是方法，注意！！
		alert(computedStyle.backgroundColor); 
		alert(computedStyle.width);
		alert(computedStyle.height); 
		alert(computedStyle.border); //undefined，IE 也没有返回 border 样式，因为这是一个综合属性。
无论在哪个浏览器中，最重要的一条是要记住所有计算的样式都是只读的；不能修改计算后样式对象中的 CSS 属性！！！

**B) 操作样式表**   

1. CSSStyleSheet对象：表示的是样式表，包括通过<link\>元素包含的样式表和在<style\>元素中定义的样式表。 该对象下还有许多属性，如href,disabled,media等等。

		var sheet = null;
		for (var i=0, len=document.styleSheets.length; i < len; i++){
			sheet = document.styleSheets[i];
			alert(sheet.href);
		}
不同浏览器的 document.styleSheets 返回的样式表也不同。也可以直接通过<link\>或<style\>元素取得 CSSStyleSheet 对象。其有一个sheet属性（IE为
styleSheet 属性）；不同浏览器中都能取得样式表对象，也可以使用下列代码：  

		function getStyleSheet(element){
		return element.sheet || element.styleSheet;
		}
		//取得第一个<link/>元素引入的样式表
		var link = document.getElementsByTagName("link")[0];
		var sheet = getStylesheet(link);
		//这里的 getStyleSheet()返回的样式表对象与document.styleSheets 集合中的样式表对象相同。       


**C) 元素大小**  

**<font color="blue">4.3 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">4.4 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">4.5 二级标题</font>**   
**A)** 

**B)**   

**<font color="blue">4.5 二级标题</font>**   
**A)** 

**B)**   
**<font size="5" color="red" >五. BOM</font>**  
BOM是指浏览器对象模型。描述了与浏览器进行交互的方法和接口。BOM 提供了很多对象，用于访问浏览器的功能。H5中已经规范了BOM的主要内容。  

**<font color="blue">5.1 window对象</font>**  
  
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

**<font color="blue">5.2 location 对象</font>**   
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

**<font color="blue">5.3 navigator 对象</font>**   
navigator 对象的属性通常用于检测显示网页的浏览器类型

**<font color="blue">5.4 screen 对象</font>**  
该对象在编程中用处不大； 

**<font color="blue">5.5 history 对象</font>**    
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

**<font size="5" color="red" >六. 客户端（浏览器）检测</font>**

 
**<font color="blue">6.1 能力检测</font>**  
通过确定浏览器支持特定的能力，来给出解决方案，推荐！。   
在可能的情况下，要尽量使用typeof 进行能力检测。 

**<font color="blue">6.2 怪癖检测</font>**  
怪癖检测（quirks detection）的目标是识别浏览器的特殊行为（bug）,它无法怪癖检测无法精确地检测特定的浏览器和版本。  

**<font color="blue">6.3 用户代理检测</font>**  
通过检测用户代理字符串（navigator.userAgent）来识别浏览器，但这最好作为第三个选择，因为一些历史原因浏览器厂商会在用户代理字符串中添加一些欺骗性信息，导致该字符串信息不一定准确。   

**<font size="5" color="red" >七. 事件</font>**  

**<font color="blue">7.1 事件流</font>**   

事件流描述的是从页面中接收事件的顺序。但有意思的是， IE 和 Netscape 开发团队居然提出了差不多是完全相反的事件流的概念。 IE 的事件流是事件冒泡流，而 Netscape Communicator 的事件流是事件捕获流。  

**A)事件冒泡**    

IE 的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。譬如点击事件click，点击事件会沿 DOM 树向上传播，在每一级节点上都会发生，直至传播到 document 对象。  

所有现代浏览器都支持事件冒泡，但在具体实现上还是有一些差别。

**B)事件捕获**  

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。同样对于点击事件，document 对象首先接收到 click 事件，然后事件沿 DOM 树依次向下，一直传播到事件的实际目标。  

事件捕获是 Netscape Communicator 唯一支持的事件流模型，但 IE9、 Safari、 Chrome、 Opera和 Firefox 目前也都支持这种事件流模型。

**C)DOM事件流**   

"DOM2级事件" 规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。   

IE9、 Opera、 Firefox、 Chrome 和 Safari 都支持 DOM 事件流； IE8 及更早版本不支持 DOM 事件流。  

**<font color="blue">7.2 事件处理程序</font>**

**<font color="blue">7.3 事件对象</font>**

**<font color="blue">7.4 事件类型</font>**

**<font color="blue">7.5 事件流</font>**  


**<font size="5" color="red" >八. 表单</font>**  

**<font color="blue">8.1 基础知识</font>**     

**A) 属性和方法**   
<form\>表单元素属于HTMLFormElement类型，它有自己独有的属性和方法：  

- acceptCharset：服务器能够处理的字符集；等价于 HTML 中的 accept-charset 特性。
- action：接受请求的 URL；等价于 HTML 中的 action 特性。
- elements：表单中所有控件的集合（HTMLCollection）。
- enctype：请求的编码类型；等价于 HTML 中的 enctype 特性。
- length：表单中控件的数量。
- method：要发送的 HTTP 请求类型，通常是"get"或"post"；等价于 HTML 的 method 特性。
- name：表单的名称；等价于 HTML 的 name 特性。
- reset()：将所有表单域重置为默认值。
- submit()：提交表单。
- target：用于发送请求和接收响应的窗口名称；等价于 HTML 的 target 特性。

**B) 获取表单元素**  

1. 通过getElementById()方法获取：

		var form = document.getElementById("form1");

2. 其次，通过 document.forms 可以取得页面中所有的表单。在这个集合中，可以通过数值索引或name值来取得特定的表单：

		var firstForm = document.forms[0]; //取得页面中的第一个表单
		var myForm = document.forms["form2"]; //取得页面中名称为"form2"的表单

**C) 提交表单** 

**D) 重置表单** 

**E) 表单字段** 

**B)** 
**<font color="blue">8.2 文本框脚本</font>**  

**<font color="blue">8.3 选择框脚本</font>**  

**<font color="blue">8.4 表单序列化</font>**  

**<font color="blue">8.5 富文本</font>**  
</font>  
******

