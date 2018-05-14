<font face="微软雅黑" size="4" >
<font size="6">JS异步编程</font>


## 1 异步任务
![](https://i.imgur.com/xt2X98q.jpg)

## 2 异步执行的运行机制
1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步

## 3 event loop
1. JS 是一种单线程语言，所有任务都在一个线程上完成，但是却能开一些辅助线程，在后台运行。在客户端，Web Workers 接口会生成真正的操作系统级别的线程。
2. 简答来说就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。
3. 单线程模型虽然对JavaScript构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果部署得好，JavaScript程序是不会出现堵塞的，这就是为什么node.js平台可以用很少的资源，应付大流量访问的原因。


## 4 异步编程的几种方式
1. setTimeout
2. setInterval
3. setImmediate
4. Promise
5. MutationObserver
6. process.nextTick
7. 回调函数
8. 事件监听
9. 发布/订阅
10. Promise 
11. async/await

## 5 Promise

1. Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。Promise是一个容器，里面保存着某个未来才会结束的事件的结果。
2. 从语法上来说，Promise是一个对象，使用的时候通常通过构造函数生成promise实例来进行异步编程

举几个简单的例子：

1. 图片加载 

        function loadImageAsync(url) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = function () {
                    reject("加载失败");
                };
                image.src = url;
            });
        }
        loadImageAsync("http://crowdsource-test.oss-cn-hangzhou.aliyuncs.com/shop/apply/1524205867.png").then((res) => {
            console.log("加载完毕", res)
        }).catch((err) => {
            console.log(err)
        })


2. promise写法实现ajax  

        function axios(_url, _data) {
            return new Promise((resolve, reject) => {

                var defaults = {
                    method: "GET",
                    url: _url,
                    data: _data,
                    async: true,
                    cache: true,
                    contentType: 'application/x-www-form-urlencoded'
                };

                //处理用户输入的data数据

                if (typeof defaults.data == 'object' && Object.prototype.toString.call(defaults.data) !=
                    "[object Array]") {
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

                //4. 接收服务器返回请求内容，onreadystatechange
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            reject(xhr.status)
                        }
                    }
                }
            })
        }
        //调用
        axios("/api/user/account/myqr", {
            u_id: 96
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
 
## 6 axios
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
### 特性
1. 从浏览器中创建 XMLHttpRequests
2. 从 node.js 创建 http 请求
3. 支持 Promise API
4. 拦截请求和响应
5. 转换请求数据和响应数据
6. 取消请求
7. 自动转换 JSON 数据
8. 客户端支持防御 XSRF

### axios创建的对象
axios在浏览器端创建的还是XMLHttpRequest对象，将返回数据打印出来，结果如下：
![](https://i.imgur.com/zo2eKj5.jpg)

我们通过原生写法创建XMLHttpRequest,将返回数据打印出来，结果如下：
![](https://i.imgur.com/26Zihx0.jpg)

对比可以看出axios发出请求返回比原生的数据要“多”一些，其实就是axios的config配置，定义了更多的api,可以让我们做更多的事儿，`config.request`就和原生写法返回的是一样的内容。
##  参考文献

1. [什么是 Event Loop](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
2. [axios](https://www.jianshu.com/p/df464b26ae58)


