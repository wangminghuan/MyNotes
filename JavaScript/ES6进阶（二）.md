<font face="微软雅黑" size="4" >
<font size="6">ES6语法学习之异步方案</font>

## 第一章 Promise

### 1.1 概述
`promise`是异步编程的一种解决方案，英语意思就是“承诺”, 简单说就是一个容器，里面保存着某个未来才会结束的事件。

#### Promise对象有以下两个特点：  
1. 对象的状态不受外界影响：Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
只有操作结果可以影响，其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果：只要状态改变，改变后的状态是凝固的，不会再变了，会一直保持这个结果，无论什么时候去添加回调函数，都会立即得到这个结果，这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### 优缺点
1. 优点：有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
2. 缺点：  
1）无法取消Promise，一旦新建它就会立即执行，无法中途取消。  
2）如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。  
3）当处于pending状态时，无法得知目前进展到哪一个阶段。 

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
### 1.2 基本用法
我们用promise封装一个异步请求图片的方法：

	function loadImageAsync(url) {
	  return new Promise(function(resolve, reject) {
	    const image = new Image();
	    image.onload = function() {
	      resolve(image);
	    };
	
	    image.onerror = function(err) {
	      reject(err);
	    };
	
	    image.src = url;
	  });
	}
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用（可选）。

	loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg").then((res)=>{
		  console.log(res)
		},(err)=>{
		  console.log(err)
		})

也可以通过catch方法进行改造：

	loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg").then((res)=>{
	  console.log(res)
	}).catch((err)=>{
	  console.log(err)
	})
Promise不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

我们也可以这样写：

	const myPromise=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_2002.jpg");
	myPromise.then((res)=>{
	  console.log(res)
	})
	myPromise.catch((err)=>{
	  console.log(err)
	})
控制台会有一个报错：
![](https://i.imgur.com/vykAmWB.png)
这就是上述优缺点板块中提到的缺点2，如果不设置回调，Promise内部抛出的错误，不会反应到外部。

我们也可以“等会”在去获取promise的结果：

	const myPromise=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_2002.jpg");
	setTimeout(()=>{
	  myPromise.then((res)=>{
	    console.log(res)
	  }).catch((err)=>{
	    console.log(err)
	  })
	},2000)
通过控制台可以发现，刚开始会有一个报错，但2s后报错就会消失，打印结果同上。这就说明promise实例中确实“保存”了异步的结果，且状态是凝固的，无论什么时候去添加回调函数，都会立即得到这个结果。

### 1.3 执行顺序

	const myPromise=new Promise((resolve, reject)=>{
	    console.log("Promise")
	    resolve();
	})
	myPromise.then(()=>{
	  console.log("resolve")
	})
	console.log('Hi!');
结果依次输出：`"Promise" "Hi!" "resolve"`。解释：Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

### 1.4 Promise.prototype.finally()
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

	  loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_2002.jpg").then((res)=>{
	    console.log(res)
	  }).catch((err)=>{
	    console.log(err)
	  }).finally(() => {
	    console.log("run over")
	  });
### 1.5 Promise.all()
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例，仍以异步加载图片为例：

	const myPromise1=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_201.jpg");
	const myPromise2=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg");
	Promise.all([myPromise1, myPromise1]).then((res)=>{
	   console.log(res)
	}).catch((err)=>{
	  console.log("加载都失败了",err)
	})
1. 只有myPromise1、myPromise2的状态都变成fulfilled（成功），Promise.all的状态才会变成fulfilled，此时myPromise1、myPromise2的返回值组成一个数组，传递给Promise.all的回调函数。

2. 只要myPromise1、myPromise2之中有一个被rejected，pPromise.all的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给Promise.all的回调函数

3. 如果myPromise1或者myPromise2有自己的reject回调处理，那么将不会触发Promise.all的回调函数

		const myPromise1=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_201.jpg").catch(()=>{
		  console.log("myPromise1 失败了")
		});
		const myPromise2=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg");
		Promise.all([myPromise1, myPromise2]).then((res)=>{
		   console.log(res)
		}).catch((err)=>{
		  console.log("加载都失败了",err)
		})
运行结果为：   

		'myPromise1 失败了'
         (2) [undefined, img]

4. Promise.all方法接受一个数组作为参数，myPromise1、myPromise2、myPromise3都是 Promise 实例，如果不是，那么将会在Promise.resolve方法中将原数据返回（是否执行resolve方法依旧取决于其他实例共同的结果）

### 1.6 Promise.race()
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例，与`Promise.all` 不同的是只要myPromise1、myPromise2之中有一个实例率先改变状态，Promise.race的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给Promise.race的回调函数。

	const myPromise1=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_202.jpg");
	const myPromise2=loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg");
	Promise.race([myPromise1, myPromise2]).then((res)=>{
	   console.log(res)
	}).catch((err)=>{
	  console.log("加载都失败了",err)
	})
    //结果为：<img src="http://s29.9956.cn/static/common/img/crowdsource_logo_200_200">

### 1.7 Promise.resolve()
有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

#### 1） 参数为 Promise 实例
Promise.resolve将不做任何修改、原封不动地返回这个实例。

#### 2）参数是一个thenable对象
thenable对象指的是具有then方法的对象，比如下面这个对象：

	  const thenable = {
	    then: (resolve, reject)=> {
	      resolve(42);
	    }
	  };
	  
	  const p = Promise.resolve(thenable);
	  p.then((value)=> {
	    console.log(value);  // 42
	  });
#### 3）参数不是具有then方法的对象，或根本就不是对象

	const p = Promise.resolve('Hello');
	
	p.then((s)=>{
	  console.log(s)
	});

由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

#### 4）不带有任何参数
Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法

	const p = Promise.resolve();
	
	p.then(()=> {
	  console.log("resolve")
	});
    //输出 resolve
我们再看下执行顺序：

	setTimeout(()=> {
	  console.log('three');
	}, 0);
	
	Promise.resolve().then(()=> {
	  console.log('two');
	});
	
	console.log('one');
依次输出：one two three 解释：setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

### 1.8 Promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。该方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致：

	const thenable = {
	  then: (resolve, reject)=> {
	    resolve(42);
	  }
	};
	const p1 = Promise.reject(thenable);
	const p2 = Promise.reject("hello");
	const p3 = Promise.reject();
	p1.catch((err)=>{
	 console.log(err);//{then: ƒ}
	});
	p2.catch((err)=>{
	  console.log(err);//hello
	});
	p3.catch((err)=>{
	  console.log(err);//undefined
	});
### 1.9 Promise.try()
后续在补充。。。。

## 第二章 Generator 
generator的英语意思就是“发动机”, Generator函数是ES6提供的一种异步编程解决方案。语法行为与传统函数完全不同。 

### 2.1 理解 Generator
1. 语法上，可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
2. 形式上，Generator函数是一个普通函数，但是有两个特征：   
1) function关键字与函数名之间有一个星号；    
2) 函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）
	
		function* helloWorldGenerator() {
	      console.log("start");
		  yield 'hello';
		  yield 'world';
		  return 'ending';
		}
Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象（遍历器对象:Iterator Object）。

		var hw = helloWorldGenerator();
	    //必须先调用一下这个函数,但此时函数并不会执行。
	    //只有通过next方法才会执行。
调用遍历器对象的next方法，使得指针移向下一个状态，直到遇到下一个yield表达式（或return语句，每个函数都有一个隐藏的 `return undefined` 语句）为止。

		hw.next()
		// "start"；此时才会执行函数体，遇到yield停止
	    //{ value: 'hello', done: false }
		
		hw.next()
		// { value: 'world', done: false }
		
		hw.next()
		// { value: 'ending', done: true }
		
		hw.next()
		// { value: undefined, done: true }
### 2.2 yeild 语句
1. 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
2. yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行。
3. yield表达式与return语句既有相似之处，也有区别：  
1）相似之处：都能返回紧跟在语句后面的那个表达式的值。  
2）不同之处：yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能；  
一个函数中只能执行一次return语句，但是可以执行多次yield表达式。**Generator 函数可以返回一系列的值，因为可以有任意多个yield**。也可以说 Generator 生成了一系列的值，这也就是它的名称的（“生成器”）来历。
4. Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

		function* helloWorldGenerator() {
		  console.log("Hello world")
		}
		
		var hw = helloWorldGenerator();
		setTimeout(()=>{
		  hw.next()
		},1000)
5. yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。





## 第三章 async 和 await
### 3.1 概述
ES2017 标准引入了 async 函数，使得异步操作变得更加方便。`async` 函数就是 `Generator` 函数的语法糖。

### 3.2 基本用法
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。


	function loadImageAsync(url) {
	  return new Promise(function(resolve, reject) {
	    const image = new Image();
	    image.onload = function() {
	      resolve(url);
	    };
	
	    image.onerror = function(err) {
	      reject(err);
	    };
	
	    image.src = url;
	  });
	}
	
	async function loadMultiImage() {
	    let first = await loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_200.jpg");
	    let second = await loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_202.jpg");
	    let third = await loadImageAsync("http://s29.9956.cn/static/common/img/crowdsource_logo_200_201.jpg");
	    console.log([first ,second ,third]);
	}
	loadMultiImage().catch((err)=>{
	  console.log(err)
	})








</font>
## 参考文章
1. [阮一峰ES6入门](http://es6.ruanyifeng.com/)
2. [ES6 的 Symbol 类型及使用案例](https://my.oschina.net/u/2903254/blog/818796)

