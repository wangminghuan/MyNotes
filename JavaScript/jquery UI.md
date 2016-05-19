##<font face="微软雅黑">JQuery UI 入门教程

**<font size="4" color="red" >一. 概念</font>**  
**A)** JQUI是以jQuery为基础的javascript用户界面代码库。包含用户交互、动画、特效和带主题的可视控件等功能。通常我们也叫做JQUI组件。

**B)**  组件与插件的区别  
**功能性** ：组件功能更为丰富，插件较为单一    
**中心性** ：主要作为辅助功能，譬如辅助jq；而组件正好相反，是以组件为中心的，JQ只是辅助来开发组件的  
**统一性** ：组件规范性、复用性都比较强。  

**<font size="4" color="red" >二. JQuery UI</font>**  
**<font size="3" color="blue">2.1 本地文件结构</font>**    
**A)** jquery-ui.structure.css：架构css,margin，position，清浮动等；  
**B)** jquery-ui.theme.css：颜色，字号，背景（便于主题设置，譬如换肤等~）  
**C)** jquery-ui.structure.css + jquery-ui.theme.css = jquery-ui.css   

**<font size="3" color="blue">2.2 UI框架结构</font>**   

**A)** **UI Core** &emsp;&emsp;&emsp;&emsp;&emsp;UI核心

**B)** **Interactions**&emsp;&emsp;&emsp;UI交互

**C)** **Widgets**&emsp;&emsp;&emsp;&emsp;&emsp;UI控件

**D)** **Effects** &emsp;&emsp;&emsp;&emsp;&emsp;UI特效(独立)

**E)** **Theme** &emsp;&emsp;&emsp;&emsp;&emsp;CSS主题

<font size="3" color="red" >除了UI特效外，其他项均相互依赖</font>  

**<font size="4" color="red" >三. UI特效</font>**  

**<font size="3" color="blue">3.1 特效集合一</font>**   
 
**A)**：animate([运动目标],  [运动时间], [easing函数])   

	$('#div1').animate({width:400, height:400},1000,'easeOutBounce')；
JQ中该函数内置的easing函数只支持swing和linear两种运动效果  
JQUI中easing函数支持的运动效果更丰富  
了解更多请点击：[easing函数](http://api.jqueryui.com/easings/)

**B)**：addClass([运动目标],  [运动时间], [easing函数])    

	$('#div1').addClass('box',1000,'linear');//支持动画效果  

**C)**：removeClass([运动目标],  [运动时间], [easing函数])    

	$('#div1').removeClass('box',1000,'linear');//支持动画效果  

**<font size="3" color="blue">3.2 特效集合二</font>**    

**D)**：show([effects效果], [运动时间])  

	$('#div1').show('fold',1000)//操作对象需默认隐藏

**E)**：hide([effects效果], [运动时间])    

	$('#div1').hide('fold',1000)//操作对象需默认显示
**F)**：toggle([effects效果], [运动时间])   

	$('#div1').toggle('fold',1000)//操作对象默认状态无要求  
**G)**：effect([effects效果], [运动时间])   

	$('#div1').effect('explode',1000);//操作对象默认状态无要求,只用来做特效显示，如：shake,pulsate,bounce  

**effects特效:**  
blind  :  百叶窗    
bounce  :  反弹  
clip  :  剪切     
drop  :  降落  
explode  :  爆炸      
fade  :  淡入淡出  
fold   :  折叠      
puff   :  膨胀  
pulsate   :  心跳      
scale   :  缩放  
shake   :  震动      
size   :  尺寸  
slide   :  滑动      
transfer   :  转移  

部分effects特效（如：blind）支持direction参数  

	$('#div1').toggle('blind',{direction:'down'},1000)

**<font size="4" color="red" >四. UI交互</font>**  

**<font size="3" color="blue">4.1 交互结构的三部分</font>**   
**A)** **配置参数（初始化时使用）**  

	$('#div1').draggable({axis:'x',handle:'p'})   
JQUI中插件有特定的其他方式，称为：**有状态的插件**  ，
在初始化后，可获取和设置配置  
**设置**(必须初始化后才能执行，否则报错)  

    //Setter
	$('#div1').draggable('option','axis','y')  

**获取**  

    //Getter
	$('#div1').draggable('option','axis') //值为x
**B)** **方法（初始化后使用）**

**A)** **自定义事件（普通事件之上的封装）**

**<font size="3" color="blue">4.1 交互类型</font>** 

**A)** draggable( )

**B)**  droppable( ) 

**C)**  resizable( ) 

**D)**  selectable( )  

**E)**  sortable()  

**<font size="4" color="red" >四. 标题4</font>**  
**<font size="3" color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

