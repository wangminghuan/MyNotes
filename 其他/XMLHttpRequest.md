<font face="微软雅黑" size="4" >
<font size="6">XMLHttpRequest</font>


## 1 关于XMLHttpRequest
XMLHttpRequest(XHR)是一个API对象，其中的方法可以用来在浏览器和服务器端传输数据。这个对象是浏览器的js环境提供的。从XHR获取数据的目的是为了持续修改一个加载过的页面，XHR是Ajax设计的底层概念。XHR使用的协议不同于HTTP，不仅可以使用XML格式的数据，也支持JSON，HTML或者纯文本

## 2 abort
XMLHttpRequest提供了一个abort对象可以让我们中断发出去的请求，废话不说，举个例子：

    <button class="start">触发请求</button>
    <button class="stop">停止请求</button>
    //js代码开始、
	<script>
	 function ajax(opts) {
	    var defaults = {
	        method: "GET",
	        url: "",
	        data: '',
	        async: true,
	        cache: true,
	        contentType: 'application/x-www-form-urlencoded',
	        success: function() {},
	        error: function() {}
	    };
	    for (var key in opts) {
	        defaults[key] = opts[key]
	    }
	
	    //处理用户输入的data数据
	
	    if (typeof defaults.data == 'object' && Object.prototype.toString.call(defaults.data) != "[object Array]") {
	        var dataStr = "";
	        for (var k in defaults.data) {
	            dataStr += encodeURIComponent(k) + "=" + encodeURIComponent(defaults.data[k]) + "&"
	        }
	        defaults.data = dataStr.substring(0, dataStr.length - 1)
	    }
	    //将请求方式改为大写
	    defaults.method = defaults.method.toUpperCase();
	
	    //设置cache ,cache为false时设置随机数，防止缓存
	    defaults.cache = defaults.cache ? "" : "&" + (new Date()).getTime();
	
	    //GET方式下将data拼接到url中进行传递
	    if (defaults.method == "GET" && (defaults.data || defaults.cache)) {
	        defaults.url += "?" + defaults.data + defaults.cache;
	    }
	
	    //1. 创建XMLHttpRequest对象
	    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	   
	    //2. 同服务器建立联系，open方法
	    xhr.open(defaults.method, defaults.url, defaults.async)
	
	    //3. 向服务器发送请求，send方法
	    if (defaults.method == "GET") {
	        xhr.send()
	    } else {
	        xhr.setRequestHeader('Content-Type', defaults.contentType);
	        //提交的数据格式，默认application/x-www-form-urlencoded
	        xhr.send(defaults.data);
	    }
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState == 4) {
	            if (xhr.status == 200) {
	                console.log(xhr)
	                defaults.success(JSON.parse(JSON.stringify(xhr.responseText)))
	            } else {
	                defaults.error(xhr.status)
	            }
	        }
	    }
	    return xhr
	};
	var myAjax=null;
	function startAjax(){
	    myAjax=ajax({
	    method: "GET",
	    url: "/api/head/head/detail",
	    data: {
	        id:(new Date()).getTime()
	    },
	    success: function(data) {
	    //   console.log(data)
	    },
	    error: function(err) {
	        console.log(err)
	    }
	})
	
	}
	function stopAjax(){
	    if(myAjax) {myAjax.abort();}  
	}
	document.querySelector(".start").addEventListener("click",function(){
	    startAjax();
	})
	document.querySelector(".stop").addEventListener("click",function(){
	    stopAjax();
	})
	</script>
我们连续点击多次，然后再点击一下取消，看看会发生什么

![](https://i.imgur.com/jdM9hDz.jpg)

会发现最后一次请求被cancel了，ok，请求被取消了  
其实我们点击的时候可以设置一下，如果请求一直没有返回就将上次请求取消，这样就算用户不断点击，就只相应最近的一次请求即可。

![](https://i.imgur.com/Gjq8nhe.jpg)

##  参考文献

1. [你真的会使用XMLHttpRequest吗？](https://segmentfault.com/a/1190000004322487)


