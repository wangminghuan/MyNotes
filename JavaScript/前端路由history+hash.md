<font face="微软雅黑" size="4" >
<font size="6">前端路由</font>  

在以前的web程序中，路由字眼只出现在后台中。但是随着SPA单页面程序的发展，便出现了前端路由一说。所谓SPA应用就是：一个网站只有一个html页面，但是点击不同的导航显示不同的内容，对应的url也会发生变化，这就是前端路由做的事。通过监听URL的变化，展示给用户的页面也不相同。

## 实现方式：

1. hash方式  
   通过location.hash方法和监听hashchange事件实现
2. history模式  
   通过history.pushState/history.replaceState方法和监听popState事件实现
## 1 hash模式 


## 2 history模式 
通过MDN可以查阅所有的[history对象的API](https://developer.mozilla.org/en-US/docs/Web/API/History)，此处我们重点介绍两个新增的API history.pushState 和 history.replaceState：
### 2.1 pushState 和 replaceState
这两个 API 都接收三个参数，分别是

1. 状态对象（state object） — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
2. 标题（title） — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
3. 地址（URL） — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

## 禁用浏览器后退

## 其他
vue下的router-link默认会渲染成a标签，hash模式为`<a href="#/somePath"></a>`;history模式为`<a href="/somePath"></a>`，不同的是在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。
##  参考文献

1. [前端路由的两种实现原理](https://segmentfault.com/a/1190000007238999)
2. [前端路由的实现方式](https://www.jianshu.com/p/5a5813648d87)
3. [利用JS实现前端路由](https://www.cnblogs.com/wozien/p/6597306.html)
4. [利用js实现 禁用浏览器后退](https://blog.csdn.net/zc474235918/article/details/53138553)
5. [vue-router之router-link](https://router.vuejs.org/zh/api/#router-link)


