<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（二）</font>


## 1 属性的简洁表示法

 ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

 
		const obj={
           data(){
			return "hello"
		  },
          method:{
              jump(){
                 return "word"
              }
            }
		}
 等同于：

		const obj={
           data:function(){
			return "hello"
		  },
          method:{
              jump:function(){
                 return "word"
              }
            }
		}
其实也可以看出来简易写法也就是vue组件的写法；  
