<font face="微软雅黑" size="4" >
<font size="6">DOM相关</font>


## 1 文档模式 

### 1.1 文档模式的引入 
IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（doctype）切换实现的,最初的两种文档模式是： 混杂模式（quirks mode）和标准模式（standards mode）。混杂模式会让 IE 的行为与（包含非标准特性的）IE5 相同，而标准模式则让 IE 的行为更接近标准行为。虽然这两种模式主要影响 CSS内容的呈现，某些情况下会影响js的执行。

### 1.2 文档模式的区分
document 下的compatMode 的属性可以区分浏览器在哪个模式下运行。（目前已经是HTML5的规范了） 

		if (document.compatMode == "CSS1Compat"){
		alert("Standards mode");//标准模式
		} else {
		alert("Quirks mode");//混杂模式，其值其实为BackCompat
		}
### 1.3 不同文档模式下的窗口大小
在 IE、 Firefox、 Safari、 Opera 和 Chrome 中，document.documentElement.clientWidth 和
document.documentElement.clientHeight 中保存了页面视口（可视区域）的信息。在 IE6 中，这些属性必须在标准模式下才有效；混杂模式下，就必须通过 document.body.clientWidth 和 document.body.clientHeight 来取得相同信息。  

而对于混杂模式下的 Chrome，则无论通过 document.documentElement 还是 document.body 中的 clientWidth 和 clientHeight 属性，都可以取得视口的大小。
获取viewport示例：

	function getViewport() {
	    if (document.compatMode == "BackCompat") {
	        return {
	            width: document.body.clientWidth,
	            height: document.body.clientHeight
	        };
	    } else {
	        return {
	            width: document.documentElement.clientWidth,
	            height: document.documentElement.clientHeight
	        };
	    }
	}

## 2 易混淆概念区分


###2.1 offsetHeight/offsetWidth:  
元素在垂直(水平)方向上占用的空间大小，即：height(width)+padding+border

###2.2 offsetLeft/offsetTop  
元素的左(顶部)外边框外边框，至父元素对应内边框之间的距离(获取元素到body的left,需循环)

###2.3 clientHeight/clientWidth  
元素内容区高(宽)度加上下(左右)内边距，即：height(width)+padding

###2.4 scrollHeight/scrollWidth  
在没有滚动条的情况下，元素内容的总高度(宽度)。

###2.5 scrollLeft/scrollTop  
被隐藏在内容区域左侧(上方)的像素数。通过设置这个属性可以改变元素的滚动位置

###2.6 兼容性（有待考证）  
1. FF下：scrollWidth与clientWidth始终相等。  
2. IE下：scrollWidth：文档总大小；clientWidth：视口大小。
3. opera,chrome,safari等：scrollWidth：视口大小；clientWidth：文档总大小。

###2.7 节点 
1. document:html节点的容器对象.
2. document.documentElement:DOM树的根节点html
3. document.body：DOM树的body节点

###2.8 几个高度  
    //1.可视区高度
	document.documentElement.clientHeight;
   
	//2. 页面高度，chrome,ff,下下面三者相等，IE下，下面三者会有几px的差异，且当文档声明类型不同时，有无DTD时，表现也不一致
    document.body.clientHeight;
	document.documentElement.scrollHeight;
	document.body.scrollHeight;
    //几个测试结果(各个浏览器下窗口调整不一样)
	chrome  有dtd [638, 786, 786, 786]
			无dtd [638, 806, 806, 806]
	FF:  	有dtd [608, 789, 789, 789] 
			无dtd [608, 808, 808, 808]
	IE   	有dtd [673, 774, 778, 778]
			无dtd [673, 791, 792, 791]
	
	IE8 	有dtd [669, 774, 778, 778]
	   		无dtd [669, 791, 792, 791]
	
	IE7 	有dtd [669, 774, 774, 774]
	   		无dtd [669, 774, 774, 774]
###2.9 鼠标坐标 
1. event.clientX/event.clientY
相对视口的水平（垂直）座标
2. event.pageX/event.pageY
相对页面的水平（垂直）座标
###2.10 鼠标滚动事件 
mousewheel事件：

	EventUtil.addHandler(document, "mousewheel", function(event){
	event = EventUtil.getEvent(event);
	alert(event.wheelDelta);//通过wheelDelta属性值的正负号，来得知滚动方向，opera正好是相反的。
	});
##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


