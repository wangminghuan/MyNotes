<font face="微软雅黑" size="4" >
<font size="6">Vue.js 学习总结 实时刷新</font>


## 1 环境搭建
>[参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 待补充 20161209

## 2 基础

关于设计模式的区别，请点击：[MVC,MVP和MVVM区别](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

### 2.1 属性和方法  
1. **代理属性和方法**：  
  每个 Vue 实例都会代理其 data 对象里所有的属性，即：把data下的属性和方法挂载到实例对象（例如：vm）下。  

		var userData = { a: 1 }
		var vm = new Vue({
		  data: userData
		})
		vm.a === userData.a // -> true
		// 设置属性也会影响到原始数据
		vm.a = 2;
		console.log(userData.a); // -> 2

		userData.a = 3
		console.log(vm.a) // -> 3
2. **$前缀+属性和方法（实例暴露属性和方法）**：  
  vue实例暴露出来的一些属性和方法，他们都带有$前缀的属性和方法，方便我们与代理属性和方法区分开；
        
        //实例暴露出来的属性===代理属性
        vm.$data.a === vm.a // -> true
3. **数据的双向绑定**  

		var userData = { a: 1 };
		var vm = new Vue({
		  el: "#example",
		  data: userData
		});
		console.log(vm.$el === document.getElementById('example'));//true
		
		console.log(vm.$data.a === vm.a);//true,
         //vm.a是代理属性，vm.$data.a是实例对外暴露的data对象下的a属性
         //二者是相等的，只是写法上的一些区别；
		
		console.log(vm.a===userData.a);//true，
        //本例相等，但不代表二者数据是绑定的
		userData.a=2;
		console.log(vm.$data.a==2);//true
		console.log(vm.a==2);//true
###2.2 生命周期：

1. 可以理解为在整个vue实例构建的过程中，每个阶段的分割点（也是所谓的“钩子”）：
![vue实例的生命周期](http://i.imgur.com/IYPpCwl.png)
2. 构建的过程中可以编写这些周期节点的函数，会在匹配的状态下自动触发。譬如：  

		var vm = new Vue({
		  data: {
		    a: 1
		  },
		  created: function () {
		    // `this` 指向 vm 实例
		    console.log('a is: ' + this.a)
		  }
		})
		//控制台会直接输出 a is 1，这是因为实力构建完成，自动触发执行created下的函数

### 2.3 模板
1. **[语法]**  
   vue的模板解析基于Mustache（小胡子，双大括号{{}}）；  
   {{}}里面的内容不是字符串等js数据，均是**数据对象上对应的属性名称**

2. **[{{js表达式}}]**  
    双大括号里面可以运行解析js语法，但只能解析**单个表达式！！**，if语句就无法运行，譬如，if判断无法执行，但三目运算则可以。

    	{{name? myName: youName}} 
   模板表达式都被放在沙盒中，。用户定义的全局变量是访问不到的，只能访问实例中的变量，和白名单中的全局变量，如 Math 和 Date。  
   语句和表达式的区别请参见目录中相关总结文档。
3. **[标签属性]**  
   模板中标签属性不能通过双大括号（{{}}）进行编译，必须通过v-bind指令

    	<a v-bind:href="url"></a>
### 2.4 指令

4. **[指令]**：指令是带有 v- 前缀的特殊属性。
	- 作用：当表达式的值改变时，相应的将某些行为应用到DOM上；
    - 参数：某些指令可以接受参数，通过‘：’指明

			<a v-blind:href="url"></a>
           	<!-- v-blind指令将该元素的href属性与表达式url的值绑定 -->
            //href是属性！！！url是表达式！！！！
			<a :href="http://m.58.com">58同城</a>
           //这样是错误的，vue会认为http://xxx是一个表达式，但实例中又没有这个属性，故解析出来就是<a>58同城</a>
    - 修饰符：以‘.’作为后缀，使指令以特殊方式绑定，譬如：

		       <form v-on:submit.prevent="onSubmit"></form>
		       <!-- 对于提交事件，触发时调用event.preventDefault()，阻止默认事件-->
    - 指令缩写：  

	      	<!-- 完整语法 -->
			<a v-bind:href="url"></a>
			<!-- 缩写 -->
			<a :href="url"></a>

			<!-- 完整语法 -->
			<a v-on:click="doSomething"></a>
			<!-- 缩写 -->
			<a @click="doSomething"></a>


3. **[过滤器]**：{{ message | filterA | filterB('arg\_1', 'arg\_2') }}
	- 管道符（|）指示，放在插值的尾部；且可以串联；
	- 插入的其实是过滤函数名称，可以接受参数，总是接受表达式的值作为第一个参数

			new Vue({
			  // ...
			  filters: {
			    filterA: function (value) {
			      //do some thing...
			    },
				filterB: function (value,arg1,arg2) {
			      //do some thing...
                  //实参'arg_1'和'arg_2'只能作为第2个和第3个参数。
			    },
			  }
			})

### 2.4 属性
1. **[计算属性]**：  
   实例化时的computed属性。下面我们举一个例子：  	 

  		<!-- 模板文件-->
  		<div id="example">
  		  <p>Original message: "{{ message }}"</p>
  		  <p>Computed reversed message: "{{ reversedMessage }}"</p>
  		</div>

  		<!-- js文件-->
  		var userData={
  			message:'Hello'
  		};
  		var vm = new Vue({
  		  el: '#example',
  		  data: {
  			message:'Hello'
  		 },
  		  computed: {
  		    // a computed getter
  		    reversedMessage: function () {
  		      // `this` points to the vm instance
  		      return this.message.split('').reverse().join('')
  		    }
  		  }
  		})
   此时便声明了一个计算属性  `reversedMessage`, 实例化时computed下的reversedMessage函数将作为`vm.reversedMessage`属性的getter。  

2. **[计算属性 VS Methods]**  
通过实例化时的method同样可以达到上述效果：  

		var userData={
			message:'Hello'
		};
		var vm = new Vue({
			  el: '#example',
			  data: {
			  message:'Hello'
			 },
			  methods: {
			    reversedMessage: function () {
			      return this.message.split('').reverse().join('')
			    }
			  }
			});//method中的方法和属性不能命名相同，否则会报错。
二者区别： 计算属性对它的**依赖是有缓存**的，只要message属性没有变，多次执行也不会重新计算，只会返回之前的计算结果；Methods则不会。
  
7. **[计算属性 VS Watched Property]**  
Vue.js 提供了一个方法 $watch ，它用于观察 Vue 实例上的数据变动。

		var vm = new Vue({
			  el: '#example',
			  data: {
				message:'Hello',
 				reversedMessage:'olleH',
			 },
			  watch:{
  				message:function(val){
  				this.reversedMessage=this.message.split('').reverse().join('')
  				}

  			 }
			});
     	 //改变vm.message，vm.reversedMessage也会跟着变动
但是，更建议使用计算属性。  
4. **[一个例子]**  
vue构建的一个时间显示器  
html结构:  
	
		<div id="timer">
			<p>{{year}}年{{month}}月{{day}}日 {{hour}}点:{{min}}分:{{sec}}秒</p>
		</div>
js代码：   
  
	    new Vue({
	    	el:"#timer",
	    	data:{
	    		date:new Date()
	    	},
	    	computed:{
	    		year:function(){
	                 return this.date.getFullYear();
	    		},
	    		month:function(){
	                 return this.date.getMonth()+1;
	    		},
	    		day:function(){
	                   return this.date.getDate(); 
	    		},
	    		hour:function(){
	                   return this.date.getHours()
	    		},
	    		min:function(){
	                    return this.date.getMinutes();
	    		},
	    		sec:function(){
	                   return this.date.getSeconds();
	    		}
	    	},
	    	created:function(){
	    		var self=this;
	    		setInterval(function(){
					self.date=new Date()
	    		},1000)
	    		
	    	}
	    })


8. **[计算属性的setter]**  
因为computed下提供的函数将用作属性（代理属性） vm.reversedMessage 的 getter 。所以setter也得通过vm.reverseMessage进行赋值才能触发。

		var userDate={
		  message:"hello",
		  reversedMessage:"olleh"
		};
		var vm = new Vue({
			  el: '#example',
			  data: userDate,
			  computed: {
			    reversedMessage: {
			    	get:function(){
			          return this.message.split('').reverse().join('')
			    	},
			    	set:function(val){
			           this.message=val.split('').reverse().join('')
			    	}
			    }
			  }
			});
        console.log(vm.$data.reversedMessage==userDate.reversedMessage);//true
	    console.log(vm.$data.reversedMessage==vm.reversedMessage);//true

		vm.reversedMessage="dlrow";//重写代理属性,视图更新为world 和 dlrow

		console.log(vm.$data.reversedMessage==userDate.reversedMessage);//true
	  	console.log(vm.$data.reversedMessage==vm.reversedMessage);//false
从上述例子可以看出代理属性的变化并没有反应到userDate和$data上，因为computed改写的只是代理属性的setter，断开了与上述二者的绑定关系；而视图上其实绑定的是代理属性值，所以视图也会更新。   

### 2.5 class与style绑定 
class与style都是标签属性，我们可以使用v-bind进行绑定，Vue对样式部分又做了增强，表达式的结果除了字符串外，还支持对象和数组。
#### 绑定html class （v-bind:class）
1. **[对象语法]**  
所谓对象语法，就是在模板中绑定的样式用字面量的的方式描述，例如：  

		<div id="example">
		<p class="static" v-bind:class="{active:isActive,'text-error':isError}">test example</p>
		</div>
		//////////分割线///////////////
		var vm=new Vue({
			el:"#example",
			data:{
				isActive:true,
				isError:true
			}
		});
键值（isActive与isError）在data中用**布尔值**表示，如果值为真，其键名（active和text-name）就会渲染到页面中。（拼接的变量必须用引号，分则无法解析）。   
也可以直接绑定一个对象名，对象的具体内容放到实例的data属性中：  

		<div id="example">
		<p class="static" v-bind:class="classObject">test example2</p>
		</div>
		//////////分割线///////////////
		var vm=new Vue({
		el:"#example",
		data:{
			classObject:{
				active:true,
				'text-error':false
			}
			}
		});
对象语法的好处：可以结合返回对象的计算属性使用：  

		//dom 结构同上
		var vm=new Vue({
			el:"#example",
			data:{
					isActive:true,
					isError:false
			},
			computed:{
				classObject:function(){
					return {
		                active:this.isActive && !this.isError,
		                'text-error':this.isError
					}
				}
			}
		});

2. **[数组语法]**  
数组语法，其实模板中写入的就是一个数组变量，数组中的每一项只是一个变量表达式，变量的具体数值在实例的data属性中获取，data中必须都有命名，否则会报错，如果没有值，置空即可。

		<div id="example">
		<p class="static" v-bind:class="[activeClass, errorClass]">test example4</p>
		</div>
		////////////分割线//////////////
		var vm=new Vue({
			el:"#example",
			data:{
				activeClass:'active',
				errorClass:'text-error'
			}
		});
数组变量同样接受其他形式表达式，如，三目运算：

		<div id="example">
		<p class="static" v-bind:class="[isActive? activeClass:'', errorClass]">test example5</p>
		</div>
		////////////分割线//////////////
		var vm=new Vue({
			el:"#example",
			data:{
				isActive:false,
				activeClass:'active',
				errorClass:'text-error'

			}
		});
当data中的isActive为true时，将会取data中的activeClass，否则为空。  
数组变量同样也可以混入对象语法；

#### 绑定内联样式 （v-bind:style）  
1. **[对象语法]**
同样可以使用对象语法，但与上述有不同，json中键值不再是布尔值，而是字符串，CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）。最终渲染结果是把json中的键名和data中的数值拼接在一块的。例如：

		<div id="example">
		<p class="static" v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">test example5</p>
		</div>
		////////////分割线//////////////
		var vm=new Vue({
			el:"#example",
			data:{
				activeColor:"red",
				fontSize:'16'
			}
		});
通常绑定到一个变量下会更容易维护

		<div id="example">
		<p class="static" v-bind:style="styleObject">test example5</p>
		</div>
		////////////分割线//////////////
		var vm=new Vue({
			el:"#example",
			data:{
				styleObject:{
					color:"blue",
				    fontSize:'16px'
				}

			}
		});//data中仍旧是驼峰法命名。

2. **[数组语法]**  
数组语法可以将多个样式集合应用到一个元素上：与上述语法不同的时，数组内每一个表达式其实是data中的json对象。

		<div id="example">
		<p class="static" v-bind:style="[baseStyles, overridingStyles]">test example7</p>
		</div>
		////////////分割线//////////////
		var vm=new Vue({
			el:"#example",
			data:{
				baseStyles:{
					color:"yellow",
				},
				overridingStyles:{
					fontSize:'16px'
				}
			}
		});
#### vue会自动给样式添加前缀。

### 2.6 条件渲染

1. **[v-if]**：根据v-if中表达式的值来决定显示v-if模块还是v-else模块

		<div id="example">
		    <p v-if="show">我要显示</p>
		    <p v-else>我被隐藏</p>
	   </div>
根据实例data属性中的show值（会被强制转化为布尔值）来计算显示哪个标签。
2. **[template上的v-if]**：如果需要切换多个元素，此时就要把一个 template元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。

		 <div id="example">
			   <template v-if="show">
			    <p>我要显示1</p>
			    <p>我要显示2</p>
			    <p>我要显示3</p>
			   </template>
			   <template v-else>
			    <p>我被隐藏1</p>
			    <p>我被隐藏2</p>
			    <p>我被隐藏3</p>
			   </template>
		   </div>

3. **[v-else]**: 元素必须紧跟在 v-if 元素或者 v-else-if的后面——否则它不能被识别。

4. **[v-else-if]**:类似JS语句中的if语句，多个组合判断。 

		<div v-if="type === 'A'">
		  A
		</div>
		<div v-else-if="type === 'B'">
		  B
		</div>
		<div v-else-if="type === 'C'">
		  C
		</div>
		<div v-else>
		  Not A/B/C
		</div>
v-else-if 必须跟在 v-if 或者 v-else-if之后
5. **[key值控制模板可重用性]**：  

		<div id="example">
		    <div>
		        <template v-if="loginType === 'username'">
		            <label>Username</label>
		            <input placeholder="Enter your username">
		        </template>
		        <template v-else>
		            <label>Email</label>
		            <input placeholder="Enter your email address">
		        </template>
		    </div>
		    <button @click="toggle">点我切换</button>
		</div>
		new Vue({
		    el: '#example',
		    data: {
		        loginType: 'username'
		    },
		    methods: {
		        toggle: function() {
		            return this.loginType = this.loginType === 'username' ? 'email' : 'username'
		        }
		    }
		})
因为v-if与v-else内容几乎一模一样，改变判断条件重新渲染时，vue只会更改变化部分，譬如例子中用户输入的内容在切换过程中不会被擦写掉。
但有时候我们需要全部擦写，这时候就用到了**key属性** 

		<div id="example">
		    <div>
		        <template v-if="loginType === 'username'" key="username">
		            <label>Username</label>
		            <input placeholder="Enter your username">
		        </template>
		        <template v-else>
		            <label>Email</label>
		            <input placeholder="Enter your email address" key="email">
		        </template>
		    </div>
		    <button @click="toggle">点我切换</button>
		</div>
key必须有唯一的值，就算写成一样的，还是无法复用。若要复用不写key值即可。
6. **[v-show]**:使用上与v-if大体相同，区别有两点：
   - 不支持template语法
   - 会始终被渲染，只是简单的切换元素的display属性
   - 频繁切换，建议使用v-show
### 2.7 列表渲染  
#### 2.7.1 v-for
1. **[基本用法]**：v-for 指令需要以 item in items 形式的特殊语法渲染页面， items 是源数据数组并且 item 是数组元素迭代的别名。

		<ul id="example-1">
		  <li v-for="item in items">
		    {{ item.message }}
		  </li>
		</ul>
		var example1 = new Vue({
		  el: '#example-1',
		  data: {
		    items: [
		      {message: 'Foo' },
		      {message: 'Bar' }
		    ]
		  }
		})
还支持另外一个参数index：

		<ul id="example-1">
		  <li v-for="(item, index) in items">
		    {{index}}-{{ item.message }}
		  </li>
		</ul>
也可以用of代替in  

		<ul id="example-1">
		  <li v-for="(item, index) of items">
		    {{index}}-{{ item.message }}
		  </li>
		</ul>
2. **[Template 中的 v-for]**
v-for 也可以用于循环整个template标签块：

		<div id="example">
		    <ul>
		        <template v-for="item in items">
		            <li>{{item.message}}</li>
                    <li>111111</li>
		        </template>
		    </ul>
		</div>
		/////////分割线////////////////
		var vm=new Vue({
			el:"#example",
			data:{
				items:[
		          {message:"one"},
		          {message:"two"},
		          {message:"three"}
				]
			}
		});
3. **[对象迭代 v-for]**
除了可以迭代数组，还可以迭代对象，同时可以遍历三个参数，键名，键值，索引

		<ul id="example">
		        <li v-for="(value, key, index) in items">
		            {{index}}:{{key}}-{{value}}
		        </li>
		    </ul>
		<script type="text/javascript">
		var vm=new Vue({
			el:"#example",
			data:{
				items:{
			      a:"one",
			      b:"two",
			      c:"three"
		    	}//a为key,value为one,1,2,3为索引
			}
		});
4. **[整数迭代 v-for]**

		<ul id="example">
			<li v-for="n in 10">{{n}}</li>
		</ul>
会渲染出一个1到10的li标签列表
5. **[v-for中的key]**：在循环中最好可以给每一项提供一个唯一的key属性，这样可以给Vue一个提示，方便它跟踪每个节点的身份，从而重用重排序现有元素。(key不一定非要通过v-for来绑定，其他地方也有用途。

<div></div>

#### 2.7.2数组更新检测
1. **[变异方法]**  
vue中含有一组观察数组变异的方法（顾名思义，调用这些方法会**改变原始数组数据**），调用这些方法更新数组，视图也会更新
	- push()
	- pop()
	- shift()
	- unshift()
	- splice()
	- sort()
	- reverse()  
	
    譬如[基本用法]中的例子，我们运行：
	
		example1.items.push({message:'blue'});
	视图将会自动更新
2. **[重塑数组]**  
除了上述变异方法外，还有一些非变异方法，如：filter(), concat(), slice()，调用这些方法会返回一个新数组。

3. **[注意事项]**  
如果要保持视图和数据同步，下面两个方法vue无法检测：  
	- 当你直接设置一个项的索引时，例如： vm.items[indexOfItem] = newValue
	- 当你修改数组的长度时，例如： vm.items.length = newLength   

我们可以选用下面两个方法来替代：

方法1：  

		Vue.set(vm.items, indexOfItem, newValue)
	
	    vm.items.splice(indexOfItem, 1, newValue)
方法2：  

		vm.items.splice(newLength)

### 2.8 事件处理器
#### 2.8.1 v-on 

1. **[直接运行js语句]**：v-on 可以直接运行 JavaScript 语句：

	    <div id="example">
	         <button v-on:click="counter +=1">点击+1</button>
	         <p>点击了 {{counter}} 次</p>
	    </div>
		/////////////分割线////////////
	    var vm=new Vue({
	      el:"#example",
	      data:{
	        counter:0
	      }
	    })
点击一次按钮，累加一次counter。

2. **[绑定方法名]**：v-on 可以绑定一个方法名（方法在实例中的method中定义）；

		<div id="example">
         <button v-on:click="greet">run greet function</button>
        </div>
		/////////////分割线////////////
		var vm=new Vue({
	     	el:"#example",
	        methods:{
	        greet:function(event){
	          alert("Hello");
	          console.log(event.target.tagName);//BUTTON
	        }
	      }
	    })
3. **[内联运行js语句]**：v-on 可以直接内联 JavaScript 语句；

		 <div id="example">
	         <button v-on:click="alert('hi')">Say hi</button>
	         <button v-on:click="say('what')">Say what</button>
			 <button v-on:click="warn('I am message',$event)">show warn</button>
    	</div>
		/////////////分割线////////////
		var vm=new Vue({
	     	el:"#example",
	       methods:{
	        alert:function(str){
	          alert(str);
	        },
	        say:function(str){
	          confirm(str)
	        },
            warn:function(message, event){//模板中通过$event传入dom原生event事件
             console.log(event.target, message);
			}
	      }
	    })
运行的js语句调用的只method下的方法，不是全局下的方法，必须都在method下注册，否则会报错。

4. **[事件修饰符]**：在v-on绑定的事件后添加的后缀，用来阻止默认事件或冒泡等，譬如`v-on:click.stop="doThis"` ，还有以下几个，可以连用： 

	- .stop//阻止冒泡
	- .prevent//提交事件不再重载页面
	- .capture//使用事件捕获模式
	- .self//只在自身出发回调，而不是子元素  

	这样使得vue的methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

4. **[按键修饰符]**：为了方便监听键盘事件添加的按键修饰符，也是点后缀的形式： `<input v-on:keyup.enter="submit">`
全部的按键别名：

	- enter
	- tab
	- delete (捕获 “删除” 和 “退格” 键)
	- esc
	- space
	- up
	- down
	- left
	- right
	- 其他也可以通过全局 config.keyCodes 对象自定义按键修饰符别名

### 2.9 表单控件
***
#### html 表单部分知识回顾：  
- **label 标签**: label标签为 input 元素定义标注（标记）。其不会向用户呈现任何特殊效果的。 标签上的 for 属性应当与相关元素的 id 属性相同。
- **input标签 type为text**  

		<input id="iput" type="text" name="bike"  placeholder="input something">
value不设置时，placeholder生效，默认为placeholder内容，获取元素后，其value属性初始为'',输入过程中value属性值为输入框内内容。

		<input id="iput" type="text" name="bike"  placeholder="input something" value="Bike">
value设置时，placeholder不生效，默认展示标签value属性内容，获取元素后，其value属性初始为Bike,输入过程中value属性值为输入框内内容。

- input标签 type为checkbox（复选框）

		<input type="checkbox" name="vehicle" value="Bike" checked="checked">I have a bike
		<input type="checkbox" name="vehicle" value="Car">I have a car 
写上value属性则获取对应属性，不写默认返回"on",checked属性表示默认选中
- input标签 type为radio（单选框） 

		<input id="male" type="radio" name="sex" value="male" checked="checked"><label for="male">Male</label>
		<input id="female" type="radio" name="sex" value="female"><label for="female">Female</label>
经常和label标签搭配使用，checked表示默认选中，value属性不设置时，默认返回"on"

****


1. **[文本]**
vue通过v-model指令在表单控件上创建双向绑定。

		<div id="example">
	         <input type="text" v-model="message" placeholder="input something...">
	         <p>刚才输入的是： {{message}}</p>
	    </div>
	   	<script type="text/javascript">
	
	   	var vm=new Vue({
	     	el:"#example",
	      data:{
	        message:""
	      }
	   })
v-model属性等于属性值时，实现了`vm.message`和表单`value`的双向绑定。

2. **[复选框]** 
	- 单个复选框

			 <input type="checkbox" id="check" v-model="checked"><label for="check">{{checked}}</label>
			 ////////分割线///////////////
			   var vm=new Vue({
			    el:"#example",
			    data:{
			      checked:""
			    }
			  });
`vm.checked` 为 **`string`** 类型时：点击切换时，`vm.checked`的值会在true（选中）和false（未选中）之前切换，无论有无value属性。如果之前vm.checked不为空，则在点击后会被擦写为true和false;  
`vm.checked` 为 **`arrary`** 类型时：点击切换时，`vm.checked`的值会在[标签value值]（选中）和[]（未选中）之前切换，最好添加value属性，否则会引入null到数组中；如果之前vm.checked不为空，则在数组后面push新增，和pop删除;
 
   - 多个复选框：必须设置value，否则引入null到数组中，无法完成数据绑定。

			 <div id="example">
		         <input type="checkbox" id="jack" value="Jack" v-model="checkedNames"><label for="jack">Jack</label>
		         <input type="checkbox" id="lilei" value="Lilei" v-model="checkedNames"><label for="lilei">Lilei</label>
		         <input type="checkbox" id="blues" value="Blues" v-model="checkedNames"><label for="blues">Blues</label>
		         <div>你选择的是：{{checkedNames}}</div>
		     </div>
			  ////////分割线///////////////
			   var vm=new Vue({
			    el:"#example",
			    data:{
			      checkedNames:[]
			    }
			  });
3. **[单选按钮]**

			<div id="example">
		         <input type="radio" id="male" value="Male" v-model="picked"><label for="male">Male</label>
		         <input type="radio" id="female" value="Female" v-model="picked"><label for="female">Female</label>
		         <div>你选择的是：{{picked}}</div>
		    </div>
		     ////////分割线///////////////
		    var vm=new Vue({
		    el:"#example",
		    data:{
		      picked:""
		    }
		  });
vm.picked的类型会强制转化为string, value会去对应的input标签上取（不写value功能异常）。

4. **[单选列表]**

		<div id="example">
	    <select v-model="selected">
	        <option>AA</option>
	        <option>BB</option>
	        <option>CC</option>
	    </select>
	    <span>Selected: {{ selected }}</span>
	    </div>
	    ////////分割线///////////////
	    var vm=new Vue({
	    el:"#example",
	    data:{
	      selected:""
	     }
	    });
vm.selected的值绑定在option和text上，vm.selected的类型选择后会被强制转换为string
5. **[多选列表]**  
多一个multiple属性

		<div id="example">
		    <select v-model="selected" multiple>
		        <option>AA</option>
		        <option>BB</option>
		        <option>CC</option>
		    </select>
		    <span>Selected: {{ selected }}</span>
		    </div>
		   ////////分割线///////////////
		  var vm=new Vue({
		    el:"#example",
		    data:{
		      selected:[]
		    }
		  });
同样，vm.selected的值绑定在option和text上。只是vm.selected的类型强制为array

6. **[value的绑定]**
v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）

		<!-- 当选中时，`picked` 为字符串 "a" -->
		<input type="radio" v-model="picked" value="a">
		<!-- `toggle` 为 true 或 false -->
		<input type="checkbox" v-model="toggle">
		<!-- 当选中时，`selected` 为字符串 "abc" -->
		<select v-model="selected">
		  <option value="abc">ABC</option>
		</select>
对于绑定动态属性，可以采用v-bind:value来实现，并且这个属性的值可以是非字符串。

	- 复选框的动态绑定

			<div id="example">
			    <input type="checkbox" id="jack" v-bind:true-value="a" v-bind:false-value="b" v-model="checkedNames"><label for="jack">Jack</label>
			    <div>你选择的是：{{checkedNames}}</div>
			</div>
			
			   <script type="text/javascript">
			  var vm=new Vue({
			    el:"#example",
			    data:{
			      checkedNames:"",
			      a:"Jack",
			      b:"not Jack"
			    }
			  });
			 </script>
 选中时：`vm.checkedNames===vm.a` ，未选中时：vm.checkedNames===vm.b
  - 单选按钮的动态绑定  
  
			   <div id="example">
			    <input type="radio" id="male" v-bind:value="a" v-model="picked"><label for="male">Male</label>
			    <div>你选择的是：{{picked}}</div>
				</div>
			   <script type="text/javascript">
			  	var vm=new Vue({
			    el:"#example",
			    data:{
			       a:"Male",
			       picked:""
			    }
			  })
			 </script>
选中时`vm.picked===vm.a` 
  - 选择列表

			<div id="example">
			<select v-model="selected">
			    <!-- 内联对象字面量 -->
			  <option v-bind:value="{ number: 123 }">123</option>
			  <span>你选择的是：{{selected}}</span>
			</select>
			</div>
			   <script type="text/javascript">
			var vm=new Vue({
			  el:"#example",
			  data:{
			    selected:{
			      number:""
			    }
			  }
			})
			</script>
绑定的value位于vm.selected.number下,选中时：vm.selected.number等于123

7. **[修饰符]**
	- .lazy：譬如上面的例子，加上 `.lazy` 后缀后，v-modle不会在每次输入时就同步输入框的value，而是在change事件中执行（譬如回车）：

			  <div id="example">
			         <input v-model.lazy="message" placeholder="input something...">
			         <p>刚才输入的是： {{message}}</p>
			    </div>
              <!--回车时同步value-->
	- .number：可以强制使得用户输入返回的为number类型数据，因为原生的type=number	,返回的还是字符串

				<div id="example">		    
				<input v-model.number="age" type="number">
				</div>
	- .trim：自动过滤用户输入的首尾空格

			<div id="example">
		         <input type="text" v-model="message" placeholder="input something...">
		         <p>刚才输入的是:{{message}}</p>
		    </div>
### 2.10 组件  

#### 概念 
1. 自定义标签名请尽量遵循W3C规范，即:小写，并且包含一个短杠。
2. 组件时Vue最强大的功能之一，以is特性扩展。

#### 使用组件
1. **[全局注册组件]**：（在实例化之前注册）

	        <!--模板内引入组件自定义标签-->
	        <div id="example">
	          <my-component></my-component>
	       </div>
			
			// 注册
			Vue.component('my-component', {
			  template: '<div>A custom component!</div>'
			})
			// 创建根实例
			new Vue({
			  el: '#example'
			})
	渲染为：
	
			<div id="example">
			  <div>A custom component!</div>
			</div>
2. **[局部注册组件]**：：（在实例化中注册）
	
		var Child = {
		  template: '<div>A custom component!</div>'
		}
		new Vue({
		  // ...
		  components: {
		    // <my-component> 将只在父模板可用
		    'my-component': Child
		  }
		})
或者全部放在实例化中：

			new Vue({
			  // ...
			  components: {
			    // <my-component> 将只在父模板可用
			    'my-component':{
			      template: '<div>A custom component!</div>'
			    }
			  }
			}
2. **[data数据必须是函数]**：

		Vue.component('my-component', {
		  template: '<span>{{ message }}</span>',
		  data: {
		    message: 'hello'//报错，必须为函数，这是为了防止对象数据的引用修改，引起多个组件数据的联动变化
		  }
		})
可以改写为：

		Vue.component('my-component', {
		  template: '<span>{{ message }}</span>',
		  data:function() {
		    return {
             message: 'hello'//此时，数据的变化不会引起其他组件的联动变化了。
			}
		  }
		})
#### 组件之前的通信
在 Vue.js 中，父子组件的关系可以总结为 props down, events up，子组件和父组件的通信关系如下：

![组件之前的通信](http://i.imgur.com/pYlpYfE.png)

下面我们开始介绍**Props!!**

#### Props
1. **[说明1]**：组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。

2. **[说明2]**：prop 是父组件用来传递数据的一个自定义属性，子组件需要显式地用 props 选项 声明 “props” ：
   
		   Vue.component("child",{
		        props:["message"],
		        template:"<div>这是子组件,父组件传递过来的信息是：{{message}}</div>"
		    })
		
		   var vm=new Vue({
		     	el:"#example"
		   })
此处我们在模板文件中的子组件显式的赋值（父组件传递信息也是这样传到子组件的）：

	    <div id="example">
	      <!-- #example是Vue实例挂载的元素，应该在挂载元素范围内使用组件 -->
	      <child message="Hello"></child>
	    </div>
3. **[说明3]**：如果不从props获取，那么在组件中添加data属性即可（子组件会优先从父组件获取，如果找不到对应的信息才会从自身data属性中获取）：

		   Vue.component("child",{
		        template:"<div>这是子组件,父组件传递过来的信息是：{{message}}</div>",
		        data:function(){
		          return {
		            message:"Hello_1"//注意要是函数
		          }
		        }
		    })
		
		   var vm=new Vue({
		     	el:"#example"
		   })

4. **[使用驼峰法命名props]**，譬如：myMessage, 在模板中请手动更改为prop的名字形式从 camelCase 为 kebab-case（短横线隔开）,譬如：my-message，这是因为HTML语法不区分大小写。

5. **[动态props]**    
通过v-bind将数据（都是字面量，不是真实值）绑定到父级，实现父组件跟子组件的数据单向绑定：

		   <div id="example">
		      <input type="text" v-model="parentMsg">
		      <br>
		      <child v-bind:message="parentMsg"></child>
              <!--此处也可以不写绑定的变量名，可以写成数字，并且仅限数字，-->
			  <!--因为数字被认为是有效数据，而其他则认为是调用变量，会出现未定义的报错。-->
			  <!--这种方式可以传递数字，而非绑定的方式其实传递过去就变成字符串了-->
		    </div>

		   <script type="text/javascript">
		    Vue.component("child",{
		        props:["message"],
		        template:"<div>这是子组件,父组件传递过来的信息是：{{message}}</div>"
		    })
		   var vm=new Vue({
		        el:"#example",
		        data:{
		            parentMsg:""
		        }
		   })
		   </script>

6. **[单向数据流]**  
prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。通常情况下子组件不要修改Props内的数据，但也存在以下两种修改的情况：
  - prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用：  
  
             //改写
			  Vue.component("child",{
			        props:["message"],
			        template:"<div>这是子组件,父组件传递过来的信息是：{{message}}</div>",
			        data:function(){
			            return {
			                counter:this.message
			            }
			        }
			    })
			
			   var vm=new Vue({
			        el:"#example",
			        data:{
			            parentMsg:""
			        }
			   })

  - prop 作为需要被转变的原始值传入
7. **[Prop验证]**  
我们在组件中可以指定接受的数据类型，我们仍用动态props下的例子：

		  Vue.component("child",{
		        props:{
		            message: Number //指定为数字
		        },
		        template:"<div>这是子组件,父组件传递过来的信息是：{{message}}</div>",
		        data:function(){
		            return {
		                counter:this.message
		            }
		        }
		    })
		
		   var vm=new Vue({
		        el:"#example",
		        data:{
		            parentMsg:2
		        }
		   })
上述例子初始化时不会报错，因为vm.parentMsg初始值为数字，但输入时就会报错，因为input中的值都是string类型

#### 自定义事件

prop可以完成父组件向子组件传递数据，那么反过来怎么传递数据？我们通过自定义事件来实现子组件向父组件传递数据的功能：

1. **[使用v-on绑定自定义事件]**：

	- 使用 $on(eventName) 监听事件
	- 使用 $emit(eventName) 触发事件
也就是在父组件在使用父组件的地方添加v-on事件，来监听子组件事件触发。子组件在需要传递数据的时候调用$emit(eventName)主动触发，即可将子组件的数据传递给父组件。

2. **[组件上绑定原生事件]**：使用v-on的时候添加`.native`修饰符即可

#### 非父子组件之间的通信
注册一个空的Vue实例作为中央事件总裁
	
	var bus=new Vue();
触发组件A中的事件

    bus.$emit('id-select')
组件B中监听事件

    bus.$on('id-select',function(){
     //do something...
     })
更复杂的情况请使用vuex

#### 使用slots分发

solts就像子组件里面预留的插槽，在父模板引用子模板的时候，父模板内部的内容会按照name进行匹配，匹配成功的部分会自动添加在子模板的插槽内，匹配成功的部分会放在默认插槽内。

例子：  

有一个名为app-layout的组件

	<div class="container">
	  <header>
	    <slot name="header"></slot>
	  </header>
	  <main>
	    <slot></slot>
	  </main>
	  <footer>
	    <slot name="footer"></slot>
	  </footer>
	</div>
父模板是这样使用的

	<app-layout>
	  <h1 slot="header">Here might be a page title</h1>
	  <p>A paragraph for the main content.</p>
	  <p>And another one.</p>
	  <p slot="footer">Here's some contact info</p>
	</app-layout>

最终渲染结果（将父模板中的内容按slot属性对应插到子组件的slot标签中）：

	<div class="container">
	  <header>
	    <h1>Here might be a page title</h1>
	  </header>
	  <main>
	    <p>A paragraph for the main content.</p>
	    <p>And another one.</p>
	  </main>
	  <footer>
	    <p>Here's some contact info</p>
	  </footer>
	</div>
#### 作用域插槽

名为child的子组件

	<div class="child">
	  <slot text="hello from child"></slot>
	</div>
父组件为  

	<div class="parent">
	  <child>
	    <template scope="props">
	      <span>hello from parent</span>
	      <span>{{ props.text }}</span>
	    </template>
	  </child>
	</div>
其中，props只是一个临时变量，这个变量的属性名正好对应子组件slot中的属性名。最终渲染为：

	<div class="parent">
	  <div class="child">
	    <span>hello from parent</span>
	    <span>hello from child</span>
	  </div>
	</div>
#### 动态组件
多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component\> 元素，动态地绑定到它的 is 特性：  
注意，不可以使用全局注册方式，因为component一旦全局注册，没有办法再局部动态修改。只能使用局部注册的两种方式（参照上方组件的局部注册部分）

keep-alive：外包一个keep-alive标签，可以缓存非活动组件

		<keep-alive>
		  <component :is="currentView">
		    <!-- 非活动组件将被缓存！ -->
		  </component>
		</keep-alive>

#### 其他  
1. **[可复用组件的编写规则]**：
vue组件是API来自三部分：props,events,slots
  - props:允许外部环境传递数据给组件。
  - events:允许组件触发外部环境的副作用（意料之外的行为，计算机术语）。
  - slots:允许外部环境将额外的内容组合在组件中。

2. **[子组件的索引]**  
 `ref` 为子组件指定一个索引 ID ，通过 vm.$refs来访问(是一个对象)，vm.$refs.索引ID 就可以看到对应组件了

		 <div id="example">
		      <child ref="profiles"></child>
		    </div>
		   <script type="text/javascript">
		   
		  var vm=new Vue({
		    el:"#example",
		    components:{
		      child:{
		         template:'<p>我是子组件</p>'
		      }
		    }
		  });
		</script>
vm.$refs.profiles 可以访问到组件，但是该方法只是一个应急方案，尽量避免使用

5. **[递归组件]**：组件可以在内部调用自身，此时需要加入name属性。但要设置好判断条件，否则很容易进入死循环。

3. **[组件的命名约定]**  
vue注册组件时，你可以用驼峰法，短横线拼接法，甚至混用也可以，但在HTML中请统一使用短横线拼接语法。

4. **[v-once]**: 可以将渲染结果缓存起来，标签上加入v-once标记即可。

##  参考文献

1. [vue中文官方文档](http://cn.vuejs.org/v2/guide/)
