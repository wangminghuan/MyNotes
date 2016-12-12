<font face="微软雅黑" size="4" >
<font size="6">Vue.js 学习总结</font>


## 1 环境搭建 
>[参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 待补充 20161209
## 2 基础

### 2.1 属性和方法  
1. **代理属性和方法**：每个 Vue 实例都会代理其 data 对象里所有的属性，即：把data下的属性和方法挂载到实例对象（例如：vm）下。
2. **$前缀+属性和方法**：带有$前缀的属性和方法（vue实例暴露出来的），方便我们与代理属性和方法区分开；
3. **数据的双向绑定**
        
		var userData = { a: 1 };
		var vm = new Vue({
		  el: "#example",
		  data: userData
		});
		console.log(vm.$el === document.getElementById('example'));//true
		console.log(vm.$data.a === vm.a);//true,二者是相等的，只是写法上的一些区别；
		console.log(vm.a===userData.a);//true，本例相等，但不代表二者数据是绑定的
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
1. vue的模板解析基于Mustache（小胡子，双大括号{{}}）；
2. **[ {{js语句}} ]**：双大括号里面可以运行解析js语法，但只能解析**单个表达式！！**，if语句就无法运行，改为三目运算则可以。
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
4. **[指令]**：是带有 v- 前缀的特殊属性。
	- 作用：当表达式的值改变时，相应的将某些行为应用到DOM上；
    - 参数：某些指令可以接受参数，通过‘：’指明
    
			<a v-blind:href="url"></a>
           <!-- v-blind指令将该元素的href属性与表达式url的值绑定 -->
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
### 2.4 属性
5. **[计算属性]**：实例化时的computed属性  
下面我们举一个例子：  	 

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

6. **[计算属性 VS Methods]**  
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
但是二者还是存在差别的：
	- 计算属性对它的**依赖是有缓存**的，只要message属性没有变，多次执行也不会重新计算，只会返回之前的计算结果；Methods则不会。
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
	    
		vm.reversedMessage="dlrow";//视图更新为world 和 dlrow
	    
		console.log(vm.$data.reversedMessage==userDate.reversedMessage);//true
	    console.log(vm.$data.reversedMessage==vm.reversedMessage);//false
从上述例子可以看出代理属性的变化并没有反应到userDate和$data上，因为computed改写的只是代理属性的setter，断开了与上述二者的绑定关系；而试图上其实绑定的是代理属性值，所以视图也会更新。       
### 2.5 class与style绑定
####绑定html class （v-bind:class）
1. 对象语法。
所谓对象语法，就是在模板中绑定的样式用json的方式描述，例如：  

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
键值（isActive与isError）在data中用布尔值表示，如果值为真，其键名（active和text-name）就会渲染到页面中。（- 拼接的变量必须用引号，分则无法解析）   
也可以把这个json进行命名，模板中只写名称，json的数据放到data中：  

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

2. 数组语法  
数组语法，其实模板中写入的就是一个数组变量，数组变量的具体数值在data中获取，data中必须都有命名，否则会报错，如果没有值，置空即可。

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
数组变量同样接受三目运算：

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
1. 对象语法
同样可以使用对象语法，但与上述有不同，json中键值不再是布尔值，而是字符串，键名必须用驼峰法命名。最终渲染结果是把json中的键名和data中的数值拼接在一块的。例如：

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

2. 数组语法  
数组语法可以将多个样式集合应用到一个元素上：他与上述语法不同的时，数组内是data中的json对象。

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

### 2.6 列表渲染
#### Template 中的 v-for 循环
v-for 也可以用于循环整个template标签块：

		<div id="example">
		    <ul>
		        <template v-for="item in items">
		            <li>
		                {{item.message}}
		            </li>
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
#### 对象迭代 v-for
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
		    	}
			}
		});
##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


