<font face="微软雅黑" size="4" >
<font size="6">JS中的表达式和语句</font>

## 表达式
表达式：是由运算元和运算符(可选)构成，并产生运算结果的语法结构。

### 基本表达式
1. 直接量
   
	    2.23 //数字直接量
	    "hello" //字符串直接量
	    /name/g //正则直接量

2. 保留字，关键字：true false this、null、arguments等；
3. 变量：i sum undefined等（undefined是全局变量不是关键字）；
4. 正则中的分组表达式：

         /test(\d+)/ // (\d+)就是分组表达式

这类表达式是原子表达式，是无法再分解的表达式

### 复杂表达式
1. 数组&&对象表达式  

		   [1+2,3+4]          //数组表达式
		   {x:2.3, y:-1.2}    //对象表达式
          var arr=[{x:2.3},{y:-1.2}] //数组初始化表达式
          var obj={x:[1+2,3+4]}     //对象初始化表达式
   
2. 函数定义表达式

		var quare = function(x) { return x * x;}//也称为函数直接量
3. 属性访问表达式

		o.x
4. 调用表达式

		f(0)
		Math.max(x, y, z)
		a.sort()
5. 对象创建表达式

		new Object()
		new Point(2,3)
#### 运算符表达式
多数运算符都是通过标点符号表示的，如：+，-，！等，但也有些是通过关键字表示的，如：typeof , instanceof等。  
部分运算符是会产生副作用，如，"++","="等，如果给一个变量赋值，使用这些变量的表达式的值都会被改变。  
一元操作符，赋值和三元条件运算符都具有从右至左的结合性。
  
1. 算术表达式  

         1 + 2
         8 % 2
         i++

2. 关系表达式

         7 ！= 8
		 5 == 5
         a<b
        var point={x:1,y:1}; //对象初始化表达式
        "x" in point   // true :对象有一个名为"x"的属性
        "z" in point   // true :对象不存在名为"z"的属性
        "toString" in point   // true :对象继承了toString方法
       
        var data=[7,8,"9"];
		"9" in data  //false,转换成数字，不存在索引为9的值
		7 in data  //false ,不存在索引为7的值
		0 in data  //true，,存在索引为0的值
    
        data instanceof Array //true, data是数组
       

2. 逻辑表达式  

	      if(a==b) stop();
	     （a==b） && stop(); //短路特性，代码中常用,等同于上面的if判断
      	 !(p && q)===!p || !q ;//逻辑非具有很高优先级
    
7. 赋值表达式  
左操作数是变量、对象属性、数组元素, 右操作数是任意值	

		i = 0
        obj.name="jack" 
        i=j=k=0 //从右至左，将三个变量初始化为0
        sum+=num //加法和赋值的组合操作，还有-=，*=， /=等

8. 表达式计算-eval  
eval()其实是一个函数，但已经被当做运算符来对待了。它接受一个字符串参数，如果不是字符串就直接返回这个参数。是字符串会将字符串编译成js代码。编译成功则立即执行代码，编译失败则抛出错误。

		eval("alert(1)")
9. 其他运算符（三元运算符，typeof, delete, void, 逗号）
       
         x > 0 ? x : -x //js中唯一一个三元运算符
         
         typeof x  //返回对象类型，"undefined","object","boolean","number","string","function"
         
         var o={x:1,y:1};
         delete o.x; //删除成功返回 true ，用户通过var语句声明的变量无法删除，严格模式下无效
         "x" in o; // fasle, 属性已经不存在
      
         void "jack" // 返回undefined，忽略操作数的值，没什么用途
   
          var i=0 ,k=0; //逗号运算符，二元运算，多用于声明多个变量
          var num = (5,4,0)//num的值为0； 逗号运算符还可用于赋值，返回表达式最后一项
JavaScript表达式总有返回值，其中，单值表达式的结果是值本身，其他表达式结果是根据运算符进行运算的结果值。  



##语句

语句：JavaScript代码由语句构成，表明了执行过程的流程、限定和约定，形式上可以是单行语句，也可以是由大括号括起来的复合语句。语句由分号来分隔。语句是“使某事发生”的指令，不存在返回值一说。

如：if，for等都属于语句
## 参考文章
1. [js编程指南之语法基础](http://pij.robinqu.me/JavaScript_Core/JavaScript_Basics/Expressions.html)

2. [知乎-js语句和表达式的区别](https://www.zhihu.com/question/39420977)
