##<font face="微软雅黑">meta标签详解
meta标签作为html中最容易被忽略的标签，里面也大有乾坤。该文档详细讲解下meta标签。

**<font size="4" color="red" >一. 概述</font>**  
**<font size="3" color="blue">1.1 简介</font>**   

英文版W3school是这样解释的：  

The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.  

不难看出，其中的关键是metadata，中文名叫元数据，是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。这么一来meta标签的作用方式就很好理解了。  

meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务  

**<font size="3" color="blue">1.2 组成</font>**     
meta为标签head中的子标签，包括**content**（必选，存储值）、**name**（键名）、**http-equiv**（键名）、**scheme**(content格式)四个属性。 下面就分别介绍下这几个属性，及其的作用。  
 
**<font size="4" color="red" >二. name属性</font>**  
作用：把 content 属性关联到一个名称。该属性常用参数有以下几种：  

**<font size="3" color="blue">2.1 keywords(关键字)</font>**   
**A)说明**：用于告诉搜索引擎，网页的关键字。

**B)举例**：  

	<meta name="keywords" content="北京分类信息, 北京免费发布信息">

**<font size="3" color="blue">2.2 description(网站内容的描述)</font>**   
**A)说明**：用于告诉搜索引擎，网站的主要内容。

**B)举例**：  

	<meta name="description" content="58同城北京分类信息网，为你提供..等海量分类信息">

**<font size="3" color="blue">2.3 viewport(移动端的窗口)</font>**   
**A)说明**：移动端网页的相关设置。  

**B)举例**：  

	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width">

**<font size="3" color="blue">2.4 format-detection(格式检测)</font>**   
**A)说明**：常用于设置忽略识别一些特殊内容，如邮箱，电话等。

**B)举例**：  

	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="email=no">
	<meta name="format-detection" content="address=no;">

**<font size="3" color="blue">2.5 robots(定义搜索引擎爬虫的索引方式)</font>**   
**A)说明**：robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。  
具体参数如下：  

1.none : 搜索引擎将忽略此网页，等价于noindex，nofollow。  
2.noindex : 搜索引擎不索引此网页。  
3.nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。  
4.all（默认） : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。  
5.index : 搜索引擎索引此网页。   
6.follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。  

**B)举例**：  

	<meta name="robots" content="none">

**<font size="3" color="blue">2.6 author(作者)</font>**   
**A)说明**：用于标注网页作者。

**B)举例**：  

	<meta name="author" content="wmh,m.h.wang@foxmail.com">

**<font size="3" color="blue">2.7 copyright(版权)</font>**   
**A)说明**：用于标注版权信息。

**B)举例**：  

	<meta name="copyright" content="wmh"> //代表该网站为wmh个人版权所有。

**<font size="3" color="blue">2.8 apple-mobile-web-app-capable（IOS设备）</font>**   
**A)说明**：网站开启对web app程序的支持。

**B)举例**：  

	<meta name="apple-mobile-web-app-capable" content="yes">  
**<font size="3" color="blue">2.9 apple-mobile-web-app-status-bar-style（IOS设备）</font>**   
**A)说明**：safari顶端状态条的样式，需要先开启web app的支持该设置才会生效。

**B)举例**： content的值为default | black | black-translucent 

	<meta name="apple-mobile-web-app-status-bar-style" content="default">  

**<font size="3" color="blue">2.10 renderer(双核浏览器渲染方式)</font>**   
**A)说明**：renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。

**B)举例**：  

	<meta name="renderer" content="webkit"> //默认webkit内核
	<meta name="renderer" content="ie-comp"> //默认IE兼容模式
	<meta name="renderer" content="ie-stand"> //默认IE标准模式 

**<font size="3" color="blue">2.11 revisit-after(搜索引擎爬虫重访时间)</font>**   
**A)说明**：如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。

**B)举例**：  

	<meta name="revisit-after" content="7 days" >

**<font size="4" color="red" >三. http-equiv</font>**  
http-equiv顾名思义，相当于http协议中文件头的作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。  该属性主要有以下几种参数：  

**<font size="3" color="blue">3.1 content-Type</font>**   
**A)说明**：用于设定网页字符集，便于浏览器解析与渲染页面。

**B)举例**： 

     <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">//旧的html标准，不推荐。
     <meta charset="UTF-8">//html5的标准，推荐
  
**<font size="3" color="blue">3.2 cache-control(指定请求和响应遵循的缓存机制)</font>**   
**A)说明**：指导浏览器如何缓存某个响应以及缓存多长时间。

**B)举例**： 

     <meta http-equiv="cache-control" content="no-cache">

共有以下几种用法：  

no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。  
no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）  
public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果  
private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）  
maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。  

Pragma: no-cache：跟Cache-Control: no-cache相同，Pragma: no-cache兼容http 1.0 ，Cache-Control: no-cache是http 1.1提供的。因此，Pragma: no-cache可以应用到http 1.0 和http 1.1,而Cache-Control: no-cache只能应用于http 1.1   

**C)举例**： 禁止百度转码

     <meta http-equiv="cache-control" content="no-siteapp">
百度推荐使用“no-siteapp”，因为百度几乎不遵守“no-transform”。当然也有两个都用的。但反正不管咋用，至少现阶段都无法保证100%的不被转码。  

**<font size="3" color="blue">3.3 X-UA-Compatible(浏览器采取何种版本渲染当前页面)</font>**   
**A)说明**：用于告知浏览器以何种版本来渲染页面。这个参数用于解决浏览器的兼容性一致外观问题，可以使ie不同版本的浏览器有一致的外观。（一般都设置为最新模式，在各大框架中这个设置也很常见。）

**B)举例**： 

      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE使用edge模式渲染和Chrome使用最新版本渲染当前页面。  

**<font size="3" color="blue">3.4 expires(网页到期时间）</font>**   
**A)说明**：用于设定网页的到期时间，过期后网页必须到服务器上重新传输。

**B)举例**： 

     <meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
  
**<font size="3" color="blue">3.5 refresh(自动刷新并指向某页面)</font>**   
**A)说明**：网页将在设定的时间内，自动刷新并调向设定的网址。

**B)举例**： 

     <meta http-equiv="refresh" content="2;URL=http://www.baidu.com/"> //2秒后跳转向百度首页
  
**<font size="3" color="blue">3.6 Set-Cookie(cookie设定)</font>**   
**A)说明**：如果网页过期，那么这个网页存在本地的cookies也会被自动删除。（很少用）

**B)举例**： 

     <meta http-equiv="Set-Cookie" content="User=wmh; path=/; expires=Sunday, 10-Jan-18 10:00:00 GMT">
  

  
**<font size="4" color="red">四. scheme</font>**   
**A)说明**：scheme属性用于给出一个用来解释content属性值的方案，其值可以是一个格式，也可以是一个URI。

**B)举例**： 

	<meta name="date" content="2012-01-01" scheme="YYYY-MM-DD">
	<meta name="identifier" content="0-2345-6634-6" scheme="ISBN">
  
**<font size="4" color="red">五. html中的其他标签</font>**   

**<font size="3" color="blue">5.1 lang</font>**   
**A)说明**：lang 属性规定元素内容的语言。

**B)举例**： en:英文；zh:中文

     <html lang="en">

**<font size="3" color="blue">5.2 base</font>**   
**A)说明**：页面上的所有链接规定默认地址或默认目标。base标签必须位于 head 元素内部。

**B)举例**： 

     <base target="_blank" href="http://bj.58.com">
**href**：规定页面中所有链接的基准 url；即：页面中所有相对地址的href和src，都将会以http://bj.58.com为参考，而绝对地址则不会受到影响。  
   
**target**：\_blank(新窗口打开)；\_self（当前窗口打开）； \_parent；\_top；framename 

参考文章：  
[https://segmentfault.com/a/1190000004279791](https://segmentfault.com/a/1190000004279791)  
[http://zq210wl.github.io/2015/01/05/html-meta-tag/](http://zq210wl.github.io/2015/01/05/html-meta-tag/) 
[http://www.w3cfuns.com/notes/18627/3c13b9fcf42b819a5133372a5d6982a4.html](http://www.w3cfuns.com/notes/18627/3c13b9fcf42b819a5133372a5d6982a4.html)
</font>  
******