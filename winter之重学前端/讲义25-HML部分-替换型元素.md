## script 标签
script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。
    
写法一：

	<script type="text/javascript">
	console.log("Hello world!");	
	</script>

写法二：
	
	<script type="text/javascript" src="my.js"></script>

上述两种写法是等效的，可以发现：**凡是替换型元素，都是使用 src 属性来引用文件的，而链接型元素是使用 href 标签的**  

但是对于样式来说：style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，当然就是用 href。

## img 标签
我们最熟悉的替换型标签就是 img 标签。它的的作用是引入一张图片。这个标签是没有办法像 script 标签那样作为非替换型标签来使用的，它必须有 src 属性才有意义。   

如果一定不想要引入独立文件，可以使用 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果，这是一个常用的技巧。


### alt 属性

这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

### srcset 和 sizes
img 标签还有一组重要的属性，那就是 srcset 和 sizes，这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源：

	
	 <img srcset="elva-fairy-320w.jpg 320w,
	     elva-fairy-480w.jpg 480w,
	     elva-fairy-800w.jpg 800w"
	   sizes="(max-width: 320px) 280px,
	    (max-width: 480px) 440px,
	    800px"
	  src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
在不同的屏幕尺寸从1000到200缩小的过程中会依次加载：`elva-fairy-800w.jpg, elva-fairy-480w.jpg, elva-fairy-320w.jpg`。  

但是其实更好的做法，是使用 picture 元素。

## picture 标签
picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源，它的基本用法如下：

	<picture>
	  <source srcset="https://zuhaowan.zuhaowan.com/v1/channel/img/bg_01.png" media="(min-width: 600px)">
	  <source srcset="https://zuhaowan.zuhaowan.com/v1/channel/img/bg_02.png" media="(min-width: 300px) and (max-width: 600px)" >
	  <img src="https://zuhaowan.zuhaowan.com/v1/channel/img/first.png">
	</picture>
它跟 img 搭配 srcset 和 sizes 不同，它使用 source 元素来指定图片源，并且支持多个。这里的 media 属性是 media query，跟 CSS 的 @media 规则一致。

## video标签
在 HTML5 早期的设计中，video 标签跟 img 标签类似，也是使用 src 属性来引入源文件的，不过，考虑到了各家浏览器支持的视频格式不同，现在的 video 标签跟 picture 元素一样，也是提倡使用 source 的。

早期写法：

    <video controls="controls" src="movie.ogg"></video>

现代写法：

	<video controls="controls" >
	  <source src="movie.webm" type="video/webm" >
	  <source src="movie.ogg" type="video/ogg" >
	  <source src="movie.mp4" type="video/mp4">
	  You browser does not support video.
	</video>
**source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景**

对于更古老的浏览器，还可以在其中加入 object 或者 embed 标签

### video中的trak标签
track 是一种播放时序相关的标签，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种。
	
	subtitles：就是字幕了，不一定是翻译，也可能是补充性说明
	captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容
	descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内尔用
	chapters：用于浏览器视频内容。
	metadata：给代码提供的元信息，对普通用户不可见。

一个完整的 video 标签可能会包含多种 track 和多个 source，这些共同构成了一个视频播放所需的全部信息。
## aduio标签
与picture 和 video 两种标签一样，audio 也可以使用 source 元素来指定源文件：

	<audio controls>
	  <source src="song.mp3" type="audio/mpeg">
	  <source src="song.ogg" type="audio/ogg">
	  <p>You browser does not support audio.</p>	
	</audio>
同时也可以使用src属性，且兼容性要比video标签乐观

	<audio controls="controls" src="audio.ogg"></audio>
## iframe标签
这个标签能够嵌入一个完整的网页：

	<iframe src="http://time.geekbang.org"></iframe>

但同时会带来很多安全问题，html5加入了一些新标准，在新标准中，为 iframe 加入了 sandbox 模式和 srcdoc 属性，这样，给 iframe 带来了一定的新场景：

	<iframe sandbox="allow-scripts" src="http://www.b.com/"></iframe>
sandbox模式的加入可以解决跨域问题，同时对加载的页面加入各种限制，如是否允许脚本执行，是否允许表单提交等操作。

sandbox模式下子页面与父页面的交互完全被隔离开，无法进行任何相互操作。

### 引申：如何阻止自己的页面被iframe引用

#### 修改http响应头

	header(‘X-Frame-Options:Deny');
一劳永逸，非常靠谱

#### 脚本检测


	try{
	　　top.location.hostname;
	　　if (top.location.hostname != window.location.hostname) {
	　　　　top.location.href =window.location.href;
	　　}
	}catch(e){
	　　top.location.href = window.location.href;
	}
代码解释：  

top 对象始终指向最高（最外）层的框架:

	top===window.top

在某些情况下，window.parent 有可能等于 top;  
 
但在没有框架的情况下，parent 一定等于top （此时它们都等于 window ）:
	
	window.parent===top
    window.parent===window.top

被嵌套时，如果跨域，子页面执行 top.location.hostname会被block，进入catch逻辑；

如何主域相同，子域不同，可以在父页面和子页面都设置相同的`docum.domain`来解决跨域；

此时代码就会进入try逻辑，判断后发现hostname不一致，然后有进行了跳转；

但如果对方采用sandbox模式，且不允许js执行的话，该方法会失效；
## 参考文章
1. [HTML5 iframe标签新属性](http://www.w3school.com.cn/tags/tag_iframe.asp)
2. [X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options)
3. [iFrame跨域解决办法](https://www.cnblogs.com/boystar/p/6909214.html)
