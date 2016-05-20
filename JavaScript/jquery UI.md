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

分为三部分  

**<font size="3" color="blue">4.1 配置参数（初始化时使用）</font>**   


	$('#div1').draggable({axis:'x',handle:'p'})   
JQUI中插件有特定的其他方式，称为：**有状态的插件**  ，
在初始化后，可获取和设置配置  
**A)** **设置**(必须初始化后才能执行，否则报错)  

    //Setter
	$('#div1').draggable('option','axis','y')  

**B)** **获取**  

    //Getter
	$('#div1').draggable('option','axis') //值为x  

**<font size="3" color="blue">4.2 方法（初始化后使用）</font>**   

 **A)**方法有两种调用方式：  
     
        //1.jq链式调用
		$('#div1').draggable('disable')
        
        //2.面向对象的调用方法（instance方法返回调用对象的本身）
		var obj = $('#div1').draggable('instance');
		obj.disable();

**<font size="3" color="blue">4.3 自定义事件（普通事件之上的封装）</font>**  

 **A)**自定义事件有两种调用方式：  
	
	 //1.配置参数中调用
     $('#div1').draggable({axis : 'x',create:function(){
			alert(1);
		},start:function(){
			alert(2);
		}});
     
    //2.事件绑定的方式调用(自定义事件名发生了变化注意，API文档都有说明)
     $('#div1').on('dragstart',function(){
		alert(2);
	});
    //ps:绑定事件写法不适用于creat事件

 **B)**UI交互中各项交互效果的配置，方法，事件，选用统一化的命名方式，如，axis，不管在哪个交互中出现均表示限制x,y轴的相关操作，这样很好的降低了JQUI的学习成本

**<font size="4" color="red" >五. UI控件</font>**   

**<font size="3" color="blue">5.1 与UI交互的区别与联系</font>**   
**A)** 相同：其方法，事件有许多相似之处

**B)** 不同：UI控件需要特定布局的HTML，每个布局的DOM结构可以参照所下载压缩包文件中的index.html  

**<font size="3" color="blue">5.2 特点</font>**   
**A)** 键盘控制：控件一般都包含键盘操作  

**B)** css样式框架：  可以通过index.html实例 或者 官方[CSS框架API文档](http://api.jqueryui.com/theming/css-framework/)学习


**C)** refresh方法  
动态刷新dom元素的高度。譬如导航效果中，动态添加导航内容，导航的高度不会改变，需要添加refresh方法（依赖配置参数`heightStyle`）   

		  $( "#div1" ).accordion({ heightStyle : 'auto' });
		
			$('input').click(function(){
			
				var html = $('#div1 div').eq(0).html();
		
				$('#div1 div').eq(0).append(html);
			
				$( "#div1" ).accordion('refresh');
			});

**<font size="4" color="red" >六. UI核心</font>**  

**<font size="3" color="blue">6.1 选择器</font>**   

**A)** :data()  
选择含有特定data值的元素 

	$('div:data(name)').css('background','red');
**B)** :focusable()  
选择可以获取鼠标聚焦的元素  

	$('body').children(':focusable()').css('background','red');
**C)** :tabbable()  
选择可以接受TAB键的元素  

	$('body').children(':tabbable()').css('background','red')
**<font size="3" color="blue">6.2 方法</font>**   

**A)** disableSelection()   
禁止可选择  

	$('div').disableSelection()
**B)** enableSelection()    
启用可选择  

	$('div').enableSelection()
**C)**focus([定时时间]，[回调函数])         
聚焦功能    

	$('input').focus(1000,function(){
		this.style.background = 'red';
	});
**D)**scrollParent() 
获得具有滚动功能的父级节点	  

**E)**jQuery.ui.keyCode  
代替键盘键值，如：ENTER,CTRL等，用途不大  

**<font size="3" color="blue">6.3 实用工具</font>**   
 
**A)** position()  

	$('#div2').position({
			my : 'right top',  //操作对象内的参考点，默认为center
			at : 'right top', //位于参考对象的位置
			of : '#div1' //位置参考对象
		});

**B)**Widget Factory  
http://api.jqueryui.com/jQuery.widget/


</font>  
******

