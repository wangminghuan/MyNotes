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

## demo

	<!DOCTYPE html>
	<html lang="en">
	
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>前端路由实现</title>
	    <style>
	        .warp {
	            width: 400px;
	            height: 400px;
	            border: 1px solid grey;
	            margin: 0 auto;
	        }
	
	        .nav {
	            border-bottom: 1px solid grey;
	        }
	
	        .nav li {
	            display: inline-block;
	            list-style: none;
	        }
	
	        .nav li a {
	            display: inline-block;
	            text-decoration: none;
	            padding: 10px 15px;
	        }
	
	        .router {
	            padding: 20px;
	        }
	
	        a {
	            cursor: pointer;
	        }
	    </style>
	
	</head>
	
	<body>
	    <section class="warp">
	        <div class="nav">
	            <ul class="nav-btn">
	                <li><a href="javascript:void(0)" data-path="index">首页</a></li>
	                <li><a href="javascript:void(0)" data-path="news">新闻</a></li>
	                <li><a href="javascript:void(0)" data-path="about">关于</a></li>
	            </ul>
	        </div>
	        <div id="app" class="router">
	            <!-- 内容加载区域 -->
	        </div>
	    </section>
	    <script>
			//hash 模式
	        (function () {
	            var router = [{
	                    'path': 'index',
	                    'url': '我是首页'
	                },
	                {
	                    'path': 'news',
	                    'url': '我是新闻页面'
	                },
	                {
	                    'path': 'about',
	                    'url': '我是关于页面'
	                }
	            ];
	
	            //改变页面
	            function renderPage(url) {
	                document.getElementById("app").innerHTML = (url)
	            }
	            document.querySelector(".nav-btn").addEventListener("click", function (e) {
	                var path = (e.target.getAttribute("data-path"));
	                if (path) {
	                    for (var i in router) {
	                        if (router[i].path == path) {
	                            renderPage(router[i].url);
	                            location.hash="#/"+router[i].path ;
	                        }
	                    }
	                }
	            })
	            
	            window.addEventListener('hashchange', function (e) {
	                var hash=e.newURL.slice(e.newURL.lastIndexOf('#'));
	                var start = hash.lastIndexOf('/');
	                var path = hash.slice(start + 1) || 'index';
	                for (var i in router) { //刷新 加载
	                    if (router[i].path == path) {
	                        renderPage(router[i].url);
	                        break;
	                    }
	                    if (i == router.length - 1) { //重定向
	                        renderPage(router[0].url);
	                    }
	                }
	            });
	            window.addEventListener('load', function () {
	                var start = location.hash.lastIndexOf('/');
	                var path = location.hash.slice(start + 1) || 'index';
	     
	                for (var i in router) { //刷新 加载
	                    if (router[i].path == path) {
	                        renderPage(router[i].url);
	                        location.hash="#/"+path ;
	                        break;
	                    }
	                    if (i == router.length - 1) { //重定向
	                        renderPage(router[0].url);
	                        location.hash="#/"+router[0].path;
	                    }
	                }
	            });
	
	        })();
	        //history 模式
	        (function () {
	            var router = [{
	                    'path': 'index',
	                    'url': '我是首页'
	                },
	                {
	                    'path': 'news',
	                    'url': '我是新闻页面'
	                },
	                {
	                    'path': 'about',
	                    'url': '我是关于页面'
	                }
	            ];
	
	            //改变页面
	            function renderPage(url) {
	                document.getElementById("app").innerHTML = (url)
	            }
	            document.querySelector(".nav-btn").addEventListener("click", function (e) {
	                var path = (e.target.getAttribute("data-path"));
	                if (path) {
	                    for (var i in router) {
	                        if (router[i].path == path) {
	                            renderPage(router[i].url);
	                            history.pushState(router[i].url, null, router[i].path);
	                        }
	                    }
	                }
	            })
	            window.addEventListener('popstate', function (e) {
	                var url = e.state;
	                renderPage(url);
	
	            });
	            window.addEventListener('load', function () {
	                var start = location.href.lastIndexOf('/');
	                var path = location.href.slice(start + 1) || 'index';
	                console.log(path)
	
	                for (var i in router) { //刷新 加载
	                    if (router[i].path == path) {
	                        renderPage(router[i].url);
	                        history.replaceState(router[i].url, null, path);
	                        break;
	                    }
	                    if (i == router.length - 1) { //重定向
	                        renderPage(router[0].url);
	                        history.replaceState(router[i].url, null, router[0].path);
	                    }
	                }
	            });
	
	        })()
	    </script>
	
	</body>
	
	</html>
## 其他
vue下的router-link默认会渲染成a标签，hash模式为`<a href="#/somePath"></a>`;history模式为`<a href="/somePath"></a>`，不同的是在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。
##  参考文献

1. [前端路由的两种实现原理](https://segmentfault.com/a/1190000007238999)
2. [前端路由的实现方式](https://www.jianshu.com/p/5a5813648d87)
3. [利用JS实现前端路由](https://www.cnblogs.com/wozien/p/6597306.html)
4. [利用js实现 禁用浏览器后退](https://blog.csdn.net/zc474235918/article/details/53138553)
5. [vue-router之router-link](https://router.vuejs.org/zh/api/#router-link)
6. [从history api看主流框架的路由机制](https://segmentfault.com/a/1190000013126134)
7. [前端路由实现](https://segmentfault.com/a/1190000015347460)


