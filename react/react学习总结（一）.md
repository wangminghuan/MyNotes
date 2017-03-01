<font face="微软雅黑" size="4" >
<font size="6">React 学习笔记（一）</font>


## 1 环境搭建 

结合webpack进行搭建，此处不再赘述。

## 2 前言
react其实不是一个完整的前端框架，它只是MVC框架中的"V"层。React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，因此 Virtual DOM 与 diff 是保证 React 性能口碑的幕后推手。
## 3 虚拟DON算法（Dom Diff）  

####两个假设
为了降低dom结构比较的复杂度，FaceBook工程师提出两个假设：

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构；
3. 对于同一层次的一组子节点，它们可以通过唯一的id进行区分


关于diff的更详细解释，参见[React源码剖析系列－不可思议的react diff](http://www.w3ctech.com/topic/1598)

## 4 JSX语法 
在用React写组件的时候，通常会用到JSX语法，粗看上去，像是在Javascript代码里直接写起了XML标签，实质上这只是一个语法糖(只是使代码更容易理解和阅读，并没有增加新的东西)，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，当然你想直接使用纯Javascript代码写也是可以的，只是利用JSX，组件的结构和组件之间的关系看上去更加清晰。

### 4.1 语法规则  
1. HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法。  
2. JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 `HTML` 规则解析；遇到代码块（以 `{` 开头），就用 `JavaScript` 规则解析。    

### 4.2 React.createElement 

jsx语法的实质其实就是调用`React.createElement`方法创建元素，我们写一个XML标签，通过这个方法，返回一个`ReactElement`对象。官方解释为：

	ReactElement createElement(
	  string/ReactClass type,//必填，可以是html标签名字符串，也可以是ReactClass
	  [object props],//可选，标签属性
	  [children ...]//可选，元素子节点
	)
#### 1. [type参数为html标签]  

	var child1 = React.createElement('li', null, 'First Text Content');
	var child2 = React.createElement('li', null, 'Second Text Content');
	var child3 = React.createElement('li', null, 'Third Text Content');
	var root = React.createElement('ul', { className: 'my-list' }, child1, child2, child3);
	ReactDOM.render(
	        root,
	        document.getElementById('content')
	);
- 前三个创建的元素：type参数为html元素li，第2个元素属性参数不需要设置为null，第3个参数为li标签内需要添加的节点（例子中为文本节点）。
- 第四个创建的元素：type参数为html元素ul，第2个元素属性参数可以设置为多个，如：{ className: 'my-list', name:'ulname'}，第3个为ul内需要填充的节点。，例子中有参数3,4,5，其实等同于[child1,child2,child3]数组中的元素就是该节点的所有子节点。  
- 最终渲染结果：  

		<ul data-reactroot="" class="my-list">
		    <li>First Text Content</li>
		    <li>Second Text Content</li>
		    <li>Third Text Content</li>
		</ul>
#### 2. [type参数为ReactClass]

	var cli = React.createClass({
	    render:function(){
	        return (
	                <li>
	                {this.props.text}
	                </li>
	        )
	    }
	})
	var child1 = React.createElement(cli, {key:'F',text:'First Text Content'});
	var child2 = React.createElement(cli, {key:'S',text:'Second Text Content'});
	var child3 = React.createElement(cli, {key:'T',text:'Third Text Content'});
	var root = React.createElement('ul', { className: 'my-list' }, [child1, child2, child3]);
	ReactDOM.render(
	        root,
	        document.getElementById('content')
	);
- 前三个创建的元素：type参数为ReactClass,第二个参数要加上key:’value’, 这里的value彼此都不相同，如果不指定此属性——虽然也能按照逻辑正常显示——会报如下的警告:

		Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using <ul>. See https://fb.me/react-warning-keys for more information.
- 渲染结果同上

### 4.3 ReactDOM.render

1. react.js的入口函数，render函数主要负责将将虚拟DOM渲染到真实的DOM上。
2. ReactDOM.render方法接受三个参数

		ReactDOM.render(nextElement, container, callback)
        //第一个是ReactElement,第二个是父级元素，第三个是回调
### 4.4 JSX语法详细说明

####1.  {}花括号内只能运行表达式，不支持语句

	var n=1;
	ReactDOM.render(
	  <h1>{n? n+1:n-1}</h1>,
	  document.getElementById("example")
	  )
### 2. 多个标签必须在外部用一个标签包裹起来

	ReactDOM.render(
	  <div>
		  <h1>Hello</h1>
		  <h2>world</h2>
	  </div>,
	  document.getElementById("example")
	  )
### 3. 注释必须在花括号中添加（不会渲染到页面中）

	ReactDOM.render(
	  <div>
		  <h1>Hello</h1>
		  <h2>world</h2>
          {/*我是注释*/}
	  </div>,
	  document.getElementById("example")
	  )
### 4. 数组会自动展开

	var arr=[
	<h1>Hello</h1>,
	<h2>world</h2>
	];//此处
	
	ReactDOM.render(
	  <div>{arr}</div>,
	  document.getElementById("example")
	  )
需要注意的是：组数内容不加引号，否则会被当作字符串渲染到页面，而不是解析为html标签。这是因为React渲染的是虚拟DOM，并不是 HTML 字符串，这可以有效避免xss攻击

### 5. 渲染HTML标签VS渲染组件  

渲染html标签（推荐第一个字母小写）：  

	var myHtmlElement=<h1>Hello world!</h1>;

	ReactDOM.render(
	  myHtmlElement,
	  document.getElementById("example")
	  )
渲染组件  

	var MyComponent=React.createClass({
	  render:function(){
	    return <h1>Hello World</h1>
	  }
	});
	ReactDOM.render(
	  <MyComponent />,
	  document.getElementById("example")
	  )
区别：  
 
- 命名：组件名的第一个字母必须大写，否则React不会渲染组件。html标签命名则不会（为了区别，建议小写开头）
- 渲染：render函数的第一个参数，组件必须传入xml标签形式


## 5 组件
### 5.1 React.createClass

React.createClass 方法就用于生成一个组件类，组件编写过程中需要注意：  

- 组件类名首字母必须大写，否则会报错。
- 组件类只能包含一个顶层标签，否则会报错。
- 每个组件中都必须有render方法，用于输出组件。
- 组件的属性可以在组件类的 this.props 对象上获取。
- 添加组件属性时，class属性需要写成className,for属性需要写成htmlFor,因为class和for都是js的保留字。

### 5.2 ReactComponent的render

1. 组件的render方法，每个组件都必须有，用于输出组件，且必须为function函数，有return值
2. 该方法接受三个参数,返回ReactComponent类型的对象

		ReactComponent render( ReactElement element, DOMElement container, [function callback] )
### 5.3 this.props
通过props对象，可以从父级向自己传递数据

	  var MyComponent=React.createClass({
	    render:function(){
	      return <h1>{this.props.text}</h1>
	    }
	  });
	  ReactDOM.render(
	    <MyComponent text="Hello world"/>,
	    document.getElementById("example")
	    )
### 5.4 复合组件

	var WebSite = React.createClass({
	  render: function() {
	    return (
	      <div>
	        <Name name={this.props.name} />
	        <Link site={this.props.site} />
	      </div>
	    );
	  }
	});
	 
	var Name = React.createClass({
	  render: function() {
	    return (
	      <h1>{this.props.name}</h1>
	    );
	  }
	});
	 
	var Link = React.createClass({
	  render: function() {
	    return (
	      <p>{this.props.site}</p>
	    );
	  }
	});
	 
	ReactDOM.render(
	  <WebSite name="我是name组件" site="我是site组件" />,
	  document.getElementById('example')
	);
多个组件互相嵌套，最终渲染结果为：

	<div id="example">
	    <div data-reactroot="">
	        <h1>我是name组件</h1>
	        <p>我是site组件</p>
	    </div>
	</div>

## 6. React State(状态)
组件可以看作是一个状态机，只要state变化，组件会自动调用render重新渲染页面。  
组件API:   

 -  `getInitialState` 方法用于定义初始状态，也就是一个对象，对象下的key值都会挂载到this.state对象下，可以通过 this.state 属性读取。
 -  `this.setState` 方法用于修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

我们编写一个例子，点击按钮可以切换组件的state值：  

	var ToggleCompoent=React.createClass({
	    getInitialState:function(){
	      return {
	        liked:false
	      }
	    },
	    handleClick:function(){
	      this.setState({liked: !this.state.liked});
	    },
	    render:function(){
	      var text=this.state.liked? "喜欢":"讨厌";
	      return (
	        <div>
	          <p>你{text}我</p>
	          <button onClick={this.handleClick}>点我切换</button>
	        </div>
	      )
	    }
	});
	 
	ReactDOM.render(
	  <ToggleCompoent />,
	  document.getElementById('example')
	);
注意 组件中的render 函数的return结果, 如果是xml结构且没有写在一行，**必须用圆括号括起来！！！**
## 7. React Props 
### 7.1 父级传递props  
例子同上: 

	var MyComponent=React.createClass({
	    render:function(){
	      return <h1>Hello {this.props.name}</h1>
	    }
	  });
	  ReactDOM.render(
	    <MyComponent name="jack"/>,
	    document.getElementById("example")
	    )

### 7.2 默认Props  
可以使用`getDefaultProps()`方法设置默认props的值 

	var MyComponent = React.createClass({
    getDefaultProps: function() {
        return {
            name: 'Runoob'
        };
    },
    render: function() {
        return <h1> Hello { this.props.name } </h1>
    }
	});
	ReactDOM.render( 
		<MyComponent /> ,
	    document.getElementById("example")
	)
如果同时用默认props和父级传递，则父级传递的优先级高

	var MyComponent = React.createClass({
    getDefaultProps: function() {
        return {
            name: 'Runoob'
        };
    },
    render: function() {
        return <h1> Hello { this.props.name } </h1>
    }
	});
	ReactDOM.render( 
		<MyComponent name="Jack"/> ,
	    document.getElementById("example")
	)
### 7.3 props和state区别   

1.主要区别： props 是不可变的，而 state 可以根据与用户交互来改变。  
2. props主要用于组件之间的数据传递，state是组件内部的状态管理。

### 7.4 Props 验证 
React组件的 `PropTypes` 属性（值为json对象）下可以挂载多个验证器来验证传入的数据是否有效（通过 `React.PropTypes`对象调用对应验证器）。

	var name=123;
	var MyComponent = React.createClass({
	     propTypes:{
	       name:React.PropTypes.string.isRequired,
	    },
	    render: function() {
	        return <h1> Hello { this.props.name } </h1>
	    }
	  });
	  ReactDOM.render( 
	    <MyComponent name={name}/> ,
	      document.getElementById("example")
	  )

校验器要求传入的数据为字符串，例子中的name为number类型，此时页面可以正常渲染出来，但是控制台会有提示：
	
	Warning: Failed prop type: Invalid prop `name` of type `number` supplied to `MyComponent`, expected `string` in MyComponent
有以下几种验证器  

	React.createClass({
	  propTypes: {
	      // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
	    optionalArray: React.PropTypes.array,
	    optionalBool: React.PropTypes.bool,
	    optionalFunc: React.PropTypes.func,
	    optionalNumber: React.PropTypes.number,
	    optionalObject: React.PropTypes.object,
	    optionalString: React.PropTypes.string,
	 
	    // 可以被渲染的对象 numbers, strings, elements 或 array
	    optionalNode: React.PropTypes.node,
	 
	    //  React 元素
	    optionalElement: React.PropTypes.element,
	 
	    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
	    optionalMessage: React.PropTypes.instanceOf(Message),
	 
	    // 用 enum 来限制 prop 只接受指定的值。
	    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
	 
	    // 可以是多个对象类型中的一个
	    optionalUnion: React.PropTypes.oneOfType([
	      React.PropTypes.string,
	      React.PropTypes.number,
	      React.PropTypes.instanceOf(Message)
	    ]),
	 
	    // 指定类型组成的数组
	    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
	 
	    // 指定类型的属性构成的对象
	    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
	 
	    // 特定 shape 参数的对象
	    optionalObjectWithShape: React.PropTypes.shape({
	      color: React.PropTypes.string,
	      fontSize: React.PropTypes.number
	    }),
	 
	    // 任意类型加上 `isRequired` 来使 prop 不可空。
	    requiredFunc: React.PropTypes.func.isRequired,
	 
	    // 不可空的任意类型
	    requiredAny: React.PropTypes.any.isRequired,
	 
	    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
	    customProp: function(props, propName, componentName) {
	      if (!/matchme/.test(props[propName])) {
	        return new Error('Validation failed!');
	      }
	    }
	  },
	  /* ... */
	})

## 8. 组件API
> [点我了解](http://reactjs.cn/react/docs/component-api.html)  
### 8.1 设置状态：setState

	setState(nextState, callback)
参数说明：

- nextState：将要设置的新状态，可以是一个json对象，譬如：

		this.setState({mykey: 'my new value'})
也可以是一个函数，接受两个参数，组件的state对象和props对象,但一定要有返回值

		this.setState(function(prevState, props){
		 return {
		     name:prevState.key+props.key
			}
		})
- callback：可选参数，回调函数。该函数会在setState设置成功，且组件重新渲染后调用。

例子：点击按钮，记录一次次数。

	var MyComponent=React.createClass({
	  getInitialState: function () {
	    return { clickCount: 0 };
	  },
	  handleClick:function(){
	     this.setState(function(prevState, props){
	        return {
	           clickCount:prevState.clickCount+1
	        }
	     }, function(){
		 console.log("render over!!")
		})
	  },
	  render:function(){
	    return (
	     <div>
	      <button onClick={this.handleClick}>点击+1</button>
	      <p>按钮被点击了{this.state.clickCount}次</p>
	     </div>
	    )
	  }
	})
### 8.2 替换状态：replaceState
用法参照setState,但是方法只会保留nextState中状态，原state不在nextState中的状态都会被删除

### 8.3 强制更新：forceUpdate
  
	forceUpdate([function callback])
参数说明：  
 
- callback，可选参数，回调函数。该函数会在组件render()方法调用后调用。

forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。尽量避免使用，而是建议通过this.state的改变来触发render

例子，上述例子中点击触发

	var MyComponent=React.createClass({
	  ....
	  handleClick:function(){
	     this.forceUpdate(function(){
          console.log('reload over')
         })
	  },
	  .....
	})

### 8.4 判断组件挂载状态：isMounted
isMounted()方法用于判断组件是否已挂载到DOM中。返回一个布尔值。可以使用该方法保证了setState()和forceUpdate()在异步场景下的调用不会出错。

	var MyComponent=React.createClass({
	  ....
	  handleClick:function(){
	     this.forceUpdate(function(){
          console.log(this.isMounted())
         })
	  },
	  .....
	})

### 8.5 获取DOM节点：findDOMNode
如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。当render返回null 或 false。该方法也会返回null。目前只在ReactDOM.findDOMNode下可以访问（v15.0）

	var MyComponent=React.createClass({
	      render:function(){
	        return <h1>Hello {this.props.name}</h1>
	      }
	    });
	var results=ReactDOM.render(
	      <MyComponent name="jack"/>,
	      document.getElementById("example")
	      )
	document.getElementById('btn').onclick=function(){
	  console.log(ReactDOM.findDOMNode(results))
	}

点击结果

	<h1 data-reactroot="">
     <!-- react-text: 2 -->Hello <!-- /react-text -->
     <!-- react-text: 3 -->jack<!-- /react-text -->
    </h1>
### 8.6 其他废弃API

	Deprecated component instance methods are removed: setProps, replaceProps, and getDOMNode

## 9 组件的生命周期

### 9.1 组件的生命周期可分成三个状态  

1. Mounting：已插入真实 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真实 DOM

### 9.2 生命周期的方法  
1. 生命周期其实就是一个对象从开始生成到最后消亡所经历的状态。
2. React 中组件有自己的生命周期方法，简单理解可以为组件从 出生（实例化） -> 激活（运行） -> 销毁 生命周期 hook。通过这些 hook 方法可以自定义组件的特性。
#### 示意图

![组件生命周期](http://i.imgur.com/AGySVHD.jpg)

如图，可以把组件生命周期大致分为三个阶段：

1. 第一阶段：是组件第一次绘制阶段，如图中的上面虚线框内，在这里完成了组件的加载和初始化；  

2. 第二阶段：是组件在运行和交互阶段，如图中左下角虚线框，这个阶段组件可以处理用户交互，或者接收事件更新界面；  

3. 第三阶段：是组件卸载消亡的阶段，如图中右下角的虚线框中，这里做一些组件的清理工作

#### 简易图 （供对比参考）

![组件的生命周期](http://i.imgur.com/1DBUVRK.png)

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用
#### 【实例化阶段-Mounting】
1. **getDefaultProps** ：在组件创建之前，会先调用getDefaultProps()，这是全局调用一次，
2. **getInitialState** ：初始化组件的状态。
3. **componentWillMount**：组件创建，并初始化了状态之后，在第一次绘制 render() 之前，整个生命周期只执行一次。

     	void componentWillMount()  
4. **render**：纯粹的渲染，创建出虚拟DOM。

		a). 只能通过this.props和this.state访问数据
		b). 可以返回null、false或任何React组件
		c). 只能出现一个顶级组件（不能返回数组）
		d). 不能改变组件的状态
		e). 不能修改DOM的输出
5. **componentDidMount**：在组件第一次绘制之后，会调用该方法，通知组件已经加载完成，此时其虚拟 DOM 已经构建完成

		void componentDidMount() 
#### 【运行阶段-Updating】
1. **componentWillReceiveProps**：在初始化渲染的时候，该方法不会调用。如果组件收到新的属性（props）就会将新属性作为参数nextProps来调用该方法。可以根据属性的变化，通过调用 `this.setState()` 来更新组件状态。
   
		componentWillReceiveProps: function(nextProps) {
	        if (nextProps.bool) {
	            this.setState({
	                bool: true
	            });
	        }
	    }
2. **shouldComponentUpdate**：接收到新属性或者新状态的时候在 render 前会被调用。该方法让我们有机会决定是否重渲染组件，如果返回 false，那么不会重渲染组件，借此可以优化应用性能（在组件很多的情况）。这个方法在首次渲染期间或者调用了`forceUpdate()`后是不会触发的;

		boolean shouldComponentUpdate(
		  object nextProps, object nextState
		)
3. **componentWillUpdate**：
如果组件状态或者属性改变，并且上面的 `shouldComponentUpdate()` 返回为 true，就会开始准更新组件，此时不允许更新props或state。  

		void componentWillUpdate(
		  object nextProps, object nextState
		)
4. **render**:再次渲染

5. **componentDidUpdate**：
调用了 render() 更新完成界面之后，会调用 `componentDidUpdate()` 来得到通知，其函数原型如下

		void componentDidUpdate(  
		  object prevProps, object prevState
		)
因为到这里已经完成了属性和状态的更新了，此函数的输入参数变成了 prevProps 和 prevState。
#### 【销毁阶段-Unmounting】
1. componentWillUnmount
组件被移除之前被调用，可以用于做一些清理工作，在`componentDidMount`方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。

#### 【总结】
<table>
    <thead>
        <tr>
            <th>生命周期</th>
            <th>调用次数</th>
            <th>能否使用 setSate()</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>getDefaultProps</td>
            <td>1(全局调用一次)</td>
            <td>否</td>
        </tr>
        <tr>
            <td>getInitialState</td>
            <td>1</td>
            <td>否</td>
        </tr>
        <tr>
            <td>componentWillMount</td>
            <td>1</td>
            <td>是</td>
        </tr>
        <tr>
            <td>render</td>
            <td>&gt;=1</td>
            <td>否</td>
        </tr>
        <tr>
            <td>componentDidMount</td>
            <td>1</td>
            <td>是</td>
        </tr>
        <tr>
            <td>componentWillReceiveProps</td>
            <td>&gt;=0</td>
            <td>是</td>
        </tr>
        <tr>
            <td>shouldComponentUpdate</td>
            <td>&gt;=0</td>
            <td>否</td>
        </tr>
        <tr>
            <td>componentWillUpdate</td>
            <td>&gt;=0</td>
            <td>否</td>
        </tr>
        <tr>
            <td>componentDidUpdate</td>
            <td>&gt;=0</td>
            <td>否</td>
        </tr>
        <tr>
            <td>componentWillUnmount</td>
            <td>1</td>
            <td>否</td>
        </tr>
    </tbody>
</table>

例子：一个定时器

	var MyComponent=React.createClass({
	      getInitialState:function(){
	         return {
	            date: new Date()
	         }
	      },
	      render:function(){
	        return <h1>现在时间是：{this.state.date.toLocaleTimeString()}</h1>
	      },
	      componentDidMount:function(){
	        var _this=this;
	        setInterval(function(){
	           _this.setState({date:new Date()})
	         },1000)
	      }
	    });
	ReactDOM.render(
	      <MyComponent />,
	      document.getElementById("example")
	)

## 10 React Refs
React支持一种非常特殊的属性 Ref，可以用来绑定到 render() 输出的任何组件上。如果需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性。渲染完成后，拥有ref属性的标签的真实dom就会挂在this.refs.[refName]下

	var MyComponent=React.createClass({
	  handleClick:function(){
	    console.log(this.refs.myText.value)
	  },
	  render:function(){
	    return (
	    <div>
		    <h1>请输入:</h1>
		    <input type="text" ref="myText"/><br />
		    <button onClick={this.handleClick}>点我获取输入值</button>
	    </div>
	    )
	  }
	});
	
	ReactDOM.render(
	<MyComponent />,
	document.getElementById("example")
	)
需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM， 所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。

## 11 React 表单与事件 
React中表单变动是通过绑定表单事件监控的（有点类似Vue的v-modle属性），下面是一个监控用户输入内容的例子：

	var MyComponent=React.createClass({
	    getInitialState:function(){
	       return {
	         value:""
	       }
	    },
	    handleInput:function(event){
	       this.setState({value:event.target.value})
	    },
	    render:function(){
	      return (
	       <div>
	          <input type="text" placeholder="请输入" onChange={this.handleInput}/>
	          <p>你输入的内容是：{this.state.value}</p>
	       </div>
	        )
	    }
	});

	ReactDOM.render(
	<MyComponent />,
	document.getElementById("example")
	)

更多React事件，请点击 [官方文档](https://facebook.github.io/react/docs/events.html)

##  参考文献

1. [React.createElement使用详解](http://www.onmpw.com/tm/xwzj/web_103.html)
2. [组件的生命周期](http://www.jianshu.com/p/f462b78689f6)
3. [React 组件生命周期](https://zhuanlan.zhihu.com/p/21246418?refer=leanreact)
4. [React Native 中组件的生命周期](http://www.race604.com/react-native-component-lifecycle/)
5. [React的事件大全](https://my.oschina.net/u/2608629/blog/680352?p=1)