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

**<font size="5" color="red" >四. 离线应用与客户端存储</font>**  
**<font color="blue">4.1 离线检测</font>**   
**A) navigator.onLine**   
支持的浏览器不多，而且存在一定兼容性问题；

**B) online/offline事件**   
这两个事件不会在页面刷新的时候执行，只有在计算机网络发生变化：如掉线，重新上线的时候才会执行！ 这两个事件在 window 对象上触发 

	//写法1：  
	window.ononline=function(){
		alert("上线了！！");
	}
	window.onoffline=function(){
		alert("掉线了！！");
	}
也可以通过事件绑定方式应用  

	var el = document.body;  
	if (el.addEventListener) {
	   window.addEventListener("online", function () {  
	     alert("online");}, true);  
	   window.addEventListener("offline", function () {  
	     alert("offline");}, true);  
	}else if (el.attachEvent) {
	   window.attachEvent("ononline", function () {  
	     alert("online");});  
	   window.attachEvent("onoffline", function () {  
	     alert("offline");});  
	}else {
	   window.ononline = function () {  
	     alert("online");};  
	   window.onoffline = function () {  
	     alert("offline");};  
	} 
**<font color="blue">4.2 应用缓存</font>**    
HTML5 的应用缓存（application cache），或者简称为 appcache，是专门为开发离线 Web 应用而设计的。 Appcache 就是从浏览器的缓存中分出来的一块缓存区。要想在这个缓存中保存数据，可以使用一个描述文件（manifest file），列出要下载和缓存的资源。    
**A) 使用**  
对HTML标签作如下设置：  

	<html manifest="demo.appcache"> 
    <!--旧版用的是 demo.manifest,不推荐-->  

manifest 文件可分为三个部分：  

- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
- NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
- FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）  

例如：  

		CACHE MANIFEST
		# 2012-02-21 v1.0.0
		/theme.css
		/logo.gif
		/main.js
		
		NETWORK:
		login.asp
		
		FALLBACK:
		/html5/ /404.html
 

**B) applicationCache 对象**   

- 属性：status.用来判断缓存对象的状态，详见书籍  
- 方法：update()方法 & swapCache()方法

**<font color="blue">4.3 数据存储之cookie</font>**    

**A) 关于cookie**   

1. HTTP请求时，会发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。会话信息是以 name 为名称、以 value 为值的一个 cookie，且都经过URL编码的。  
2. cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时，都会包含这个 cookie。
3. 每个域的 cookie 总数是有限的，不过浏览器之间各有不同。
4. cookie 的构成：  
	- 名称：一个唯一确定 cookie 的名称。最好区分大小写。
	- 值：储存在 cookie 中的字符串值。值必须被 URL 编码。
	- 域：cookie 对于哪个域是有效的。如：http://www.58.com/cuzu/,只会在该域名下有效；
	- 路径：对于指定域中的路径向服务器才会发送cookie。
	- 失效时间：表示 cookie 何时应该被删除的时间戳，GMT格式（Wdy, DD-Mon-YYYY HH:MM:SS ）
	- 安全标志：指定后cookie只有在使用 SSL 连接的时候才发送到服务器。secure 标志是 cookie 中唯一一个非名值对儿的部分，只包含一个 secure 单词。
5. 获取cookie的js方法: document.cookie。该方法会返回该域名下所有cookie通过分号拼接在一起的长字符串。  
6. cookie可以被覆盖，但不能被删除，譬如：可以通过如下方法设置；   
 
			document.cookie = encodeURIComponent("name") + "=" +encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/";  
7. js直接处理cookie很不直观，介绍一个**操作cookie的函数**，其拥有读取、写入和删除cookie的功能：  

		var CookieUtil = {
			get: function (name){
				var cookieName = encodeURIComponent(name) + "=",
					cookieStart = document.cookie.indexOf(cookieName),
					cookieValue = null;
				if (cookieStart > -1){
					var cookieEnd = document.cookie.indexOf(";", cookieStart);
					//从cookie起始位置算起，找到结束标志';'的索引
				if (cookieEnd == -1){
					cookieEnd = document.cookie.length;
					//若无找到结束标志';'的索引，则说明到达cookie的尾部
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
				+ cookieName.length, cookieEnd));
				//截取'='和';'之前的cookie值
				}
				return cookieValue;
			},
			set: function (name, value, expires, path, domain, secure) {
				var cookieText = encodeURIComponent(name) + "=" +
				encodeURIComponent(value);
				//上述参数除name和value外，均可选；
				if (expires instanceof Date) {
					cookieText += "; expires=" + expires.toGMTString();
				}
				//expires参数格式：new Date(2016,07,30)
				if (path) {
					cookieText += "; path=" + path;
				}
				if (domain) {
					cookieText += "; domain=" + domain;
				}
				if (secure) {
					cookieText += "; secure";
				}
					document.cookie = cookieText;
				},
			unset: function (name, path, domain, secure){
					this.set(name, "", new Date(0), path, domain, secure);
					//cookie不能直接被删除，只能通过设置失效时间来"删除"
					//new Date(0)为1970-01-01，标准时间的初始时间
				}
		};

**B) 关于子cookie**  

1. 为了绕开浏览器的单域名下的 cookie 数限制，一些开发人员使用了一种称为子 cookie（subcookie）的概念。即：使用 cookie 值来存储多个名称值对儿：

		name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5  
2. 获取子cookie的方法:  

		var SubCookieUtil = {
			get: function (name, subName){
					var subCookies = this.getAll(name);
					 //getAll方法将cookie值以json的方式全部取出来
					if (subCookies){
						return subCookies[subName];
					} else {
						return null;
					}
				},
			getAll: function(name){
				var cookieName = encodeURIComponent(name) + "=",
				cookieStart = document.cookie.indexOf(cookieName),
				cookieValue = null,
				cookieEnd,
				subCookies,
				i,
				parts,
				result = {};
				return null;
				if (cookieStart > -1){
					cookieEnd = document.cookie.indexOf(";", cookieStart);
					if (cookieEnd == -1){
						cookieEnd = document.cookie.length;
					}
					cookieValue = document.cookie.substring(cookieStart +cookieName.length, cookieEnd);
					//取cookie值的方法与单个cookie一样，只是针对子cookie取到的值多了一层处理；
					if (cookieValue.length > 0){
						subCookies = cookieValue.split("&");
						//通过'&'分割成一个数组；
						for (i=0, len=subCookies.length; i < len; i++){
							parts = subCookies[i].split("=");
							//将取到的name=value对儿，再通过'='分割
							result[decodeURIComponent(parts[0])]= decodeURIComponent(parts[1]);
							//以json方式存到result中
						}
					return result;
					}
				}
			return null;
			},
		}


3. 设置子cookie的方法:   
 
		var SubCookieUtil = {
			set: function (name, subName, value, expires, path, domain, secure) {
				var subcookies = this.getAll(name) || {};
				//获取json形式的cookie值，若没有则创建一个空值
					subcookies[subName] = value;
				//修改子cookie的值
				this.setAll(name, subcookies, expires, path, domain, secure);
				//setAll方法将修改好的子cookie拼接后重新塞入浏览器中
			},
			setAll: function(name, subcookies, expires, path, domain, secure){
				var cookieText = encodeURIComponent(name) + "=",
					subcookieParts = new Array(),
					subName;
				for (subName in subcookies){
					//subName作为变量遍历json形式的cookie值
					if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
						subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
						//将每个子cookie的名值对儿'='拼接都存入subcookieParts数组中
					}
				}
				if (subcookieParts.length > 0){
					cookieText += subcookieParts.join("&");
					//将数组中数据通过'&'拼接成字符串,其他参数同单个cookie设置
					if (expires instanceof Date) {
						cookieText += "; expires=" + expires.toGMTString();
					}
					if (path) {
						cookieText += "; path=" + path;
					}
					if (domain) {
						cookieText += "; domain=" + domain;
					}
					if (secure) {
						cookieText += "; secure";
					}
				}else{
					//数组长度为0则说明无子cookie,直接拼接即可；
					cookieText += "; expires=" + (new Date(0)).toGMTString();
				}
					document.cookie = cookieText;
			},
		}
4. 删除子cookie的方法:   

		var SubCookieUtil = {
			unset: function (name, subName, path, domain, secure){
				var subcookies = this.getAll(name);
				if (subcookies){
					delete subcookies[subName];
					this.setAll(name, subcookies, null, path, domain, secure);
				}
			},
			unsetAll: function(name, path, domain, secure){
				this.setAll(name, null, new Date(0), path, domain, secure);
			}
		}  

**<font color="blue">4.4 数据存储之Web Storage</font>**    
Web Storage 的目的是克服由 cookie 带来的一些限制，当数据需要被严格控制在客户端上时，无须持续地将数据发回服务器。其有两个主要目标：

- 提供一种在 cookie 之外存储会话数据的途径。
- 提供一种存储大量可以跨会话存在的数据的机制。  

**A) Storage 类型**   
最初的 Web Storage 规范包含了两种对象的定义： `sessionStorage` 和 `globalStorage`（已被`localStorage`替换）。都是以 windows 对象属性的形式存在。Storage 类型有如下方法。

- clear()： 删除所有值； Firefox 中没有实现 。
- getItem(name)：根据指定的名字 name 获取对应的值。
- key(index)：获得 index 位置处的值的名字。
- removeItem(name)：删除由 name 指定的名值对儿。
- setItem(name, value)：为指定的 name 设置一个对应的值。  

**B) sessionStorage 对象**   
sessionStorage 对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。这个对象就像会话 cookie，也会在浏览器关闭后消失。  
  
**C) localStorage 对象**  
localStorage 对象存储的数据会一直保留在磁盘上，除非用户或开发人员主动删除；要访问同一个localStorage对象，页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上。  

**D) 限制**   
对于 localStorage 而言，大多数桌面浏览器会设置每个来源 5MB 的限制。 Chrome 和 Safari 对每个来源的限制是 2.5MB。而 iOS 版 Safari 和 Android 版 WebKit 的限制也是 2.5MB。

**<font color="blue">4.5 数据存储之IndexedDB</font>**  
Indexed Database API（简称：IndexedDB），是在浏览器中保存结构化数据的一种数据库。IndexedDB 是为了替代目前已被废弃的 Web SQL Database API而出现的。  

浏览器也都使用提供商前缀，该对象在 IE10 中叫 msIndexedDB，在 Firefox 4 中叫
mozIndexedDB，在 Chrome 中叫 webkitIndexedDB。

IndexedDB 就是一个数据库，与 MySQL 或 Web SQL Database 等数据库类似，由于实际应用中这块基本没有涉及到，故不再介绍，详见书籍；  
**<font size="5" color="red" >五. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   

**<font size="5" color="red" >六. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   

**<font size="5" color="red" >七. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   

**<font size="5" color="red" >八. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

