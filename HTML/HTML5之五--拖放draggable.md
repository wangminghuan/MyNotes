##HTML5之五——拖放draggable
<font size=4  face="微软雅黑">拖放（Drag 和 drop）是 HTML5 标准的组成部分。拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

*****
<font size=4 face="微软雅黑" color=blue>浏览器支持</font>：
Internet Explorer 9、Firefox、Opera 12、Chrome 以及 Safari 5 支持拖放。
注释：在 Safari 5.1.2 中不支持拖放。

******
<font size=4 face="微软雅黑" color=blue>draggable </font>：设置为true，元素就可以拖拽了！
例如:

	<div draggable="true"></div>
**********
<font size=4 face="微软雅黑" color=blue>拖拽元素事件</font>： 事件对象为被拖拽元素

**dragstart** ,  拖拽前触发 
**drag** ,拖拽前、拖拽结束之间，连续触发
**dragend**  , 拖拽结束触发
*********
<font size=4 face="微软雅黑" color=blue>目标元素事件</font>：事件对象为目标元素

**dragenter** ,  进入目标元素触发，相当于mouseover
**dragover**  ,进入目标、离开目标之间，连续触发
**dragleave** ,  离开目标元素触发，相当于mouseout
**drop**  ,  在目标元素上释放鼠标触发
********
<font size=4 face="微软雅黑" color=blue>执行顺序</font> 

 1. **drop不触发时**
dragstart  >  drag >  dragenter >  dragover >  dragleave > dragend 
 2. **drop触发的时候**(*dragover的时候阻止默认事件*)
dragstart  >  drag >  dragenter >  dragover >  drop > dragend

补充：想要触发drop事件必须在dropover下阻止默认事件
	
	oDiv.ondragover = function(ev){
		    var ev=ev||window.event;
		ev.preventDefault();	
	oDiv.ondrop = function(){
		console.log("鼠标释放");
	};
********
<font size=4 face="微软雅黑" color=blue>火狐下的兼容性问题 </font>: 无法拖放除图片外的其他标签。
**解决：**ondragstart时设置dataTransfer对象
		
	   obj.ondragstart=function(ev){
	     var ev=ev||window.event;
	     ev.dataTransfer.setData("key","value");
	   }
***关于dataTransfer对象：***

 DataTransfer对象用于在配置拖拽行为效果，并且在拖拽过程的各事件间传递数据信息。它存储在事件对象当中

**setData()** : 设置数据 key和value(必须是字符串)

**getData()** : 获取数据，根据key值，获取对应的value

**effectAllowed** : 设置光标样式  
“uninitialized”：没有该被拖动元素放置行为。
“none”：被拖动的元素不能有任何行为。
“copy”：只允许值为“copy”的dropEffect。
“link”：只允许值为“link”的dropEffect。
“move”:只允许值为“move”的dropEffect。
“copyLink”：允许值为“copy”和“link”的dropEffect。
“copyMove”：允许值为“copy”和”link”的dropEffect。
“linkMove”：允许职位“link”和”move”的dropEffect。
“all”：允许任意dropEffect。

**dropEffect**属性可以知道被拖动的元素能够执行哪种放置行为。  
“none”：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
“move”：应该把拖动的元素移动到放置目标。
“copy”：应该把拖动的元素复制到放置目标。
“link”：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有URL）

dropEffect属性与effectAllowed属性结合起来可以设定拖放时的视觉效果。effectAllowed属性表示当一个元素被拖动时所允许的视觉效果，一般在ondragstart事件中设定，dropEffect属性表示实际拖放时的视觉效果，一般在ondragover事件中指定，dropEffect属性所表示的实际视觉效果必须在effectAllowed属性所表示的允许的视觉效果范围内。

**setDragImage** ：三个参数：指定的元素，坐标X，坐标Y；
	
			oDiv.ondragstart = function(ev){
               var ev = ev || window.event;
		    ev.dataTransfer.setDragImage(oImg,0,0);
	         };
**files** ：获取外部拖拽的文件，返回一个filesList列表
filesList下有个type属性，返回文件的类型；
如上传文件功能部分代码：
	
	   oDiv.ondrop = function(ev){	
	        ev.preventDefault();
		 var fs = ev.dataTransfer.files;
		 //获取外部拖拽的文件，返回一个filesList列表,包含多种属性
		for(var i=0;i<fs.length;i++){
			if(fs[i].type.indexOf('image')!=-1){
				var fd = new FileReader();
         //新建FileReader对象，
         //FileReader接口提供了读取文件的方法和包含读取结果的事件模型。
				fd.readAsDataURL( fs[i] );
				//将文件读取为DataURL，参数为读取对象
				fd.onload = function(){//读取文件成功时触发
					
			var oLi = document.createElement('li');
			var oImg = document.createElement('img');
			
			oImg.src = this.result;
			//this.result,获取读取结果
			
			oLi.appendChild(oImg);
			oUl.appendChild(oLi);	
				};
			}
			else{
				alert('亲，请上传图片类型');
			}
		}		
	};
	
关于fileReader，请点击：[HTML5之FileReader的使用](http://blog.csdn.net/zk437092645/article/details/8745647)
