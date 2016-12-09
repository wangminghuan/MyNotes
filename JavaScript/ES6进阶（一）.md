<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习（一）</font>


## 1 let和const

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1 let
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

	{
	  let a = 10;
	  var b = 1;
	}
	console.log(b);//1
	console.log(a);//ReferenceError: a is not defined.

特别对于for循环中i参数的锁定问题：

	for (let i = 0; i < 10; i++) {}
	
	console.log(i)//
#### [强制] 当一个 `rule` 包含多个 `selector` 时，每个选择器声明必须独占一行。

示例：


	/* good */
	.post,
	.page,
	.comment {
	    line-height: 1.5;
	}
	
	/* bad */
	.post, .page, .comment {
	    line-height: 1.5;
	}


##  参考文献

1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)


