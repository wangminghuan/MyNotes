## Event
事件是整个 Node.js 的核心，Node.js中大部分模块都使用或继承了该模块（类似 WebAPI 中的EventTarget）。所有能触发事件的对象都是 EventEmitter 类的实例。 

例子，一个简单的 EventEmitter 实例，绑定了一个监听器。 eventEmitter.on() 用于注册监听器， eventEmitter.emit() 用于触发事件：

	const EventEmitter = require('events');
	
	class MyEmitter extends EventEmitter {}
	
	const myEmitter = new MyEmitter();
	myEmitter.on('event', () => {
	  console.log('触发事件');
	});
	myEmitter.emit('event');

#### 延伸知识点

document.body对象的原型链关系：

	document.body>HTMLBodyElement>HTMLElement>Element>Node>EventTarget>Object

可以看到Node对象其实都继承了 nodeEventTarget 这个事件对象，所以只要是元素都会有事件。