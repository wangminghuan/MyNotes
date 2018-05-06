<font face="微软雅黑" size="4" >
<font size="6">虚拟DOM</font>

##1 浏览器渲染页面机制  
1. 解析HTML，并生成一棵DOM tree
2. 解析各种样式并结合DOM tree生成一棵Render tree
3. 对Render tree的各个节点计算布局信息，比如box的位置与尺寸
4. 根据Render tree并利用浏览器的UI层进行绘制
## 2 虚拟DOM核心思想
1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中。
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
## 3. 虚拟DOM实现方式
1. 用 JS 对象模拟 DOM 树
2. diff算法计算节点变化
3. 生成真正DOM树，触发layout更新视图



