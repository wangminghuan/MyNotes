###JS事件绑定的三种方式：
****************
在JavaScript中，有三种常用的绑定事件的方法：  
1. 在DOM元素中直接绑定；  
2. 在JavaScript代码中绑定；  
3. 绑定事件监听函数。  
************
<font size="3" color="blue">一. 在DOM元素中直接绑定</font>  
这里的DOM元素，可以理解为HTML标签。JavaScript支持在标签中直接绑定事件，语法为：
      onXXX="JavaScript Code"

其中：
onXXX 为事件名称。例如，鼠标单击事件 onclick ，鼠标双击事件 ondouble，鼠标移入事件 onmouseover，鼠标移出事件 onmouseout 等。
JavaScript Code 为处理事件的JavaScript代码，一般是函数。

例如，单击一个按钮，弹出警告框的代码有如下两种写法。  
**1. 原生函数**
	
    <input  onclick="alert('谢谢支持')"  type="button"  value="点击我，弹出警告框" />  


**2. 自定义函数**

    <input  onclick="myAlert()"  type="button"  value="点击我，弹出警告框" />
    <script type="text/javascript">
    function myAlert(){
    alert("谢谢支持");
    }
    </script>
*****************
<font size="3" color="blue">二. 在JavaScript代码中绑定</font>

在JavaScript代码中（即script标签内）绑定事件可以使JavaScript代码与HTML标签分离，文档结构清晰，便于管理和开发。

在JavaScript代码中绑定事件的语法为：

    elementObject.onXXX=function(){
    // 事件处理代码
    }
    
>其中：elementObject 为DOM对象，即DOM元素。onXXX 为事件名称。

*********
<font size="3" color="blue">三. 绑定事件监听函数</font>  
方式二不能为同一个对象绑定多个事件，后面事件会覆盖前面事件。于是更多选用下面方式：  

 `addEventListener()` 或 `attachEvent()` 来绑定事件监听函数。

**1.addEventListener()**  
<font color="red">obj.addEventListener(事件名称，事件函数，是否捕获) 
</font>  
第三个参数，默认为false(冒泡)，true代表事件捕获（稍后讲到）
>*Chrome、FireFox、Opera、Safari、IE9.0及其以上版本都支持*  


**2.attachEvent()**  
<font color="red">obj.attachEvent(事件名称，事件函数) 
</font>  
>*IE8.0以下版本支持*   
>与addEventListener()不同，这里的事件名称有“ on ”，如鼠标单击事件 onclick ，鼠标双击事件 ondoubleclick

对于attachEvent()的执行顺序：

          obj.attachEvent('onclick', fn1);
          obj.attachEvent('onclick', fn2);
两个点击事件便会不冲突，按照一定顺序发生，此处会有一点点区别。IE7会先执行后者（fn2）,再执行前者（fn1）。IE7以上正好相反。  
**3.兼容写法**  

	function bind(obj, evname, fn) {
	 	if (obj.addEventListener) {
	 	      obj.addEventListener(evname, fn, false);
	 	} else {
	 	     obj.attachEvent('on' + evname, function() {
	 	      fn.call(obj);
          //call方法改变this指向
	 	         });
	 	       }
	 	} 
IE下，事件绑定函数中，this是指向window对象的，而FireFox下this是指向触发该事件的对象。所以采用call方法来解决。call方法第一个参数可以改变函数执行过程中的内部this的指向，call方法第二个参数开始就是原来函数的参数列表。
*****
<font size="3" color="blue">四. 事件绑定的取消</font>  

1.第一种只能从行间删除属性； 
 
2.第二种绑定形式的取消：
	
          obj.onclick=null;

3.第三种形式的取消：


	IE: obj.detachEvent(事件名称，事件函数);
	
	非IE下：obj.removeEventListner(事件名称，事件函数, 是否捕获)；

****
<font size="3" color="blue">五. 事件冒泡与捕获</font>  

假定存在如下代码：

     <div id="div1">
            <div id="div2">
                  <div id="div3"></div>    
            </div>
     </div>

当我们点击DIV3时，应该如何触发？   
事件流描述的是从页面中接受事件的顺序。但有意思的是，IE和Netscape开发团队提出了两个截然相反的事件流概念。IE的事件流是事件冒泡流，而Netscape的事件流是事件捕获流。

A）.**事件捕获**:Netscape团队提出的另一种事件流叫做事件捕获。事件捕获的思想是不太具体的DOM节点应该更早接收到事件，而最具体的节点应该最后接收到事件。(由父级到子级)   

虽然事件捕获是Netscape唯一支持的事件流模型，但IE9、Safari、Chrome、Opera和Firefox目前也都支持这种事件流模型。但由于老版本的浏览器不支持，因此很少有人使用事件捕获

B）.**事件冒泡型**：IE上的解决方案的绰号为冒泡的技术。冒泡型事件的基本思想是，事件按照最特定的目标到最不特定的事件目标的顺序触发。(由子级到父级)  

所有现代浏览器都支持事件冒泡，但在具体实现上有一些差别。IE5.5及更早版本中的事件冒泡会跳过<html>元素（从<body>直接跳到document）。IE9、Firefox、Chrome和Safari则将事件一直冒泡到window对象。

C）.**DOM事件流**：同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。这也是W3C推荐的模型。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。  

  DOM事件模型最独特的性质是，文本节点也触发事件(在IE中不会)。  

当点击里面的div3时，点击事件是从父级div1开始传递到div2，最终达到div3。达到目标点后，点击事件开始向上传播：从div3到div2，再到div1。那么进去的过程就可以理解为**捕获** ，向上传播的过程就可以理解为**冒泡**。

绑定函数中（不包括IE8以下）：**obj.addEventListener(事件名称，事件函数，是否捕获)**，当第三个参数为true时，事件相应时候便会发生捕获，false则为冒泡机制。

**事件冒泡** : 当一个元素接收到事件的时候，会把他接收到的所有传播给他的父级，一直到顶层window

**阻止冒泡** : 当前要阻止冒泡的事件函数中调用 event.cancelBubble = true;（event需要做兼容性处理）
******
<font size="3" color="blue">五. 事件委托</font>  

通俗的讲，事件委托就是将事件（如：onclick，onmouseover，onmouseout，等）委托给别人来做。

也就是：利用冒泡的原理，把事件加到父级上，触发执行效果。

优点：提高性能。

例如：li上面添加鼠标事件

		window.onload = function(){
		  var oUl = document.getElementById("ul");
		  var aLi = oUl.getElementsByTagName("li");
		
		  for(var i=0; i<aLi.length; i++){
		    aLi[i].onmouseover = function(){
		      this.style.background = "red";
		    }
		    aLi[i].onmouseout = function(){
		      this.style.background = "";
		    }
		  }
		}

		<ul id="ul">
		  <li>aaaaaaaa</li>
		  <li>bbbbbbbb</li>
		  <li>cccccccc</li>
		</ul>
但for循环比较影响性能，而且对于动态插入的li，无法添加事件；  
此时，我们就可以用时间委托的方式把时间绑定到父级元素上：  

	window.onload = function(){
	  var oUl = document.getElementById("ul");
	  var aLi = oUl.getElementsByTagName("li");
	
	/*
	这里要用到事件源：event 对象，事件源，不管在哪个事件中，只要你操作的那个元素就是事件源。
	ie：window.event.srcElement
	标准下:event.target
	nodeName:找到元素的标签名
	*/
	  oUl.onmouseover = function(ev){
	    var ev = ev || window.event;
	    var target = ev.target || ev.srcElement;
	    //target就是目标元素（<li>aaaaaaaa</li>）;
	    if(target.nodeName.toLowerCase() == "li"){
	    target.style.background = "red";
	    }
	  }
	  oUl.onmouseout = function(ev){
	    var ev = ev || window.event;
	    var target = ev.target || ev.srcElement;
	    if(target.nodeName.toLowerCase() == "li"){
	    target.style.background = "";
	    }
	  }
	}

好处多多，建议使用！！