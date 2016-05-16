##IE6下常见BUG

 
开发前端的同学一定都知道，IE6是兼容BUG最多的浏览器，它不支持PNG alpha通道暂且不论。其文档的解析理解规范也引起了诸多恼人的BUG，有时甚至让人感到绝望。本文主要讲解一些比较容易遇到的IE6BUG，以及解决的办法。

******
**<font size="4" color="red">一、IE6双倍边距bug</font>** 

当页面上的元素使用float浮动时，不管是向左还是向右浮动；只要该元素带有margin像素都会使该值乘以2，例如“margin-left:10px” 在IE6中，该值就会被解析为20px。想要解决这个BUG就需要在该元素中加入display:inline 或 display:block 明确其元素类型即可解决双倍边距的BUG

******
**<font size="4" color="red">二、IE6中3像素问题及解决办法</font>** 

当元素使用float浮动后，元素与相邻的元素之间会产生3px的间隙。诡异的是如果右侧的容器没设置高度时3px的间隙在相邻容器的内部，当设定高度后又跑到容器的相反侧了。要解决这类BUG的话，需要使布局在同一行的元素都加上float浮动。

******
**<font size="4" color="red">三、IE6中奇数宽高的BUG</font>** 

IE6中奇数的高宽显示大小与偶数高宽显示大小存在一定的不同。其中要问题是出在奇数高宽上。要解决此类问题，只需要尽量将外部定位的div高宽写成偶数即可。

******
**<font size="4" color="red">四、IE6中图片链接的下方有间隙</font>** 

IE6中图片的下方会存在一定的间隙，尤其在图片垂直挨着图片的时候，即可看到这样的间隙。要解决此类问题，需要将img标签定义为display:block 或定义vertical-align对应的属性。也可以为img对应的样式写入font-size:0

******
**<font size="4" color="red">五、IE6下空元素的高度BUG</font>** 

如果一个元素中没有任何内容，当在样式中为这个元素设置了0-19px之间的高度时。此元素的高度始终为19px。

解决的方法有四种:

1.在元素的css中加入：overflow:hidden

2.在元素中插入html注释：<!– >

3.在元素中插入html的空白符：&nbsp;

4.在元素的css中加入：font-size:0

******
**<font size="4" color="red">六、重复文字的BUG</font>** 

在某些比较复杂的排版中，有时候浮动元素的最后一些字符会出现在clear清除元素的下面。

解决方法如下：

1.确保元素都带有display:inline

2.在最后一个元素上使用“margin-right:-3px

3.为浮动元素的最后一个条目加上条件注释，<!–[if !IE]>xxx<![endif]–>

4.在容器的最后元素使用一个空白的div，为这个div指定不超过容器的宽度。
******
**<font size="4" color="red">七、IE6中 z-index失效</font>** 

具体BUG为，元素的父级元素设置的z-index为1，那么其子级元素再设置z-index时会失效，其层级会继承父级元素的设置，造成某些层级调整上的BUG。详细解释可以阅读IE6中部分情况下z-index无效的原因，以及解决办法
******
**<font size="4" color="red">八、IE6中 overflow:hidden失效</font>** 

当父元素的直接子元素或者下级子元素的样式拥有position:relative 属性时，父元素的overflow:hidden 属性就会失效。

解决办法：

我们在IE 6、7 内发现子元素会超出父元素设定的高度，即使父元素设置了overflow:hidden。
解决这个bug很简单，在父元素中使用 *position:relative; 即可解决该bug
******
**<font size="4" color="red">八. 总结</font>**   
实际上IE6中，很多BUG的解决方法都可以使用display:inline、font-size:0、float解决。因此我们在书写代码时要记住，一旦使用了float浮动，就为元素增加一个display:inline样式，可以有效的避免浮动造成的样式错乱问题。使用空DIV时，为了避免其高度影响布局美观，也可以为其加上font-size:0 这样就很容易避免一些兼容上的问题。