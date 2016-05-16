###SVG入门教程
*******
**<font size="4" color="red" face="微软雅黑">一. 标题1</font>**  
**<font size="3" color="blue" face="微软雅黑">1. 二级标题</font>**   
A) 

B)  
**<font size="4" color="red" face="微软雅黑">一. 概述</font>**  
>SVG： 可缩放矢量图形（Scalable Vector Graphics）。  

矢量图记录的不是像素，而是组成图片的元素的几何特性。例如记录直线的起始位置、方向、长度，圆弧的圆心位置、弧度、端点位置等，是可以随意进行放大而清晰度不会受影响，放大的时候计算机只需要简单地将元素的端点坐标、长度等几何特性乘上放大倍数即可。这意味着矢量图本身没有分辨率的概念。所以可无极限放大缩小而保持它的清晰度。  

**<font size="4" color="red" face="微软雅黑">二. SVG引入方式</font>**  

**<font size="3" color="blue" face="微软雅黑">1. 外部文件引入</font>**   

我们定义一个后缀为.svg文件，内容如下： 

	    <?xml version="1.0" standalone="no"?> //这是xml文件声明
	   
	    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
	    //该 DTD 位于 W3C，含有所有允许的 SVG 元素

	    <svg width="100%" height="100%" version="1.1"
	    xmlns="http://www.w3.org/2000/svg">
	    //xmlns为命名空间
	    <circle cx="100" cy="50" r="40" stroke="black"
	    stroke-width="2" fill="red"></circle>
	    
	    </svg>

 **A).img标签**  

    
    <body>
    <img src="first.svg">
    </body>
**B).iframe标签**

    <body>
    <iframe src="first.svg"></iframe>
    </body>


**C).background的url**

    <body>
    <div style="height:200px; width:200px; background:url(first.svg) no-repeat">
    <!--也可以写入style标签中-->
    </div>
    </body>

**<font size="3" color="blue" face="微软雅黑">2. 直接写入html文件中</font>**    
    
    <body>
    <div id="div1">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"> 
	    	<circle cx="100" cy="100" r="40" fill="red"></circle>
	    </svg>
    </div> 
    </body>
*********
**<font size="4" color="red" face="微软雅黑">三. SVG预定义形状元素</font>**    

**<font size="3" color="blue" face="微软雅黑">1.圆形—circle</font>** 

 属性：  <font color=red> cx</font>（圆心x坐标）| <font color=red>cy</font>（圆心y坐标）| <font color=red> r</font>（半径）</font>
              
 通用属性：<font color=red> stroke</font>(边框) | <font color=red> stroke-width</font>(边框宽度) | <font color=red> fill</font>(填充颜色) |<font color=red>fill-opacity</font>(填充透明度) | <font color=red>stroke-opacity</font>(边框透明度)</font>

     <body>
     <div id="div1">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"> 
	    	<circle cx="100" cy="100" r="40" fill="transparent" stroke="black" stroke-width="2" stroke-opacity="0.9"></circle>
	    </svg>
    </div> 
    </body>
通用属性也可以如html一样写入行间样式style中，
     
     <body>
     <div id="div1">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"> 
	    	<circle cx="100" cy="100" r="40"  style="fill:white;stroke:black;stroke-width:5;"></circle>
	    </svg>
    </div> 
    </body>

**<font size="3" color="blue" face="微软雅黑">2.矩形—rect</font>** 

属性： <font color=red> x</font>（x坐标）| <font color=red> y</font>（y坐标）|<font color=red> rx</font>（圆角处横轴）| <font color=red> ry</font>（圆角处纵轴）|<font color=red> width</font> | <font color=red> height</font></font>
              
**<font size="3" color="blue" face="微软雅黑">3.线—line</font>**   
<font size=4 color=blue></font>   
 属性：  <font color=red> x1</font>（起点x坐标） | <font color=red> y1</font>（起点y坐标）| <font color=red> x2</font>（终点x坐标）|<font color=red> y2</font>（终点y坐标）</font>  
 
注意：  
A).line使用时一定要写上stroke属性   
B).默认情况下svg图像会溢出，需要设置父级宽高  
 
<font size=4 color=blue>4.椭圆 **ellipse**</font>  
<font size=4 color=blue>5.多边形 **polygon**</font>  
<font size=4 color=blue>6.折线 **polyline**</font>   
<font size=4 color=blue>7.路径 **path**</font> 

 
**********

**<font size="4" color="red" face="微软雅黑">四. SVG其他标签</font>**   

**<font size="3" color="blue" face="微软雅黑">1.文本—text</font>**   
 
属性：<font color=red> x</font>（x坐标）| <font color=red> y</font>（y坐标）|<font color=red> font-size</font>（字号）| <font color=red> text-anchor</font>( start/middle/end/inherit  文本的排列)</font>

默认状态下文本在浏览器中显示的位置如图所示：  
![](http://i.imgur.com/ikMTYAq.jpg)  

文字显示的基准线与常规想象中不太一样
	
    <body>
		<div id="div1">
	    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"> 
	        <circle cx="100" cy="100" r="40" fill="red"></circle>
	        <text x="100" y="102" font-size="10" text-anchor="middle">秋田犬</text>//文字居中显示，注意此处的y值
	    </svg>
	</div> 
	</body>	

**<font size="3" color="blue" face="微软雅黑">2.图片—image</font>**  

属性：<font color=red> x</font>（x坐标）| <font color=red> y</font>（y坐标）| | <font color=red> width</font>（宽度）| <font color=red> height</font>（高度）|   <font color=red> xlink:href</font>(图片地址)</font>   

	<image x="100" y="100" width="100" height="100" xlink:href="img/bck.jpg"></image>
**<font size="3" color="blue" face="微软雅黑">3.组合标签—g</font>** 
>用于把相关元素进行组合的容器元素，只针对公共属性
    
    <body>
    <div id="div1">
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    	<g transform="translate(200, 200)" stroke-width="5" stroke="red"> //可以将通用属性写入g标签中
            <circle r="40" fill="transparent"></circle>
            <circle r="30" fill="transparent"></circle>
            <circle r="20" fill="transparent"></circle>
            <circle r="10" fill="transparent"></circle>
        </g>
    </svg>
    </div>
    </body>

**********
**<font size="4" color="red" face="微软雅黑">五. SVG与js的结合开发</font>**    

**<font size="3" color="blue" face="微软雅黑">1.svg的动态创建</font>**
	 
     var svgNS = 'http://www.w3.org/2000/svg'; 
	 var tag="svg";  
	 var oSVG=document.createElementNS(svgNS , tag);//创建使用指定的名字空间的新Element节点
