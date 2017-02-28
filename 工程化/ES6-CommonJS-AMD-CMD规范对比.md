<font face="微软雅黑" size="4" >
<font size="6">前端模块化规范对比</font>


## 1 CommonJS
>[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)

### 1.1 规范  

CommonJS也可以说是NodeJS的模块化规范，他是随着nodejs的出现而被制定的，
Modules/1.0规范包含以下内容：  

	1. 模块的标识应遵循的规则（书写规范）
	2. 定义全局函数require，通过传入模块标识来引入其他模块，执行的结果即为别的模块暴漏出来的API
	3. 如果被require函数引入的模块中也包含依赖，那么依次加载这些依赖
	4. 如果引入模块失败，那么require函数应该报一个异常
	5. 模块通过变量exports来向往暴漏API，exports只能是一个对象，暴漏的API须作为此对象的属性。
符合CommonJS规范的模块应该是这样：

    var react=require(./react.js);//引入模块
    react.render();//使用模块
    module.exports.x = x;//对外输出
其中：  

1. 【module】CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
2. 【module.exports】module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
3. 【exports】为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
   
		var exports = module.exports;
我们可以在export对象下挂载属性和方法：

		exports.area = function (r) {
		  return Math.PI * r * r;
		};
		exports.x = "hello world"
**注意**，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

        exports = function(){}//不要这样做！！！！
同样对module.exports赋值的话，挂载在exports对象下的方法也无法输出了。保险简单起见都用module.exports即可！！
### 1.2 利弊
nodeJS主要是运行在服务端的，因此CommonJS的规范主要是针对服务器端环境，并不完全适用于浏览器环境，主要原因是：CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD和CMD 解决方案。  

## 2 AMD 
AMD(Asynchronous Module Definition)即“异步的模块定义”，它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
#### 2.1 规范
#### 模块定义 defined方法
AMD就只有一个接口：define(id?,dependencies?,factory);

	define("modA", ['package/lib'], function(lib){
	  function foo(){
	    lib.log('hello world!');
	  }
	    //dependencies参数加载依赖，['package/lib']
        //factory函数的形参调用依赖，function(lib){}
	  return {
	    foo: foo //通过return对外输出
	  };
	});

AMD规范也允许输出的模块兼容CommonJS规范，这时define方法需要写成下面这样：

	define(function (require, exports, module){
       //加载依赖模块
	  var someModule = require("someModule");
	  var anotherModule = require("anotherModule");
	   //调用模块
	  someModule.doTehAwesome();
	  anotherModule.doMoarAwesome();
	  //对外输出
	  exports.asplode = function (){
	    someModule.doTehAwesome();
	    anotherModule.doMoarAwesome();
	  };
	});
#### 主模块入口（require加载）

require(dependencies?,callback?)

- dependencies:所依赖的模块（可选）：该模块名称可以是模块的路径（不要加'.js'）,也可以是require.config中配置的模块别名，但对于有主模块（就是定义了模块ID），paths中的别名必须和模块ID相同。
- callback 回调函数：参数名可以自定义。一般和依赖模块名中写入的相同。

例如：  

		 require(['pkg/index/index_common_homepage'], function(index_common_homepage) { 
          console.log('pkg index_common_homepage called')
         }); 
#### 2.2 利弊
AMD规范会将所有的依赖模块预先下载，预先下载没什么争议，由于浏览器的环境特点，被依赖的模块肯定要预先下载的。问题在于，**模块也被预先解析和执行了**。如果一个模块依赖了十个其他模块，那么在本模块的代码执行之前，要先把其他十个模块的代码都执行一遍，无论该模块是否用到。这个性能消耗是不容忽视的。而CMD规范就很好的避开了这个问题。

## 3 CMD
CMD（Common Module Definition）也称“通用的模块定义”，和CommonJS保持了更好的兼容性。
#### 3.1 规范定义
#### 模块定义 defined方法

	define(function(require, exports, module){
	 //code
	}）
三个形参，不可更改，与commonJS是对应的

	define(function(require, exports, module){
		//加载依赖模块
	    var mod = require("./mod.js");
	   //调用模块
	    var nums=mod.add();

       //对外输出，两种方式
       //方式1：
       return {
          nums:nums
       }
       //方式2：
       module.exports.nums=nums;	   
		}） 

#### 主模块入口（sea.use加载）

	seajs.use("main",function(ex){
	   console.log(ex.num);
	  }); 
#### 3.2利弊
1. CMD可以做到按需加载，定义一个模块的时候不需要立即制定依赖模块，在需要的时候require就可以了，比较方便；
2. CMD定义模块时无需罗列依赖数组，在factory函数中需传入形参require,exports,module，然后它会调用factory函数的toString方法，对函数的内容进行正则匹配，通过匹配到的require语句来分析依赖，这样就真正实现了commonJS风格的代码。

## 4 AMD VS CMD

1. AMD 推崇依赖前置, 代码在一旦运行到此处，能立即知晓依赖。而无需遍历整个函数体找到它的依赖，因此性能有所提升，缺点就是开发者必须显式得指明依赖——这会使得开发工作量变大，比如：当依赖项有n个时候 那么写起来比较烦 且容易出错。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。

2. 执行顺序上：CMD是延迟执行的，而AMD是提前执行的。

3. api设计角度：AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。


## 5 ES6  
ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


#### 5.1 规范定义 
ES6 中新增了两个命令 import 和 export

- import 命令用于输入其他模块提供的功能
- export 命令用于规定模块的对外接口

ES6 中的模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

    //加载依赖模块
	import {deviceInfo, cookie,} from "../lib/util.js"; 
    //调用模块，对外输出
    export var cookie_spm = cookie.get('spm') || "";
    //对外输出
    export function(){
    //code..
    }
#### 5.2 利弊
ES6 的模块是编译时加载，效率要比 CommonJS 模块的加载方式高。

##  参考文献

1. [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html#toc2)
2. [阮一峰 ES6 Module 的语法](http://es6.ruanyifeng.com/#docs/module)


