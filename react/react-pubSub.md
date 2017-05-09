<font face="微软雅黑" size="4" >
<font size="6">React订阅发布模式</font>


## 1 pubSub包的安装 

	npm install PubSub

## 2 使用 

	   import pubSub from "PubSub";
	
	   class App extends Component{
	      constructor(props){
			 super(props);
 			  window._pubSub=new pubSub();
			}
	   }
       //组件A 订阅，需求方
       class ComponentA extends Component{
	      constructor(props){
			 super(props);
 			  //...
			}
          componentDidMount(){
		   //订阅一个事件，需求方
		    _pubSub.subscribe('getItemInfo',function(data){
		      console.log(data);
              //do something
		    }.bind(this))
			}
	   }
       //组件B 发布，产生数据方
	  class ComponentB extends Component{
	      constructor(props){
			 super(props);
 			  //...
			}
          handleClick(){
			_pubSub.publish('getItemInfo',{
             name:"jack",
             sex:this.props.sex  
            })
			}
	   }

## 3总结
组件A和组件B完全解耦，互相并不知道对方的存在，只是共享了一个信息通道，如 getItemInfo
##  参考文献

1. [React 组件之间如何交流](http://www.tuicool.com/articles/AzQzEbq)
2. [PubSub-github](https://github.com/georapbox/PubSub)