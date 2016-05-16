##HTML5之本地存储

**<font size="4" color="red">一. cookie</font>**   
A) 数据存储到计算机中，通过浏览器控制添加与删除数据   

B) Cookie的特点：  
  
**存储限制**：域名100个cookie,每组值大小4KB  
**可以通过http请求头信息进行传递**  
**页面间的cookie是共**享  

******

**<font size="4" color="red">二. Storage</font>** 
>**特点**：存储量限制 ( 5M )  
客户端完成，不会请求服务器处理  
sessionStorage数据是不共享、 localStorage共享
  
**<font size="3" color="blue">1. sessionStorage</font>**

临时回话，从页面打开到页面关闭的时间段
窗口的临时存储，页面关闭，本地存储消失  



**<font size="3" color="blue">2. localStorage</font>** 
 
永久存储（可以手动删除数据）  

**<font size="3" color="blue">3. API</font>**   

localStorage和sessionStorage使用时使用相同的API：  
**localStorage.setItem**("key","value"); //以“key”为名称存储一个值“value”, 类型都是字符串 
**localStorage.getItem**("key"); //获取名称为“key”的值  
**localStorage.removeItem**("key");//删除名称为“key”的信息。
**localStorage.clea**r();​//清空localStorage中所有信息  
PS：通过getItem或直接使用localStorage["key"]获取到的信息均为实际存储的副本。
  
**<font size="4" color="red">三. Storage 存储事件</font>**   

A). 当数据在修改或删除的情况下，就会触发storage事件  

B). 在对数据进行改变的窗口对象上是不会触发的**（同一域名下的其他窗口则会被触发，同窗口想要被触发的话，可以试用iframe,IE9可以同时触发本窗口和同域名其他窗口）**
   
Key : 修改或删除的key值，如果调用clear(),key为null  
newValue  :  新设置的值，如果调用removeStorage(),key为null  
oldValue :  调用改变前的value值  
storageArea : 当前的storage对象  
url :  触发该脚本变化的文档的url  

 同域名下的文件A:

    //文件A	
    <script type="text/javascript">
	  window.onload=function(){
	  	var oIpt=document.getElementsByTagName('input');
	  	  oIpt[0].onclick=function(){
	  	  	localStorage.setItem("name",oIpt[1].value);
	  	  }
	  }
		</script>
文件B:  

    //文件B
    <script type="text/javascript">
    window.addEventListener('storage',function(ev){
            alert(ev.newValue)
    })
	</script>
每次更改文件A的值，文件B的alert事件都会被触发。（chrome、firefox）