<font face="微软雅黑" size="4" >
<font size="6">Vue 数据绑定原理</font>

##1 几种实现双向绑定的做法

1. 订阅者-发布者模式（backbone.js）  
更新数据方式通常做法是 vm.set('property', value)，该方式有点low，看起来没那么友好

2. 脏值检查（angular.js） 

3. 数据劫持（vue.js）
### 参考文档
1. [Vue数据绑定详细原理剖析](https://blog.csdn.net/itkingone/article/details/79152951)



