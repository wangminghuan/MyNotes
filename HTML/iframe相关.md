##<font face="微软雅黑" size="4" >iFrame相关

**<font size="5" color="red" >一. 获取window和document</font>**  
通过父级页面，来操作嵌入该页面iframe中的元素

**<font color="blue">1.1 获取iframe对象下的window</font>**   

`iframeObj.contentWindow.document`：先获取到iframe下的window，window下再获取document,（所有浏览器都支持）

	var oF=iframeObj.contentWindow.document.getElementById("div1")；
	相当于：
	var oPt=window.document.getElementById("div1"); 

**<font color="blue">1.2 获取iframe对象下的document</font>**   

`iframeObj.contentDocument`：直接获取到iframe下的document.（IE6/7不支持）

	var oF=iframeObj.contentDocument.getElementById("div1")；
	相当于：
	var oPt=document.getElementById("div1"); 

**<font size="5" color="red" >二. 获取iframe的父级与顶级</font>**    
通过iframe页面，来操作嵌入该iframe页面中的元素。  

**<font color="blue">2.1 获取iframe的父级</font>**   

	window.parent.document.getElementById("div0")；  

**<font color="blue">2.2 获取iframe的顶级</font>**   

	window.top.document.getElementById("div0")；//多级嵌套获取顶级  
**<font size="5" color="red" >三. onload事件</font>**  
iframe的onload事件在IE下必须通过事件绑定的形式才可以执行;

	window.onload=function() {
		var oF=document.createElement('iframe');
		oF.src='iframe02.html';
		document.body.appendChild(oF);
       
       //非IE,直接调用，绑定无效
		oF.onload=function(){
			alert("loaded!!")
		}
      
      //IE下（不含edge模式），onload用事件绑定
		oF.attachEvent('onload',function(){
			alert("loaded!!")
		})
	}
  
**<font size="5" color="red" >四. 防钓鱼设置</font>**    
有些钓鱼网站会通过iframe嵌入正规网站，我们可以通过加入一行js代码，当钓鱼网站嵌入我们的网站时，自动转向我们的网站；   

	if(window!=window.top){	
      window.top.location.href=window.location.href;
	}

</font>  
******

