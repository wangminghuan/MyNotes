##IE6下PNG透明的8种方法

**<font size="4" color="red" face="微软雅黑">方案1 - 滤镜解决方案</font>**
>注意：此方法在部分版本的IETest中无效，建议使用标准的IE6来进行测试！
  
    #pics{
            background:url(../images/W3CfunsLogo.png) no-repeat;

           /*以下为IE6设置PNG透明代码*/
             _background:none;   
             _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="images/W3CfunsLogo.png");     
          }

**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        1、绿色无插件；  
        2、效率高，速度快；  
        3、网速慢的时候，不会出现先灰底再透明的情况，支持远程图片；  
        4、支持Hover等伪类，但是得使用两张图片，网速慢的情况下，会导致第二张图片暂时无法显示，因为还没有完全载入；

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
        1、不支持平铺，虽然filter有sizingMethod="scale", 拉伸缩放模式，但是图片会变形，如果单纯的颜色或简单的渐变色还能横向平铺；   
        2、**不支持Img标签**；   
        3、不支持CSS Sprite；   

**<font size="3" color="blue" face="微软雅黑">使用场景：</font>**  
        1、当没有img引入png时可考虑；   
        2、当没有CSS Sprite需求时可考虑；  
        3、当没有平铺需求时候可考虑；  
******
**<font size="4" color="red" face="微软雅黑">方案2 - 纯CSS解决方案：</font>**
>虽说是纯CSS解决方案，但是也使用了JavaScript来运算，只不过是将脚本写到了CSS文件中，遗憾的是，此方案只支持img标签，对背景图片无效。
  
    <style type="text/css">
     img{
              _azimuth:expression(this.pngSet?this.pngSet=true:(this.nodeName == "IMG" && this.src.toLowerCase().indexOf('.png')>-1?(this.runtimeStyle.backgroundImage = "none",this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='image')",this.src = "images/blank.gif"):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace('url("','').replace('")',''),this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.origBg + "', sizingMethod='crop')",this.runtimeStyle.backgroundImage = "none")),this.pngSet=true);
          }
      </style>
**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        CSS代码看起来似乎很优雅，至少没有乱七八糟的文件了，基本没有外加的文件，效率还算不错。

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
        1、多引入了一个本不应该存在的blank.gif图片文件；  
        2、**不支持背景图；**  
        3、当文件载入之前，会先暂时呈现灰底；  
        4、不支持Hover等伪类；  
  
******
**<font size="4" color="red" face="微软雅黑">方案3 - 原生JavaScript解决方案：</font>**
>利用了滤镜原理来实现，但由于此javascript没有读取css文件中的样式，所以此方案同样只支持img标签，对背景图片无效  

只有IE6的时候才调用执行此JavaScript，点击下载js文件[iepngfix.zip](http://www.daimajiayuan.com/code/down/jsdm/iepngfix.zip)

    <head>
    <!--[if IE 6]><script type="text/javascript" src="Pics/iepngfix.js"></script><![endif]-->
    </head>
**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        代码看起来似乎很优雅，基本没有外加的文件，效率还算不错。

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
        1、额外加入了js文件，增加http请求；  
        2、**不支持背景图；**  
        3、当文件载入之前，会先暂时呈现灰底；   
        4、不支持Hover等伪类；  
******

**<font size="4" color="red" face="微软雅黑">方案4 - PNG8格式的图片解决方案</font>**
>png8和gif都是8位的透明度，IE6与生俱来就支持png8的索引色透明度，但不支持png或8位以上的 alpha 透明度。而对于非动画的GIF建议你使用PNG8，因为体积会更小

**<font size="3" color="blue" face="微软雅黑">优点：</font>**    
        效率高，速度快；  

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
        png8格式的只能处理色彩简单的透明图片；

******
**<font size="4" color="red" face="微软雅黑">方案5 - HTC插件解决方案</font>**
>从IE 5.5版本开始，IE开始支持Web 行为的概念。这些行为是由后缀名为.htc的脚本文件描述的，它们定义了一套方法和属性，程序员几乎可以把这些方法和属性应用到HTML页面上的任何元素上去。  
  
1、首先下载压缩文件[htc.zip](http://www.daimajiayuan.com/code/down/jsdm/htc.zip)  
2、打开HTC文件，大约在第16行更改blankImg变量，修改blank.gif路径像这样：同样路径相对于HTML文件的位置 （不相对于CSS文件！）  
3、在css中将需要使用透明PNG的元素与.htc文件关联，例如

     <style type="text/css">
	    div{behavior:url('Pics/iepngfix.htc');}
	    #div1{width:344px; height: 344px;margin:0 auto;background: url('Pics/001.png');}
    </style>
**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
          1、一次性配置好，只需要像平时一样引入png图片，也不需要考虑png相对于html路径的问题，当目录有所变化，只需要修改htc文件或css中htc文件路径即可。  
        2、支持平铺属性。   
        3、**不支持Img标签；**  
        4、不支持Hover等伪类；   

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
         1、多引入了js、图片和htc，共三个文件；   
        2、不支持CSS Sprite；   
        3、当文件载入之前，会先暂时呈现灰底；   

******
**<font size="4" color="red" face="微软雅黑">方案6 - DD_belatedPNG解决方案（推荐）</font>**   

目前所用的png图片透明解决方案基本都是使用滤镜、xpression解决的、透明gif替代。但是这些方法都有一个缺点,就是不支持CSS中backgrond-position与background-repeat。而这次的js插件使用了微软的VML语言进行绘制且不需要引入其他文件，一个小小的js就可以完美解决png图片bug就连img标签和hover伪类也可以很好的解决。  
使用方法：
1、首先下载此方案所用到的文件[DD_belatedPNG.zip](http://www.daimajiayuan.com/code/down/jsdm/DD_belatedPNG.zip)  
2、引入刚下载的js文件，同样由于此js只有使用IE6时才有用，所以为了让我们的页面更加高效的执行，我们可以将上方代码修改如下，只有IE6的时候才调用执行此JavaScript：

	<!--[if IE 6]><script type="text/javascript" src="js/DD_belatedPNG.js"></script><![endif]-->
3、调用函数，设置参数如下：  
  DD_belatedPNG.fix("#pngImg,#pics,#picsRepeat");
其中传入的参数为所使用png图片的标签的ID、类样式和标签名称  

同样也可以按照下方这样来写
  DD_belatedPNG.fix("#content img");  

如果为链接和链接的hover设置透明，那么您按照下方这么来写，在部分版本里面可以不用加入:hover直接写选择器即可，但是为了保险，建议咱们还是加上:hover：
   DD_belatedPNG.fix("#links,#link:hover"); 

**技巧：** 使用DD_belatedPNG.fix(".pngFix,.pngFix:hover")写法时，只需要对应标签加上class="pngFix"就行了，如：class="abc cbc pngFix"，

使用此方法的时候，需要加载两个js文件，我们可以直接在DD\_belatedPNG.js文件的尾部加入如下代码即可：  
            
         window.onload = function()
             {
                 DD_belatedPNG.fix(".pngFix,.pngFix:hover");
             }
此时需要引入此JS，在需要透明的标签上加入class="pngFix"即可！！！！！
**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        1、CSS代码无需任何修改，按照平时的思路来写即可；   
        2、无需配置；   
        3、没有多余的gif图片；   
        4、支持img；   
        5、支持平铺；   
        6、支持CSS Sprite；   
        8、支持Hover等伪类；      

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
         1、额外加入了js文件（6.39k）和http请求，可以忽略不计；   
        2、当文件载入之前，会先暂时呈现灰底；   
        3、js文件过多的时候，可能会报错，导致js无法正常运行（这种情况极少出现，可以忽略不计）；     

****  
**<font size="4" color="red" face="微软雅黑">方案7 - EvPng解决方案（实测无效）：</font>** 
>此方案与第七种方案差不多，使用方法也如出一辙，效果也非常不错。  

使用方式同上，点击下载[EvPng.zip](http://www.daimajiayuan.com/code/down/jsdm/EvPng.zip)  

**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        1、CSS代码无需任何修改，按照平时的思路来写即可；   
        2、无需配置；   
        3、没有多余的gif图片；   
        4、支持img；   
        5、支持平铺；   
        6、支持CSS Sprite；   
        8、支持Hover等伪类；      

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
1、额外加入了js文件（文件4.93k，比DD\_belatedPNG的6.39k还小）和http请求，可以忽略不计；   
2、当文件载入之前，会先暂时呈现灰底；   
3、js文件过多的时候，可能会报错，导致js无法正常运行（这种情况极少出现，可以忽略不计）；  
4、使用CSS Sprite技术的hover效果在部分情况下top可能会有1像素的偏差。

**<font size="3" color="blue" face="微软雅黑">使用情况：</font>**    
 1、当前7种方法均不能解决问题的时候可考虑；  
2、当DD_belatedPNG效果不理想的时候可以考虑；    

***** 
**<font size="4" color="red" face="微软雅黑">方案7 - jQuery解决方案（实测无效）</font>**
>jQuery为我们带来了很大的方便，jQuery没有让我们有太大的失望，img和png都同时得以支持，唯一美中不足的还是无法平铺，无法使用CSS Sprite。

**<font size="3" color="blue" face="微软雅黑">优点：</font>**  
        1、CSS代码看起来很优雅，只需要引入js进行简单的配置一下就行了，效率还算不错；  
        2、**支持背景图，支持img**；

**<font size="3" color="blue" face="微软雅黑">缺点：</font>**  
        1、额外加入了js文件和图片文件，增加http请求；   
        2、加载了一个庞大的jQuery类库；   
        3、多库共存的时候可能会出现问题；  
        4、不支持平铺；   
        5、不支持CSS Sprite；   
        6、当文件载入之前，会先暂时呈现灰底；  
        7、不支持Hover等伪类；   

**<font size="3" color="blue" face="微软雅黑">使用场景：</font>**  
        当您的项目中使用jQuery的时可以考虑；
******

[更多详细参考请点我](http://www.w3cfuns.com/thread-297-1-1.html)
        