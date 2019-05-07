### HTML中所有的链接种类
链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

![](https://i.imgur.com/qd7eCGQ.png)

### 1. link 标签

#### 1.1 超链接类 link 标签
超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

1. canonical型
	
		<link rel="canonical" href="...">
这个标签提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

2. alternate型

		<link rel="alternate" href="...">
这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。  
一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入(除了搜索引擎外，很多浏览器插件都能识别这样的 link。)：

		<link rel="alternate" type="application/rss+xml" title="RSS" href="...">

3. prev & next型  
来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理。

#### 1.2 外部资源类 link 标签

### 2. a 标签

### 3. area 标签

