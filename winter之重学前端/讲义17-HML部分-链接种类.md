### HTML中所有的链接种类
链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

![](https://i.imgur.com/qd7eCGQ.png)

### 一. link 标签

#### 1.1 超链接类 link 标签
超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

- canonical型
	
		<link rel="canonical" href="...">
这个标签提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

- alternate型

		<link rel="alternate" href="...">
这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。  
一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入(除了搜索引擎外，很多浏览器插件都能识别这样的 link。)：

		<link rel="alternate" type="application/rss+xml" title="RSS" href="...">

- prev & next型  
来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理。

- 其他超链类型

		rel=“author” 链接到本页面的作者，一般是 mailto: 协议
		rel=“help” 链接到本页面的帮助页
		rel=“license” 链接到本页面的版权信息页
		rel=“search” 链接到本页面的搜索页面（一般是站内提供搜索时使用）

#### 1.2 外部资源类 link 标签
外部资源型 link 标签会被主动下载，并且根据 rel 类型做不同的处理。外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。

- icon型

		<link rel="icon" type="image/png" sizes="32x32" href="//static001.geekbang.org/static/icon/time/favicon-32x32.png">
只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸
- 预处理类

		dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
		preconnect 型 link 提前对一个服务器建立 tcp 连接。
		prefetch 型 link 提前取 href 指定的 url 的内容。
		preload 型 link 提前加载 href 指定的 url。
		prerender 型 link 提前渲染 href 指定的 url。
		modulepreload 型的 link
预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。
- modulepreload  
	
		<link rel="modulepreload" href="app.js">
modulepreload 型 link 的作用是预先加载一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。
这里的所谓加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。
- stylesheet

		<link rel="stylesheet" href="xxx.css" type="text/css">
基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

- pingback
这样的 link 表示本网页被引用时，应该使用的 pingback 地址，这个机制是一份独立的标准，遵守 pingback 协议的网站在引用本页面时，会向这个 pingback url 发送一个消息。

### 二. a 标签
具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

a 标签也可以有 rel 属性，我们来简单了解一下，首先是跟 link 相同的一些 rel，包括下面的几种：

	alternate
	author
	help
	license
	next
	prev
	search

这些跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

a 标签独有的 rel 类型：

	tag 表示本网页所属的标签；
	bookmark 到上级章节的链接。

a 标签还有一些辅助的 rel 类型，用于提示浏览器或者搜索引擎做一些处理：

	nofollow 此链接不会被搜索引擎索引；
	noopener 此链接打开的网页无法使用 opener 来获得当前页面的窗口；
	noreferrer 此链接打开的网页无法使用 referrer 来获得当前页面的 url；
	opener 打开的网页可以使用 window.opener 来访问当前页面的 window 对象，这是 a 标签的默认行为。

### 三. area 标签

area 标签与 a 标签非常相似，不同的是，它不是文本型的链接，而是区域型的链接。area 标签支持的 rel 与 a 完全一样。area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型：circle(圆形)，rect(矩形)，poly(多边形)