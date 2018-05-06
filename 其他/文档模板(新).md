<font face="微软雅黑" size="4" >
<font size="6">标题</font>


## 1 代码风格 
>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2

### 1.1 选择器  

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

1. [文献1](http://codeguide.bootcss.com/)


