<font face="微软雅黑" size="4" >
<font size="6">for循环绑定事件获取索引问题</font>


## 1 问题抛出

	 <ul class="wrap">
	    <li>1</li>
	    <li>2</li>
	    <li>3</li>
	    <li>4</li>
	  </ul>

     //js代码
       
      var arrWrap=document.querySelectorAll(".wrap li");
      for(var i=0;i<arrWrap.length;i++){
	      arrWrap[i].onclick =function(){
	        alert(i)
	      }
	    }
此时点击每个li会弹出什么？结果，弹出的都是4
## 原因分析

 for 循环的里面 var 定义的变量 i 自动提升为全局变量，等同于下面的代码
     var arrWrap=document.querySelectorAll(".wrap li");
      var i;
      for(i=0;i<arrWrap.length;i++){
	      arrWrap[i].onclick =function(){
	        alert(i)
	      }
	    }
这时候 alert(i) 里面的i还没有值，当用户调用 onclick 的匿名函数时，需要对i求值,　解析程序首先会在事件处理程序内部查找，但 i 没有定义。然后，又到方法外部去查找，此时有定义，但此时的i已经循环完毕，因此，无论点哪个标签，弹出的都是最后一个标签的index(4)。



## 解决方案

### let声明
 
      for(let i=0;i<arrWrap.length;i++){
	      arrWrap[i].onclick =function(){
	        alert(i)
	      }
	    }
变量i如果用let声明，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量（js引擎会记住上一轮循环的值），事件处理程序内部查找时都会找到对应的索引变量i

###  立即调用的函数表达式（IIFE）

     for(var i=0;i<arrWrap.length;i++){
        (function(k){
          arrWrap[k].onclick =function(){
	        alert(k)
	      }
        })(i)
	    }
###  将变量 i 保存给在dom对象（li）上

###  将变量 i 保存在匿名函数自身(闭包)

1. [文献1](http://codeguide.bootcss.com/)


