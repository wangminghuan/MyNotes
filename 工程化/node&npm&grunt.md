**<font size="4" color="red" face="微软雅黑">一. nodeJS是什么</font>**  
Node.js 使用 V8 作为 JavaScript 的解释器(引擎), 让 JavaScript 可以独立于浏览器运行，node.js并不是一门语言，而是一个平台   
 
因为有 Node.js, 诞生了很多用于 Web 前端的工具，例如构建工具(gulp, bower 等), 单元测试工具(mocha, jscoverage 等), 可以让前端的开发更加简单，减少重复性的工作，同时这些工具也是用 JavaScript 编写的，前端程序员可以很方便地定制这些工具

**<font size="4" color="red" face="微软雅黑">二. NPM是什么</font>**   

NPM的全称是Node Package Manager[1]  ，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。

NPM（node package manager），通常称为node包管理器。顾名思义，它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等。
其实是一个nodejs的module的管理工具。所谓module和java中的包的概念很类似，一些解决方案的集合，官方会提供核心的几个，第三方的很多。

node包的安装分两种：本地安装、全局安装：  
本地安装：package会被下载到当前所在目录，也只能在当前目录下使用。
全局安装：package会被下载到到特定的系统目录下，安装的package能够在所有目录下使用。  

**<font size="4" color="red" face="微软雅黑">三. Grunt是什么</font>**   
Grunt 是运行在 node.js 环境，由 npm 来安装， 它是一个js的构建工具。   
运行 Grunt 还要安装 grunt-cli, 使用命令 npm install -g grunt-cli，  
作为一个 Grunt 项目至少要两个文件：   
package.json -- 配置项目信息，及 Grunt 插件依赖   
Gruntfile.js  -- 任务配置文件  