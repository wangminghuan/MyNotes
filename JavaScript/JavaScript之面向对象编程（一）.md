##面向对象编程


**<font size="4" color="red" face="微软雅黑">一.JavaScript中原型的概念</font>**
>了解更多请[点我](http://www.th7.cn/web/js/201503/88712.shtml) 
 
**<font size="3" color="blue" face="微软雅黑">1. JavaScript中没有类的概念</font>**  
   
JavaScript不同于java，他没有类的概念，它的所有东西都是**对象**。但在js的不断发展中，一些需求会催生js模仿类的概念，此时便出现了prototype与\_\_proto\_\_。

**<font size="3" color="blue" face="微软雅黑">2. JavaScript中的类型</font>**  
   
JavaScript中一切皆为对象，但他的对象是有类型的（type）。  
A).  
  原始类型（5种）：Boolean、Number、String、Null、Underfined

  引用类型（6种）：Array、Date、Error、Function、Object、RegExp （其实也不止这些）   
  
**<font size="3" color="blue" face="微软雅黑">3. \_\_proto\_\_和prototype</font>**  
 
A）prototype只有Function才有。 

 B）一个对象A的\_\_proto\_\_属性所指向的那个对象B就是它的原型对象（或者叫上级对象、父对象），对象A可以使用对象B中定义的属性和方法，同时也可以使用对象B的原型对象C的属性与方法，以此递归，这也就是所谓的原型链。（儿子可以用继承老子的财产，也可以继承爷爷的财产，以此类推~）   

C）\_\_proto\_\_是真正用来查找原型链去获取方法的对象。但其并非官方标准中定义的属性（ECMA中并没有\_\_proto\_\_这个方法，这个是ff、chrome等js解释器添加的，也许会被纳入到ECMAScript6中），所以借助prototype这个属性模仿Java中类与类之间继承的模式。而prototype是在用new创建对象时用来构建\_\_proto\_\_的对象。

C）Function 是一个构造函数，用于创建一个函数对象。  
function 是一个关键字可以声明一个函数对象。  
每一个函数对象都继承 Function 构造函数的原型对象。  

D)原型就是函数的一个属性，在函数的创建过程中由js编译器自动添加。 

E)通过对象的\_\_proto\_\_保存对另一个对象的引用，通过这个引用往上进行属性的查找，这就是原型链。 

    
    //fireFox下：
     function Cat(name,color){
		　　　　this.name = name;
		　　　　this.color = color;
		　　}
	console.log(Object.prototype); // object{}
    console.log(Function.prototype); // function(){}
    console.log(Array.prototype);// []
  
	console.log(Cat.prototype) //Cat{} 其中包含constructor属性，其值为: Cat(name,color)
    
    var cat1 = new Cat("大毛", "黄色");
    console.log(cat1)    // Cat { name="tom0",  color="red"}
    
    cat1.__proto__ === Cat.prototype  
    //实例的原型（__proto__）和构造函数的原型（prototype）相同

***********  
**<font size="4" color="red" face="微软雅黑">二. Javascript面向对象:封装</font>**
>了解更多请点击[阮一峰的个人博客](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)    

**<font size="3" color="blue" face="微软雅黑"> 经典封装模式</font>**   
		
           function Cat(name,color){
		　　　　this.name = name;
		　　　　this.color = color;
		　　}
		　　Cat.prototype.type = "猫科动物";
		　　Cat.prototype.eat = function(){alert("吃老鼠")};  
            var cat1=new Cat("tom","black");
            var cat2=new Cat("jack","yellow");
			alert(cat1.type); //猫科动物
			alert(cat1.eat == cat2.eat); //true
			
			//这个方法用来判断，某个proptotype对象和某个实例之间的关系。
			alert(Cat.prototype.isPrototypeOf(cat1)); //true
			
			//每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
			alert(cat1.hasOwnProperty("name")); // true
			alert(cat1.hasOwnProperty("type")); // false
			
			//in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
			alert("name" in cat1); // true
          
  
***********  
**<font size="4" color="red" face="微软雅黑">三. Javascript面向对象:构造函数间的继承</font>**
>了解更多请点击[阮一峰的个人博客](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)    

**<font size="3" color="blue" face="微软雅黑">1. 构造函数绑定</font>**   
通过使用call或apply方法，将父对象的构造函数绑定在子对象上    
<font color="red">PS：可以继承私有属性和公有属性，若二者冲突，会继承私有属性</font>

			function Animal(){
			　　　　this.species = "动物";
			}			
			function Cat(name,color){
			　　　　Animal.apply(this, arguments);
              //使猫继承构造函数Animal的属性
			　　　　this.name = name;
			　　　　this.color = color;
			}
			　　var cat1 = new Cat("大毛","黄色");
			　　alert(cat1.species); // 动物  

**<font size="3" color="blue" face="微软雅黑">2. prototype模式</font>**   
 将子对象的prototye对象指向父对象的实例上。即"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。  
<font color="red">PS：可以继承私有属性和公有属性，若二者冲突，会继承私有属性</font>

			Cat.prototype = new Animal();
				//构造函数Cat的原型对象，是构造函数Animal的一个实例
            	//相当于完全删除了prototype 对象原先的值，然后赋予一个新值
            consloe.log(Cat.prototype)//Animal{}
			Cat.prototype.constructor = Cat;
				//Cat原型的构造函数变成了Animal，每一个实例也有一个constructor属性，默认调用prototype对象的constructor，所以得重新指回来。
			var cat1 = new Cat("大毛","黄色");
			alert(cat1.species); // 动物  
            alert(cat1.constructor == Cat.prototype.constructor); // true
            alert(cat1.constructor == Cat);//true

**<font size="3" color="blue" face="微软雅黑">3. 直接继承prototype</font>**    
将Cat的prototype对象直接指向Animal的prototype对象，这样就完成了继承。  
<font color="red">PS：直接继承和利用空对象做中介的继承方式，均只能继承公共属性，即通过方式Animal.prototype.type="动物"，直接在对象原型上设置的属性才可以完成继承</font>
			
              Cat.prototype=Animal.prototype;
			  Cat.prototype.constructor=Cat;
			  Cat.prototype.type1="猫科动物";
			  Animal.prototype.type2="哺乳动物";
			  console.log(Cat.prototype);//Cat {type: "猫科动物", shuxing: "哺乳动物"}
			  console.log(Animal.prototype);//Cat {type: "猫科动物", shuxing: "哺乳动物"}

与前一种方法相比  
优点：效率比较高（不用执行和建立Animal的实例了），比较省内存。  
缺点： Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype（修改子级影响父级）    

**<font size="3" color="blue" face="微软雅黑">4.利用空对象作为中介</font>**   
容易想到，我们使用一个空对象作为中介就可以避免上述问题的发生  
<font color="red">PS：只能继承公有属性</font>

		   var Empty=function(){};
           Empty.prototype=Animal.prototype;
           Cat.prototype=new Empty();
		　 Cat.prototype.constructor = Cat;//将Cat原型的构造函数重新指向Cat
 Empty是空对象，所以几乎不占内存。此时，再修改Cat的prototype对象，就不会影响到Animal的prototype对象。  

我们将上述方法进行封装：  
		
          function extend(Child, Parent) {
		　　　　var Empty = function(){};
		　　　　F.prototype = Parent.prototype;
		　　　　Child.prototype = new Empty();
		　　　　Child.prototype.constructor = Child;
		　　　　Child.uber = Parent.prototype;
               //为子对象设一个uber属性，为了实现继承的完备性，纯属备用性质。
		　　}
          //封装完毕，函数extend;这也是YUI库如何实现继承的方法
		  function Animal(){};
          Animal.prototype.species = "动物";//必须这样写，否则undefined
		    function Cat(name,color){
		　　　　this.name = name;
		　　　　this.color = color;
		    }
		    extend(Cat,Animal);
		　　var cat1 = new Cat("大毛","黄色");
		　　alert(cat1.species); // 动物
**<font size="3" color="blue" face="微软雅黑">5.  拷贝继承</font>**  
<font color="red">PS：只能继承公有属性</font>

			function Animal() {}
			Animal.prototype.species = "动物";
			function Cat(name, color) {
			this.name = name;
			this.color = color;
			}
			function extend(Child, Parent) {
			       var p = Parent.prototype;
			　　　　var c = Child.prototype;
			　　　　for (var i in p) {
			　　　　　　c[i] = p[i];
			　　　　　　}
			　　　　c.uber = p;
			}
			extend(Cat, Animal);
			var cat1 = new Cat("大毛", "黄色");
			alert(cat1.species); //动物
*************

**<font size="4" color="red" face="微软雅黑">四. Javascript面向对象:非构造函数的继承</font>**
>了解更多请点击[阮一峰的个人博客](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)    

第三部分讲解了构造函数的继承，但例如下面这种：
比如，现在有一个对象，叫做"中国人"。

            var Chinese = {
		　 　　　nation:'中国'
		　　 };

还有一个对象，叫做"医生"。

			var Doctor ={
			　　　career:'医生'
			　}
请问怎样才能让"医生"去继承"中国人"，即如何生成一个"中国医生"的对象？
这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。  


**<font size="3" color="blue" face="微软雅黑">1. object()方法</font>**   
object()函数把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。

			function object(father){
		     	var son=function(){}
		     	son.prototype=father;
		     	return new son();
		     }
使用的时候，第一步先在父对象的基础上，生成子对象，然后，再加上子对象本身的属性  

			 var chinese={
		      	nation:"中国"
		      }
		     var doctor=object(chinese);
              console.log(doctor)//fireFox下： Object { nation="中国"}
		      doctor.career="医生"；
              //必须采用属性添加的方式，不能通过 doctor={career:"医生"}，这相当于重新改写了对象，会覆盖原来内容
              console.log(doctor)//fireFox下：  Object { career="医生",  nation="中国"}

**<font size="3" color="blue" face="微软雅黑">2. 浅拷贝</font>**  

			function extendCopy(father) {
			　　　　var son = {};
			　　　　for (var i in father) { 
			　　　　　　son[i] = father[i];
			　　　　}
			　　　　son.uber = father;
			　　　　return son;
			　　}
			var Chinese={
				 nation:"中国"
			}
			   var Doctor = extendCopy(Chinese);
			　　Doctor.career = '医生';
			　　alert(Doctor.nation); // 中国
这样的拷贝存在问题，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，修改子对象的数据会有可能篡改父对象。

**<font size="3" color="blue" face="微软雅黑">3. 深拷贝</font>**  
所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了

		function deepCopy(father, son) {
		　　　　var son = son || {};
		　　　　for (var i in father) {
		　　　　　　if (typeof father[i] === 'object') {
		　　　　　　　　son[i] = (father[i].constructor === Array) ? [] : {};
		　　　　　　　　deepCopy(father[i], son[i]);
		　　　　　　} else {
		　　　　　　　　　son[i] = father[i];
		　　　　　　}
		　　　　}
		　　　　return son;
		　　}
         var Chinese={
				 nation:"中国"
			}
       Chinese.birthPlaces = ['北京','上海','香港'];
        　var Doctor = deepCopy(Chinese);
		 Chinese.birthPlaces = ['北京','上海','香港'];
		　　Doctor.birthPlaces.push('厦门');

		　　alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门, 此时父对象就不会受到影响了
		　　alert(Chinese.birthPlaces); //北京, 上海, 香港
*************