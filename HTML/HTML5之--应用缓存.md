##HTML5之应用缓存

**<font size="4" color="red">一. 概述</font>**  
A) HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

B) 应用程序缓存为应用带来三个优势：

**离线浏览** - 用户可在应用离线时使用它们  
**速度** - 已缓存资源加载得更快     
**减少服务器负载** - 浏览器将只从服务器下载更新过或更改过的资源   

但实际应用场景并不多
  
  
******
**<font size="4" color="red">二. 使用方法</font>**  
  
A) **服务器设置头信息** （Apache服务器）:  AddType text/cache-manifest .manifest  

B) **html标签** : 添加 manifest="xxx.manifest" 
    
    <!DOCTYPE HTML>
    <html manifest="demo.appcache">
     //manifest 文件的建议的文件扩展名是：".appcache"。
    ...
    </html>

C)** 编写manifest文件** :  离线的清单列表  
manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。  

<font color="blue"> manifest 文件可分为三个部分： </font>   
CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存（必须）  
		
       CACHE MANIFEST
		theme.css
		logo.gif
		main.js

NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存（选填）  
FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）（选填）  
