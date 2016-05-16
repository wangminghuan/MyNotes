##<font face="微软雅黑">面向对象编程（二）

**<font size="4" color="red" >一. 相关</font>**  
**<font size="3" color="blue">1.1 对象的组成</font>**   
**A)**方法（行为、操作）——函数：过程、动态的（对象下的函数叫做方法，有括号）


**B)** 属性——变量：状态、静态的。（对象下的变量叫做属性，无括号）  

**<font size="3" color="blue">1.2 赋值和引用</font>**   
基本类型（Undefined、Null、Boolean、Number和String），赋值时只是值的复制；  
而对象不仅是赋值时只是值的复制，也是引用的传递；  
例子1：基本类型的赋值只是值的复制

		var a = 5;
		var b = a;
		b += 3;
		alert(b); //8
		alert(a); //5   基本类型 : 赋值的时候只是值的复制
例子2：对象类型的赋值不仅是值的复制，而且也是引用的传递，修改b,也会对a的值做修改

		var a = [1,2,3];
		var b = a;
		b.push(4);
		alert(b);  //[1,2,3,4]
		alert(a);  //[1,2,3,4]   对象类型 : 赋值不仅是值的复制，而且也是引用的传递，
例子3：不管是基本类型还是对象类型，只要是用等号进行实际赋值，将重新分配内存空间 

		var a = [1,2,3];
		var b = a;
		b = [1,2,3,4];//重新分配内存地址
		alert(b); //[1,2,3,4]
		alert(a); //[1,2,3]
例子4：两种类型相等时，需要的判定条件
		
		var a = 5;
		var b = 5;
		alert(a == b);  //基本类型 : 值相同就可以

		var a = [1,2,3];
		var b = [1,2,3];
		alert( a == b );  //false  //对象类型 : 值相同，引用不相同
		
		var a = [1,2,3];
		var b = a;
		alert( a==b );  //true   //对象类型 : 值和引用都相同
**<font size="3" color="blue">1.3 包装对象</font>**   
**A)**包装对象 : 基本类型都有自己对应的包装对象（String  Number  Boolean） 

	var str = 'hello';
	str.charAt(0);  
    //基本类型会找到对应的包装对象类型，然后包装对象把所有的属性和方法给了基本类型，然后包装对象消失
**B)** 对基本类型添加方法，需要修改器原型  

	var str = 'hello';	
	str.number = 10;
	alert( str.number );  //undefined，结果是未定义，因为Number原型上没有number方法
**<font size="3" color="blue">1.4  面向对象的一些属性和方法</font>**   

**A)** hasOwnProperty()  : 看是不是对象自身下面的属性  

		var arr = [];
		arr.num = 10;
		Array.prototype.num2 = 20;
		alert(  arr.hasOwnProperty('num')  );  //true
		alert(  arr.hasOwnProperty('num2')  );  //false
**B)**constructor :  查看对象的构造函数  

		function Aaa(){
		}	
        //Aaa.prototype.constructor = Aaa;每一个函数都会有的，都是自动生成的
		var a1 = new Aaa();
		alert( a1.constructor );  //Aaa
		var arr = [];
		alert( arr.constructor == Array );  //true
注意点：  
a. 每个原型都会自动添加constructor属性  
b. For in 的时候有些属性是找不到的  
c. construtor属性经常需要重新指向  

**C)**instanceof :  运算符  
对象与构造函数在原型链上是否有关系    

	function Aaa(){
	}
	var a1 = new Aaa();
	alert( a1 instanceof Object );  //true，ps：注意instanceof写法

**D)**toString()   
系统对象下面调用的都是自带的方法,自己写的对象都是通过原型链调用object下面的方法。
  
	var arr = [];
	alert( arr.toString == Object.prototype.toString ); //false
	
	function Aaa(){
	}
	var a1 = new Aaa();
	alert( a1.toString == Object.prototype.toString );  //true
toString()可空参数单独使用，同时可以加一个格式化参数,详细请点击[toString使用方法](http://blog.sina.com.cn/s/blog_85c1dc100101bxgg.html)

**E)**判断是否数组类型的三种方法:  
正常情况下可以利用constructor、instanceof或者Object.prototype.toString.call(数组名)这三种方式进行判断，都可以进行判断，但在特殊情况下（譬如：iframe下），只有一种生效。  

	   var oF = document.createElement('iframe');
		document.body.appendChild( oF );
		var ifArray = window.frames[0].Array;
		var arr = new ifArray();	
		alert( arr.constructor == Array );  //false
		alert( arr instanceof Array );  //false
		alert( Object.prototype.toString.call(arr) == '[object Array]' );  //true,推荐 

**<font size="3" color="blue">1.5 对象的继承</font>**   
**A)** 什么是继承？  
在原有对象的基础上，略作修改，得到一个新的对象。同时不影响原有对象的功能

**<font size="3" color="blue">1.6 拷贝继承</font>**   
属性的继承 : 调用父类的构造函数 call    
方法的继承 : for in :  拷贝继承 (jquery也是采用拷贝继承extend)
    
	function CreatePerson(name,sex){   //父类
		this.name = name;
		this.sex = sex;
	}
	CreatePerson.prototype.showName = function(){
		alert( this.name );
	};

	
	function CreateStar(name,sex,job){  //子类
		
	CreatePerson.call(this,name,sex);//属性继承
	
	this.job = job;
	}
	extend( CreateStar.prototype , CreatePerson.prototype );//方法继承
	
	CreateStar.prototype.showJob = function(){
	};

	var p2 = new CreateStar('黄晓明','男','演员');
	p2.showJob();//不影响父级

	function extend(obj1,obj2){
		for(var attr in obj2){
			obj1[attr] = obj2[attr];
		}
	}
	

**<font size="3" color="blue">1.7 类式继承</font>**   
JS是没有类的概念的 , 把JS中的构造函数看做的类  
要做属性和方法继承的时候，要分开继承
	
	function Aaa(){   //父类
		this.name = [1,2,3];
	}	
	Aaa.prototype.showName = function(){
		alert( this.name );
	};
	
	function Bbb(){   //子类
		
		Aaa.call(this);
		
	}
	//利用空对象编写的类式继承
	var F = function(){};
	F.prototype = Aaa.prototype;
	Bbb.prototype = new F();
	Bbb.prototype.constructor = Bbb; //修正指向问题
	
	var b1 = new Bbb();
	
	alert( b1.name );

**<font size="3" color="blue">1.8 原型继承</font>** 
  
		var a = {
			name : '小明'
		};
		
		var b = cloneObj(a);
		
		b.name = '小强';
		
		alert( b.name );
		
		function cloneObj(obj){
			
			var F = function(){};
			
			F.prototype = obj;
			
			return new F();
			
		}
**<font size="3" color="blue">1.9 结论</font>**   
拷贝继承:  通用型的  有new或无new的时候都可以  

类式继承:  new构造函数  
 
原型继承:  无new的对象  


</font>  
******

