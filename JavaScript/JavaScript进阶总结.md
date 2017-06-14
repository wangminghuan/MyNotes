##<font face="微软雅黑">前端学习--杂项

## 一. 函数声明和函数表达式
### 1.1 函数声明
使用function关键字声明一个函数，再指定一个函数名，叫函数声明。  
例如：
    
     function fn(){
       console.log("Hello World!")
	};  
使用方法：  
 
     //调用方式一：函数声明后调用
     function fn(){
       console.log("Hello World!")
	};
     fn();
   
     //调用方式二：函数声明前调用（js解释器会将函数声明提升到作用域的最前面）  
     fn();
     function fn(){
       console.log("Hello World!")
	};
### 1.2 函数表达式  
使用function关键字声明一个函数，但未给函数命名，最后将匿名函数赋予一个变量，叫函数表达式，这是最常见的函数表达式语法形式。  
例如：  
    
     var fn=function(){
       console.log("Hello World!")
	}; 
使用方法：  
 
     //调用方式一：函数表达式后调用（同函数声明）
     var fn=function(){
       console.log("Hello World!")
	}; 
     fn();
    //调用方式二：函数表达式后加括号调用（不同！）
     var fn=function(){
       console.log("Hello World!")
	}(); 

### 1.3 匿名函数 
使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式。  
####1. 函数表达式后加括号调用，会出错，因为js解释器解析到function时会默认将其解析为函数声明  
 
     function(){
       console.log("Hello World!")
	}(); //Error!!
如果将()改为(1),不会报错，但函数不会执行，等同于  
 
     function(){
       console.log("Hello World!")
	}//函数声明
    (1); //表达式

####2. 立即调用的函数表达式（也称函数自执行）  
1. 方式一：
	 
	     (function(){
	       console.log("Hello World!")
		}());//推荐，一个括号内就是一个整体
2. 方式二：
	 
	     (function(){
	       console.log("Hello World!")
		})();   
3. 原因：  
JavaScript里括弧()里面不能包含语句，所以在这一点上，解析器在解析function关键字的时候，会将相应的代码解析成function表达式，而不是function声明。   

如果你不在意返回值（返回值有可能由正变负），或者不怕难以阅读，甚至可以在function前面加一元操作符号,如：！- + ~ 等：

		!function () { /* code */ } (); 
		~function () { /* code */ } (); 
		-function () { /* code */ } (); 
		+function () { /* code */ } (); 
		void function () { /* code */ } (); //也是可以的  

### 1.4 函数声明与函数表达式的区别 
1. Javascript引擎在解析javascript代码时会提升当前执行环境（作用域）上的函数声明，而函数表达式必须等到Javascirtp引擎执行到它所在行时，才会从上而下一行一行地解析函数表达式。 
 
2. 函数表达式后面可以加括号立即调用该函数，函数声明不可以，只能以fn([参数])形式调用 。   

#### 一个例子：锁定参数的例子  
html结构：  

		<ul id="ul1">
				<li>111</li>
				<li>222</li>
				<li>222</li>
			</ul>
  
js代码：  
	   
		window.onload=function(){
		   	  var oUl=document.getElementById('ul1');
		   	  var oLi=oUl.getElementsByTagName("li");
		     for(var i=0;i<oLi.length;i++){
		   	  	oLi[i].addEventListener('click', function(e){ 
				e.preventDefault(); 
				alert(i); 
				}, 'false'); 
		   	  }
		   }
运行上述代码后，无论点击哪个li，弹出的始终是3，因为变量i从来就没背locked住(此处的i为引用)。相反，当循环执行以后，我们在点击的时候i才获得数值，此时i已经执行完了，变为了3； 

改用函数自执行：  
   
	window.onload=function(){
	   	  var oUl=document.getElementById('ul1');
	   	  var oLi=oUl.getElementsByTagName("li");
	     for(var i=0;i<oLi.length;i++){
	   	  	（function(i){
             oLi[i].addEventListener('click', function(e){ 
			 e.preventDefault(); 
			 alert(i); 
			 }, 'false');
           }(i)); //i按值传递
	   	  }
	   }
#### 可以在for循环中锁住参数i的几种方法：  

	window.onload=function(){
		   	  var oUl=document.getElementById('ul1');
		   	  var oLi=oUl.getElementsByTagName("li");
		     for(var i=0;i<oLi.length;i++){
		   	  	(function(){
		        var temp=i;//利用局部临时变量
		        oLi[temp].onclick=function(){
		          alert(temp);
		        }
		      })();
	          }
		   	 }
		   }



## 二.判断JS是否加载完的写法 
在“按需加载”的需求中，我们经常会判断当脚本加载完成时，返回一个回调函数，那如何去判断脚本的加载完成呢？   
IE6-7的 script 元素支持onreadystatechange事件，不支持onload事件。  
FF的script 元素不支持onreadystatechange事件，只支持onload事件。  
this.readyState的值为'loaded'或者'complete'都可以表示这个script已经加载完成，则表示加载完成，返回回调函数。  
 

	var script = document.createElement('script');
	script.type="text/javascript";
	script.src="http://a.baidu.com/jsp.json";
	document.getElementsByTagName('head')[0].appendChild(script);

	script.onload = script.onreadystatechange = function(){
	if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
	   alert('loaded');
	  }
	
	};
## 三. JS对象属性的访问方式  
一般来说，访问对象属性时使用的都是点表示法，这也是很多面向对象语言中通用的语法。不过，在 JavaScript 也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中，如下面的例子所示：  

	alert(person["name"]); //"Nicholas"
	alert(person.name); //"Nicholas"
从功能上看，这两种访问对象属性的方法没有任何区别。但方括号语法的主要优点是可以通过变量来访问属性，例如：  

	var propertyName = "name";
	alert(person[propertyName]); //"Nicholas"  注意此处变量访问不带"" 
如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法。例如：  

	person["first name"] = "Nicholas";  
由于"first name"中包含一个空格，所以不能使用点表示法来访问它。然而，属性名中是可以包含非字母非数字的，这时候就可以使用方括号表示法来访问它们。  

通常，除非必须使用变量来访问属性，否则我们建议使用点表示法  

  
******

