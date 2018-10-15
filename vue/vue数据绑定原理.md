<font face="微软雅黑" size="4" >
<font size="6">Vue 数据绑定原理</font>
## VUE设计思想之MVVM模式

### MVVM 通信示意图
![](https://i.imgur.com/bDkDlbd.png)

1. view:视图层,对应DOM
2. model:数据层,就是业务逻辑相关的数据对象(js对象等)
3. viewModel:连接数据和视图的中间件

如果映射到一个vue组件中，那么可以这样理解
![](https://i.imgur.com/hnQwQbN.png)

### 设计原理
1. 在MVM架构下View和model是不能直接通讯的,需要ViewModel来做通讯。
2. ViewModel通常要实现一个observer（观察者），当model变化时，通知view层自动更新；当用户操作view层时，通知model层数据变化，这就是实现了数据跟视图的双向绑定。


## 几种实现双向绑定的做法

1. 订阅者-发布者模式（backbone.js）  
   更新数据方式通常做法是 vm.set('property', value)，该方式有点 low，看起来没那么友好

2. 脏值检查（angular.js）

3. 数据劫持（vue.js）  
   Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调

## Object.defineProperty 方法
方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

#### 语法

	Object.defineProperty(obj,prop,descriptor)

#### 参数

	obj 需要定义属性的对象。
	
	prop 需定义或修改的属性的名字。
	
	descriptor 将被定义或修改的属性的描述符。
### 属性描述符

主要有两种形式： 数据描述符和存取描述符.

数据描述符： 拥有可写或不可写值的属性

	 可选键值：  
	 configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除） 
	 enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
	 writable: 当且仅当该属性的值为true时，该属性才能被赋值运算符改变， 默认为false。 
	 value： 该属性对应的值，可以是任意有效的javascript的值（数值，对象，函数等），默认为undefined
举个例子：

     var a={};
	 Object.defineProperty(a, "b", {
	      configurable: false, // 不可删除
	      enumerable: false,// 不可通过for in 枚举
	      writable: false, // 不可通过等号赋值改写
	      value: 8  //属性值
	    })

存取描述符： 由一对getter-setter函数功能来描述的属性

	  可选键值： 
	  configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除）
	  enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
	  get:  给属性提供getter的方法，如果没有 getter 则为undefined。当我们读取某个属性的时候，其实是在对象内部调用了该方法，此方法必须要有return语句。该方法返回值被用作属性值。默认为 undefined 。
	  set：设置属性值的方法， 如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。也就是说，当我们设置某个属性的时候，实际上是在对象的内部调用了该方法。

在 descriptor 中不能同时设置访问器（get 和 set）和 wriable 或 value，否则会错，就是说想用 get 和 set，就不能用 writable 或 value 中的任何一个。  

下面简单介绍下vue实现双向绑定的思路：（利用Object.defineProperty 方法和订阅发布模式）
## 一种简单双向绑定模式的demo

![](https://i.imgur.com/17AndIY.png)

黑色的线代表初始化观察者列表等等，红色的线是活动过程中，Model层的状态改变向View层更新的过程

#### model层向view层的映射
	 //将dom对象转化为文档碎片，同时进行占位符合指令解析
	
	  function domToFragment(node,vm){
	      var fragment=document.createDocumentFragment();
	      var children;
	      // 注意这里是赋值操作，返回的值为node.firstChild的值，当node.firstChild为null或者undefined时候，循环就会结束
	        //对子节点进行编译，并添加到fragment中
	      while(children=node.firstChild){
	        //第一步：解析模板
	        compile(children,vm)
	        // parentNode.append()可以同时传入多个节点或字符串，没有返回值；(有兼容性问题)
	        // 而parentNode.appendChild()只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点
	        //第二步：占位符和指令解析
	        fragment.append(children);
	      }
	      return fragment;
	  }
	  //解析模板-占位符和指令解析
	  function compile(node,vm){
	    var reg = /\{\{(.*)\}\}/;
	  // 1	Element	一个元素	
	  // 2	Attr	一个属性	
	  // 3	Text	一个元素的文本内容 或属性	
	    if(node.nodeType === 1){
	         var attrs=node.attributes;
	         for(var i=0,lens=attrs.length;i<lens;i++){
	           if(attrs[i].nodeName=="f-model"){
	              var bindName=attrs[i].nodeValue;
	              node.value=vm.data[bindName]
	           }
			   node.removeAttribute('f-model');
	         }
	    } else if(node.nodeType === 3){
	          if(reg.test(node.nodeValue)){
	                var bindName=RegExp.$1.trim();
	                node.nodeValue=vm.data[bindName]
	          }
	    } 
	  }
	   function MVVM(option){
	         this.data=option.data;
	         var id=option.el;
	         var dom=domToFragment(document.getElementById(id),this);
	         document.getElementById(id).appendChild(dom);
	   }
	   new MVVM({
	     el:"app",
	     data:{
	       text:"Hello World"
	     }
	   })
上面的代码就简单实现了将输入框内容及文本节点内容与数据绑定。下一步要做的就是数据对象的响应式

#### model层向view层的动态绑定

##### 第一步，增加observe，实现view层的数据变化向model层的绑定
	   //观察者对象
	  //将所有属性通过Object.defineProperty进行监听
	  function observe(obj) {
	      if (!obj || typeof obj !== "object") {
	        return;
	      }
	      Object.keys(obj).forEach(function (key) {
	        defineReactive(obj, key, obj[key])
	      })
	    }
	
	    function defineReactive(obj, key, value) {
	
	      observe(value); //监听属性内部对象的变化
	      Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: false, //不能再定义
	        get: function () {
	          return value
	        },
	        set: function (newVal) {
	          console.log("监听到属性" + key + "变化了", value + "-->" + newVal);
	          value = newVal
	        }
	      })
	    }
	    ....//省略，同上
	    function compile(node,vm){
	    ...//省略，同上
	    if(node.nodeType === 1){
	
	          node.addEventListener('input',function(e){
	              vm.data[bindName] = e.target.value;
	            });
	       }
	     ...//省略，同上
	     }
	    function MVVM(option){
	         ...
	         observe(this.data,this)//增加行，应用观察者
	         ...
	   }
##### 第二步，增加watcher和pubsub，实现双向绑定（完整代码）
	//订阅发布模式
	  function PubSub(){
	    this.handlers=[];
	  }
	  PubSub.prototype={
	    on:function(sub){
	       this.handlers.push(sub)
	    },
	    emit:function(){
	      //触发所有的订阅者更新
	      this.handlers.forEach(function(item){
	        item.update();
	      });
	    }
	  }
	
	  function Watcher(vm, node, bindname){
	      PubSub.target=this;
	      //完成watcher的初始化
	      this.name = bindname;
	      this.node = node;
	      this.vm = vm;
	      this.update(); //初次绑定时进行更新
	      PubSub.target = null; //保证Dep.target唯一
	  }
	  Watcher.prototype={
	    get:function(){
	        this.value=this.vm.data[this.name]
	    },
	    update:function(){
	      this.get();
	      this.node.nodeValue = this.value;  
	    }
	  }
	
	
	   //观察者对象
	  //将所有属性通过Object.defineProperty进行监听
	  function observe(obj) {
	      if (!obj || typeof obj !== "object") {
	        return;
	      }
	      Object.keys(obj).forEach(function (key) {
	        defineReactive(obj, key, obj[key])
	      })
	    }
	
	    function defineReactive(obj, key, value) {
	
	      observe(value); //监听属性内部对象的变化
	      var _sub = new PubSub();
	      Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: false, //不能再定义
	        get: function () {
	          //PubSub.target存在，将目标元素添加到当前data属性的观察者列表中, 
	          // PubSub.target 就是Watcher构造函数本身，订阅函数会将其作为参数添加到订阅列表中，执行时会调用update方法
	          if(PubSub.target){
	            _sub.on(PubSub.target)
	          }
	          return value
	        },
	        set: function (newVal) {
	          value = newVal;
	          //数据更新则触发订阅函数的订阅功能
	          _sub.emit()
	        }
	      })
	    }
	
	  //将dom对象转化为文档碎片，同时进行占位符合指令解析
	
	  function domToFragment(node,vm){
	      var fragment=document.createDocumentFragment();
	      var children;
	      // 注意这里是赋值操作，返回的值为node.firstChild的值，当node.firstChild为null或者undefined时候，循环就会结束
	        //对子节点进行编译，并添加到fragment中
	      while(children=node.firstChild){
	        //第一步：解析模板
	        compile(children,vm)
	        // parentNode.append()可以同时传入多个节点或字符串，没有返回值；(有兼容性问题)
	        // 而parentNode.appendChild()只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点
	        //第二步：占位符和指令解析
	        fragment.append(children);
	      }
	      return fragment;
	  }
	  //解析模板-占位符和指令解析
	  function compile(node,vm){
	    var reg = /\{\{(.*)\}\}/;
	  // 1	Element	一个元素	
	  // 2	Attr	一个属性	
	  // 3	Text	一个元素的文本内容 或属性	
	    if(node.nodeType === 1){
	         var attrs=node.attributes;
	         for(var i=0,lens=attrs.length;i<lens;i++){
	           if(attrs[i].nodeName=="f-model"){
	              var bindName=attrs[i].nodeValue;
	              node.value=vm.data[bindName];
	              node.addEventListener('input',function(e){
	                  vm.data[bindName] = e.target.value;
	                });
	              node.removeAttribute('f-model');
	           }
	         }
	    } else if(node.nodeType === 3){
	          if(reg.test(node.nodeValue)){
	                var bindName=RegExp.$1.trim();
	                // node.nodeValue=vm.data[bindName]
	                new Watcher(vm, node, bindName); //为该页面元素node生产watcher
	          }
	    } 
	  }
	   function MVVM(option){
	         this.data=option.data;
	         observe(this.data,this)
	         var id=option.el;
	         var dom=domToFragment(document.getElementById(id),this);
	         document.getElementById(id).appendChild(dom);
	   }
	   var mv=new MVVM({
	     el:"app",
	     data:{
	       text:"Hello World",
	       text2:"yyy"
	     }
	   })

整个双向绑定的流程大致如下： 
 
1. compile解析模板-占位符和指令解析，compile函数创建时对绑定变量进行监听（通过watcher函数）  
2. watcher函数定义一个update方法，该方法会将数据变化反应在view层。  
3. observe劫持属性，执行时做了以下几件事：a）通过observe将data内的数据进行劫持；b)监听input事件，change的同时改变data的值；  
4. observe劫持时，通过订阅发布模式绑定数据，在get时订阅，在set时发布，触发watcher函数的update方法更新。
### 参考文档

1. [Vue 数据绑定详细原理剖析](https://blog.csdn.net/itkingone/article/details/79152951)
