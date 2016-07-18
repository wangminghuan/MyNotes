##<font face="微软雅黑">FIS3使用指南

**<font size="4" color="red" >一. 初级</font>**  

**<font size="3" color="blue">1.1 指令和配置</font>**   

**A)**构建指令： <code>fis3 release -d <path\></code>   

<path\>：构建路径，如 ./output (d为destination缩写，终点，目的地)
 
**B)**  配置文件（fis-conf.js）说明：  
		
        //1.  FIS3 选择的是添加 MD5 戳，直接修改文件的 URL
		fis.match('*.{js,css,png}', {
		  useHash: true
		});
         
         //2. 用对应插件对js，css，png图片进行压缩 
        fis.match('*.js', {
		  optimizer: fis.plugin('uglify-js')// 已内置
		});
		fis.match('*.css', {
		 optimizer: fis.plugin('clean-css')// 已内置
		});
		fis.match('*.png', {
		  optimizer: fis.plugin('png-compressor')// 已内置
		}); 
 
		//3.FIS3 构建会对 CSS 中，路径带 ?__sprite 的图片进行合并。为了节省编译的时间，分配到 useSprite: true 的 CSS 文件才会被处理。
		fis.match('::package', {
		  spriter: fis.plugin('csssprites')// 启用 fis-spriter-csssprites 插件
		})
		// 对 CSS 进行图片合并
		fis.match('*.css', {
		  // 给匹配到的文件分配属性'useSprite',也可以与压缩配置项合并
		  useSprite: true
		});

**<font size="3" color="blue">1.2 调试</font>**   

FIS3 构建后，默认情况下会对资源的 URL 进行修改，改成绝对路径。这时候本地双击打开文件是无法正常工作的。这给开发调试带来了绝大的困惑。FIS3 内置一个简易 Web Server，可以方便调试构建结果。 
 
**使用步骤：**   
1)<code>fis3 release</code>：不加 -d 参数默认被发布到内置 Web Server的根目录下，当启动服务时访问此目录下的资源。  
  
2)<code>fis3 server start</code>：启动本地 Web Server，当此 Server 启动后，会自动浏览器打开 http://127.0.0.1:8080，默认监听端口 8080。  

3)<code>fis3 release -wL</code>：启动文件监听功能和浏览器自动刷新功能，程序不会执行终止,停止程序用快捷键 CTRL+c（要修改未构建之前的文件，保存后，便会实现自动刷新）。  

**<font size="4" color="red" >二. 内置语法</font>**   
 
**<font size="3" color="blue">2.1 嵌入资源</font>**   

**A)** **HTML文件中嵌入**（通过给资源加 ?__inline 参数）  

1)html中嵌入图片base64 
  	
    <img title="百度logo" src="images/logo.gif?__inline"/>
2)html中嵌入样式文件  
  	
    <link rel="stylesheet" type="text/css" href="demo.css?__inline">
3)html中嵌入脚本资源  
     
    <script type="text/javascript" src="demo.js?__inline"></script>
4)html中嵌入页面文件  
  
    <link rel="import" href="demo.html?__inline">  
**B)**  **JS文件中嵌入**（使用编译函数 __inline()）  

对html中写入的<code>script</code>标签中的js代码同样有效    

1）js中嵌入js文件    

    __inline('demo.js');
2）js中嵌入图片base64  

    var img = __inline('images/logo.gif');
3）js中嵌入其他文本文件  

    var css = __inline('a.css');  
**C)**  **CSS文件中嵌入**（通过给资源加 ?__inline 参数）  
对html中写入的<code>script</code>标签中的js代码同样有效    

1）css文件中嵌入其他css文件   

    @import url('demo.css?__inline');
2）css中嵌入图片的base64  

    .style {
      background: url(images/logo.gif?__inline);
  }

**<font size="3" color="blue">2.2 定位资源</font>**   
**A)** **HTML中定位资源**  

1）FIS3默认会将script、link、style、video、audio、embed等标签的src或href属性进行分析，一旦这些标签的资源定位属性可以命中已存在文件，会把命中文件的url路径进行替换。  

2）资源定位结果可以被fis的配置文件控制，比如添加配置，调整文件发布路径

		fis.match('*.{js,css,png,gif}', {
		    useHash: true // 开启 md5 戳
		});
		
		// 所有的 js
		fis.match('**.js', {
		    //发布到/static/js/xxx目录下
		    release : '/static/js$0'
		});
		
		// 所有的 css
		fis.match('**.css', {
		    //发布到/static/css/xxx目录下
		    release : '/static/css$0'
		});
		
		// 所有image目录下的.png，.gif文件
		fis.match('/images/(*.{png,gif})', {
		    //发布到/static/pic/xxx目录下
		    release: '/static/pic/$1$2'
		});

再次编译得到：
	
		<!--源码：
		<img title="百度logo" src="images/logo.gif"/>
		编译后-->
		<img title="百度logo" src="/static/pic/logo_74e5229.gif"/>
		
		<!--源码：
		<link rel="stylesheet" type="text/css" href="demo.css">
		编译后-->
		<link rel="stylesheet" type="text/css" href="/static/css/demo_7defa41.css">
		
		<!--源码：
		<script type="text/javascript" src="demo.js"></script>
		编译后-->
		<script type="text/javascript" src="/static/js/demo_33c5143.js"></script>  
 也可以让url和发布目录不一致  
		fis.match('*.{js,css,png,gif}', {
		    useHash: true // 开启 md5 戳
		});
		
		// 所有的 js
		fis.match('**.js', {
		    //发布到/static/js/xxx目录下
		    release : '/static/js$0',
		    //访问url是/mm/static/js/xxx
		    url : '/mm/static/js$0'
		});
		
		// 所有的 css
		fis.match('**.css', {
		    //发布到/static/css/xxx目录下
		    release : '/static/css$0',
		    //访问url是/pp/static/css/xxx
		    url : '/pp/static/css$0'
		});
		
		// 所有image目录下的.png，.gif文件
		fis.match('/images/(*.{png,gif})', {
		    //发布到/static/pic/xxx目录下
		    release: '/static/pic/$1',
		    //访问url是/oo/static/baidu/xxx
		    url : '/oo/static/baidu$0'
		});
再次编译得到：

	<!--源码：
	<img title="百度logo" src="images/logo.gif"/>
	编译后-->
	<img title="百度logo" src="/oo/static/baidu/logo_74e5229.gif"/>
	
	<!--源码：
	<link rel="stylesheet" type="text/css" href="demo.css">
	编译后-->
	<link rel="stylesheet" type="text/css" href="/pp/static/css/demo_7defa41.css">
	
	<!--源码：
	<script type="text/javascript" src="demo.js"></script>
	编译后-->
	<script type="text/javascript" src="/mm/static/js/demo_33c5143.js"></script>

**B)**  **JS中定位资源**  

使用编译函数 __uri(path) 来定位资源  
1)源码：

     var img = __uri('images/logo.gif');
     var css = __uri('demo.css');
     var js = __uri('demo.js');    
编译后

     var img = '/images/logo_74e5229.gif'; 
     var css = '/static/css/demo_7defa41.css';
     var js = '/static/js/demo_33c5143.js';

2)资源定位结果可以被fis的配置文件控制（同上）  

**C)**  **CSS中定位资源**  

fis编译工具会识别css文件或 html的style标签内容 中 url(path) 以及 src=path 字段。  
1)源码：

     @import url('demo.css'); 

	.style {
      background: url('images/body-bg.png');
     }   

	   .style {
     _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/body-bg.png');
	  }
编译后  
     
      @import url('/demo_7defa41.css');
     .style {
      background: url('/images/body-bg_1b8c3e0.png');
      }
     .style {
      _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/images/body-bg_1b8c3e0.png');
     }
2)资源定位结果可以被fis的配置文件控制（同上） 
 
**<font size="3" color="blue">2.3 声明依赖</font>**   

**A)** **HTML中声明依赖**  

1）在项目的index.html里使用注释声明依赖关系：

	<!--
	    @require demo.js
	    @require "demo.css"
	-->
2)源文件根目录中必须有一个包含字符<code>\_\_RESOURCE\_MAP\_\_</code>的文件。文件名称自定义（如：manifest.json）。编译后会把依赖关系结构替换到构建目录中的manifest.json中。也可以写入js代码中，如：<code>var \_map=\_\_RESOURCE\_MAP\_\_;</code>,构建过程会自动将字符进行替换，这样省去了重新读取外部映射关系文件的过程。

3)默认情况下，只有js和css文件会输出到manifest.json表中，如果想将html文件加入表中，需要通过配置 useMap 让HTML文件加入 manifest.json，例如：

		   fis.match('*.html', {
		    useMap: true
		   })
**B)** **JS中声明依赖**

1）FIS支持识别js文件中的**注释中的@require字段**标记的依赖关系，对html中的的script标签内容同样有效。 

		 //demo.js
		/**
		 * @require demo.css
		 * @require list.js
		 */

2）js中的模块化库如：require()，FIS不会进行处理.  

**C)**  **CSS中声明依赖**  

1）FIS支持识别css文件中的**注释中的@require字段**标记的依赖关系，对html中的的style标签内容同样有效。 

			 /**
			 * demo.css
			 * @require reset.css
			 */

2）js中的模块化库如：require()，FIS不会进行处理.  

**<font size="4" color="red" >三. 中级</font>**   

**<font size="3" color="blue">3.1 FIS3的插件</font>**   
FIS3 的插件都是以 NPM 包形式存在的，所以安装 FIS3 的插件需要使用 npm 来安装。

	npm install -g 插件名
譬如：
	
	npm install -g fis-parser-less
	npm install -g fis3-postpackager-loader
  
**<font size="3" color="blue">3.2 预处理</font>**   

FIS3 提供强大的预处理能力，可以对 less、sass 等异构语言进行预处理，还可以对模板语言进行预编译。
 例如： 对 less 进行预处理，需要进行以下配置  

	fis.match('*.less', {
	  // fis-parser-less 插件进行解析
	  parser: fis.plugin('less'),
	  // .less 文件后缀构建后被改成 .css 文件
	  rExt: '.css'
	})  

**<font size="3" color="blue">3.2 简单合并</font>**  

启用打包后处理插件进行合并：  
1） **基于整个项目打包**  

	fis.match('::package', {
	  postpackager: fis.plugin('loader')
	});//启用合并插件
	
	fis.match('*.less', {
	  parser: fis.plugin('less'),
	  rExt: '.css'
	});//将less进行预处理
	
	fis.match('*.{less,css}', {
	  packTo: '/static/aio.css'
	});//将less，css文件都打包到aio.css
	
	fis.match('*.js', {
	  packTo: '/static/aio.js'
	});//将页面的所有js打包到aio.js  

这种配置会将页面的所有资源都打包到同一个包里面，不同的页面将引用同一个或多个文件。这个可能不是我们想要的结果，我们想一个页面只包含这个页面用过的资源。  

2）**基于页面的打包方式**  

	fis.match('::package', {
	  postpackager: fis.plugin('loader', {
	    allInOne: true
	  })
	});

	fis.match('*.less', {
	  parser: fis.plugin('less'),
	  rExt: '.css'
	});
给 loader 插件配置 allInOne 属性，即可对散列的引用链接进行合并，而不需要进行配置 packTo 指定合并包名。

*注意，这个插件只针对纯前端的页面进行比较粗暴的合并，如果使用了后端模板，一般都需要从整站出发配置合并。*  

**<font size="3" color="blue">3.4 mock数据模拟</font>**  
1）在源文件根目录下新建文件<code>test/sample.json</code> 和 <code>test/server.conf</code>  
sample.json：用于存放接口数据，如：  

	{
	 "error": 0,
	 "message": "ok",
	 "data": {
	   "uname": "foo",
	   "uid": 1
	 }
	}
erver.conf：为配置文件，其配置语法格式如下：
	
		rewrite ^\/api\/user$ /test/sample.json   
		//指令名称   正则规则     目标文件  

`指令名称` 支持 rewrite 和 redirect。  
`正则规则` 用来命中需要作假的请求路径。  
`目标文件` 设置转发的目标地址，需要配置一个可请求的 url 地址。  

2)配置 fis-conf.js, 保证产出到服务端的路径是正确的  

	fis.match('/test/**', {
	  release: '$0'
	});
	
	fis.match('/test/server.conf', {
	  release: '/config/server.conf'
	});

3）执行 <code>fis3 release</code> 命令后：    
服务器将生成 /test/sample.json 目录，确保通过 `http://127.0.0.1:8080/test/sample.json` 可访问到。   
服务器将生成 /config/server.conf目录，确保通过 `http://127.0.0.1:8080/api/user` ，返回的就是 sample.json 中的内容。  

**<font size="4" color="red" >四. 其他</font>**  

**<font size="3" color="blue">4.1 打包</font>**  
 
打包在前端工程中有两个方面  

**A)** 收集页面用到的 js、css，分别合并这些引用，将资源**合并**成一个。  

**B)** **打包**，对某些资源进行打包，而记录它们打包的信息，譬如某个文件打包到了哪个包文件。
 

**<font size="3" color="blue">4.2 URI,URL和URN</font>**  

**A)** URI(Uniform Resource Identifier)，统一资源标识符，用来唯一的标识一个资源；  

**B)** URL(Uniform Resource Locator)，统一资源定位符，是资源标识符最常见的形式,URL 描述了一台特定服务器上某资源的特定位置。  

**C)** URN(Uniform Resource Name）, 统一资源名，作为特定内容的唯一名称使用
的， 与目前的资源所在地无关。 使用这些与位置无关的 URN， 就可以将资源四处搬移。（仍然处于试验阶段）


</font>  
******

