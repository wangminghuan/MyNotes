<font face="微软雅黑" size="4" >
<font size="6">前端路由</font>  

在以前的web程序中，路由字眼只出现在后台中。但是随着SPA单页面程序的发展，便出现了前端路由一说。所谓SPA应用就是：一个网站只有一个html页面，但是点击不同的导航显示不同的内容，对应的url也会发生变化，这就是前端路由做的事。通过监听URL的变化，展示给用户的页面也不相同。

## 实现方式：

1. hash方式  
   通过location.hash方法和监听hashchange事件实现
2. history模式  
   通过history.pushState/history.replaceState方法和监听popState事件实现
## 1 hash模式 
### 1.1 原理
url中hash值的变化不会触发页面刷新，同时浏览器提供一个hashchange事件,当hash值变化的时候便会触发。这就为前端路由的实现提供了可能。
### 1.2 触发hash变化
1. 设置a标签，href = '#/blue'，当点击标签的时候，可以在当前url的后面增加上'#/blue'，同时触发hashchange,再回调函数中进行处理。
2. 直接在js中对location.hash = '#/blue'即可，此时url会改变，也会触发hashchange事件。

### 1.3 hashchange事件
hash变化的时候会触发该事件，同时会将变化前后的url作为参数传入到回调函数中。

### 1.4 原理demo
点击即可查看一个简单的[hash路由](https://wangminghuan.github.io/router-hash.html#/index)实现demo.

## 2 history模式 

### 2.1 原理
hash路由会再url中产生一个丑陋的#号，看起来整个url总觉得不舒服。还好，history新增了一些api，从而以一种更优雅的方式实现前端路由。通过MDN可以查阅所有的[history对象的API](https://developer.mozilla.org/en-US/docs/Web/API/History)，此处我们重点介绍两个新增的API history.pushState 和 history.replaceState：

### 2.2 pushState 和 replaceState
这两个 API 都接收三个参数，分别是

1. 状态对象（state object） — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
2. 标题（title） — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态(浏览器支持性不好，google并不会变化标题)。
3. 地址（URL） — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

两个API的差异就在于一个是“新增”一条历史记录，一个是“替换”当前历史记录。  

**延伸说明：**   
vue下的router-link默认会渲染成a标签，hash模式为`<a href="#/somePath"></a>`;history模式为`<a href="/somePath"></a>`，不同的是在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。

### 2.3 popState事件
1. 设置pushState(),replaceState()时并不会触发popstate事件，popstate事件只在点击浏览器前进、后退按钮或调用history.back()、history.forward()等时触发。
2. pushState()方法第一个参数可以指定一个state对象，并通过history.state或popstate事件回调中event对象获取

###2.4 原理demo
点击即可查看一个简单的[history路由](https://wangminghuan.github.io/router-history.html)实现demo，缺点是无法刷新，这需要后端做出相应配置。


##3 禁用浏览器后退
history模式的后退阻止，监听popState事件
	
	history.pushState(null, null, oldPath); //后退的同时向前推一条历史记录，感官上是阻止了后退
hash模式的后退阻止，监听popState事件
    
    window.history.forward() //后退的同时前进一条，感官上也是阻止了后退

##  参考文献

1. [前端路由的两种实现原理](https://segmentfault.com/a/1190000007238999)
2. [前端路由的实现方式](https://www.jianshu.com/p/5a5813648d87)
3. [利用JS实现前端路由](https://www.cnblogs.com/wozien/p/6597306.html)
4. [利用js实现 禁用浏览器后退](https://blog.csdn.net/zc474235918/article/details/53138553)
5. [vue-router之router-link](https://router.vuejs.org/zh/api/#router-link)
6. [从history api看主流框架的路由机制](https://segmentfault.com/a/1190000013126134)
7. [前端路由实现](https://segmentfault.com/a/1190000015347460)


