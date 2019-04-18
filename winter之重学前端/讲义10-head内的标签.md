<font face="微软雅黑" size="4" >
<font size="6">head内的标签种类</font>

## head 标签本身

首先我们先来了解一下 head 标签，head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title；

### 1. title 标签

title 标签表示文档的标题，从字面上就非常容易理解。

### 2. base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，慎重使用。

### 3. meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

  	<meta name=application-name content="lsForums">

**meta标签的一些变体**

#### 3.1 具有 charset 属性的 meta

从 HTML5 开始，为了简化写法，meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。
	
  	<meta charset="UTF-8" >

charset 型 meta 标签非常关键，它描述了 HTML 文档自身的编码形式。因此，建议这个标签放在 head 的第一个。

#### 3.2 具有 http-equiv 属性的 meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

例如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。

	
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">

除了 content-type，还有以下几种命令：

	content-language 指定内容的语言；
	default-style 指定默认样式表；
	refresh 刷新；
	set-cookie 模拟 http 头 set-cookie，设置 cookie；
	x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
	content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。
	name 为 viewport 的 meta
meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了

#### 3.3 name 为 viewport 的 meta。

这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。
	
	<meta name="viewport" content="width=500, initial-scale=1">

参数含义如下：

	width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
	height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
	initial-scale：初始缩放比例。
	minimum-scale：最小缩放比例。
	maximum-scale：最大缩放比例。
	user-scalable：是否允许用户缩放。

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：

	
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">

#### 3.4 其它预定义的 meta

在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta，可以简单了解一下:(name为如下值，content为对应值)

	application-name：如果页面是 Web application，用这个标签表示应用名称。
	author: 页面作者。
	description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
	generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
	keywords: 页面关键字，对于 SEO 场景非常关键。
	referrer: 跳转策略，是一种安全考量。
	theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）
## 参考文章
1. [标签中http-equiv属性的属性值X-UA-Compatible详解](https://blog.csdn.net/changjiangbuxi/article/details/26054755)
</font>
