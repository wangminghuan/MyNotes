## 选择器的优先级
CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。
	
	id 选择器的数目记为 a；
	伪类选择器和 class 选择器的数目记为 b；
	伪元素选择器和标签选择器数目记为 c；
	“*” 不影响优先级。

CSS 标准建议用一个足够大的进制，获取“ a-b-c ”来表示选择器优先级。

	specificity = base * base * a + base * b + c

- 同一优先级的选择器遵循“后面的覆盖前面的”原则
- 行内属性的优先级永远高于 CSS 规则
- !important优先级高于行内属性

## 伪元素
伪元素本身不单单是一种选择规则，它还是一种机制。伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。  

目前兼容性达到可用的伪元素有以下几种。

	::first-line
	::first-letter
	::before
	::after

#### ::first-line 和 ::first-letter 
二者是比较类似的伪元素，其中一个表示元素的第一行，一个表示元素的第一个字母。

	//首字母变大并向左浮动（一个非常常见的排版方式）
	p::first-letter { 
	  text-transform: uppercase;
	  font-size:2em;
	  float:left; 
	}
CSS 标准规定了 first-line 必须出现在最内层的块级元素之内。

    
    <style>
        div>span#a {
		  color:green;
		}
		div>p#b {
		  color:red;
		}
		div::first-line { 
		  color:blue; 
		}
    </style>
    <div>
      <span id='a'>First paragraph(green)</span><br />
      <span>Second paragraph</span>
    </div>
    <div>
      <p id='b'>First paragraph(blue)</p>
      <p>Second paragraph</p>
    </div>
#### ::before 和 ::after 。

这两个伪元素跟前面两个不同的是，它不是把已有的内容套上一个元素，而是真正的无中生有，造出一个元素。
这两个伪元素所在的 CSS 规则必须指定 content 属性才会生效

## 参考文章
1. [MDN-伪类和伪元素
](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements)