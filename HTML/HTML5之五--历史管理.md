###历史管理

**<font size="4" color="red">1. HTML4时代的history API</font>**   
A) history.length：当前历史列表中的历史记录数（IE6+是从0开始的，其他的是从1开始的）；   

B) history.go(n)：前进或后退n条记录，当n=0或空时会刷新当前页； 
  
C) history.back()：后退一步；
   
D) history.forward()：前进一步;
******

**<font size="4" color="red">2. HTML5新增的API</font>**  

**<font size="3" color="blue">history.pushState(state, title, url)</font>**


>将当前URL和history.state加入到history中，并用新的state和URL替换当前。不会造成页面刷新。

**state**：存储所修改的历史记录条目的相关信息，State对象可以是任何Json字符串，会在*onpopstate*事件触发时作为参数传递过去。

**title**：页面标题，当前所有浏览器都会忽略此参数，传空字符串即可。

**url**：要跳转到的URL地址，不能跨域（*可选*）。注意：url是虚假的。用户不能实际找到。
********
**<font size="3" color="blue">history.replaceState(state, title, url)</font>**


>用新的state和URL替换当前。不会造成页面刷新。

**参数描述同上**。


*********************
**<font size="3" color="blue">history.state</font>**

历史记录条目的相关信息。如果当前URL下的状态信息不是通过**pushState**或者**replaceState**产生的，那么history.state是null。
**************
**<font size="3" color="blue">window.onpopstate</font>**  
history.go和history.back（包括用户按浏览器历史前进后退按钮）触发，并且页面无刷的时候（由于使用pushState修改了history）会触发popstate事件，事件发生时浏览器会从history中取出URL和对应的state对象替换当前的URL和history.state。通过event.state也可以获取history.state。
    
    window.onpopstate=function(ev){
      
    	console.log(ev.state);
    }
**<font size="3" color="blue">hashchange</font>**  
用到 window.location.hash 对象进行存取
如果页面的hash发生了变化，通过以下方法进行处理：  
   
     var oIpt=document.getElementById('put1');
  	 var oDiv=document.getElementById('div1');
     var i=0, var json={};
    oIpt.onclick=function(){
    	var newarr=RandNum(7,35);
         json[i]=newarr;
        window.location.hash = i++;  
    };
    window.onhashchange = function(){
    oDiv.innerHTML=json[window.location.hash.substring(1)];
       //window.location.hash取到的值为#1
    }
*****
**PS:重定向**  
window.location.href="http://www.baidu.com";

