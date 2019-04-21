<font face="微软雅黑" size="4" >
<font size="6">js的执行（一）</font>

由于我们这里主要讲 JavaScript 语言，那么采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。

## 宏观和微观任务

JavaScript 引擎等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环，所以在 Node 术语中，也会把这个部分称为事件循环。

在底层的 C/C++ 代码中，这个事件循环是一个跑在独立线程中的循环，我们用伪代码来表示，大概是这样的：

	
	while(TRUE) {
	    r = wait();
	    execute(r);
	}

可以看到，整个循环做的事情基本上就是反复“等待 - 执行”  

这里每次的执行过程，其实都是一个宏观任务。我们可以大概理解：宏观任务的队列就相当于事件循环。

在宏观任务中，JavaScript 的 Promise 还会产生异步代码，JavaScript 必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列：


![](https://static001.geekbang.org/resource/image/16/65/16f70a9a51a65d5302166b0d78414d65.jpg)

### promise
Promise 永远在队列尾部添加微观任务。setTimeout 等宿主 API，则会添加宏观任务。


    var r = new Promise(function (resolve, reject) {
      console.log("a");
      resolve()
    });
    setTimeout(()=>{
      console.log("d")
    })
    r.then(() => console.log("c"));
    console.log("b")
    //运行结果依次为：a,b,c,d

我们再看下面的代码

    var r = new Promise(function (resolve, reject) {
      console.log("a");
      resolve()
    });

    setTimeout(() => console.log("d"), 0)
    var r1 = new Promise(function (resolve, reject) {
      resolve()
    });

    r.then(() => {
      var begin = Date.now();
      while (Date.now() - begin < 1000);
      console.log("c1")
      new Promise(function (resolve, reject) {
        resolve()
      }).then(() => console.log("c2"))
    });
    //执行结果：a, c1, c2 ,d

这里我们强制了 1 秒的执行耗时，这样，我们可以确保任务 c2 是在 d 之后被添加到任务队列。可以看到，即使耗时一秒的 c1 执行完毕，再 创建的 c2，仍然先于 d 执行了，这很好地解释了微任务优先的原理。

通过一系列的实验，我们可以总结一下如何分析异步执行的顺序：

- 首先我们分析有多少个宏任务；
- 在每个宏任务中，分析有多少个微任务；
- 根据调用次序，确定宏任务中的微任务执行次序；
- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
- 确定整个顺序。

### async/await

async函数返回的是 Promise 对象, 一旦遇到await就会先返回(可以通过await来等待一个Promise)，等到异步操作完成，再接着执行函数体内后面的语句。

	function sleep(duration) {
        return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
        })
    }
    async function foo(){
        console.log("a")
        await sleep(2000)
        console.log("b")
    }
    foo().then(()=>{
      console.log("foo over")
    });
   //执行结果：a, b, foo over
</font>
