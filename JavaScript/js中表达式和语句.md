<font face="微软雅黑" size="4" >
<font size="6">JS中的表达式和语句</font>

## 表达式
表达式：是由运算元和运算符(可选)构成，并产生运算结果的语法结构。

### 基本表达式

以下在ES5中被称为基本表达式（Primary Expression）

1. this、null、arguments等内置的关键字
2. 变量。即一个已声明的标识符
3. 字面量。仅包括数字字面量、布尔值字面量、字符串字面量、正则字面量
4. 分组表达式，即用来表示立刻进行计算的

这类表达式是原子表达式，是无法再分解的表达式

### 复杂表达式
1. 数组&&字面量表达式  

		   [1+2,3+4]
		   {x:2.3, y:-1.2}
2. 函数定义表达式

		var quare = function(x) { return x * x;}
3. 属性访问表达式

		o.x
4. 调用表达式

		f(0)
		Math.max(x, y, z)
		a.sort()
5. 对象创建表达式

		new Object()
		new Point(2,3)
6. 算数，逻辑，关系表达式

         1 + 2
7. 赋值表达式
		
		i = 0

JavaScript表达式总有返回值，其中，单值表达式的结果是值本身，其他表达式结果是根据运算符进行运算的结果值。

##语句

语句：JavaScript代码由语句构成，表明了执行过程的流程、限定和约定，形式上可以是单行语句，也可以是由大括号括起来的复合语句。语句由分号来分隔。语句是“使某事发生”的指令，不存在返回值一说。

如：if，for等都属于语句
## 参考文章
1. [js编程指南之语法基础](http://pij.robinqu.me/JavaScript_Core/JavaScript_Basics/Expressions.html)

2. [知乎-js语句和表达式的区别](https://www.zhihu.com/question/39420977)
