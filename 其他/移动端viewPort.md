##<font face="微软雅黑" size="4" >移动端 ViewPort

**<font size="5" color="red" >一. 物理像素与独立像素</font>**    

**<font color="blue">1.1 CSS中的1px≠设备的1px</font>**  
在桌面浏览器中css的1个像素往往都是对应着电脑屏幕的1个物理像素，但缩放情况下也是不相等的。在桌面浏览器中我们可以不用关心这个，但在移动端随着设备分辨率的不断飙升，我们就必须明白CSS中的1px相当于设备物理像素的几px。  

window对象有一个devicePixelRatio属性：  devicePixelRatio = 物理像素 / 独立像素。css中的px就可以看做是设备的独立像素，通过该属性就可以得到页面中1个css像素与占据几个设备像素（存在一定兼容问题）；

设备分辨率越高，devicePixelRatio值越大，css中1px需要占用的物理像素就越多，这样才能和低分辨率手机看起来一模一样，如果按照实际像素显示，就会太小完全看不清；  

**<font size="5" color="red" >二. ViewPort的三种形式</font>**  
**<font color="blue">2.1 layout viewport</font>**   
**A) 解释** ：某些网站为了viewport太窄而显示错乱，一些移动端浏览器为了适应部分网站（主要指pc页面）就决定默认情况下把viewport设为一个较宽的值，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了（出现横向滚动条）。 layout viewport 的宽度是大于浏览器可视区域的宽度的 

**B) 获取** ：可以通过document.documentElement.clientWidth来获取    

**<font color="blue">2.2 visual viewport</font>**   
**A) 解释** ：因为layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个viewport来代表浏览器可视区域的大小（Android 2, Oprea mini 和 UC 8中无法正确获取）。

**B) 获取** ： 可以通过window.innerWidth来获取

**<font color="blue">2.3 ideal viewport</font>**   
**A)** ideal viewport并没有一个固定的尺寸，是一个能完美适配移动设备的viewport，不同的设备拥有有不同的ideal viewport。所有的iphone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640，也就是说，在iphone中，css中的320px就代表iphone屏幕的宽度。
 
**<font size="5" color="red" >三. meta标签对viewport的控制</font>**  
移动设备默认的viewport是layout viewport，即允许出现横向滚动条的模式。移动端开发我们需要ideal viewport,此时便轮到meta标签出场。  
**<font color="blue">3.1 width=device-width</font>**   
**A)** 要得到ideal viewport就必须把默认的layout viewport的宽度设为移动设备的屏幕宽度:  

	<meta name="viewport" content="width=device-width">
**B)** 经测试此时：在iphone和ipad上，无论是竖屏还是横屏，宽度都是竖屏时ideal viewport的宽度。  


**<font color="blue">3.2 initial-scale=1.0</font>**   
**A)** 通过设置缩放值，同样可以得到ideal viewport，这是因为缩放是相对于 ideal viewport来进行缩放的：

	<meta name="viewport" content="initial-scale=1">

**B)** 经测试此时： windows phone 上的IE 无论是竖屏还是横屏都把宽度设为竖屏时ideal viewport的宽度  

**<font color="blue">3.3  width=device-width, initial-scale=1.0</font>**   
**A)** 我们将二者同时进行设置，就完美兼容了所有问题，得到了ideal viewport。

	<meta name="viewport" content="width=device-width, initial-scale=1">
**B)**  如果ideal viewport的宽度为320时，我们按下面设置又会怎样？  

	<meta name="viewport" content="width=400, initial-scale=1">

此时，浏览器会取它们两个中较大的那个值，即：400px; 但在uc9浏览器中，只要设置了initial-scale=1，width属性的值将直接被忽略；  

**<font size="5" color="red" >四. meta中viewport更多</font>**  
**<font color="blue">4.1 关于缩放</font>**   
前面已经提到过，缩放是相对于ideal viewport来缩放的。缩放值越大，当前viewport的宽度就会越小。譬如：在iphone中，ideal viewport的宽度是320px，此时设置 initial-scale=2 ，放大了一倍，在实际宽度不变的情况下，1px变得跟原来的2px的长度一样了，故原来需要320px才能填满的宽度现在只需要160px就做到。即：  

	visual viewport宽度 = ideal viewport宽度  / 当前缩放值 
大多数浏览器都符合这个理论，在安卓上的原生浏览器以及IE有些问题；一般默认情况下都是设置为1；  

**<font color="blue">4.1 关于initial-scale的默认值</font>**   
在iphone和ipad上，无论你给viewport设的宽的是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条。安卓则木有默认值。

参考文章：   
1. [移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)  
</font>  
******

