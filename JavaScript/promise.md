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
11. async/aw

##  参考文献

1. [什么是 Event Loop](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)


