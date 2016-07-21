##<font face="微软雅黑" size="4" >JQuery进阶篇

**<font size="5" color="red" >一. 遍历</font>**  
**<font color="blue">1.1 $.each()</font>**   
该方法可以遍历数组，json对象，以及对象下的所有属性  
**A) 遍历数组**   

	var arr=["a","b","c"];
    $.each(arr,function(i,val){
     console.log("index:"+i+",", "value:"+val);
    })
运行结果  

	index:0, value:a
	index:1, value:b
	index:2, value:c

数组中的对象也可以遍历  

	var arr=[{"name":"a"},{"name":"b"},{"name":"c"}];
    $.each(arr,function(i,val){
     console.log("index:"+i+",","value:"+val.name);
    })
运行结果同上。  
**B)遍历json**   

	var arr={"one":"a","two":"b","three":"c"};
    $.each(arr,function(i,val){
     console.log("index:"+i+",","value:"+val);
    })
运行结果：

	index:one, value:a
	index:two, value:b
	index:three, value:c  
**B)遍历DOM对象**  

	<input name="aaa" type="hidden" value="111" />
	<input name="bbb" type="hidden" value="222" />
	<input name="ccc" type="hidden" value="333" />
	<input name="ddd" type="hidden"  value="444"/>

	$.each($("input:hidden"),function(i,val){
		console.log("index:"+i+",","name:"+val.name+",","value:"+val.value);
	})
运行结果：  

		index:0, name:aaa, value:111
		index:1, name:bbb, value:222
		index:2, name:ccc, value:333
		index:3, name:ddd, value:444  

**<font color="blue">1.2 $().each()</font>**    
该方法可以理解为$.each()的阉割版，它专门用于jquery对象的遍历，相比而言，$.each()更为强大。  
  
    <input name="aaa" type="hidden" value="111" />
	<input name="bbb" type="hidden" value="222" />
	<input name="ccc" type="hidden" value="333" />
	<input name="ddd" type="hidden"  value="444"/>

	$("input:hidden").each(function(i,val){
		console.log("index:"+i+",","name:"+val.name+",","value:"+val.value);
	})
运行结果（同上）：  

		index:0, name:aaa, value:111
		index:1, name:bbb, value:222
		index:2, name:ccc, value:333
		index:3, name:ddd, value:444  

**<font size="5" color="red" >二. 插件扩展的两种方法</font>**  
**<font color="blue">2.1 $.extend()</font>**   
官方给出解释： Merge the contents of two or more objects together into the first object.(把两个或者更多的对象合并到第一个当中)。    

jQuery.extend( target [, object1 ] [, objectN ] )  
合并object1, objectN到target对象：  

	var settings = { validate: false, limit: 5, name: "foo" }; 
	var options = { validate: true, name: "bar" }; 
	console.log(jQuery.extend(settings, options));
    //{validate: true, limit: 5, name: "bar"}

如果只有一个参数，则该target对象会被合并到jQuery对象中：

	$.extend({
			min: function(a, b) { return a < b ? a : b; },
			max: function(a, b) { return a > b ? a : b; }
		});
		console.log($.min(2,3),$.max(4,5));
       //2 5

**<font color="blue">2.2 $.fn.extend()</font>**   
**A)**官方给出解释： Merge the contents of an object onto the jQuery prototype to provide new jQuery instance methods.(把对象挂载到jQuery的prototype属性，来扩展一个新的jQuery实例方法)    

查看jq源代码可以发现fn是这么定义的：  

	jQuery.fn = jQuery.prototype = {
	　　　init: function( selector, context ) {//….
	//……
	};
jQuery.fn = jQuery.prototype 即指向jQuery对象的原型链，对其它进行的扩展，作用在jQuery对象上面；一般用此方法来扩展jQuery的对象插件 

    //扩展插件 
	$.fn.extend({
	   hello:function(){
	   		console.log('hello!');
	   },
	   bye:function(){
	   	   console.log("bye!")
	   }
	});
	$("#div").hello();
	$("#div").bye();
 

**B)** 简单理解两者区别：

jQuery.extend(object)：为扩展jQuery类本身，为自身添加新的方法。只能通过$对象调用，如：$.xx()；（扩展jquery类下的方法）  
jQuery.fn.extend(object)：给jQuery对象添加方法。只能通过jq的实例（jq对象）调用，如：$("#div").xx();  （扩展jquery对象下的方法）

**C)$.fn**：  
我们知道$.fn=$.prototype,所以也可以在$.fn下扩展方法，该方法会对每一个jq实例（jq对象）有效；  
 
	//上面例子也可以改为
    $.fn.hello=function(){
	console.log('hello!');
	};
	$.fn.bye=function(){
		console.log("bye!");
	};
	$("#div").hello();
	$("#div").bye();
可以这样理解：  
$.fn.a=function(){}：扩展单个方法；  
$.fn.extend({ a:function(){},b:function(){} })：同时扩展多个方法；

参考文章：  
[1. jQuery extend方法使用及实现](http://www.cnblogs.com/gaojun/p/4153781.html)  
[2.理解jquery的$.extend()、$.fn和$.fn.extend()](http://caibaojian.com/jquery-extend-and-jquery-fn-extend.html)  

**<font size="5" color="red" >三. 标题3</font>**  
**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   
**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

