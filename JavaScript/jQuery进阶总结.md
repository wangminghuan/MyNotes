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

**<font size="5" color="red" >三. Ajax</font>**   
传统页面更新页面数据只能通过刷新，Form提交则是新建一个页面，哪怕是提交给自己本身的页面，也是需要刷新的。所以局部刷新只能通过ajax技术实现。  
 
下面介绍一下jq的ajax方法：    

**<font color="blue">3.1 load()方法</font>**    
常用于从服务器拉取静态数据文件  
**A) 加载整个HTML文件**    
load()方法可以将整个html片段（DOM结构）直接填充到使用该方法的对象内。例如：

	$("#pt1").click(function(){
	       $("#div1").load("load.html");
	  })

**B) 筛选加载HTML文档片段**   
该方法还可以筛选加载，譬如，只加载load.html中class为para的DOM：    

	$("#pt1").click(function(){
	       $("#div1").load("load.html .para");
	  })
**C) 传递方法**  
load方法中如果有传递参数，则为post方式，否则默认为get方式。  
  
	$("#pt1").click(function(){ //POST方式：
	       $("#div1").load("load.html .para",{name:"Jack"}, function(){
				console.log("加载完毕，回调执行");
			});
	  })
**D) 回调参数**  

	$("#pt1").click(function(){
	       $("#div1").load("load.html .para",{name:"Jack"},function(responseText, textStatus,XMLHttpResquest){
	         console.log(responseText); //请求返回的内容
	         console.log(textStatus);  //请求返回的状态码，sucess、error、notmodified、timeout四种
	         console.log(XMLHttpResquest);//请求返回的XMLHttpResquest对象（含内容，状态码等属性）
	       })
	   })
**<font color="blue">3.2 $.get() 方法和 $.post() 方法</font>**  
如果需要传递一些参数给服务器，我们就需要用到 $.get() 、$.post() 和 稍后讲到的$.ajax()方法。  

**A) $.get()**  
使用get方式来进行异步请求；  

- url：String类型，为请求的url地址。
- data(可选)：发送的data数据会作为参数附加到请求的url。
- callback(可选)：载入成功时调用的函数，自动将请求结果和状态传递给该方法。
- type：String类型，为服务器返回的内容格式，html，xml,json,text,script。  

		$("#pt1").click(function(){
	       $.get("load.php",{
					"name":"Jack",
					"age":"25"
				},function(data, textStatus){
	         console.log(responseText); //请求返回的内容
	         console.log(textStatus);  //请求返回的状态码，sucess、error、notmodified、timeout四种
	       })
		})

**B) $.post()**   
参数和使用方式和$.get()都相同。 

**C) GET和POST的区别**  

1. GRT请求会将参数拼接在url中进行传递，用户是可见的；POST方式则是作为请求头发送给web服务器的，对用户来说是不可见的；  
2. GET方式传输数据有大小限制（通常不能大于2KB），而POST方式传递数据则基本不受限制；
3. GET方式请求的数据会被浏览器缓存起来，其他人可以从浏览器记录中获取，因而存在被窃取的危险；POST方式则会相对安全许多。

**<font color="blue">3.3  $.getScript()</font>**  
用于加载js文件：  

	$("#pt1").click(function(){
	  $.getScript("test.js", function(){
	   //回调函数，js加载完毕后执行
	 })
	})
还有以下2种动态加载js的方法：  

	$(document.createElement("script")).attr("src","test.js").appendTo("head");
	$("<script type='text/javascript' src='test2.js' />").appendTo("head");

**<font color="blue">3.4  $.getJSON()</font>**  
用于加载json文件：  

	$("#pt1").click(function(){
	  $.getJSON("test.json", function(data){
	   console.log(data.name);//回调函数，处理获取到的数据
	 })
	})

**<font color="blue">3.5  $.ajax()</font>**  
$.ajax()是jq最底层的ajax实现
接受参数如下：  

- url: 要求为String类型的参数，（默认为当前页地址）发送请求的地址。
- type: 要求为String类型的参数，请求方式（post或get）默认为get。注意其他http请求方法，例如put和delete也可以使用，但仅部分浏览器支持。  
- timeout: 要求为Number类型的参数，设置请求超时时间（毫秒）。此设置将覆盖$.ajaxSetup()方法的全局设置。   
- data: 要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后。
- dataType: 要求为String类型的参数，预期服务器返回的数据类型。如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。可用的类型如下：xml，html，script，json，jsonp，text。
- beforeSend：要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数。  
- complete：要求为Function类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。
- success：要求为Function类型的参数，请求成功后调用的回调函数，有两个参数：由服务器返回并根据dataType参数进行处理后的数据、描述状态的字符串。
- error：要求为Function类型的参数，请求失败时被调用的函数。该函数有3个参数：即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。  
- 其他参数请参考书籍
  
以上全部方法都是基于$.ajax()来构建的，所以都可以通过$.ajax()来实现。  

**<font color="blue">3.6  序列化元素</font>**   
**A) $().serialize()方法**   
该方法可以将表单中要提交的内容序列化为字符串：  


	<form id="form1">
	  <input type="text" name="username" value="Jack"  />
	  <input type="text" name="age" value="24" />
	  <input type="hidden" name="sex" value="man"/>
	  <textarea name="love" rows="8" cols="40">football</textarea>
	  <select name="phone">
	    <option value="iphone" selected="selected">iphone</option>
	    <option value="xiaomi">xiaomi</option>
	    <option value="huawei">huawei</option>
	  </select>
	  <input type="checkbox" name="home" value="bj"/>
	  <input type="submit" name="sub" value="Submit" />
	</form>
	 <script type="text/javascript">
	   console.log($("#form1").serialize());
	   //username=Jack&age=24&sex=man&love=football&phone=iphone
     </script>

注意：该方法只会将"成功的控件"序列化为字符串。如果不使用按钮来提交表单，则不对提交按钮的值序列化。如果要表单元素的值包含到序列字符串中，元素必须使用 name 属性。  
**B) $().serializeArray()方法**   
方法同上，只是序列化为一个数组，而非字符串：  

	<script type="text/javascript">
	   console.log($("#form1").serialize());
	   //[{"name":"username","value":"Jack"},{"name":"age","value":"24"},.....]
     </script>
**C) $.param()方法**   
是serialize()方法的核心，用来对一个数组或者对象按照key/value进行序列化：  

	var obj={a:1,b:2,c:3};
	console.log($.param(obj));//a=1&b=2&c=3
**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

