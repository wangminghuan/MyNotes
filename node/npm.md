<font face="微软雅黑" size="4" >
<font size="6">npm相关</font>


## 1 全局依赖 


## 2 局部依赖 


## 3 require全局依赖
正常情况下require只能引用局部依赖，无法获取到全局依赖，首先我们可以通过以下命令定位：

1. 确定全局安装到底把模块安装到了哪个目录下面。在终端运行`npm prefix -g`命令会打印出安装路径。  
2. nodejs查找模块是在module.paths目录列表下面查找的。在终端运行:
   
   		  node
         > module.paths //依赖列表会打印出来
       
	   ![](https://i.imgur.com/AWfJvMR.png)
默认的全局安装目录是在 `C:\\Users\\ThinkPad\\AppData\\Roaming\\npm\\node_modules`,如果没有出现在上述列表中，那么，有两种解决办法
### 3.1 方法1
将npm全局安装路径添加到module.paths中。module.paths.push('全局安装路径')。这种方案只对当前js有效。

		module.paths.push('C:/Users/ThinkPad/AppData/Roaming/npm/node_modules'); 
		var express = require('express');
		var app = express();
        //... 以下省略
### 3.2 方法2
配置环境变量，添加环境变量NODE_PATH，值就设置成全局安装路径。
![](https://i.imgur.com/wSt64bt.png)


##  参考文献

1. [npm命令配置技巧](https://www.jianshu.com/p/0f8ba68a04ec)
2. [nodejs require模块找不到怎么解决](https://jingyan.baidu.com/article/2d5afd6937ad7785a2e28e98.html)


