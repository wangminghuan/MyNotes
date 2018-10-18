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
//循环再执行时，会立即执行这个命名函数，每个自执行函数可以立即为一个代码块，其内部变量与外部是隔离的，所以每次传入的i在函数内部被转换为变量k,每个k都是一个新变量。
###  将变量 i 保存给在dom对象（li）上

    for(var i=0;i<arrWrap.length;i++){
         arrWrap[i].i=i;
            arrWrap[i].onclick =function(){
              alert(this.i)
            }
          }
事件处理程序执行时，会从该对象的属性i上取值，此时值已经被保存，每次点击可以弹出索引
###  闭包解决（不推荐）

     for(var i=0;i<arrWrap.length;i++){
            arrWrap[i].onclick =(function(k){
              return function(){
                alert(k)
              }
            })(i);
          }
闭包引用外部变量后，暂时不会被系统回收，onclick后面的代码即为：立即执行一个函数，并且将i变量传递进去，执行函数的时候，内部返回了一个函数，同时，返回的函数内部会引用该参数，因而锁定了此变量。
1. [文献1](http://codeguide.bootcss.com/)


