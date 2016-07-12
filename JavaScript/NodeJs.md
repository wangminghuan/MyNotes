##<font face="微软雅黑">NodeJs 初级教程
>[nodeJs中文文档](http://nodeapi.ucdok.com/#/api/)  

**<font size="4" color="red" >一. 概述</font>**  
**<font size="3" color="blue">1.1 什么是NodeJs</font>**   
简单的说 Node.js 就是运行在服务端的 JavaScript。  
Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。  
Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。  

**<font size="3" color="blue">1.2 与JavaScript异同</font>**   
**A)**相同部分： ECMAScript（语法，内置对象方法）

**B)**不同部分：js顶层对象是window，nodeJs顶层对象是global。  
 
**<font size="4" color="red" >二. 全局对象</font>**
 
**<font size="3" color="blue">2.1 Module(模块）</font>**   
**A)** Node有一个简易的模块加载系统，模块也可以理解为文件。一个文件就是一个模块，每个模块都有自己的作用域。

**B)** 使用var来申明的一个变量，她并不是全局的，而是属于当前模块下。 

**C)** node顶层没有window对象，只有global对象( javascript的其实也是用window指向了global )。  
全局变量的定义：
    
	var a = 100;	
	console.log(a);//100	
	global.a = 200;
	console.log(a);//100
	console.log(global.a)//200
    //此处的a和global.a完全是两个不同的对象  

**D)** 每个模块都有自己**module**对象，包含了当前模块下的一下属性  
    
    rquire("./01.js");
    console.log(module)  
	//运行结果：
	Module {
	  id: '.',
	  exports: {},
	  parent: null, **引入这个模块的模块。**
	  filename: 'd:\\My Documents\\nodejs05\\02.js', **当前文件的决定路径**
	  loaded: false,
	  children:  **require引入模块的moduled对象属性**        
	   [ Module {
	       id: 'd:\\My Documents\\nodejs05\\01.js',
	       exports: {},
	       parent: [Circular],
	       filename: 'd:\\My Documents\\nodejs05\\01.js',
	       loaded: true,
	       children: [],
	       paths: [Object] } ],
	  paths:  **module path的生成规则为：从当前文件目录开始查找node_modules目录；   
              然后依次进入父目录，查找父目录下的node_modules目录；  
              依次迭代，直到根目录下的node_modules目录**
	   [ 'd:\\My Documents\\nodejs05\\node_modules',
	     'd:\\My Documents\\node_modules',
	     'd:\\node_modules' ] 
         
	 }


**<font size="3" color="blue">2.2 require （引入模块）</font>**   
**A)** **require('[模块绝对路径]/[模块相对路径]')**，require实际上并非全局的而是各个模块本地的。 

**B)**  注意"/"的添加 

	      require（'./2.js'） //加载工程目录下的文件
	      require('2.js');  //加载node中的核心模块，或者是node_modules
**C)**  模块加载的优先级顺序：  
1.首先按照加载的模块的文件名称进行查找。    
2.如果没有找到，则会在模块文件名称后加上.js的后缀，进行查找。  
3.如果还没有找到，则会在文件名称后加上.json的后缀，进行查找。  
4.如果还没有，则会在文件名称后加上.node的后缀，进行查找。  

即：文件名称 -> .js -> .json -> .node（由高到低）  

**<font size="3" color="blue">2.3 exports （输出对象）</font>**   
**A)** 模块下需要对外输出的内容，都可以挂靠到**export**对象下：  
        
       //01.js
       var a=10;
       module.exports.a=a;//等同于export.a=a
       
       //01.js
       var b=require("./01.js")
       console.log(b)//结果为{a:10} json对象
       console.log(b.a)//结果为：10
**B)**  exports是module.exports的一个引用，只是为了用起来方便。当你想输出的是例如构造函数这样的单个项目，那么需要使用module.exports。

**C)** 不要随意修改exports/module.exports的指向。一旦修改二者其一的值，二者间的引用关系便会断裂。


**<font size="3" color="blue">2.4 \__filename</font>**  
当前所执行代码文件的文件路径。  

**<font size="3" color="blue">2.5 \__dirname</font>**  
当前执行脚本所在目录的目录名

**<font size="4" color="red" >三. Process(进程)</font>**--全局对象  
process对象是一个全局对象，可以在任何地方访问到他，通过这个对象的属性和方法，使我们可以对当前运行程序的进程进行访问和控制。  

**<font size="3" color="blue">3.1 process对象下常用属性和方法</font>**  
**A) process.argv**： 一个包含命令行参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数。

**B) process.env**： 返回用户环境信息  

**C) process.execPath**: 返回开启当前进程的绝对路径 

**D) process.version**: 返回node版本信息  

**E) process.versions**: 返回node以及node依赖包版本信息  

**F) process.pid**: 返回当前进程的pid。（注释：Process Identification 操作系统里指进程识别号，也就是进程标识符。操作系统里每打开一个程序都会创建一个进程ID，即PID。） 

**G) process.title**: 获取/设置 (Getter/setter) 'ps' 中显示的进程名。 

**H) process.arch**: 返回当前 CPU 处理器的架构：'arm'、'ia32' 或者 'x64'。 

**I) process.platform**: 返回当前程序运行的平台：'darwin', 'freebsd', 'linux', 'sunos' 或者 'win32'。 

**J) process.cwd()**： 返回进程当前的工作目录。

**K) process.chdir(directory)**：改变进程的当前进程的工作目录，若操作失败则抛出异常。 

**K) process.memoryUsage()**：返回一个对象，它描述了Node进程的内存使用情况单位是bytes。

**M) process.exit([code])**： 终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0。 

**<font size="3" color="blue">3.2 process对象下标准输入输出流</font>**  

**A) stdin**：输入  

		process.stdin.resume();//标准输入流默认是暂停的，所以必须要调用该指令来恢复(resume)接收
		process.stdin.on('data', function (chuck) {
		    console.log("输入了:"+chuck);
		})
        //on(),开启输入监听，回车后执行，用户输入数据通过chuck进行接收
**B) stdout** ：输出  

     process.stdout.write("hello world!")//和console.log()基本相同

   
**<font size="4" color="red" >四. Buffer类</font>**--全局对象  
用于处理二进制数据  

**<font size="3" color="blue">4.1 new Buffer(size)</font>**  
size [Number] 创建一个Buffer对象，并为这个对象分配一个大小。  
当我们为一个Buffer对象分配空间大小以后，其长度是固定，不能更改。
	
	var bf=new Buffer(5);
	console.log(bf); 
    //<Buffer 01 00 00 00 41> 返回一个长度是5，8位字节的随机数
    console.log(bf.length);//5
**<font size="3" color="blue">4.2 new Buffer(Array)</font>** 

	var bf=new Buffer([1,2,3,4,10]);
	console.log(bf); 
    //<Buffer 01 02 03 04 0a> 返回一个长度是5，8位字节的数组（以16进制打印出来）
    console.log(bf.length);//5
     

**<font size="3" color="blue">4.3 new Buffer(str, [encoding])</font>**  
分配一个新的 buffer ，其中包含着给定的 str字符串. encoding 编码方式默认是：'utf8'.  

	var bf=new Buffer("minghuan","utf-8")
	console.log(bf);//<Buffer 6d 69 6e 67 68 75 61 6e> 
	console.log(bf.length);//字节长度是8
	for(var i=0;i<bf.length;i++){
         //console.log(bf[i]);输出是十进制
	    //console.log(bf[i].toString(16));转化成16禁止将与上面相同
	    console.log(String.fromCharCode(bf[i]))//将编码后的字符串反编码，得到相应字符"minghuan"
	}
buffer下中文长度

	var str = '中国';
	var bf = new Buffer(str);
	console.log(str.length);//字符串长度是2
	console.log(bf.length);//字节长度是6，一个中文字符占3个字节

**<font size="3" color="blue">4.4 buf.write(string, [offset], [length], [encoding])</font>**   
参数解释：(要写入的字符串, 从Buffer对象中的几位开始写入, 写入的字符串的长度, 写入的字符串的编码) 

		var str="minghuan";
		console.log(new Buffer(str));//<Buffer 6d 69 6e 67 68 75 61 6e>
		var buf=new Buffer(5);
		buf.write(str,1,3);
		console.log(buf); //<Buffer a8 6d 69 6e 00>

**<font size="3" color="blue">4.5 buf.toString([encoding], [start], [end])</font>** 
根据encoding参数（默认是utf8），返回一个解码的string类型  

	var buf = new Buffer('minghuan');
	console.log( buf.toString('utf-8', 1, 3) );
**<font size="3" color="blue">4.6 buf.slice([start], [end])</font>**   
返回一个新的Buffe。这个buffer将会和老的buffer引用相同的内存地址。  
注意：修改这个新的buffer实例slice切片，也会改变原来的buffer。

**<font size="3" color="blue">4.7 buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])</font>**   
进行buffer的拷贝，源和目标可以是重叠的。且不会互相引用。  

<font size="3" color="red">类方法:</font>  

**<font size="3" color="blue">4.8 Buffer.isEncoding(encoding)</font>**    
如果给定的编码 encoding 是有效的，返回 true，否则返回 false。

**<font size="3" color="blue">4.9 Buffer.isBuffer(obj)</font>**    
测试这个 obj 是否是一个 Buffer。

**<font size="3" color="blue">4.10  Buffer.byteLength(string, [encoding])</font>**    
将会返回这个字符串真实byte长度,encoding 编码默认是： 'utf8'。


**<font size="3" color="blue">4.11  Buffer.concat(list, [totalLength])</font>**  
参数解释：list，Buffer数组，用于被连接； totalLength，数组里Buffer实例的大小总和。     
其实就是将数组中所有的buffer实例通过复制拼接在一起。  


**<font size="3" color="blue">4.10  Buffer.byteLength(string, [encoding])</font>**    
将会返回这个字符串真实byte长度,encoding 编码默认是： 'utf8'。

**<font size="4" color="red" >五. File System(文件系统)</font>**   
该模块是核心模块，需要使用require("fs")引用后使用。  
该模块提供了一些操作文件的API。  

**<font size="3" color="blue">5.1 fs.open(path, flags, [mode], callback)</font>**     
**path** : 要打开的文件的路径  
**flags** : 打开文件的方式 读/写;  
**mode** : 设置文件的模式 读/写/执行  4/2/1；主要针对Linux系统   
**callback** : 回调  
&emsp;&emsp;-- err : 文件打开失败的错误保存在err里面，如果成功err为null  
&emsp;&emsp;-- fd : 被打开文件的标识 

	var fs=require("fs");
	fs.open("01.txt","r",function(er,fd){
	    if(er){
	        console.log("文件打开失败")
	    }else{
	        console.log("文件打开成功");
	        console.log(fd);
	    }
	})
    console.log("异步")；
	 //"异步"会先被打印出来，异步模式下，文件读写需要耗时，故会先执行后面的代码
   
**同步版：fs.openSync(path, flags, [mode])**：顺序执行，不需要通过异步的回调执行。

**<font size="3" color="blue">5.2 fs.read(fd, buffer, offset, length, position, callback)</font>**  
从指定的文档标识符fd读取文件数据  
**fd** : 通过open方法成功打开一个文件返回的编号  
**buffer** : 读取文件需要存放到的buffer对象  
**offset** : 读取内容添加到buffer中的起始位置  
**length** ： 读取文件内容的长度  
**position** ：从哪里开始读取文件，如果position为null，将会从文件当前的位置读取数据    
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
&emsp;&emsp;--buffer的长度  
&emsp;&emsp;-- buffer对象  
      
	var fs=require("fs");
	fs.open("01.txt","r",function(er,fd){
	    if(er){
	        console.log("文件打开失败")
	    }else{
	        console.log("文件打开成功");
	        var buf=new Buffer(5);
	        console.log(buf);//<Buffer 04 00 00 00 00>
	        fs.read(fd,buf,1,4,null,function (err,lens,newBf) {
	            console.log(buf);//<Buffer 04 61 62 63 64>
	            console.log(lens);//4
	            console.log(newBf);//<Buffer 04 61 62 63 64>
	        })
	    }
	})
**同步版：fs.readSync(fd, buffer, offset, length, position)**  

**<font size="3" color="blue">5.3 fs.write(fd, buffer, offset, length[, position], callback)</font>**    
**fd** : 通过open方法成功打开一个文件返回的编号  
**buffer** : 要写入数据所在的buffer对象  
**offset** : buffer对象中要写入的数据的起始位置  
**length** ： 要写入的buffer数据的长度  
**position** ：fd中的起始位置    
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
&emsp;&emsp;--buffer的长度  
&emsp;&emsp;-- buffer对象  

	var fs=require("fs");
	fs.open("01.txt","r+",function(er,fd){ //注意：此处一定要是可读写方式，否则会报错
	    if(er){
	        console.log("文件打开失败")
	    }else{
	        console.log("文件打开成功");
	        var buf=new Buffer("1234");
	        console.log(buf);  //<Buffer 31 32 33 34>
	        fs.write(fd,buf,0,4,5,function (er,lens,newbf) {
	            console.log(arguments);            
                //{ '0': null, '1': 4, '2': <Buffer 31 32 33 34> }
                //01.txt已被改写
	        })
	    }
	})  
**同步版：fs.writeSync(fd, buffer, offset, length[, position])**  

**<font size="3" color="blue">5.4 fs.write(fd, data[, position[, encoding]], callback)</font>**  
把data写入到文档中通过指定的fd,如果data不是buffer对象的实例则会把值强制转化成一个字符串。
   
		fs.write( fd, '1234', 5, 'utf-8' );  

**同步版：<fs.writeSync(fd, data[, position[, encoding]])**  

**<font size="3" color="blue">5.5 fs.close(fd, callback)</font>**  

**同步版：fs.closeSync(fd)**  

<font size="3" color="red">上述API操作的方式偏底层，下面介绍一些更简易的一些API:</font>  

**<font size="3" color="blue">5.6 fs.writeFile(filename, data, [options], callback)</font>**  
向一个指定的文件中写入数据，如果该文件不存在，则新建，如果存在则新的内容会覆盖原有的文件内容。  
filename:要写入的文件名称；  
data:要写入的数据；  
option（可选）：encoding/mode/flag;  
callback:回调函数；接受一个错误信息参数；  

     
		var fs=require("fs");
		var filename="02.txt";
		fs.writeFile(filename, "minghuan",function(er){
		  console.log(er);
		})
**同步版：fs.writeFileSync(filename, data, [options])**  

**<font size="3" color="blue">5.7 fs.appendFile(filename, data, [options], callback)</font>**   
向一个指定的文件中追加数据，如果该文件不存在，则新建后追加，如果存在则在原有内容后追加。  

**同步版：fs.appendFileSync(filename, data, [options])** 

**<font size="3" color="blue">5.8 fs.exists(path, callback)</font>**   
检查指定路径的文件或者目录是否存在。接着通过 callback 传入的参数指明存在 (true) 或者不存在 (false ) 。 

同步版：fs.existsSync(path)  

**<font size="3" color="blue">5.9 fs.readFile(filename, [options], callback)</font>**  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
&emsp;&emsp;--data:获取的文件内容，为buffer类  

 
	var fs=require("fs");
	fs.readFile("02.txt",function (er,data) {
	    console.log(data.toString())
	})

**同步版：fs.readFileSync(filename, [options], callback)**  

**<font size="3" color="blue">5.10 fs.unlink(path, callback)</font>**   
删除一个文件。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  

**同步版：fs.unlinkSync(path)**  

**<font size="3" color="blue">5.11 fs.rename(oldPath, newPath, callback)</font>**   
重命名一个文件。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  

**同步版：fs.renameSync(oldPath, newPath)**  

**<font size="3" color="blue">5.12 fs.stat(path, callback)</font>**   
删除一个文件。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
&emsp;&emsp;--stats: fs.Stats 对象  

	var fs=require("fs");
	fs.stat("02.txt",function () {
	    console.log(arguments)
	})
    //结果是一个json文件，包含文件大小，路径，创建，修改时间等。

**同步版：fs.statSync(path)**  

**<font size="3" color="blue">5.13 fs.watch(filename, [options], [listener])</font>**   
监听一个文件的变化。（此功能依赖于操作系统底层提供的方法来监视文件系统的变化）      
回调函数得到两个参数 (event, filename)。其中 event 是 'rename'（重命名）或者 'change'（改变），而 filename 则是触发事件的文件名。 

	var fs = require('fs');
	var filename = '2.new.txt';
	fs.watch(filename, function(ev, fn) {
	    console.log(ev);
	    if (fn) {
	        console.log(fn + ' 发生了改变');
	    } else {
	        console.log('....');
	    }
	}); 
该方法不稳定，不是完全跨平台的，且在某些情况下不可用。  
 
**<font size="3" color="blue">5.14 fs.mkdir(path, [mode], callback)</font>**   
创建一个文件夹。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
   
**同步版：fs.mkdirSync(path, [mode])**  

**<font size="3" color="blue">5.15 fs.rmdir(path, callback)</font>**   
销毁一个文件夹。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  

	var fs=require("fs");
	//创建一个文件夹
	fs.mkdir("./1",function () {
	    console.log(arguments);
	})
	//销毁一个文件夹
	fs.rmdir("./1",function () {
	    console.log(arguments);
	})

**同步版：fs.rmdirSync(path)**    

**<font size="3" color="blue">5.16 fs.readdir(path, callback)</font>**   
读取一个文件夹相关信息。  
**callback** : 回调函数  
&emsp;&emsp;--err：错误信息  
&emsp;&emsp;--files：存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'  
例子：读取文件夹下左右文件，并返回文件类型；

	var fs=require("fs");
	fs.readdir('./',function (er,files) {
	    files.forEach(function(f){ //forEach()可以锁定循环参数
	        console.log(f);
	        fs.stat(f,function (er,data) {
	            switch(data.mode){
	                case 33206:
	                    console.log("[文件]"+f);
	                    break;
	                case 16822:
	                    console.log("[文件夹]"+f);
	                    break;
	            }
	        })
	    })
	
	})

**同步版：fs.readdirSync(path)**  

**<font size="4" color="red" >六. HTTP</font>**   
 属于核心模块，通过require("http")进行引用。  

**<font size="3" color="blue">6.1 http.createServer([requestListener])</font>**  
创建并返回一个新的web服务器对象。  
**requestListener**：监听客户端连接的回调函数；   

	var http=require("http");
	var server=http.createServer();
    //此处也可以将request事件在此处进行监听。

**<font size="3" color="blue">6.2 server.listen(port, [hostname], [backlog], [callback])</font>**   
监听客户端连接请求，只有当调用了listen方法后，服务器才开始工作  
**port**： 监听的端口；  
**hostname**： 主机名（IP/域名）；  
**backlog**： 链接等待队列的最大长度；  
**callback**： 调用listen方法并成功开启监听后，会触发一个listening事件，callback将作为该事件的执行函数；

	server.listen(8080, 'localhost');

**<font size="3" color="blue">6.3 sever事件 </font>**   
**（A）listening事件**：当sever调用listen方法并成功开始监听以后触发的事件。 
	
	server.on('listening', function() {
	    console.log('listening...');
	})
**（B）error事件**：当服务开启失败的时候触发的事件。  
参数err：具体的错误信息。  

	  server.on('error', function(err){
	    console.log(err);
	});
**（C）request事件**：当有客户端发送请求到该主机和端口时触发。  
**request**：是http.IncomingMessage的一个实例，通过它可以获取本次请求的一些信息，如头信息，数据等；   
**response**：是http.ServerResponse的一个实例，通过它可以向本次请求的客户端返回相应信息； 

	server.on('request', function(req, res) {
	    console.log('有客户端请求了');
	})
  

**<font size="3" color="blue">6.4 request对象和response对象 </font>**  
<font color="red">**（A）request对象**</font>：  
**--httpVersion**:使用的http协议版本；  
**--headers**:请求头信息中的数据；  
**--url**：请求的地址；  
**--method**：请求的方式；

<font color="red">**（B）response对象**</font>：  
**--write(chuck,[encoding])**： 发送一个数据块到相应正文中；  
**--end([chuck],[encoding])**： 当所有的正文和头信息发送完成以后调用该方法，告诉服务器数据已经全部发送完成了，这个方法在每次完成信息发送以后**必须调用**，而且必须是**最后调用**  
**--statusCode**： 该属性用来设置返回的状态码；  
**--setHeader(name,value)**： 设置返回头信息；  
**--writeHead(statusCode,[reasonPhrase],[headers])**： 这个方法只能在当前请求中使用一次，并且必须在response.end()之前调用。  

下面为一个相对完整的sever服务调用代码：  

	var http=require("http");
	var server=http.createServer(function (req,res) {
	    console.log('有客户端请求了');
	    console.log(req);//请求头信息
	    res.writeHead("200","OK",{
	        'content-type' : 'text/html;charset=utf-8'
	    })
	    res.write("<h1>Hello World</h1>");
	    res.end();
	})
	server.listen(8080, 'localhost');  

**<font size="4" color="red" >七. URL</font>**   
该模块包含用以 URL 解析的实用函数。通过require("url")进行引用。通常和HTTP模块结合使用   

**补充**： URL部分参数解释     
**A）#hash**：称为锚点，也叫信息片段（fragment）。#后面的参数，用来获取或设置页面的标签值。理论上不会发送给服务器。  
**B）a=1&b=2**：query,查询参数，以'?'为起点,每个参数通过&分隔开,再以=分割参数key-value。    
**C）?a=1&b=2**：search参数，?开始，#结束。  

**<font size="3" color="blue">7.1 url.parse(urlStr, [parseQueryString], [slashesDenoteHost]) </font>**     
输入 URL 字符串，返回一个对象。[API文档](http://nodeapi.ucdok.com/#/api/url.html)  
--将第二个参数设置为 true 则使用 querystring 模块来解析 URL 中的查询字符串部分，默认为 false。  
--将第三个参数设置为 true 来把诸如 //foo/bar 这样的URL解析为 { host: 'foo', pathname: '/bar' } 而不是 { pathname: '//foo/bar' }。 默认为 false。

**<font size="3" color="blue">7.2 利用htpp、url 和 fs 设置httpserver的例子</font>** 

	var http=require("http");
	var url=require("url");
	var fs=require("fs");
	
	var server=http.createServer(); //创建http服务
	var filePath=__dirname + '/html/'; //读取server服务文件所在路径
	
	server.on("request",function (req,res) {
	     var urlStr=url.parse(req.url);
	     switch (urlStr.pathname){
	         case "/":
	             getHtml(filePath+"index.html",res,fs);
	             break;
	         case "/user":
	             getHtml(filePath+"user.html",res,fs);
	             break;
	         default:
	             getHtml(filePath+"404.html",res,fs);
	             break;
	     }
	});
	
	server.listen(8080,"localhost");
	
	function getHtml(file,res,fs){ //利用fs读取服务器上html文件的设置。
	    fs.readFile(file,function (err,data) {
	        if(err){
	            res.writeHead("404","OK",{
	                'content-type' : 'text/html;charset=utf-8'
	            });
	        }else{
	            res.writeHead("200","OK",{
	                'content-type' : 'text/html;charset=utf-8'
	            });
	        }
	        res.end(data);
	    });
	}

**<font size="4" color="red" >八. querystring</font>**   
这个模块提供一些处理 query string 的工具。（url中的参数query）  

**<font size="3" color="blue">8.1 querystring.stringify(obj, [sep], [eq])</font>**   
序列化一个对象到一个 query string。可以选择是否覆盖默认的分割符（'&'）和分配符（'='）。
  
	querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
	// 返回如下字串
	'foo:bar;baz:qux'  

**<font size="3" color="blue">8.2 querystring.parse(str, [sep], [eq], [options])</font>** 

将一个 query string 反序列化为一个对象。可以选择是否覆盖默认的分割符（'&'）和分配符（'='）。  

	querystring.parse('foo=bar&baz=qux&baz=quux&corge')
	// returns
	{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }  

**<font size="3" color="blue">8.3 利用querystring对post和get提交数据处理的例子</font>**   
get:发送的数据写入url里，可以通过querystring.parse()来处理;  
post: 发送的数据会被写入缓存区，需要通过request的data时间和end事件来进行数据拼接处理；   
在html目录下新建一个login.html文件

	<form action="/login/check" method="get(或post)">
	        <input type="text" name="username"/>
	        <input type="password" name="password"/>
	        <input type="submit" value="提交"/>
	
	    </form>
在上述例子的基础上，改进：  

	var http=require("http");
	var url=require("url");
	var fs=require("fs");
	var querystring=require("querystring");
	
	var server=http.createServer();//创建http服务
	var filePath=__dirname + '/html/';
	
	server.on("request",function (req,res) {
	    var urlStr=url.parse(req.url);
	    switch (urlStr.pathname){
	        case "/":
	            getHtml(filePath+"index.html",res,fs);
	            break;
	        case "/user":
	            getHtml(filePath+"user.html",res,fs);
	            break;
	        case "/login":
	            getHtml(filePath+"login.html",res,fs);
	            break;
	        case "/login/check":
				//1.get方式
	            /*console.log( querystring.parse(urlStr.query) );
	            结果：{ username: 'wangminghuan', password: '123' }*/

               //2.post 方式：
	            if(req.method.toUpperCase()=="POST"){
	                var postStr = '';
	                //拼接缓存区数据
	                req.on('data', function(chunk) {
	                    postStr += chunk;
	                })
	
	                //缓存区数据读取完毕后触发end事件
	                req.on('end', function() {
	                    console.log( querystring.parse( postStr ) );
	                    //同样利用querystring.parse()处理
	                    //结果：{ username: 'wangminghuan', password: '123' }
	                })
	            }
	            break;
	        default:
	            getHtml(filePath+"404.html",res,fs);
	            break;
	    }
	});
	
	server.listen(8080,"localhost");
	
	function getHtml(file,res,fs){
	    fs.readFile(file,function (err,data) {
	        if(err){
	            res.writeHead("404","OK",{
	                'content-type' : 'text/html;charset=utf-8'
	            });
	        }else{
	            res.writeHead("200","OK",{
	                'content-type' : 'text/html;charset=utf-8'
	            });
	        }
	        res.end(data);
	    });
	
	}

</font>  
******

