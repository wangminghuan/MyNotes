## Buffer
Buffer是用于操作二进制数据的类。  

JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互.

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require

	var bf=new Buffer([1,2,3,4,10]);
	console.log(bf); 
	//<Buffer 01 02 03 04 0a> 返回一个长度是5字节的数组（以16进制打印出来，1字节=8位）
	console.log(bf.length);//5

Buffer实例一旦创建，长度无法修改。

### 常用方法：
>buf为实例方法，Buffer为对象方法。

- buf.fill(value[, offset[, end]][, encoding])  
填充数据，可以设置起始点和编码方式
- buf.write(string[, offset[, length]][, encoding])

- buf.includes(value[, byteOffset][, encoding])

- buf.indexOf(value[, byteOffset][, encoding])

- buf.equals(otherBuffer)
比较两个buffer是否相等（数值是否相等，而非比较引用地址）
- buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
拷贝一个buffer
- buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
比较两个buffer大小
- Buffer.alloc(size[, fill[, encoding]])  
分配一个大小为 size 字节的新建的 Buffer 。 如果 fill 为 undefined ，则该 Buffer 会用 0 填充，encoding默认为 'utf8'
Buffer也有下标，可以通过 buf[index] 进行操作
length：字节长度（非字符长度）
- Buffer.byteLength(string[, encoding])  
数据的字节长度（js中字符串长度获取的是字符长度）
- Buffer.compare(buf1, buf2)  
- Buffer.concat(list[, totalLength])
- Buffer.from(array)
- Buffer.isBuffer(obj)
- Buffer.isEncoding(encoding)  
ascii、utf8、utf16le、ucs2、base64、latin1、binary、hex

## 参考文章
1. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html) 