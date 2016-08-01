##<font face="微软雅黑" size="4" >firbug中调试技巧

**<font size="5" color="red" >一. 控制台console</font>**   
**<font color="blue">1.1 显示信息的命令</font>**   
**A)** console.log("hello"); 

**B)** console.info("信息");  

**C)** console.warn("警告");

**D)** console.error("错误");  

**<font color="blue">1.2 信息分组</font>**   

	console.group("第一组信息")；
	console.log("信息内容")；
	console.groupEnd()；
	
	console.group("第二组信息")；
	console.log("信息内容")；
	console.groupEnd()； 
**<font color="blue">1.3 查看对象的信息</font>**  

console.dir()；显示一个对象所有的属性和方法

**<font color="blue">1.4 显示某个节点的内容</font>**  

console.dirxml();用来显示网页的某个节点（node）所包含的html/xml代码。

**<font color="blue">1.5 判断变量是否是真(断言)</font>**  
console.assert()；用来判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常。

	var result = 1;
	console.assert( result );
	var year = 2014;
	console.assert(year == 2018 );
1是非0值，是真；而第二个判断是假，在控制台显示错误信息。

**<font color="blue">1.6 追踪函数的调用轨迹</font>**  

console.trace()；用来追踪函数的调用轨迹。

**<font color="blue">1.7 计时功能</font>**  

	console.time("定时器1")；  
	console.timeEnd("定时器1")；  
	//参数必填，字符串即可，用来区分定时器的名称
**<font color="blue">1.7 性能分析</font>**  


	console.profile(性能分析器')；
	console.profileEnd()  
表格展现出来函数调用次数，时间，消耗性能等等情况，分析程序各个部分的运行时间，找出瓶颈所在。  
**<font size="5" color="red" >二. 在线加载控制台</font>**    

	<script type="text/javascript" src="https://getfirebug.com/firebug-lite-beta.js"></script>
加载一个在线firebug工具,用于IE等调试功能差的浏览器
</font>  
******

