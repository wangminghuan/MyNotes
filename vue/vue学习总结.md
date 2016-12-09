<font face="微软雅黑" size="4" >
<font size="6">Vue.js 学习总结</font>


## 1 环境搭建 
>[参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 待补充 20161209
## 2 基础

### 2.1 属性和方法  

1. 带有$前缀的属性和方法（vue实例暴露出来的）与代理的属性和方法，有什么区别？
2. 二者数据都是双向绑定
        
		var userData = { a: 1 };
		var vm = new Vue({
		  el: "#example",
		  data: userData
		});
		console.log(vm.$el === document.getElementById('example'));//true
		console.log(vm.$data.a === vm.a);//true,二者是相等的，只是写法上的一些区别；
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










#### [强制] 当一个 `rule` 包含多个 `selector` 时，每个选择器声明必须独占一行。

示例：


	/* good */
	.post,
	.page,
	.comment {
	    line-height: 1.5;
	}
	
	/* bad */
	.post, .page, .comment {
	    line-height: 1.5;
	}


##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


