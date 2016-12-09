<font face="微软雅黑" size="4" >
<font size="6">React 学习笔记（一）</font>


## 1 环境搭建 

结合webpack进行搭建，此处不再赘述。

## 2 React入门
### 2.1  前言
react其实不是一个完整的前端框架，它只是MVC框架中的"V"层。React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，因此 Virtual DOM 与 diff 是保证 React 性能口碑的幕后推手。
### 2.2 Dom Diff  

####两个假设
为了降低dom结构比较的复杂度，FaceBook工程师提出两个假设：

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构；
3. 对于同一层次的一组子节点，它们可以通过唯一的id进行区分


关于diff的更详细解释，参见[React源码剖析系列－不可思议的react diff](http://www.w3ctech.com/topic/1598)

### 2.3 JSX语法 
在用React写组件的时候，通常会用到JSX语法，粗看上去，像是在Javascript代码里直接写起了XML标签，实质上这只是一个语法糖，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，当然你想直接使用纯Javascript代码写也是可以的，只是利用JSX，组件的结构和组件之间的关系看上去更加清晰。

JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 `HTML` 规则解析；遇到代码块（以 `{` 开头），就用 `JavaScript` 规则解析  

#### 2.3.1 React创建元素的方法  

jsx语法的实质其实就是调用`eact.createElement`方法，我们写一个XML标签，通过这个方法，返回一个`ReactElement`对象。

	ReactElement createElement(
	  string/ReactClass type,
	  [object props],
	  [children ...]
	)
#### type参数 为html标签名称  

	var child1 = React.createElement('li', null, 'First Text Content');
	var child2 = React.createElement('li', null, 'Second Text Content');
	var child3 = React.createElement('li', null, 'Third Text Content');
	var root = React.createElement('ul', { className: 'my-list' }, child1, child2, child3);
	ReactDOM.render(
	        root,
	        document.getElementById('content')
	);

1. 前三个创建的元素：type参数为html元素li，第2个元素属性参数不需要设置为null，第3个参数为li标签内需要添加的节点（例子中为文本节点）。
2. 第四个创建的元素：type参数为html元素ul，第2个元素属性参数可以设置为多个，如：{ className: 'my-list', name:'ulname'}，第3个为ul内需要填充的节点。，例子中有参数3,4,5，其实等同于[child1,child2,child3].数组中的元素就是该节点的所有子节点。
#### type参数 为ReactClass

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
1. 前三个创建的元素：type参数为ReactClass,第二个参数要加上key:’value’, 这里的value彼此都不相同，如果不指定此属性——虽然也能按照逻辑正常显示——会报如下的警告:

    	Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using <ul>. See https://fb.me/react-warning-keys for more information.

2. 。


###组件
React.createClass 方法就用于生成一个组件类，组件编写过程中需要注意：  

- 组件类名首字母必须大写，否则会报错。
- 组件类只能包含一个顶层标签，否则会报错。
- 每个组件中都必须有render方法，用于输出组件。
- 组件的属性可以在组件类的 this.props 对象上获取。
- 添加组件属性时，class属性需要写成className,for属性需要写成htmlFor,因为class和for都是js的保留字。
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

>[语法参考](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax)

- 要点1
- 要点2
##  参考文献

1. [文献1](http://codeguide.bootcss.com/)


