##CSS3重新解读

**<font size="4" color="red">一. 属性选择器</font>**   
>IE7以上支持（含IE7）
 
**<font size="3" color="blue" face="微软雅黑">1. E[attr]</font>**  
只使用属性名，不确定其属性值   

**<font size="3" color="blue" face="微软雅黑">2. E[attr="value"]</font>**   
指定属性名，并指定属性值  
 
**<font size="3" color="blue" face="微软雅黑">3. E[attr~="value"]</font>**  
指定属性名，并指定属性值，属性值为列表，需含有value这个值  
   
**<font size="3" color="blue" face="微软雅黑">4. E[attr^="value"]</font>**   
 指定属性名，并指定属性值，属性值以value开头  

**<font size="3" color="blue" face="微软雅黑">5. E[attr$="value"]</font>**   
 指定属性名，并指定属性值，属性值以value结尾   
  
**<font size="3" color="blue" face="微软雅黑">6. E[attr * ="value"]</font>**  
 指定属性名，并指定属性值，属性值包含value  
 
**<font size="3" color="blue" face="微软雅黑">7. E[attr|="value"]</font>**  
 指定属性名，并指定属性值，属性值为value或者以value开头（**注意用-连接，如：value-new**）  

例子1：    
   
    <style type="text/css">
	     div{height: 50px;margin-bottom:10px;background-color: red}
	     p{height: 20px;margin-bottom: 5px;background-color: yellow}
	     div[new*=ui2]{background-color: blue}//选中div标签下对应属性,ui2也可以不加引号
	     p[new*=ui2]{background-color: orange}//选中p标签下对应属性
	     p[new*=ui2]{background-color: pink}//选中所有标签下对应属性
	</style>
   
     <body>
		<div new="ui1">div1</div>
		<div new="ui2">div2</div>
		<div new="ui3 ui2">div3</div>
		<div new="ui2-u">div4</div>
		<div new="ui5">div5</div>
		<p new="ui2-u">p1</p>
		<p new="ui2">p2</p>
    </body>
  
******

**<font size="4" color="red">二. 结构选择器</font>**   
>IE9以上支持   

**<font size="3" color="blue" face="微软雅黑">1. E：nth-child(n)</font>**  
表示body或选择到的元素下，第n个节点,且节点类型为E（n从1开始计算）（两个条件）  

**<font size="3" color="blue" face="微软雅黑">2. E：nth-child(odd)</font>**   
表示body或选择到的元素下，奇数行节点, 且节点类型为E, odd等同2n-1 
 
**<font size="3" color="blue" face="微软雅黑">3. E：nth-child(even)</font>**  
表示body或选择到的元素下，偶数行节点, 且节点类型为E, even等同2n  
   
**<font size="3" color="blue" face="微软雅黑">4. E：nth-last-child(n)</font>**   
类似nth-child，只是为倒序（从后往前数）    

**<font size="3" color="blue" face="微软雅黑">5. E：nth-of-type()</font>**   
 表示body或选择到的元素下，第n个E类型的节点（相比nth-child更靠谱） 
  
E：nth-of-type() 与 E：nth-child()相比较： 
	
     <style type="text/css">
	   #num1 div:nth-child(4){color: red}//加上前面的#num1限制更精准
       #num1 div:nth-of-type(4){color: blue}		
    </style>
	</head>
	<body>
		<div id="num1">
			<div>序号1：我是div1</div>
			<div>序号2：我是div2</div>
			<p>序号3：我是p1</p>
			<div>序号4：我是div3</div>  //变红
			<div>序号5：我是div4</div>  //变蓝
			<p>序号:6：我是p2</p>
			<p>序号:7：我是p3</p>
		</div>
	</body>

**<font size="3" color="blue" face="微软雅黑">6. E：nth-last-of-type()</font>**  
 表示body或选择到的元素下，倒数第n个E类型的节点 
 
**<font size="3" color="blue" face="微软雅黑">7. E：empty</font>**  
 表示body或选择到的元素下，为空且类型为E的节点（不可包含文本）  

**<font size="3" color="blue" face="微软雅黑">8. E：first-child</font>**    
 表示body或选择到的元素下，第一个且类型为E的节点（两个条件）   

**<font size="3" color="blue" face="微软雅黑">9. E：last-child</font>**    
 表示body或选择到的元素下，最后一个且类型为E的节点（两个条件）  

**<font size="3" color="blue" face="微软雅黑">10. E：first-of-type</font>**  
 表示body或选择到的元素下，第一个E类型的节点    

**<font size="3" color="blue" face="微软雅黑">11. E：last-of-type</font>**  
 表示body或选择到的元素下，最后一个E类型的节点     

**<font size="3" color="blue" face="微软雅黑">12. E：only-child</font>**  
 表示body或选择到的元素下，唯一的一个节点，且类型为E (文本节点不算)    

**<font size="3" color="blue" face="微软雅黑">13. E：only-of-type</font>**  
 表示body或选择到的元素下，唯一的一个E类型的节点  
******

**<font size="4" color="red">三. 分栏布局-columns </font>**   
>Firefox 需要前缀 -moz-  
Chrome 和 Safari 需要前缀 -webkit-  
Internet Explorer 9 以及更早的版本不支持多列属性   

1. column-count: 列数目    
2. column-gap: 各列之间间隙宽度  
3. column-width: 建议宽度；未必会使用，浏览器基于此数值进行计算  
4. column-rule-width：列之间分割线宽度  
5. column-rule-style：列之间分割线风格    
6. column-rule-color：列之间分割线演示   
   例如: -webkit-column-rule:2px red dotted;
7. column-span: 允许一个元素的宽度跨越多列
8. column-fill: 分列方式 
   
******

**<font size="4" color="red">四. 新增UI新样式</font>**    

**<font size="3" color="blue" face="微软雅黑">1. 圆角：border-radius</font>** 
>Internet Explorer 9+ 支持 border-radius     

border-radius:1-4 length|% / 1-4 length|%;   
斜线左边代表水平，右侧代表竖直  

border-radius: 2em 1em 4em / 0.5em 3em;  
等价于：  
border-top-left-radius: 2em 0.5em;  
border-top-right-radius: 1em 3em;   
border-bottom-right-radius: 4em 0.5em;  
border-bottom-left-radius: 1em 3em;  

**<font size="3" color="blue" face="微软雅黑">2. 边框：border-image</font>**   
>Internet Explorer 11以上支持， Safari 5 支持替代的 -webkit-border-image 属性 

border-image 属性是一个简写属性，用于设置以下属性：  
border-image-source	用在边框的图片的路径。	  
border-image-slice	图片边框向内偏移。  
border-image-width	图片边框的宽度。	  
border-image-outset	边框图像区域超出边框的量。	   
border-image-repeat	图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 

**<font size="3" color="blue" face="微软雅黑">3. 阴影：box-shadow</font>**  
>IE9+、Firefox 4、Chrome、Opera 以及 Safari 5.1.1 支持  

h-shadow	必需。水平阴影的位置。允许负值。  
v-shadow	必需。垂直阴影的位置。允许负值。  
blur	可选。模糊距离。  
spread	可选。阴影的尺寸。  
color	可选。阴影的颜色。 
inset	可选。将外部阴影 (outset) 改为内部阴影。   

**<font size="3" color="blue" face="微软雅黑">4. 线性渐变：linear-gradient</font>**   
>均需加上前缀，IE10以上。

-moz-linear-gradient( 起点位置/角度，起点颜色, 终点颜色)    
-webkit-linear-gradient( 起点位置/角度，起点颜色, 终点颜色) 
-o-linear-gradient( 起点位置/角度，起点颜色, 终点颜色)  
-ms-linear-gradient( 起点位置/角度，起点颜色, 终点颜色)  
	
	background:-webkit-linear-gradient(left top,#000,#fff);
    background:-webkit-linear-gradient(30deg,#000,#fff);

**<font size="3" color="blue" face="微软雅黑">5. 径向渐变：radial-gradient</font>**   
>均需加上前缀，IE10以上,opera不支持。了解更多请点[径向渐变](http://www.w3cplus.com/css3/new-css3-radial-gradient.html)

	-ms-radial-gradient([<position> || <angle>,]?[<shape> || <size>,]?<color-stop>,<color-stop>[,<color-stop>]*); 


**<font size="3" color="blue" face="微软雅黑">5. 背景：background</font>**   
A) background-size：设置背景图大小
>Internet Explorer 9+以上支持  

B) background-clip：border|padding|content

该属性指定了背景在哪些区域可以显示，但与背景开始绘制的位置无关，背景的绘制的位置可以出现在不显示背景的区域，这时就相当于背景图片被不显示背景的区域裁剪了一部分一样。

C) background-origin：padding|border|content

该属性指定了背景从哪个区域(边框、补白或内容)开始绘制,但也仅仅能控制背景开始绘制的位置，你可以用这个属性在边框上绘制背景，但边框上的背景显不显示出来那就要由background-clip来决定了

**<font size="3" color="blue" face="微软雅黑">6.过渡 ：transition[复合属性]</font>** 
>Internet Explorer 9+ 支持

A).transition-property: 应用过渡效果的 CSS 属性的名称  
B).transition-duration：完成过渡效果需要时间（ms/s）  
C).transition-timing-function:速度效果的速度曲线 

	ease:逐渐变慢；
	linear：匀速；
	ease-in:加速；
	ease-out:减速；
	ease-in-out:先加速后减速；
	cubic-bezier：贝塞尔曲线（上述运动形式均可用贝塞尔曲线表示）
D).transition-delay:过渡效果何时开始    

例如：

    <head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>transtion</title>
	<style type="text/css">
     div{height:200px;width: 200px;background-color: red;margin: 0 auto;}
     div{transition:width 2s ease-in-out 500ms;}
     div:hover{width: 800px}  //一般通过hover触发，也可以通过js触发   
	</style>
	</head>
	<body>
		<div id="btn"></div>
	</body>  
******