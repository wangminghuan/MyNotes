## 正常流的行为
我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。

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