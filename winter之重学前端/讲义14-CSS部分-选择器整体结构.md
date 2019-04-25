## 简单选择器
![](https://static001.geekbang.org/resource/image/4c/ce/4c9ac78870342dc802137ea9c848c0ce.png)

### 类型选择器

    span {display:block}

**命名空间**：如果svg 和 html 中都有 a 元素，我们若要想区分选择 svg 中的 a 和 html 中的 a，就必须用带命名空间的类型选择器。


	@namespace svg url(http://www.w3.org/2000/svg);
	@namespace html url(http://www.w3.org/1999/xhtml);
	
	html|a {
	  color: red;
	}
	
	svg|a {
	  stroke:blue;
	  stroke-width:1;
	}

### 全体选择器

	* {margin:0}

### id 选择器与 class 选择器

略

### 属性选择器

[attribute]	用于选取带有指定属性的元素。
[attribute=value]	用于选取带有指定属性和值的元素。
[attribute~=value]	用于选取属性值中包含指定词汇的元素。
[attribute|=value]	用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
[attribute^=value]	匹配属性值以指定值开头的每个元素。
[attribute$=value]	匹配属性值以指定值结尾的每个元素。
[attribute*=value]	匹配属性值中包含指定值的每个元素。

### 伪类选择器
伪类选择器有普通型和函数型两种,带括号的就是函数型

#### 树结构关系伪类选择器
- `:root` 伪类表示树的根元素，基本等同于html元素

	在声明全局 CSS 变量时 :root 会很有用：
	
		:root {
		  --main-color: hotpink;
		  --pane-padding: 5px 42px;
		}
- `:empty` 伪类表示没有子节点的元素，选择每个没有任何子级的元素（包括文本节点）。

		p:empty{
		  height: 20px;
		  background:#ff0000;
		}
   
- `:nth-child(n)` ， `:nth-of-type(n)` 

        p:nth-child(2)  选择每个p元素是其父级的第二个子元素 
		p:nth-of-type(2)：选择每个p元素是其父级的第二个p元素

- `:nth-last-child(n)`，`nth-last-of-type(n)` 的区别仅仅是从后往前数。

- `:first-child 和 :last-child` , `:first-of-type 和 :last-of-type`分别表示第一个和最后一个元素。

- `:only-child`，`only-of-type` 唯一个子元素和唯一一个同类型子元素。


#### 链接与行为伪类选择器

	:any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
	:link 表示未访问过的链接， :visited 表示已经访问过的链接。
	:hover 表示鼠标悬停在上的元素，
	:active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态
	:focus 表示焦点落在这个元素之上。
	:target 用于选中浏览器 URL 的 hash 部分所指示的元素。demo请访问：http://www.runoob.com/try/try.php?filename=trycss3_target


#### 逻辑伪类选择器
:not(x) 伪类:它匹配不符合参数选择器X描述的元素。X不能包含另外一个否定选择器(函数型伪类)

	:not(.cls){
	  color: aqua
	}
css3 级标准中，not 只支持简单选择器，CSS4功能更强大，但目前还没有浏览器实现它。
## 参考文献
1. [CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)