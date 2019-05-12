## Buffer
Buffer是用于操作二进制数据的类。  

JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互.

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require

	var bf=new Buffer([1,2,3,4,10]);
	console.log(bf); 
	//<Buffer 01 02 03 04 0a> 返回一个长度是5字节的数组（以16进制打印出来，1字节=8位）
	console.log(bf.length);//5

## 参考文章
1. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html) 