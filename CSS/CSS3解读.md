##<font size="3" face="微软雅黑">CSS3重新解读

**<font size="4" color="red">一. 属性选择器</font>**   
>IE7以上支持（含IE7）
 
**<font  color="blue" >1. E[attr]</font>**  
只使用属性名，不确定其属性值   

**<font  color="blue" >2. E[attr="value"]</font>**   
指定属性名，并指定属性值  
 
**<font  color="blue" >3. E[attr~="value"]</font>**  
指定属性名，并指定属性值，属性值为列表，需含有value这个值  
   
**<font  color="blue" >4. E[attr^="value"]</font>**   
 指定属性名，并指定属性值，属性值以value开头  

**<font  color="blue" >5. E[attr$="value"]</font>**   
 指定属性名，并指定属性值，属性值以value结尾   
  
**<font  color="blue" >6. E[attr * ="value"]</font>**  
 指定属性名，并指定属性值，属性值包含value  
 
**<font  color="blue" >7. E[attr|="value"]</font>**  
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

**<font  color="blue" >1. E：nth-child(n)</font>**  
表示body或选择到的元素下，第n个节点,且节点类型为E（n从1开始计算）（两个条件）  

**<font  color="blue" >2. E：nth-child(odd)</font>**   
表示body或选择到的元素下，奇数行节点, 且节点类型为E, odd等同2n-1 
 
**<font  color="blue" >3. E：nth-child(even)</font>**  
表示body或选择到的元素下，偶数行节点, 且节点类型为E, even等同2n  
   
**<font  color="blue" >4. E：nth-last-child(n)</font>**   
类似nth-child，只是为倒序（从后往前数）    

**<font  color="blue" >5. E：nth-of-type()</font>**   
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

**<font  color="blue" >6. E：nth-last-of-type()</font>**  
 表示body或选择到的元素下，倒数第n个E类型的节点 
 
**<font  color="blue" >7. E：empty</font>**  
 表示body或选择到的元素下，为空且类型为E的节点（不可包含文本）  

**<font  color="blue" >8. E：first-child</font>**    
 表示body或选择到的元素下，第一个且类型为E的节点（两个条件）   

**<font  color="blue" >9. E：last-child</font>**    
 表示body或选择到的元素下，最后一个且类型为E的节点（两个条件）  

**<font  color="blue" >10. E：first-of-type</font>**  
 表示body或选择到的元素下，第一个E类型的节点    

**<font  color="blue" >11. E：last-of-type</font>**  
 表示body或选择到的元素下，最后一个E类型的节点     

**<font  color="blue" >12. E：only-child</font>**  
 表示body或选择到的元素下，唯一的一个节点，且类型为E (文本节点不算)    

**<font  color="blue" >13. E：only-of-type</font>**  
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

**<font  color="blue" >1. 圆角：border-radius</font>** 
>Internet Explorer 9+ 支持 border-radius     

border-radius:1-4 length|% / 1-4 length|%;   
斜线左边代表水平，右侧代表竖直  

border-radius: 2em 1em 4em / 0.5em 3em;  
等价于：  
border-top-left-radius: 2em 0.5em;  
border-top-right-radius: 1em 3em;   
border-bottom-right-radius: 4em 0.5em;  
border-bottom-left-radius: 1em 3em;  

**<font  color="blue" >2. 边框：border-image</font>**   
>Internet Explorer 11以上支持， Safari 5 支持替代的 -webkit-border-image 属性 

border-image 属性是一个简写属性，用于设置以下属性：  
border-image-source	用在边框的图片的路径。	  
border-image-slice	图片边框向内偏移。  
border-image-width	图片边框的宽度。	  
border-image-outset	边框图像区域超出边框的量。	   
border-image-repeat	图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 

**<font  color="blue" >3. 阴影：box-shadow</font>**  
>IE9+、Firefox 4、Chrome、Opera 以及 Safari 5.1.1 支持  

h-shadow	必需。水平阴影的位置。允许负值。  
v-shadow	必需。垂直阴影的位置。允许负值。  
blur	可选。模糊距离。  
spread	可选。阴影的尺寸。  
color	可选。阴影的颜色。 
inset	可选。将外部阴影 (outset) 改为内部阴影。   

**<font  color="blue" >4. 线性渐变：linear-gradient</font>**   
>均需加上前缀，IE10以上。background-image下的属性

**A) linear-gradient**([<起点> || <角度>,]? <点>, <点>…)  
&emsp;-起点：从什么方向开始渐变；   
&emsp;&emsp;&emsp;left、top、left top；默认值为top   
&emsp;-角度：从什么角度开始渐变；  
&emsp;&emsp;&emsp;xxx deg的形式；逆时针旋转    
&emsp;-点：渐变点的颜色和位置；  
&emsp;&emsp;&emsp;black 50%，位置可选
	
	background-image:-webkit-linear-gradient(0deg, red 0, blue 50%,yellow 80%);
    //起始处为red,50%处为blue,80%处为黄
**B) repeating-linear-gradient**渐变的平铺   

	background-image:-webkit-repeating-linear-gradient(60deg, red 0, blue 10px);
    //起始处为red，过渡到10px为blue；剩余部分全部平铺展开； 
因为渐变是background-image下的属性，可以理解为背景图；所以通过改变`background-position:0px 0px`中的数值就可以产生滚动的效果。  

如果想设置不渐变的颜色，只需要多设置一个值即可：  

	background-image:-webkit-repeating-linear-gradient(60deg, red 0, blue 10px，yellow 10px,yellow 80px);  
    //blue和yellow之间将不再曾线过渡效果；  
**C)**IE下的渐变：  

	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff',endColorstr='#ff0000',GradientType='1');
    //只能设置起始值和结束值，GradientType:1为从左至右；0为从上至下  

**<font  color="blue" >5. 径向渐变：radial-gradient</font>**   
>均需加上前缀，IE10以上,opera不支持。了解更多请点[径向渐变](http://www.w3cplus.com/css3/new-css3-radial-gradient.html)

**A) linear-gradient**([<起点>]? [<形状> || <大小>,]? <点>, <点>…)  
&emsp;-起点：可以是关键字（left,top,right,bottom），具体数值或百分比；    
&emsp;-形状：ellipse、circle；  
&emsp;-大小：渐变的半径（椭圆的长轴和短轴）；  
具体数值或百分比，也可以是关键字：最近端，最近角，最远端，最远角，包含或覆盖 (closest-side, closest-corner, farthest-side, farthest-corner, contain or cover；FireFox只支持关键字；);       
closest-side：半径长度为从圆心到离圆心最近的边(x和y方向)    
closest-corner：半径长度为从圆心到离圆心最近的角（若圆心处坐标x不等于y，那么将会变为椭圆，椭圆短轴半径为x和y最小的那个，长轴半径即为圆心到离圆心最近角距离）;  
&emsp;-点：渐变点的颜色和位置；  
&emsp;&emsp;&emsp;black 50%，位置可选	；（与线性渐变一致）


**<font  color="blue" >5. 背景：background</font>**   
**A)** background-image：  
css3支持一个元素拥有多个背景，背景图可以进行重叠：先写的在上面（层级高），后写的在下面，逗号隔开；同时，bacakground-position也可以拥有多个值。  

	.box{width:300px;
		height:300px;
		background:-webkit-linear-gradient(-30deg,rgba(255,255,255,0) 0,rgba(255,255,255,0) 150px,rgba(255,255,255,1) 170px,rgba(255,255,255,1) 180px,rgba(255,255,255,0) 210px) no-repeat -200px 0,url(new_bg.png) no-repeat; transition:1s;
		}
	.box:hover{
		background-position:300px 0,-100px -100px;
		}  
**B)** background-size：设置背景图大小  
>Internet Explorer 9+以上支持 ;支持操作多个，逗号隔开；   
  
&emsp;background-size:100% 100%  
&emsp;background-size:cover 放大 ；按照图片原有比例缩放，放大放入父级；可能会超出；   
&emsp;background-size:Contain 缩小;按照图片原有比例缩放，缩小放入父级；不会超出；  

	.box{
		width:300px;height:300px;border:10px solid #000; 
		background:url(miaov.jpg) no-repeat, url(miaov2.jpg) no-repeat 0 bottom;
		background-size:contain,100px 100px;
		}

**C)** background-origin（背景图起始位置） ： border | padding | content   
&emsp;border-box： 从border区域开始显示背景。   
&emsp;padding-box： 从padding区域开始显示背景。   
&emsp;content-box： 从content区域开始显示背景。 
  
**D)** background-clip：border | padding | content/content-box | text(webkit专有)   
&emsp;border： 从border区域向外裁剪背景。   
&emsp;padding： 从padding区域向外裁剪背景。   
&emsp;content： 从content区域向外裁剪背景。   
&emsp;no-clip： 从border区域向外裁剪背景。  
&emsp;text： 只在text文本区域显示背景，配合将text设置为透明，就会出来有意思的效果。

该属性指定了背景在哪些区域可以显示，但与背景开始绘制的位置无关，背景的绘制的位置可以出现在不显示背景的区域，这时就相当于背景图片被不显示背景的区域裁剪了一部分一样。

**D)** background-origin：padding|border|content

该属性指定了背景从哪个区域(边框、补白或内容)开始绘制,但也仅仅能控制背景开始绘制的位置，你可以用这个属性在边框上绘制背景，但边框上的背景显不显示出来那就要由background-clip来决定了

**<font  color="blue" >6.过渡 ：transition[复合属性]</font>** 
>Internet Explorer 9+ 支持

**A)** transition-property: 应用过渡效果的 CSS 属性的名称；（all || [attr] || none）  
**B)** transition-duration：完成过渡效果需要时间（ms/s）  
**C)** transition-timing-function:速度效果的速度曲线   
&emsp;ease:逐渐变慢；  
&emsp;linear：匀速；  
&emsp;ease-in:加速；  
&emsp;ease-out:减速；  
&emsp;ease-in-out:先加速后减速；  
&emsp;cubic-bezier：贝塞尔曲线（上述运动形式均可用贝塞尔曲线表示）  
**D)** transition-delay:过渡效果何时开始    

	.box{width:100px;height:100px;background:red; transition:1s width,2s height;}
    .box:hover{height:200px;width:200px;background:blue}////一般通过hover触发，也可以通过js触发

**E)过渡完成事件 transitionend**   
Webkit内核： obj.addEventListener('webkitTransitionEnd',function(){},false);  

firefox: obj.addEventListener('transitionend',function(){},false);  

每一条样式执行完毕都会触发一次；  
**F)局限**

transition的优点在于简单易用，但是它有几个很大的局限。  

transition需要事件触发，所以没法在网页加载时自动发生。  
transition是一次性的，不能重复发生，除非一再触发。   
transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。   

**<font  color="blue" >7.transform 2D变换 </font>**  

**7.1 transform-origin**   
在讲transform之前我们先了解一下transform-origin属性：  
默认情况，变形的原点在元素的中心点，或者是元素X轴和Y轴的50%处。    
**transform-origin: x-axis y-axis z-axis**，可以用来对元素进行原点位置改变：  

		
	div{
		transform: rotate(45deg);
		transform-origin:20% 40%;
	}
    //x-axis取值：left，center，right，length，%；
    //y-axis取值：top，center，bottom，length，%；
    //z-axis取值：length；  

**7.1 transform**  
 
**A)rotate() 旋转函数**   
取值为deg度数，正值顺时针，负值逆时针。


**B)skew() 倾斜函数**  
取值为deg度数，拥有skewX()和skewY()  

**C)scale() 缩放函数**   
取值为正数、负数和小数，拥有scaleX()和scaleY()  

**D)translate() 位移函数**  
取值为px,拥有translateX()和translateY()

**7.1 transform执行顺序问题**  
 — 后写先执行  

	body:hover .box:nth-of-type(1){ -webkit-transform:translateX(100px) scale(0.5);} //先缩放后平移,
	body:hover .box:nth-of-type(2){ -webkit-transform:scale(0.5) translateX(100px);}//先平移后缩放，平移的距离100px也会被缩放成50px,故只会平移50px; 
**<font  color="blue" >8. 动画和关键帧 keyframes&animate </font>**   
  
**8.1 关键帧keyfrmaes**  
**A)用法**  
  
    
   	@keyframes 动画名称
	{
		0%{  }
		20%{  }
		100%{  }
	}
    //0%等于from，100%等于to,上述写法也等同于
    @keyframes 动画名称
	{
		from{  }
		20%{  }
		to{  }
	}
    //如果省略某个状态，浏览器会自动推算中间状态，也可以多个状态写入一行；
    //如果省略0%，和100%，浏览器会默认将元素的初始状态赋值给0%或100%

**8.2 动画 animate**  
 
  **A)animation-name**; 动画名称（关键帧名称）；<font color="red"> 必须 </font>   

  **B)animation-duration**;  动画持续时间；<font color="red"> 必须 </font>  

  **C)animation-timing-function**; 动画运动形式；  
  
	--linear	匀速。  
	--ease		缓冲。  
	--ease-in	由慢到快。   
	--ease-out	由快到慢。  
	--ease-in-out	由慢到快再到慢。  
	--cubic-bezier(number, number, number, number)：	特定的贝塞尔曲线类型，4个数值需在[0, 1]区间内  

  **D)animation-delay**;  动画延迟时间（只针对第一次）  

  **E)animation-iteration-count**;   重复次数（infinite为无限次）  
 
  **F)animation-direction**;  
动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。animation-direction属性，可以改变这种行为。
 
	该属性具体取值：    
	1. normal：默认值，正常顺序播放。
	2. reverse：反向播放；
	3. alternate: 奇数次正常顺序播放，偶数次反向播放。
	4. alternate-reverse：奇数次反向播放，偶数次正常顺序播放。

**G)animation-fill-mode**;
动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用animation-fill-mode属性。  
 
	该属性具体取值：    
	1. none：默认值，回到动画没开始时的状态。
	2. backwards：让动画回到没开始状态。
	3. both: 根据animation-direction（见后）轮流应用forwards和backwards规则。
	4. forwards：动画停在最后一帧。  
**H）animation-play-state**   
指定动画是否正在运行或已暂停  
--running：播放  
--paused：暂停；重新开始后悔沿着暂定状态继续播放；   

**<font  color="blue" >9. 3D变换 </font>**  
**A)transform-style 建立3D空间** 

**B)perspective 景深**   

**C)perspective-origin 景深基点** 

**D)transform 新增函数**  
rotateX();沿x轴旋转 
rotateY();沿y轴旋转 
rotateZ();沿z轴旋转  
translateZ()；沿z轴移动的距离；  
scaleZ()；沿z轴缩放（只有在元素有“厚度”，即3d模式下才会有明显效果）   

	.wrap{width:100px;height:100px; -webkit-perspective:200px; -webkit-transform:scale(2);-webkit-perspective-origin:center center;}
	.box{width:100px;height:100px;position:relative; -webkit-transform-style:preserve-3d; transition:2s; -webkit-transform-origin:center center -50px;}

</font>
******