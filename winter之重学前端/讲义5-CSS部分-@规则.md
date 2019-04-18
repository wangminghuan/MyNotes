<font face="微软雅黑" size="4" >
<font size="6">CSS语法</font>
## css 规则
CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule，也就是普通规则。

## at-rule

at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束。这些 at-rule 在开发中使用机会远远小于普通的规则，所以它的大部分内容，你可能会感觉很陌生。但是at 规则又是掌握 CSS 的一些高级特性所必须的内容。

#### @charset

@charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

	@charset "utf-8";

#### @import
@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。

	@import "mystyle.css";
	@import url("mystyle.css");

#### @media
media 就是大名鼎鼎的 media query 使用的规则了，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。

	@media print {
	    body { font-size: 10pt }
	}
#### @page
@page 规则用于在打印文档时修改某些CSS属性。页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

	@page:first{margin:100px;}

####@ counter-style


#### @ key-frames

keyframes 产生一种数据，用于定义动画关键帧。

	@keyframes diagonal-slide {
	
	  from {
	    left: 0;
	    top: 0;
	  }
	
	  to {
	    left: 100px;
	    top: 100px;
	  }
	
	}

#### @fontface
fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。

	@font-face {
	  font-family: Gentium;
	  src: url(http://example.com/fonts/Gentium.woff);
	}
	
	p { font-family: Gentium, serif; }

#### @support
support 检查环境的特性，它与 media 比较类似。

#### @namespace
用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

#### @viewport
用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 html 的 meta 代替。

#### 其他
除了以上这些，还有些目前不太推荐使用的 at 规则。

1. @color-profile 是 SVG1.0 引入的 CSS 特性，但是实现状况不怎么好。
2. @document 还没讨论清楚，被推迟到了 CSS4 中。
3. @font-feature-values


## 普通规则

普通主要是由选择器和声明区块构成。声明区块又由属性和值构成：

- 选择器
- 声明列表
 - 属性
 - 值
     - 值的类型
     - 函数

#### 选择器

- complex-selector（复合选择器）
    - combinator(组合器)
	    - 空格
	    - >
	    - +
	    - ~
	    - ||
    - compound-selector(复合选择器) 
	    - type-selector(类型选择器)
	    - subclass-selector（子类选择器）
		    - id
		    - class
		    - attribute
		    - pseudo-class(伪类)
    	- pseudo-element(伪元素)


![](https://i.imgur.com/ySJwxQ3.png)

##### 知识点补充：css组合器

1. 空格，后代选择器，选中它的子节点和所有子节点的后代节点。
    
	    div p{
	      color: red;
	    }
	    <div>
	    <p>我是红色</p>
	    <p>我是红色</p>
	    <section><p>我也是红色</p></section>
	    </div>
2. \> ,子代选择器，选中它的子节点，只选中符合条件的子节点，不包含后代节点
		
		div > p{
	      color: red;
	    }
	    <div>
	    <p>我是红色</p>
	    <p>我是红色</p>
	    <section><p>我不是</p></section>
	    </div>

3. \+ ,直接后继选择器，选中它的下一个相邻节点。

		div + p{
	      color: red;
	    }

		  div>
		    <p>我不是</p>
		    <p>我不是</p>
		    <section><p>我不是</p></section>
		  </div>
		  <p>我是红色</p>
		  <p>我不是</p>
		  <section><p>我不是</p></section>

4. ~ ,后继选择器，选中它之后所有的相邻节点。


		div ~ p{
	      color: red;
	    }
		  <div>
		    <p>我不是</p>
		    <p>我不是</p>
		    <section><p>我不是</p></section>
		  </div>
		  <p>我是红色</p>
		  <p>我是红色</p>
		  <section><p>我不是</p></section>
5. ||：列，选中表格中的一列。不太重要，可以忽略

#### 声明：属性和值
声明部分是一个由“属性: 值”组成的序列：  

**属性**是由中划线、下划线、字母等组成的标识符，CSS 还支持使用反斜杠转义。我们需要注意的是：属性不允许使用连续的两个中划线开头，这样的属性会被认为是 CSS 变量。

        //以双中划线开头的属性被当作变量，与之配合的则是 var 函数
		:root {
        --main-color: #06c;
        --accent-color: #006;
        }
        /* The rest of the CSS file */
        #foo h1 {
        color: var(--main-color);
        }
**值**：根据每个 CSS 属性可以取到不同的值，这里的值可能是字符串、标识符。  

CSS 属性值可能是以下类型。

1. CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
2. 字符串：比如 content 属性。
3. URL：使用 url() 函数的 URL 值。
4. 整数 / 实数：比如 flex 属性。
5. 维度：单位的整数 / 实数，比如 width 属性。
6. 百分比：大部分维度都支持。
7. 颜色：比如 background-color 属性。
8. 图片：比如 background-image 属性。
9. 2D 位置：比如 background-position 属性。
10. 函数：来自函数的值，比如 transform 属性。

CSS 支持一批特定的计算型函数：

#### 1. 图片

* filter
    * blur()
    * brightness()
    * contrast()
    * drop-shadow()
    * grayscale()
    * hue_rotate()
    * invert()
    * opacity()
    * saturate()
    * sepia()
* cross-fade()
* element()
* image-set()
* imagefunction()

#### 2. 图形绘制
* conic-gradient()
* linear-gradient()
* radial-gradient()
* repeating-linear-gradient()
* repeating-radial-gradient()
* shape()

#### 3. 布局
* calc()
* clamp()
* fit-content()
* max()
* min()
* minmax()
* repeat()

#### 4. 变形/动画
* transform
    * matrix()
    * matrix3d()
    * perspective()
    * rotate()
    * rotate3d()
    * rotateX()
    * rotateY()
    * rotateZ()
    * scale()
    * scale3d()
    * scaleX()
    * scaleY()
    * scaleZ()
    * skew()
    * skewX()
    * skewY()
    * translate()
    * translate3d()
    * translateX()
    * translateY()
    * translateZ()

#### 5. 环境与元素
* var()
* env()
* attr()

</font>
