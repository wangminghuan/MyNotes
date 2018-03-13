<font face="微软雅黑" size="4" >
<font size="6">JS中的表达式和语句</font>

## 一、表达式
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



## 二、语句

语句：JavaScript代码由语句构成，表明了执行过程的流程、限定和约定，形式上可以是单行语句，也可以是由大括号括起来的复合语句。语句由分号来分隔。语句是“使某事发生”的指令，不存在返回值一说。js程序就是一个以分号间隔的语句集合。

### 1. 表达式语句

具有副作用的表达式是js中最简单的语句如:

1. 赋值语句：`i=4`
2. 递增语句：`i++`
3. delete语句: `delete o.x`
4. 函数调用语句: `Math.random()`

### 2. 复合语句 && 空语句
1. 通过花括号 {} 将多条语句联合在一起就是形成了一条复合语句
2. 符合语句结尾处不需要加分号；
3. ES5中没有块级作用域，变量只有全局作用域和函数作用域。

		{
		 var name="jack";
		 Math.random()
		}
		console.log(name);//依旧可以输出 "jack"
		console.log(sex);//报错，let,const 实际上为 JavaScript 新增了块级作用域。
4. 一个分号就可以形成一条空语句，编程时一定要注意这些不起眼的分号：

		   if(a<3) 
		   console.log("bingo!"); //只有在a<3时才会执行
		   
		   if(a>6);  //加上分号其他就是加了一条空语句
		   console.log("bingo!");//这行代码总会执行

### 3. 声明语句

1. 可以用var语句声明一个或多个变量（通过逗号运算符）。
2. 多次声明同一个变量是无所谓的，后面会覆盖前面。
3. 函数定义也可以写成语句的形式（函数体内的花括号是必须的）
   
        var f=function(x){ //函数定义表达式
        	return x+1
        };
        function fn(x){ //函数声明语句
        	return x+1
        }
4. 函数声明正常情况下是不允许出现在if, while等其他语句中的（这也是ECMA并没有将函数声明归位真正语句的原因），但有些实现（如chrome）是允许的：

		var a=62;
		fn();// 输出: "我是fn"
		if(a<3){
			function fn(){
			   console.log("我是fn")
			}
		}
上述代码在Node环境下是会报错的：

		TypeError: fn is not a function
所以尽量避免上述写法。		

### 4. 条件语句（if else, switch）
1. else总是和就近的if语句匹配。
2. switch语句的匹配是按"==="处理的。
3. switch语句中break是用于跳出switch语句的，如果要跳出函数体可以直接用return；
4. switch语句中的default，实际上可以出现在switch语句中的任何位置。如果没有默认处理，也可以不写。

### 5. 循环语句（for, for in, while, do while）
1. while语句
    
	     var count=0;
	     while(count<10){
	      console.log(count);//输出0-9
	      count++;
	     }
while(true)是死循环    

2. do while语句
     
	       var count=0;
			do {
				console.log(count);//至少执行一次，不管循环条件是否成立
			} while(++count < 10);
3. for循环
     
	       for(var count=0;count<10;count++){
	         console.log(count)
	       }      
循环变量并非都是数字：
     
	       var m={next:true}; 
			function tail(o){
			  for(;o.next;o=o.next){
	              return o;//判断参数对象是否含有next属性，且属性为真值 
	          }
	       }
	       tail(m);// {next:true}
for(;;)是死循环      
4. for in 循环
  
	      for(var key in obj){
	         console.log(obj[key])
	      }
由于ECMAScript 对象的属性没有顺序。因此，通过 for-in 循环输出的属性名的顺序是不可预测的。即：所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异。  
同时，ECMA5之前的解释器，对于对象属性为null或undefined时会抛出错误，而ECMA5则不抛出错误，而只是不执行循环体；

### 6. 跳转语句
1. label语句

		start: for (var i=0; i < count; i++) { //标签名与后面的语句不能换行
		     console.log(i);
		    }
相当于为这段代码添加了一个锚点名称，该标签可以在将来由 break 或 continue 语句引用。但只能在一个函数体内部跳转，无法跳转到函数外部

2. break & continue语句  
break 语句会立即退出循环，继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但只是退出了本次循环，退出循环后会从循环的顶部继续执行。  
break 和 continue 语句都可以与 label 语句联合使用，从而返回代码中特定的位置。这种联合使用的情况多发生在循环嵌套的情况下。

3. return 语句: 只能出现再函数体内，函数体内执行到return后，后续代码均不再执行
4. throw 语句:

		function fn(o){
		 if(typeof o==="undefined") throw new Error("arguement is undefined!!");
		  console.log("success")
		}
		fn()
此时控制台会直接抛出错误（后续代码均不再执行）：
	
		VM4454:2 Uncaught Error: arguement is undefined!!
	    at fn (<anonymous>:2:36)
	    at <anonymous>:5:1
例如rect开发库就使用了很多类似的处理。用来给开发者再开发过程中给予提示。	  
5. try/catch/finally

		try{
		  var name=undefName;
		
		}catch(e){
		 console.log(e)
		}finally{
		  console.log('try catch is running!!');
		  //不管try语句是否抛出异常，finally都会执行
		}
此时控制台输出结果为：

		VM5110:5 ReferenceError: undefName is not defined
		    at <anonymous>:2:12
		VM5110:7 try catch is running!!
try/catch/finally 代码必须用花括号，即使只有一行代码。finally不是必须的,一般情况下try catch组合使用，也可以使用try finally组合，但单独使用try是错误的。

### 7. 其他语句（with, dedugger,user strict）
1. with语句：可以临时扩展作用域链，可以简化多次编写同一个对象的工作：

		var qs = location.search.substring(1);
		var hostName = location.hostname;
		var url = location.href;
		上面几行代码都包含 location 对象。如果使用 with 语句，可以把上面的代码改写成如下所示：
		
		with(location){
		var qs = search.substring(1);
		var hostName = hostname;
		var url = href;
		}
		//严格模式不允许with语句，同时大量with语句会导致性能下降，开发时不建议使用
2. 因为只有再查找对象时候才用到作用域链，所以with语句给对象赋值是无效的：

		    with(o){
		      x=1
		    }
		    //o.x依旧未定义，只是定义了一个全局变量x。
3. debugger语句：用于调试代码，给代码加上断点，但需要浏览器开启开发者工具才可以工作：
4. 
          function fn(o){
           if(o=== undefined) debugger;//如果没传入参数，会自动给这里加上断点
           // other code ....
          }
    
4. user strict：ES5新增，其实是一条指令，而非语句，只是与语句很相似。目的是告诉支持该指令的实现，将后续代码解析为严格模式，所以最好放到代码最顶端。

## 参考文章
1. [js编程指南之语法基础](http://pij.robinqu.me/JavaScript_Core/JavaScript_Basics/Expressions.html)

2. [知乎-js语句和表达式的区别](https://www.zhihu.com/question/39420977)
