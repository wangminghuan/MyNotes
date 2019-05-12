## stream
流（stream）是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。

Node.js 提供了多种流对象。 例如，HTTP 服务器的请求和 process.stdout 都是流的实例。

流可以是可读的、可写的、或者可读可写的。 所有的流都是 EventEmitter 的实例。

使用时，需要require引入

### 流的基本类型

	Writable - 可写入数据的流（例如 fs.createWriteStream()）
	Readable - 可读取数据的流（例如 fs.createReadStream()）
	Duplex - 可读又可写的流（例如 net.Socket） 		
	Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）

#### Writable方法
	.write(chunk[, encoding][, callback])
	.end([chunk][, encoding][, callback])
	.setDefaultEncoding(encoding)
#### Writable事件:

	'close' 事件
	'drain' 事件
	'error' 事件
	'finish' 事件
	'pipe' 事件
	'unpipe' 事件
#### Readable方法
	.setEncoding(encoding)
	.read([size])
	.pipe(destination[, options])
	.pause()
	.resume()
#### Readable事件
	'close' 事件
	'data' 事件
	'end' 事件
	'error' 事件
	'readable' 事件

Node.js 中许多的对象都是提供了流的实现：fs文件操作、net、dgram、http、https等。

stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。

