<font face="微软雅黑" size="4" >
<font size="6">js模式设计</font>


## 1 观察者模式（订阅发布） 

### 1.1 简介

1. 发布订阅模式又叫观察者模式,当一个对象发生改变时，所有依赖于它的对象都将得到通知。
2. 优点：  
   a.支持简单的广播通信，当对象发生改变时，会自动通知已经订阅过的对象  
   b. 发布者与订阅者耦合性降低，发布者只管发布一条消息出去，它不关心这条消息如何被订阅者使用，同时，订阅者只监听发布者的事件名，只要发布者的事件名不变，它不管发布者如何改变；  
3. 缺点：  
   a.创建订阅者需要消耗内存  
   b. 虽然可以弱化对象之间的关系，但如果过度使用，代码不好理解和维护

### 1.2 代码实现  
订阅发布函数的一种实现方式：


	//订阅发布构造函数
	 function PubSub(){
		 this.handlers={}
	 }
	
	 PubSub.prototype={
		 //订阅
		 on:function(eventType,handler){
			 //为通道名称创建一个空数组
	         if(!(eventType in this.handlers)){
				this.handlers[eventType]=[];
			 }
			 //将绑定的函数推送到通道对应的数组内
			 this.handlers[eventType].push(handler)
		 },
		 //发布
		 emit:function(eventType){
			 //获取发布时的参数，除掉第一个参数（为通道名称），将剩余的所有参数都传递到绑定的函数中进行执行
	        var args=Array.prototype.slice.call(arguments,1);
			var lens=this.handlers[eventType]?this.handlers[eventType].length:0;
			for(var i=0;i<lens;i++){
				// 遍历，将该通道上绑定的所有函数都执行一遍
	            this.handlers[eventType][i].apply(this,args)
			}
		 },
		 //取消
		 off:function(eventType,handler){
			 //获取当前需要取消的通道名称
			var currentEvent=this.handlers[eventType];
			//如果通道存在
	        if(currentEvent){
	            var lens= currentEvent instanceof Array ?currentEvent.length:0;
				for(var i=0;i<lens;i++){
					//通道绑定的函数同要取消的函数为相同，则移除该函数
					if(this.handlers[eventType][i]=== handler){
						this.handlers[eventType].splice(i,1)
					}
				}
			}
		 }
	 }

调用例子：

		 var pubsub=new PubSub(); //创建实例
		 var btn1=document.getElementById("btn1");
		 function handler1(){
			 console.log("我是handler1，接收到的数据为",arguments)
		 }
		 function handler2(){
			 console.log("我是handler2，接收到的数据为",arguments)
		 }
		 pubsub.on("click",handler1);//订阅一次
		 pubsub.on("click",handler2);//再次订阅
		 pubsub.off("click",handler2);// 取消订阅
		 btn1.onclick=function(){
			pubsub.emit("click",{name:"wangminghuan",sex:"man"},"hello world")
		 }
运算结果：  
![](https://i.imgur.com/n1FJGji.png)
##  参考文献

1. [让事件支持先发布后订阅](https://www.cnblogs.com/stoneniqiu/p/6814468.html)


