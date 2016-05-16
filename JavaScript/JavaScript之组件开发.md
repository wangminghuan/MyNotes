##<font face="微软雅黑">JS组件开发

**<font size="4" color="red" >一.什么是组件？</font>**   
**A)对面向对象的深入应用（分为：UI组件和功能组件）**   
**B)将 配置参数、方法、事件，三者进行分离**    

**<font size="4" color="red" >二. 关于自定义事件</font>**  
<font size="4">所谓自定义事件：主要是跟函数有关系，就是让函数能够具备事件的某些特性</font>  

**<font size="3" color="blue">1 为什么要用自定义事件</font>**   
假设，多人共同开发一个功能，命名为函数show;  
有以下方法：  
**方法1**：共同编写函数show，最后合并到一个函数里面  

缺点：引发混乱和冲突  

**方法2**：分开开发，定义多个同名函数show    
	
    function show(){
		alert(1);
	}//同事A
	
	function show(){
		alert(2);
	}//同事B
	
	function show(){
		alert(3);
	}//同事C
	
	show();

缺点：同名函数会被覆盖，最后只执行了alert(3);      

**方法3**：借用js事件的思路，绑定事件都会被执行，不会发生覆盖    
	
	window.addEventListener('show',function(){
		alert(1);
	},false);
	window.addEventListener('show',function(){
		alert(2);
	},false);
	window.addEventListener('show',function(){
		alert(3);
	},false);
	
	show();  //主动触发自定义事件，必须主动触发。

**触发后会全部执行，问题解决！**

**<font size="3" color="blue">2.如何编写原生自定义事件</font>** 

    window.onload = function(){
	var oDiv = document.getElementById('div1');
	var oSpan = document.getElementById('span1');
	
	bindEvent(oDiv , 'click',function(){
		alert(1);
	});
	bindEvent(oDiv , 'click',function(){
		alert(2);
	});

	bindEvent(oSpan , 'show',function(){
		alert(3);
	});
	bindEvent(oSpan , 'show',function(){
		alert(4);
	});
	bindEvent(oSpan , 'hide',function(){
		alert(5);
	});
	
	fireEvent(oSpan , 'show'); 
	//控制台中看到oSpan.listeners为：
	//Object {show: Array[2], hide: Array[1]}
	
     };

    function bindEvent(obj,events,fn){
	//obj : 楼层
	//events : 书架
	//fn : 一本书
	
	obj.listeners = obj.listeners || {};
	//创建obj对象下的一个属性listeners,属性存在则在该属性上进行后续操作，若不存在，定义其为空对象
	
	obj.listeners[events] = obj.listeners[events] || [];
	//obj下listeners属性中event对象（如click）,存在继续，不存在定义为空
	
	obj.listeners[events].push( fn );
	//向obj下listeners属性中的event对象推入函数fn
	
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}
	else{
		obj.attachEvent('on'+events,fn);
	}
    }

    function fireEvent(obj,events){   //主动触发自定义事件
	
	for(var i=0;i<obj.listeners[events].length;i++){
		 obj.listeners[events][i]();
	}
    } 

</font>  
******

