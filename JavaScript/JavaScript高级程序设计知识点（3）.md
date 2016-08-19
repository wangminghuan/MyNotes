##<font face="微软雅黑" size="4" >HTML 高级

**<font size="5" color="red" >一. 标题1</font>**  
**<font color="blue">1.1 二级标题</font>**   
**A)** 

**B)**  
**<font size="5" color="red" >二. HTML5 脚本编程</font>**  
**<font color="blue">2.1 跨文档消息传递</font>**  
跨文档消息传送（cross-document messaging），有时候简称为 XDM，指的是在来自不同域的页面间传递消息。   
**A)** postMessage()方法接收两个参数：一条消息和一个表示消息接收方来自哪个域的字符串。

**B)** 接收到 XDM 消息时，会触发 window 对象的 message 事件。这个事件是以异步形式触发的。 同时接受3个对象：  

- data：作为 postMessage()第一个参数传入的字符串数据  
- origin：发送消息的文档所在的域，例如"http://www.wrox.com"。  
- source：发送消息的文档的 window 对象的代理（并非实际的window对象）。  

**<font color="blue">2.2 原生拖放</font>**   

	<!-- 让这个图像不可以拖动 -->
	<img src="smile.gif" draggable="false" alt="Smiley face">
	<!-- 让这个元素可以拖动 -->
	<div draggable="true">...</div>  

详见HTML5之拖拽draggable。
  
**<font color="blue">2.3 媒体元素</font>**   
**A)** <audio\>和<video\>: 在网页中嵌入跨浏览器的音频和视频内容。

**B)** 因为并非所有浏览器都支持所有媒体格式，所以可以指定多个不同的媒体来源。要像下面一样使用一或多个<source\>元素。   

	<!-- 嵌入视频 -->
	<video id="myVideo">
	<source src="conference.webm" type="video/webm; codecs='vp8, vorbis'">
	<source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'">
	<source src="conference.mpg">
	Video player not available.
	</video>
	<!-- 嵌入音频 -->
	<audio id="myAudio">
	<source src="song.ogg" type="audio/ogg">
	<source src="song.mp3" type="audio/mpeg">
	Audio player not available.
	</audio>

**C) 属性 和 事件**   
这两个元素有许多共有的属性和事件，详细请参考书籍。  

**D) 检测支持情况**  
这两个媒体元素都有一个 canPlayType()方法，接收一种格式/编解码器字符串，返回
"probably"、 "maybe"或""（ 空字符串）。   

**E) Audio类型**  
<audio\>元素还有一个原生的 JavaScript 构造函数 Audio，可以在任何时候播放音频。与 Image 很相似，但 Audio 不用像 Image 那样必须插入到文档中，创建实例，插入音频文件即可。

	var audio = new Audio("sound.mp3");
	EventUtil.addHandler(audio, "canplaythrough", function(event){
		audio.play();
	});

**<font color="blue">2.4 历史状态管理</font>**   
详见HTML5之历史管理（history 对象）
  
**<font size="5" color="red" >三. 错误处理与调试</font>**  

**<font color="blue">3.1 错误处理</font>**  

**A)  try catch** 

		try{
		  do somethings...    // 可能会导致错误的代码
		} catch(error){ //error参数必须写
		   console.log(error.message)// 在错误发生时怎么处理
	       //message 属性是唯一一个能够保证所有浏览器都支持的属性
		}
finally 子句   

		function testFinally(){
			try {
				return 2;
			} catch (error){
				return 1;
			} finally { //finally语句无论什么情况下都会执行，哪怕遇到return
				return 0;
			}
		}//调用这个函数只能返回 0

合理使用try catch，使用 try-catch 最适合处理那些我们无法控制的错误。  

**B) 抛出错误**  
 throw 操作符，用于随时抛出自定义错误，也可以用于更真实的模拟浏览器的错误：  

	throw new Error("Something bad happened.");
	throw new SyntaxError("I don’t like your syntax.");
	throw new TypeError("What type of variable do you take me for?");
	throw new RangeError("Sorry, you just don’t have the range.");
	throw new EvalError("That doesn’t evaluate.");
	throw new URIError("Uri, is that you?");
	throw new ReferenceError("You didn’t cite your references properly.");  

在遇到 throw 操作符时，代码会立即停止执行。仅当有 try-catch 语句捕获到被抛出的值时，代码才会继续执行。  

捕获错误的目的在于避免浏览器以默认方式处理它们；而抛出错误的目的在于提供错误发生具体原因的消息。  

	function process(values){
		if (!(values instanceof Array)){
			throw new Error("process(): Argument must be an array.");
		}
		values.sort();
		for (var i=0, len=values.length; i < len; i++){
		if (values[i] > 100){
			return values[i];
		}
		}
		return -1;
	}
函数中多了一个throw处理，当参数不是数组时候，我们很容易定位到错误所在。  

**C) 错误事件 error**   

任何没有通过 try-catch 处理的错误都会触发 window 对象的 error 事件。

	window.onerror = function(message, url, line){//error事件接受3个参数
        
		alert(message); //弹出错误消息，但浏览器仍旧会显示出错误消息
		
		return false;//可以阻止浏览器报告错误的默认行为
	};
这个函数实际上就充当了整个文档中的 try-catch 语句，可以捕获所有无代码处理的运行时错误。尽可能不使用它；  

图像加载也存在error事件；  

**D) 处理错误的常见策略**  

逻辑良好的函数，会对参数类型做判断。通常情况下：基本类型的值应该使用 `typeof` 来检测，而对象的值则应该使用 `instanceof` 来检测  

通过try catch 不会阻塞代码：


	var arrobj=[{"len":"1"},{"len":"2"},{"lens":"3"},{"len":"4"},{"len":"5"},]
	try{
	
	   for(var i=0;i<arrobj.length;i++){
	      console.log(arrobj[i].len);
	   }
	}catch(err){
	   console.log(err.message);
	}
    //1,2,undefined,4,5    

**D) 把错误记录到服务器**    

使用了 Image 对象来发送请求，这样做非常灵活,可以解决跨域和浏览器兼容问题  

	function logError(sev, msg){
		var img = new Image();
		img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" +
		encodeURIComponent(msg);
	}

**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

