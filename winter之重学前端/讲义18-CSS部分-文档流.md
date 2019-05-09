## 正常流的行为
我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理:

- 当遇到块级盒：排入块级格式化上下文。
- 当遇到行内级盒或者文字：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
- 遇到 float 盒：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。


## 正常流实现的两种布局

### 等分布局
    
	//css样式
    .outer {
      width: 101px;
      /* 在某些浏览器中，因为像素计算精度问题，还是会出现换行，我们给 outer 添加一个特定宽度： */
      font-size: 0;
      /* 解决换行和空格被 HTML 当作空格文本，跟 inline 盒混排了的问题。 */
    }

    .inner {
      width: 33.33%;
      height: 300px;
      display: inline-block;
      outline: solid 1px blue;
    }

    .inner:last-child {
      margin-right: -5px;
      /* 解决某些旧版本浏览器中会出现换行的问题 */
    }
     
    //html
    <div class="outer">
	    <div class="inner"></div>
	    <div class="inner"></div>
	    <div class="inner"></div>
    </div>

### 自适应宽
自适应宽（一个元素固定宽度，另一个元素填满父容器剩余宽度）是个经典的布局问题，我们现在就看一下如何使用正常流来解决：

    .outer {
      font-size: 0;
    }

    .fixed,
    .auto {
      outline: solid 1px red;
      display: inline-block;
      vertical-align: top;
      height: 300px;
    }

    .fixed {
      width: 200px;
    }
    .auto {
      width: 100%;
      margin-left: -200px;
      padding-left: 200px;
      box-sizing: border-box;
    }

    //html文件
	 <div class="outer">
	    <div class="fixed"></div>
	    <div class="auto"></div>
	 </div>
## BFC
### 特点

- BFC可以包含浮动元素（闭合浮动）
- BFC所确定的区域不会与外部浮动元素发生重叠
- 位于同一BFC下的相邻块级子元素在垂直方向上会发生margin重叠
- 位于不同BFC下的相邻元素之间不会发生margin重叠

将以上特点一言以蔽之，即BFC在页面上是一个封闭的区域，如同“结界”一般。即便是内部的浮动元素也无法脱离该区域。该区域内部的子元素无法影响区域外部，同时也不受外部影响。

### 如何触发/创建BFC
满足下面任一条件即可：

- <html\>根元素
- float的值不为none
- overflow的值为auto、scroll或hidden
- display的值为table-cell、table-caption或inline-block
- position的值为fixed或absolute

### BFC的常见用途

#### 闭合浮动

	#container {
	 overflow: auto;  /* 创建BFC */
	}
#### 阻止margin重叠

发生重叠的代码：

	/* HTML代码 */
	<div id="box1">我是box1</div>
	<div id="box2">我是box2</div>
	
	/* CSS代码 */
	#box1 {
	    margin-bottom: 20px;
	    background-color: lightskyblue;
	}
	
	#box2 {
	    margin-top: 20px;
	    background-color: orange;
	}
创建BFC解决：

	/* HTML代码 */
	<div id="box1">我是box1</div>
	<div id="bfc">
	    <div id="box2">我是box2</div>
	</div>
	/* CSS代码 */
	#bfc {
	    overflow: auto;  /* 创建BFC */
	}
#### 自适应流体布局

BFC最强大的用途其实是用于自适应流体布局，这是基于BFC所确定的区域不会与外部浮动元素发生重叠的特性实现的。  

假设我们需要创建一个左侧宽度固定为200px，右侧宽度自适应的两列布局，一般情况下有如下解决方案：

	/* HTML代码 */
	<div id="layout">
	    <div id="left"></div>
	    <div id="right"></div>
	</div>
	
	/* CSS代码 */
	#layout{
	    overflow: auto;   /* 创建BFC闭合浮动 */ 
	}
	
	#left {
	    width: 200px;
	    float: left;
	}
	
	#right {
	    margin-left: 200px;
	}
创建BFC解决：

	#right {
	    overflow: auto;  /* 创建BFC */
	}

## 参考文章
1. [BFC的理解和运用](https://www.jianshu.com/p/4ed27e9ea441)