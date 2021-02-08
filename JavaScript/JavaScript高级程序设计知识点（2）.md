## JavaScript高级程序设计阅读笔记-中级部分

### 一. 面向对象  
### 1.1 对象的属性   

- Object.defineProperty()方法： ECMAScript 5方法，用于修改属性默认的特性
- Object.defineProperties()方法：可以通过描述符一次定义多个属性。  
- Object.getOwnPropertyDescriptor()方法：ECMAScript 5方法，可以取得给定属性的描述符。  

上述几个方法，一般场景用不到。  

### 1.2 创建对象    
字面量构建对象虽然方便，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。于是就有了工厂模式。

**A) 工厂模式**   

	function createPerson(name, age, job){
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function(){
			alert(this.name);
		};
		return o;
	}
	var person1 = createPerson("Nicholas", 29, "Software Engineer");
	var person2 = createPerson("Greg", 27, "Doctor");

函数 createPerson()能够根据接受的参数来构建一个包含所有必要信息的 Person 对象；可以无数次调用。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。于是又出现了构造函数模式。  

**B) 构造函数模式**   

	function Person(name, age, job){
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function(){
			alert(this.name);
		};
	}
	var person1 = new Person("Nicholas", 29, "Software Engineer");
	var person2 = new Person("Greg", 27, "Doctor");  

对比工厂模式有以下不同之处：  
  
- 没有显式地创建对象；
- 直接将属性和方法赋给了 this 对象；
- 没有 return 语句。

person1 和 person2 分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor（构造函数）属性，该属性指向 Person：  

	alert(person1.constructor == Person); //true
	alert(person2.constructor == Person); //true
这就解决了工厂模式对象识别的问题。  

1. 将构造函数与普通函数  
构造函数与其他函数的唯一区别，就在于调用它们的方式不同。构造函数也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过 new 操作符来调用，那它跟普通函数也不会有什么两样。  
2. 构造函数存在的问题  
在前面的例子中， person1 和 person2 都有一个名为 sayName()的方法，但那两个方法不是同一个 Function 的实例。因此每定义一个函数，也就是实例化了一个对象。不同实例上的同名函数是不相等的：  

		alert(person1.sayName == person2.sayName); //false
于是又出现了原型模式。

**C) 原型模式**   
利用原型链改写构造函数模式：

	function Person(){
	}
	Person.prototype.name = "Nicholas";
	Person.prototype.age = 29;
	Person.prototype.job = "Software Engineer";
	Person.prototype.sayName = function(){
		alert(this.name);
	};
	var person1 = new Person();
	var person2 = new Person();
	alert(person1.sayName == person2.sayName); //true   
这就解决了实例化对象不相等的问题。

#### 关于原型对象   

1. 只要创建了一个新函数，就会为该函数创建一个 prototype属性，这个属性指向函数的原型对象。同时，在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。
2. Firefox、 Safari 和 Chrome 在每个对象上都支持一个属性 `__proto__`；这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。 
3. isPrototypeOf()方法：可以测试了 person1 和 person2与原型之前的关系：  

		alert(Person.prototype.isPrototypeOf(person1)); //true
		alert(Person.prototype.isPrototypeOf(person2)); //true
4. Object.getPrototypeOf()：ECMA5,返回这个对象的原型:  

		alert(Object.getPrototypeOf(person1) == Person.prototype); //true 
		alert(Object.getPrototypeOf(person1).name); //"Nicholas"
5. 每当代码读取某个对象的某个属性时，都会执行一次搜索，首先从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象。  
6. 当为对象实例添加一个属性时（原型中已经存在），添加的属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。
7. 使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。
8. hasOwnProperty()方法：从Object 继承而来。可以检测一个属性是存在于实例中（返回true），还是存在于原型中(返回false):  

		person1.name = "Greg";		
		alert(person1.hasOwnProperty("name")); //false

#### 原型与 in 操作符

1. 有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时， in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中:  

     	person1.name = "Greg";		
		alert("name" in person1); //true 
2. 在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的（enumerated）属性,屏蔽了原型中不可枚举属性（即将
[[Enumerable]]标记为 false 的属性）的实例属性也会在 for-in 循环中返回，因为根据规定，所有开发人员定义的属性都是可枚举的(IE8之前版本除外) 
3. Object.keys()方法：ECMA5，接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组：  

		console.log(Object.keys(Person.prototype));
		//["name", "age", "job", "sayName"]
4. Object.getOwnPropertyNames()方法：ECMA5，接收一个对象作为参数，返回一个包含所有实例属性的字符串数组，无论它是否可枚举：

		console.log(Object.getOwnPropertyNames(Person.prototype));
		//["constructor", "name", "age", "job", "sayName"]
		//chrome下该方法与Object.keys()返回内容与一样,chrome认为constructor也是可枚举  

5. `Object.keys()`和 `Object.getOwnPropertyNames()`方法都可以用来替代 for-in 循环。支持这两个方法的浏览器有 IE9+、 Firefox 4+、 Safari 5+、 Opera12+和 Chrome。  

#### 原型模式的简化与引发的问题 

1. 可以通过如下方式简化原型模式来创建对象：  

		function Person(){
		}
		Person.prototype = {
			name : "Nicholas",
			age : 29,
			job: "Software Engineer",
			sayName : function () {
			alert(this.name);
			}
		};
将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。但会引发一个潜在问题：Person.prototype的constructor指向变了。因为每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。字面量方式重写了默认的 prototype 对象：  

		var friend = new Person();
		alert(friend instanceof Object); //true
		alert(friend instanceof Person); //true
		alert(friend.constructor == Person); //false
		alert(friend.constructor == Object); //true
2. 我们重新将constructor进行指回：  

		function Person(){
		}
		Person.prototype = {
			constructor : Person,
			//constructor属性会变为可枚举类型，而默认情况下，原生的constructor属性是不可枚举的
			name : "Nicholas",
			age : 29,
			job: "Software Engineer",
			sayName : function () {
			alert(this.name);
			}
		};  

#### 原型的动态性   
 
对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此，但是，如果我们通过字面量方式重写实例的原型：

        function Person(){
        }
        var person1=new Person();
        Person.prototype = {
          constructor : Person,
          name : "Nicholas",
          age : 29
        };  
        //Person.prototype.name="Nicholas";这种写法不会存在任何问题
        var person2=new Person(); 
        console.log(person1.name);//undefined
        console.log(person2.name);//Nicholas
**！！！重写原型对象会切断现有原型与任何之前已经存在的对象实例之间的联系。即：只要对原型进行了赋值操作`Person.prototype = xx`,实例对象与原有原型之前的联系都会被断开！！！**

#### 原型模式存在的问题  

对于包含引用类型值的属性来说，修改实例上的属性的同时，原型中的对应属性也会被修改。

	function Person(){
	}
	
	Person.prototype={
		constructor:Person,
		"name":"jack",
		"age":"13",
		"friends" : ["Shelby", "Court"]
	}
	var p1=new Person();
	p1.friends.push("leo");
	console.log(p1.friends);//["Shelby", "Court", "leo"]
	console.log(Person.prototype.friends);//["Shelby", "Court", "leo"]
这样，所有实例中的friends属性都会被修改；如果这不是我们预期的结果，那么就会引发问题。于是就有了下面的组合模式。  

**D) 组合使用构造函数和原型模式**   

结合构造函数和原型模式各自的长处，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性：  

	function Person(name, age, job){
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ["Shelby", "Court"];
	}
	
	Person.prototype = {
		constructor : Person,
		sayName : function(){
			alert(this.name);
		}
	}
	var person1 = new Person("Nicholas", 29, "Software Engineer");
	var person2 = new Person("Greg", 27, "Doctor");
	person1.friends.push("Van");
	alert(person1.friends); //"Shelby,Count,Van"
	alert(person2.friends); //"Shelby,Count"
	alert(person1.friends === person2.friends); //false
	alert(person1.sayName === person2.sayName); //true
这是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。

**E) 动态原型模式**   
动态原型模式把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），同时又保持了同时使用构造函数和原型的优点。  

	function Person(name, age, job){
		//属性
		this.name = name;
		this.age = age;
		this.job = job;
		//方法
		if (typeof this.sayName != "function"){
			Person.prototype.sayName = function(){
				alert(this.name);
			};
		}
	}

**F) 寄生构造函数模式**   
在前述的几种模式都不适用的情况下，可以使用寄生（parasitic）构造函数模式。  

	function Person(name, age, job){
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function(){
			alert(this.name);
		};
		return o;
	}
	var friend = new Person("Nicholas", 29, "Software Engineer");
	friend.sayName(); //"Nicholas"  
与工厂模式很类似，除了使用new来创建的，其他都一样；该模式会引发一些潜在问题（详见书籍），我们建议在可以使用其他模式的情况下，不要使用这种模式。 
 
**H) 稳妥构造函数模式**    
稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序改动时使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用 this；二是不使用 new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面的 Person 构造函数重写如下：  

	function Person(name, age, job){
		//创建要返回的对象
		var o = new Object();
		//可以在这里定义私有变量和函数
		//添加方法
		o.sayName = function(){
			alert(name);
		};
		//返回对象
		return o;
	}

### 1.3 继承   
ECMAScript 只支持实现继承，没有实现接口继承，而且其实现继承主要是依靠原型链来实现的。

#### 原型链  
  
通过原型链实现的简单继承。cat继承animal的所有属性和方法。

		function Animal(){
        　 this.species = "动物";
        }
        Animal.prototype.eat=function(){
        	console.log("吃肉！");
        }           
        function Cat(name,color){
    　　　　this.name = name;
    		this.color = color;
        }  
        Cat.prototype = new Animal();//Cat 继承 Animal
        var cat1 = new Cat("咪咪","黄色");
        console.log(cat1.species);  
        console.log(cat1.eat());
1. 构造函数、原型和实例的关系：

	- 每个构造函数都有一个原型对象（prototype）。
	- 原型对象都包含一个指向构造函数的指针（constructor）。
	- 实例都包含一个指向原型对象的内部指针（[[Prototype]]）。  
2. 所有函数的默认原型都是 Object 的实例。  
3. instanceof 操作符： 用来测试实例与原型链中出现过的构造函数，存在则返回true:  

		console.log(cat1 instanceof Object); //true
		console.log(cat1 instanceof Cat); //true
		console.log(cat1 instanceof Animal); //true

4. isPrototypeOf()方法: 只要是原型链中出现过的原型，都可以说是该
原型链所派生的实例的原型: 

		console.log(Object.prototype.isPrototypeOf(cat1)); //true
		console.log(Cat.prototype.isPrototypeOf(cat1)); //true
		console.log(Animal.prototype.isPrototypeOf(cat1)); //true

5. 添加/重写方法要注意顺序：  
给原型添加方法的代码一定要放在替换原型的语句之后，因为原型被一旦被重新赋值，就会断开与之前原型（还有实例）的所有关系：  

			function Animal(){
		    　 this.species = "动物";
		    }
		    Animal.prototype.eat=function(){
		    	console.log("吃肉！");
		    }           
		    function Cat(name,color){
		　　　   this.name = name;
				 this.color = color;
		    } 

			Cat.prototype = new Animal();//在此语句执行后再为原型添加方法
			
			Cat.prototype.drink=function(){ //添加方法
				console.log("喝牛奶！")
			}
			Cat.prototype.eat=function(){ //重写方法
				console.log("吃鱼！")
			}
			
			var cat1 = new Cat("咪咪","黄色");
			//此语句要放在Cat.prototype = new Animal()后面
			//因为给Cat.prototype赋值后会断开与之前实例的关系
			cat1.drink();
			cat1.eat();  
同样在`Cat.prototype = new Animal()` 执行后，不能再通过字面量方式为原型增加方法和属性，那样会再次重写原型。  
6. 原型链引发的问题：  
同创建对象一样，对于引用类型值的修改，会通过原型链反映到所继承类型上（子类修改影响父类），而且与创建对象时的构造函数模式不同的是：不管是位于父类构造函数内还有父类原型上的引用属性，只要子类被修改，父类就会被修改。

		function Animal(){
			this.species = "mammals";
			this.color = ["white","grey"];
		}
		Animal.prototype.morecolor = ["yellow","blue","pink"];            
		function Cat(name){
		    this.name = name;
		} 
		Cat.prototype=new Animal();
		var cat1 = new Cat("Tom"); 
		var cat2 = new Cat("Jack");
		
		cat1.color.push("black");//修改引用类型
		cat1.morecolor.push("tabby");
		
		console.log(cat1.color,cat1.morecolor); //["white", "grey", "black"] ["yellow", "blue", "pink", "tabby"]
		console.log(cat2.color,cat2.morecolor); //["white", "grey", "black"] ["yellow", "blue", "pink", "tabby"]

可以看到修改实例`cat1`的`color`和`morecolor`属性会直接影响实例`cat2`的`color`和`morecolor`属性（重写则不存在这个问题）。这是因为继承情况下，重写子类的实例改写的是父类构造函数同一处引用。而创建实例的时候，每次创建出来的构造函数都是一个副本。所以，实践中很少会单独使用原型链来实现继承。

#### 借用构造函数继承

这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数；  

      function Animal(){
        this.species = "mammals";
        this.color = ["white","grey"];        
      }            
      function Cat(name){
        Animal.apply(this);
        this.name = name;
      } 
      Cat.prototype=new Animal();
      var cat1 = new Cat("Tom");
      var cat2 = new Cat("Jack");
      cat1.color.push("tobby");
      console.log(cat1.color); //["white", "grey", "tobby"]
      console.log(cat2.color); //["white", "grey"]  
可以看到通过使用 apply()和 call()方法也可以在（将来）新创建的对象上执行构造函数，这样每个实例就都会具有自己的 `color` 属性的副本。同时，我们还以通过子类的构造函数向父类传递构造函数。  

      function Animal(species){
        this.species = species;
        this.color = ["white","grey"];        
      }            
      function Cat(name){
        Animal.call(this,"mammals");
        this.name = name;
      } 
      Cat.prototype=new Animal();
      var cat1 = new Cat("Tom");
      console.log(cat1.species);//mammals

但其仍存在问题：所有的属性和方法都在父类构造函数中定义，因此函数复用就无从谈起了。并且在父类的原型中定义的方法，对子类型而言也是不可见的。考虑到这些问题，借用构造函数的技术也是很少单独使用的。

#### 组合继承  

组合继承，有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块。从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。即：将公共的方法和属性放在原型链上，其他的属性和方法都放在构造函数中：  

		function Animal(){
        　 this.species = "mammals";
           this.color = ["white","grey"];        
        }
        Animal.prototype.sayHi = function(){
          console.log("Hi!")
		}           
        function Cat(name){
        	Animal.apply(this);//第二次调用 父类Animal()
    　　　　this.name = name;
        } 
        Cat.prototype=new Animal();//第一次调用 父类Animal()
        Cat.prototype.constructor=Cat;//将构造函数指回来
		
        var cat1 = new Cat("Tom");
        var cat2 = new Cat("Jack");

        cat1.color.push("black");
        
		console.log(cat1.color);//["white", "grey", "black"]
        console.log(cat2.color);//["white", "grey"]
        cat1.sayHi();//Hi!
        console.log(cat1 instanceof Cat);//true
        console.log(cat1 instanceof Animal);//true
        console.log(Cat.prototype.isPrototypeOf(cat1));//true
        console.log(Animal.prototype.isPrototypeOf(cat1));//true

#### 原型式继承

比如，现在有一个对象，叫做"中国人"：

        var Chinese = {
    　 　　　nation:'中国'
    　　 };
还有一个对象，叫做"医生"：

        var Doctor ={
        　　　career:'医生'
        　}
请问怎样才能让"医生"去继承"中国人"，这两个对象都是普通对象，不是构造函数，所以我们无法使用构造函数方法实现"继承"。这时候我们可以通过object()方法实现一个非构造函数的继承：  

    	function object(father){
            var son=function(){}
            son.prototype=father;
            return new son();
         }
现在利用object函数实现person对象的继承：  

	var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var person1 = object(person);
    person1.name = "Greg";
    person1.friends.push("Rob");
    var person2 = object(person);
    person2.name = "Linda";
    person2.friends.push("Barbie");
    console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"
ECMAScript 5 通过新增方法： `Object.create(参数1，参数2可选)`，规范化了原型式继承，用法和object基本一致。

	var person3 = Object.create(person, {
        name: {
            value: "Greg"
        }
    });
    console.log(person3.name);//Greg
    console.log(person3.friends);//"Shelby,Court,Van,Rob,Barbie"  
该模式中引用类型值的属性始终会被共享。

#### 寄生式继承 
 
寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

	function createAnother(original){
        var clone = object(original); //通过调用函数创建一个新对象
        clone.sayHi = function(){ //以某种方式来增强这个对象
            console.log("hi");
        };
        return clone; //返回这个对象
    }
	var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var person4=createAnother(person);
    console.log(person4.friends);//"Shelby", "Court", "Van"
    person4.sayHi();//"hi"
object()函数不是必需的；任何能够返回新对象的函数都适用于此模式。

#### 寄生组合式继承

组合模式继承是最常用的模式，但在使用过程中会调用两次父类构造函数（参见组合模式继承部分）。我们可以通过如下函数，省略第一次的父类构造函数调用：
	
		function inheritPrototype(son, father){
			var prototype = object(father.prototype); //创建对象
			prototype.constructor = son; //增强对象
			son.prototype = prototype; //指定对象
		}
第一步是创建父类原型的一个副本。第二步是为创建的副本添加 `constructor` 属性，从而弥补因重写原型而失去的默认的 `constructor` 属性。最后一步，将新创建的对象（即副本）赋值给子类型的原型。  

我们重写一下组合模式继承：
		
    	function Animal(){
        　 this.species = "mammals";
           this.color = ["white","grey"];        
        }
        Animal.prototype.sayHi=function(){
            console.log("Hi!");
        }          
        function Cat(name){
        	Animal.apply(this);
    　　　　this.name = name;
        } 
        inheritPrototype(Cat, Animal);//通过寄生函数来为父类创建出一个子类（唯一区别）
		
        var cat1 = new Cat("Tom");
        var cat2 = new Cat("Jack");

        cat1.color.push("black");
        console.log(cat1.color);//["white", "grey", "black"]
        console.log(cat2.color);//["white", "grey"]
        cat1.sayHi();//"Hi!"
这样就只调用了一次父类构造函数，效率会比较高。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。  

### 1.4 多态

同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。重载也是多态的一种，但是
js中没有重载的概念，可以通过使用arguments对象的使用，完成类似重载的功能。而其他根据不同类型完成不同的功能有待进一步探索


### 二. 函数表达式  
### 2.1 递归   
递归函数是在一个函数通过名字调用自身的情况下构成的，如下所示。  

		function factorial(num){
			if (num <= 1){
				return 1;
			} else {
				return num * factorial(num-1);
			}
		}
通常会将返回值改为`num * arguments.callee(num-1)`，但严格模式下会报错，所以我们也可以这样改写,在严格模式和非严格模式下都可以运行：  

	var factorial = (function f(num){
		if (num <= 1){
			return 1;
		} else {
			return num * f(num-1);
		}
	});  


### 三. DOM  
DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口），描述了处理网页内容的方法和接口。DOM本身是与语言无关的API。
   
### 3.1 节点   

**A) Node类型**  

1. JavaScript 中的所有节点类型都继承自Node 类型，因此所有节点类型都共享着相同的基本属性和方法。DOM中最基本的节点类型就是Node。
2. nodeType 属性:  
每个节点都有一个nodeType 属性，用于表明节点的类型，共有12种，其值由12个数值常量来表示（1,2,3...,12）
3. nodeName 属性：对于元素节点, nodeName 中保存的始终都是元素的标签名； 
4. nodeValue 属性： 对于元素节点, nodeType 的值始终为空； 

		var ohed=document.getElementById("head");
		console.log(ohed.nodeType)//1
		console.log(ohed.nodeName)//DIV
		console.log(ohed.nodeValue)//Null

5. childNodes 属性 : 表明节点元素中的所有兄弟节点（会把回车也算进去），每个节点均有，其中保存着一个NodeList 对象和length属性；childNodes 列表中的每个节点相互之间都是同胞节点。通过使用列表中每个节点的previousSibling和nextSibling 属性，可以访问同一列表中的其他节点。我们可以通过方括号或者item()来访问保存在 NodeList 中的节点：

		var firstChild = someNode.childNodes[0];
		var secondChild = someNode.childNodes.item(1);
		var count = someNode.childNodes.length;
6. parentNode 属性 ： 指向文档树中的父节点。

		var oul=document.getElementById('ul1');//一个包含4个li的ul标签
		console.log(oul.childNodes.length);
		console.log(oul.childNodes[2].previousSibling.innerHTML);//2222
		
		var oli=document.getElementById("li1");
		console.log(oli.parentNode.nodeName);//ul
		
		console.log(oli.parentNode.firstChild);//<li>1111</li>
7. firstChild和lastChild属性：父节点的第一个子节点和最后一个子节点，每个节点均有该属性。并且：  

		someNode.firstChild === someNode.childNodes[0]; 
       	someNode.lastChild === someNode.childNodes.[someNode.childNodes.length-1]。

8. ownerDocument属性：直接访问文档节点
9. hasChildNodes()方法： 这个方法在节点包含一或多个子节点的情况下返回true；这是比查询childNodes列表的length 属性更简单的方法。

		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.childNodes.length);//4,前提是html中不含回车符号，否者回车也算节点
		console.log(aLi[0].parentNode);//返回整个ul的dom结构
		console.log(aLi[0].parentNode.firstChild);//<li>1111</li>
		console.log(oUl.childNodes[2].previousSibling);//<li>2222</li>
		console.log(oUl.childNodes[2].ownerDocument);//整个document结构
		console.log(oUl.hasChildNodes());//true

10. appendChild()方法：向末尾添加节点；向childNodes列表的末尾添加（多数情况为移动）一个节点；  

		var oUl=document.getElementById('ul1');
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.appendChild(aLi[0]));//<li>1111</li>
        //因为任何DOM节点也不能同时出现在文档中的多个位置上。所以运行结果是1111节点移动到末尾

11. insertBefore()方法：向特定位置添加节点；向childNodes列表的任意位置添加（多数情况为移动）一个节点；接受两个参数：（要插入的节点，要替换的节点）。

		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.insertBefore(aLi[2],aLi[0]));//<li>3333</li>
        //aLi[2]节点替换在了aLi[0]的位置，aLi[0]并不会被移出,只发生顺延。
上述两个方法只是移动节点，并不会删除节点，下面介绍两个删除节点的方法：
12. replaceChild()方法： 将某个节点替换到特定位置；接受两个参数：（要插入的节点，要替换的节点）。与insertBefore()相同，只是被替换的节点将被移出文档树； 
  
		var oUl=document.getElementById('ul1');//一个包含4个li的ul标签
		var aLi=document.getElementsByTagName("li");
		console.log(oUl.replaceChild(aLi[2],aLi[0]));//<li>1111</li>
        //aLi[2]节点替换aLi[2]节点替换在了aLi[0]的位置，aLi[0]被移出；
13. removeChild()方法：删除某个节点；

14. cloneNode()方法：节点克隆；克隆一个现有节点，需要开发者进一步操作才会被添加到文档中；接受一个布尔参数，true:表示深复制（复制节点和节点树）；false:表示浅复制（只复制节点）

15. normalize()方法：所有文本节点合并成一个节点；参见文本类型；

**B) Document类型**    
在浏览器中，document对象就表示整个HTML页面，因为document对象是window对象的一个属性，所以可以把他当做全局对象来访问。 
 
1. 两个内置属性：下面两个属性所有浏览器均支持；   
**document.documentElement**：指向文档的<html\>元素；也可以通过document.childNodes来访问，但存在一定兼容性，有些浏览器会将文档声明也放在document.childNodes中。      
**document.body**：指向<body\>元素；

2. doctype属性：获取文档声明，各个浏览器下有差别  
 
		IE8 及之前版本：如果存在文档类型声明，会将其错误地解释为一个注释并把它当作Comment节点；而document.doctype 的值始终为null。
		IE9+及Firefox：如果存在文档类型声明，则将其作为文档的第一个子节点；document.doctype是一个DocumentType 节点，也可以通过document.firstChild 或document.childNodes[0]访问同一个节点。
		Safari、Chrome 和Opera：如果存在文档类型声明，则将其解析，但不作为文档的子节点。document.doctype 是一个DocumentType 节点，但该节点不会出现在document.childNodes 中（实测会出现在document.childNodes[0]中）。 
3. document.title属性：获取文档的title标题。  

4. document.domain属性：获取页面的域名；可用于解决跨域；

5. document.URL属性：获取当前页面url；

6. document.reffer属性：获取链接到当前页面的那个页面的URL，有时候会为空字符串；

7. 查找元素的方法：  

		getElementById()；
		
		getElementByTagName()；
		
		getElementsByName()：返回带有给定name 特性的所有元素。  
 
8. 特殊的集合属性：  

		document.anchors，包含文档中所有带name 特性的<a>元素；
		document.applets，包含文档中所有的<applet>元素，因为不再推荐使用<applet>元素，所以这个集合已经不建议使用了；
		document.forms，包含文档中所有的<form>元素，与document.getElementsByTagName("form")得到的结果相同；
		document.images，包含文档中所有的<img>元素，与document.getElementsByTagName("img")得到的结果相同；
		document.links，包含文档中所有带href 特性的<a>元素

9. DOM一致性检测方法  
document.implementation 属性提供了相应信息和功能，用于检测浏览器实现了DOM的哪些部分。通过该对象下的hasFeature()方法，其接受两个参数：（要检测的DOM功能的名称，版本号）  

		var hasXmlDom = document.implementation.hasFeature("XML", "1.0");//返回true或false;
但是容易被浏览器厂商改写，结果不一定准备。

10. 文档写入功能：将输出流写入到网页中的四个方法。 

		write()：原样写入
		writeln():在字符串的末尾添加一个换行符（\n）
		open()：打开网页的输出流
		close()：关闭网页的输出流
一个小例子：  

		var new_doc = document.open("text/html","replace");
	    var txt = "<html><body>这是新的文档</body></html>";
	    new_doc.write(txt);
	    new_doc.close();  
对于那些按照application/xml+xhtml内容类型提供的页面(譬如：百度)，这四个方法都无效。  

**C) Element类型**   
除了Document 类型之外，Element 类型就要算是Web 编程中最常用的类型了。  

##### 补充：关于节点和元素:  

	根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：  
	整个文档是一个文档节点  
	每个 HTML 元素是元素节点  
	HTML 元素内的文本是文本节点  
	每个 HTML 属性是属性节点  
	注释是注释节点  
  

1. 元素的标签名，可以使用nodeName 属性，也可以使用tagName 属性；  

		var div = document.getElementById("myDiv");
		alert(div.tagName); //"DIV"。在HTML 中，标签名始终都以全部大写表示。
		alert(div.tagName == div.nodeName); //true
2. HTML元素的常用属性：  

		id，元素在文档中的唯一标识符。
	    title，有关元素的附加说明信息，一般通过工具提示条显示出来。
	    lang，元素内容的语言代码，很少使用。
		dir，语言的方向，值为"ltr"（left-to-right，从左至右）或"rtl"（right-to-left，从右至左），也很少使用。
		className，即为元素指定的CSS类。没有将这个属性命名为class，是因为class 是ECMAScript 的保留字
3. 获取HTML元素属性的方法：getAttribute()；

		<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
		
		var div = document.getElementById("myDiv");

		console.log(div.id); //"myDiv""
		console.log(div.className); //"bd"，通过属性className访问；
		
		console.log(div.getAttribute("id")); //"myDiv"
		console.log(div.getAttribute("class")); //"bd",注意这与直接通过对象属性访问不同。
属性的名称是不区分大小写的，也可以通过getAttribute()获得自定义属性（直接通过 `对象.自定义属性` 的方式有些浏览器获取不到）。同时，根据HTML5 规范，自定义特性应该加上data-前缀以便验证。

	还有两中特殊的html属性获取：

		style属性： 通过getAttribute()访问，返回的style特性值中包含的是CSS文本，而通过属性来访问它则会返回一个对象。
		
		onclick等事件处理程序属性： 通过getAttribute()访问，则会返回相应代码的字符串。而在访问onclick 属性时，则会返回一个Js 函数（若无，则返回null）  
由于存在这些差别，在通过Jst 以编程方式操作DOM 时，开发人员经常不使用getAttribute()，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用getAttribute()方法。
4. 设置HTML元素属性的方法：setAttribute()；接受两个参数：（要设置的特性名，特性值）；如果该特性名已存在，则覆盖，否则，添加； 通过这个方法设置的特性名会被统一转换为小写形式。  
也可以通过属性复制的方式设置：  

		div.id = "someOtherId";
		div.mycolor = "red";
		console.log(div.getAttribute("id")); //someOtherId
		console.log(div.getAttribute("mycolor")); //null（IE 除外）
可以看到通过属性复制的方法，对于自定义属性我们无法通过getAttribute()获得，但固有属性却可以；
5. 删除HTML元素属性的方法：removeAttribute()； 

6. HTML元素的attributes 属性：Element 类型是使用attributes 属性的唯一一个DOM 节点类型。  
attributes 属性中包含一系列节点，每个节点对象有两个属性：nodeName（属性名），和nodeValue（属性值）。要取得元素的id 特性，可以使用以下代码：

		var id = element.attributes.getNamedItem("id").nodeValue;//方式1
		var id = element.attributes["id"].nodeValue;//方式2
attributes 属性中的每一个对象还有如下方法（存在兼容性）：

		getNamedItem(name)：返回nodeName 属性等于name 的节点；
		removeNamedItem(name)：从列表中移除nodeName 属性等于name 的节点；
		setNamedItem(node)：向列表中添加节点，以节点的nodeName 属性为索引；
		item(pos)：返回位于数字pos 位置处的节点。
7. 创建HTML元素   
createElement()方法可以创建新元素。只接受一个参数：即要创建元
素的标签名（不区分大小写）。

		var div = document.createElement("div");
		div.id = "myNewDiv";
		div.className = "box";
		//在添加到Dom树之前可以添加各种属性，浏览器不会渲染
		document.body.appendChild(div);
IE7以前版本还支持如下写法（现代浏览器均不支持）：  

		var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >");       
8. 元素子节点解析差异：  
上面例子提到过元素的childNodes 属性在有些浏览器下会解析回车和空白（解析为文本节点），因此遍历元素的childNodes 属性前，通常都要先检查一下nodeTpye 属性，如下所示：  

		var oUl=document.getElementById('ul1');
   		for (var i=0, len=oUl.childNodes.length; i < len; i++){
			if (oUl.childNodes[i].nodeType == 1){ //空白和回车noteType=3
				//执行某些操作
			} 
		}



**D) Text类型**   
文本节点由Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的
HTML 字符，但不能包含HTML 代码。正常情况下每个元素只有一个文本子节点。

1. 创建文本节点：document.createTextNode()  
该方法接受一个参数——要插入节点中的文本。

		var textNode = document.createTextNode("<strong>Hello</strong> world!");
会被转义，按照字符输出，标签不会被html解析；  

2. 规范文本节点：normalize()方法（见node类型）   
将所有文本节点合并成一个节点，结果节点的nodeValue 等于将合并前每个文本节点的nodeValue 值拼接起来的值。   
3. 分割文本节点：：splitText()。将一个文本节点分成两个文本节点，与normalize()方法相反。  

 
**E) Comment类型**  
注释在DOM中是通过Comment类型来表示的。

**F) CDATAAection类型**   
CDATASection 类型只针对基于XML 的文档，表示的是CDATA 区域。  

**G) DocumentType类型**   
文档声明类型

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
**H) DocumentFragment类型**   
DocumentFragment 在文档中没有对应的标记。通常把它作为一个“仓库”来使用，可以在里面保存将
来可能会添加到文档中的节点。可以使用document.createDocumentFragment()方法创建：

	var fragment = document.createDocumentFragment();

**I) Attr类型**   
元素的特性在DOM 中以Attr 类型来表示。特性就是存在于元素的attributes 属性中的节点。
 
### 3.2 DOM操作  

1. 动态添加js的两种方式：  

		//方法1： 
		function loadScript(url){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			document.body.appendChild(script);
		}
		//方法1调用
		loadScript("client.js");
		
		//方法2
		function loadScriptString(code){
			var script = document.createElement("script");
			script.type = "text/javascript";
			try {
				script.appendChild(document.createTextNode(code));
			} catch (ex){
				script.text = code;
			}
			document.body.appendChild(script);
		}
		//方法2调用
		loadScriptString("function sayHi(){alert('hi');}");

2. 动态添加css的两种方式

		//方式1 
		function loadStyles(url){
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = url;
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(link);
		}
		//调用方式1
		loadStyles("styles.css");
		
		//方式2
		function loadStyleString(css){
			var style = document.createElement("style");
			style.type = "text/css";
			try{
				style.appendChild(document.createTextNode(css));
			} catch (ex){
				style.styleSheet.cssText = css;
			}
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(style);
		}
		//调用方式2
		loadStyleString("body{background-color:red}");
3. 使用NodeList  
NodeList 对象都是“动态的”，这就意味着每次访问NodeList 对象，都会运行一次查询。有鉴于此，最好的办法就是尽量减少DOM操作。同时可以考虑将从NodeList 中取得的值缓存起来。


### 3.3 DOM扩展之新增选择符    
Selectors API（www.w3.org/TR/selectors-api/）是由 W3C 发起制定的一个标准，致力于让浏览器原生支持 CSS 查询。目前已完全支持 Selectors API Level 1
的浏览器有 IE 8+、 Firefox 3.5+、 Safari 3.1+、 Chrome 和 Opera 10+。  
**A) querySelector()方法**：选择某个元素 

	//取得 body 元素
	var body = document.querySelector("body");
	//取得 ID 为"myDiv"的元素
	var myDiv = document.querySelector("#myDiv");
	//取得类为"selected"的第一个元素
	var selected = document.querySelector(".selected");
	//取得类为"button"的第一个图像元素
	var img = document.body.querySelector("img.button");
**B) querySelectorAll()方法**：选择一组元素   

	//取得某<div>中的所有<em>元素（类似于 getElementsByTagName("em")）
	var ems = document.getElementById("myDiv").querySelectorAll("em");
	//取得类为"selected"的所有元素
	var selecteds = document.querySelectorAll(".selected");
	//取得所有<p>元素中的所有<strong>元素
	var strongs = document.querySelectorAll("p strong");


**C）matchesSelector()方法**  
Level 2 规范为 Element 类型新增的一个方法，目前支持的浏览器不是很多，参见 [Can I Use:matchesSelector](http://caniuse.com/#search=matchesSelector)。

接收一个参数，即 CSS 选择符，如果调用元素与该选择符匹配，返回 true；否则，返回 false。

	if (document.body.matchesSelector("body.page1")){
	//true
	}
### 3.4 DOM扩展之元素遍历     
对于元素间的空格， IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这就导致了在使用 childNodes 和 firstChild 等属性时的行为不一致。Element Traversal 规范（www.w3.org/TR/ElementTraversal/）新定义了一组属性。 

Element Traversal API 为 DOM 元素添加了以下 5 个属性。  

		childElementCount：返回子元素（不包括文本节点和注释）的个数。
		firstElementChild：指向第一个子元素； firstChild 的元素版。
		lastElementChild：指向最后一个子元素； lastChild 的元素版。
		previousElementSibling：指向前一个同辈元素； previousSibling 的元素版。
		nextElementSibling：指向后一个同辈元素； nextSibling 的元素版。
通过新增的 DOM 属性，可以不必担心空白文本节点，从而可以更方便的查找元素了。  
支持 Element Traversal 规范的浏览器有 IE 9+、 Firefox 3.5+、 Safari 4+、 Chrome 和 Opera 10+。

### 3.5 DOM扩展之H5规范新增   
**A) getElementsByClassName()方法**：返回一组特定class的元素；支持的浏览器有 IE 9+、 Firefox 3+、 Safari 3.1+、 Chrome 和Opera 9.5+。 

**B) classList 属性**   

1. className 中是一个字符串，如果只修改字符串一部分，也必须设置整个字符串的值，譬如：  

		<div class="bd user disabled">...</div>
div元素一共有三个类名。要从中删除一个类名，需要将三个类名拆开，删除，然后再拼接。classList 属性可以很好的解决这个问题。 
2. 可以通过 length 属性获取classList的长度，获取得每个元素可以使用 item()方
法，或方括号语法。  
3. classList获取到的对象拥有的方法：

		add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
		contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。
		remove(value)：从列表中删除给定的字符串。
		toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。
4. 支持 classList 属性的浏览器有 Firefox 3.6+和 Chrome  


**C) 焦点管理**   

1. document.activeElement 属性：该属性始终会引用 DOM 中当前获得了焦点的元素。

2. 元素获得焦点的方式有：页面加载、用户输入（通常是通过按 Tab 键）和在代码中调用 focus()方法。  

3. document.hasFocus()方法：用于检测文档是否获得了焦点。

		var button = document.getElementById("myButton");
		button.focus();
		alert(document.activeElement === button); //true
		alert(document.hasFocus(); //true  
4. 实现了这两个属性的浏览器的包括 IE 4+、 Firefox 3+、 Safari 4+、 Chrome 和 Opera 8+。  


**D) HTMLDocument的变化** 

1. readyState 属性 :
Document 的 readyState 属性有两个可能的值：

		loading，正在加载文档；
		complete，已经加载完文档 
指示文档是否已经加载完成：  

		if (document.readyState == "complete"){
		//执行操作
		}
支持 readyState 属性的浏览器有 IE4+、 Firefox 3.6+、 Safari、 Chrome 和 Opera 9+。  

2. compatMode属性: 检测渲染页面的模式是标准的还是混杂的。在标准模式下， document.compatMode 的值等于"CSS1Compat"，而在混杂模式下， document.compatMode 的值等于"BackCompat"。支持浏览器：IE6+, Firefox、 Safari 3.1+、 Opera 和 Chrome。 


3. head属性：作为document.body 引用文档的<body>元素的补充，H5新增了 document.head 属性，用来引用文档的<head>元素。  
支持的浏览器仅有 Chrome 和 Safari 5，下面为兼容写法：  

		var head = document.head || document.getElementsByTagName("head")[0];

**E) 字符集属性**：   

1. charset 属性:表示文档中实际使用的字符集,默认情况下，这个属性的值为"UTF-16"，但可以通过<meta>元素、响应头部或直接设置 charset 属性修改这个值（支持浏览器有IE、 Firefox、 Safari、 Opera 和 Chrome）：

		alert(document.charset); //"UTF-16"
		document.charset = "UTF-8";
2. defaultCharset属性:根据默认浏览器及操作系统的设置，当前文档默认的字符集应该是什么。如果文档没有使用默认的字符集，那 charset 和 defaultCharset 属性的值可能会不一样。支持浏览器：IE、 Safari 和 Chrome。

**F) 自定义数据属性**  
HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-。添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值：

		<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
		
		var div = document.getElementById("myDiv");
		//取得自定义属性的值
		var appId = div.dataset.appId;
		var myName = div.dataset.myname;
		//设置值
		div.dataset.appId = 23456;
		div.dataset.myname = "Michael";
目前主流浏览器均支持；

**F) 插入标记**   

1. innerHTML 属性：读取/写入HTML节点。所有浏览器返回的 innerHTML 值并不完全相同。  

	兼容性：在大多数浏览器中，通过 innerHTML 插入<script\>元素并不会执行其中的脚本。但大多数浏览器（除了IE8及其以下版本）都支持以直观的方式通过 innerHTML 插入<style\>元素。  

	并不是所有元素都支持 innerHTML 属性。不支持的元素有： <col\>、 <colgroup\>、<frameset\>、 <head\>、 <html\>、 <style\>、 <table\>、 <tbody\>、 <thead\>、 <tfoot\>和<tr\>。  

	IE8下有一个window.toStaticHTML()方法，用于处理HTML字符串，将其处理为"无害"版本，再放入DOM树中。 

2. outerHTML 属性：读模式下，返回调用它的元素及所有子节点的HTM标签（包含其自身，注意与innerHTML区别开）；写模式下，根据指定的HTML字符串创建新的DOM子树（会将调用元素自身也覆盖掉，注意与innerHTML区别开）。   
支持 的浏览器有：IE4+、 Safari 4+、 Chrome 和 Opera 8+。 Firefox 7+ 

3. insertAdjacentHTML()方法：    
它接收两个参数：(插入位置, 要插入的HTML文本):

		第一个参数必须是下列值之一：(小写)	
		"beforebegin"，在当前元素之前插入一个紧邻的同辈元素；
		"afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
		"beforeend"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；
		"afterend"，在当前元素之后插入一个紧邻的同辈元素。
		
		第二个参数是一个 HTML 字符串（与 innerHTML 和 outerHTML的值相同）
支持浏览器有 IE、 Firefox 8+、 Safari、 Opera 和 Chrome。

使用上述方法时候注意性能问题。  

**G) scrollIntoView()方法** : 支持性较差。忽略；  

### 3.6 DOM扩展之专有扩展   
**A) 文档模式** ：  
IE8 引入了一个新的概念叫“文档模式”（document mode）。
要强制浏览器以某种模式渲染页面，可以使用HTTP 头部信息X-UA-Compatible，或通过等价的
<meta>标签来设置：

	<meta http-equiv="X-UA-Compatible" content="IE=IEVersion">
IE 的版本（IEVersion）有以下一些不同的值：  

	Edge：始终以最新的文档模式来渲染页面。忽略文档类型声明。对于IE8，始终保持以IE8 标准模式渲染页面。对于IE9，则以IE9 标准模式渲染页面。
	EmulateIE9：如果有文档类型声明，则以IE9 标准模式渲染页面，否则将文档模式设置为IE5。
	EmulateIE8：如果有文档类型声明，则以IE8 标准模式渲染页面，否则将文档模式设置为IE5。
	EmulateIE7：如果有文档类型声明，则以IE7 标准模式渲染页面，否则将文档模式设置为IE5。
	9：强制以IE9 标准模式渲染页面，忽略文档类型声明。
	8：强制以IE8 标准模式渲染页面，忽略文档类型声明。
	7：强制以IE7 标准模式渲染页面，忽略文档类型声明。
	5：强制将文档模式设置为IE5，忽略文档类型声明。
**B)children属性**   
由于IE9 之前的版本与其他浏览器在处理文本节点中的空白符时有差异。在元素只包含元素子节点时，children 属性与childNodes 没有什么区别。

**E）contains()方法**  
该方法接收一个参数，即要检测的后代节点。调用contains()方法的应该是祖先节点，方法返回true表示后代节点是父节点的子节点；否则，返回false；

	alert(document.documentElement.contains(document.body)); //true
支持contains()方法的浏览器有IE、Firefox 9+、Safari、Opera 和Chrome。  

DOM Level 3 的 `compareDocumentPosition()`也能够确定节点间的关系；  

**F）插入文本**   
 
1. innerText  
innerText属性会过滤掉子节点中所有的HTML标签，只会生成一个子文本节点。  
支持浏览器包括IE4+、Safari 3+、Opera 8+和Chrome。Firefox 虽然不支持innerText，但支持作用类似的textContent 属性。

2. outerText  
除了作用范围扩大到了包含调用它的节点之外，与innerText 基本上没有多大区别。

### 四. DOM2和DOM3  
DOM1 级主要定义的是 HTML 和 XML 文档的底层结构。 DOM2 和 DOM3 级则在这个结构
的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。  

DOM2 和 DOM3级分为许多模块（模块之间具有某种关联），分别描述了 DOM 的某个非常具体的子集。这些模块如下。

- DOM2 级核心（DOM Level 2 Core）：在 1 级核心基础上构建，为节点添加了更多方法和属性。
- DOM2 级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图。
- DOM2 级事件（DOM Level 2 Events）：说明了如何使用事件与 DOM 文档交互。
- DOM2 级样式（DOM Level 2 Style）：定义了如何以编程方式来访问和改变 CSS 样式信息。
- DOM2 级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历 DOM 文档和选择其特定部分的新接口。
- DOM2 级 HTML（DOM Level 2 HTML）：在 1 级 HTML 基础上构建，添加了更多属性、方法和新接口。    

### 4.1 DOM 变化   
**A)** 有了 XML 命名空间，不同 XML 文档的元素就可以混合在一起，共同构成格式良好的文档，而不必担心发生命名冲突。HTML 不支持 XML 命名空间，但 XHTML 支持 XML 命名空间。

**B)** DOM2中增加了许多针对命名空间的属性和方法，用途不大，此处不再详细介绍；  

**C)** 其他方面的变化（框架变化）  
其他变化这里不再介绍，重点讲一下框架的变化：   
DOM1级中，框架和内嵌框架分别用 HTMLFrameElement 和 HTMLIFrameElement 表示，它们在 DOM2 级中都有了一个新属性，名叫 contentDocument。这个属性包含一个指针，指向表示框架内容的文档对象：  

	var iframe = document.getElementById("myIframe");
	var iframeDoc = iframe.contentDocument; //在 IE8 以前的版本中无效

对于IE8以前的版本虽然不支持 contentDocument 属性，但支持一个名叫 contentWindow 的属性，该属性返回框架的 window 对象，该 window 对象又有一个 document 属性。可以做如下兼容：  

	var iframe = document.getElementById("myIframe");
	var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

### 4.2 样式   

**A) 访问元素样式**   
任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性，该属性包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。  

对于使用短划线（分隔不同的词汇，例如 background-image）的 CSS 属性名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。  

		CSS属性 					JavaScript属性
		background-image 		style.backgroundImage
		color 					style.color
		display 				style.display
		font-family 			style.fontFamily
        float(特殊)             style.cssFloat/style.styleFloat(IE)

1. DOM 样式属性和方法  

		cssText：如前所述，通过它能够访问到 style 特性中的 CSS 代码。
		length：应用给元素的 CSS 属性的数量。
		parentRule：表示 CSS 信息的 CSSRule 对象。后面将讨论 CSSRule 类型。
		getPropertyCSSValue(propertyName)：返回包含给定属性值的 CSSValue 对象。该对象有两个属性： cssText 和 cssValueType。
		getPropertyPriority(propertyName)：如果给定的属性使用了!important 设置，则返回"important"；否则，返回空字符串。
		getPropertyValue(propertyName)：返回给定属性的字符串值(css字符串，如background-image)。
		item(index)：返回给定位置的 CSS 属性的名称。
		removeProperty(propertyName)：从样式中删除给定属性。
		setProperty(propertyName,value,priority)：将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）  
2. 计算的样式  
getComputedStyle()方法。接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如":after"，如不需要可以为nunll）。

		var myDiv = document.getElementById("myDiv");
		var computedStyle = document.defaultView.getComputedStyle(myDiv, null);
		alert(computedStyle.backgroundColor); 
		alert(computedStyle.width); 
		alert(computedStyle.height); 
		alert(computedStyle.border); // 在某些浏览器中会有返回值，因为这是一个综合属性
IE不支持getComputedStyle()方法，但它有一种类似的概念。在 IE 中，每个具有 style 属性的元素还有一个 currentStyle 属性。  

		var myDiv = document.getElementById("myDiv");
		var computedStyle = myDiv.currentStyle; //是属性不是方法，注意！！
		alert(computedStyle.backgroundColor); 
		alert(computedStyle.width);
		alert(computedStyle.height); 
		alert(computedStyle.border); //undefined，IE 也没有返回 border 样式，因为这是一个综合属性。
无论在哪个浏览器中，最重要的一条是要记住所有计算的样式都是只读的；不能修改计算后样式对象中的 CSS 属性！！！

**B) 操作样式表**   

1. CSSStyleSheet对象：表示的是样式表，包括通过<link\>元素包含的样式表和在<style\>元素中定义的样式表。 该对象下还有许多属性，如href,disabled,media等等。

		var sheet = null;
		for (var i=0, len=document.styleSheets.length; i < len; i++){
			sheet = document.styleSheets[i];
			alert(sheet.href);
		}
不同浏览器的 document.styleSheets 返回的样式表也不同。也可以直接通过<link\>或<style\>元素取得 CSSStyleSheet 对象。其有一个sheet属性（IE为
styleSheet 属性）；不同浏览器中都能取得样式表对象，也可以使用下列代码：  

		function getStyleSheet(element){
		return element.sheet || element.styleSheet;
		}
		//取得第一个<link/>元素引入的样式表
		var link = document.getElementsByTagName("link")[0];
		var sheet = getStylesheet(link);
		//这里的 getStyleSheet()返回的样式表对象与document.styleSheets 集合中的样式表对象相同。       


**C) 元素大小**  

**1.偏移量**  
  
- 元素相对于定位父级的偏移量：`offsetLeft`,`offsetTop`。  
- 元素的宽高、（可见的）垂直滚动条的宽高、左边框宽度和右边框宽高：`offsetHeight`,`offsetWidth`
- `getElementLeft()`与 `getElementTop()`会返回与 `offsetLeft` 和 `offsetTop`相同的值。
- 示意图：  
![偏移量示意图](http://i.imgur.com/ubYfEOb.png)  
- 要想知道某个元素在页面上的偏移量，将这个元素的 offsetLeft 和 offsetTop 与其 offsetParent的相同属性相加，如此循环直至根元素，就可以得到一个基本准确的值。对于简单的 CSS 布局的页面，这两函数可以得到非常精确的结果。对于使用表格和内嵌
框架布局的页面，因为浏览器实现这些元素的方式不同，因此得到的值就不太精确了。  

**2.客户区大小**  

- 元素内容及其内边距所占据的空间大小：`clientWidth` 和 `clientHeight`。
- 示意图： 
![可见区域大小](http://i.imgur.com/72lfmiU.png) 
- 滚动条占用的空间不计算在内
- 浏览器视口大小，可以使用 document.documentElement 或 document.body（在 IE7 之前的版本中）的clientWidth 和 clientHeight。

**3.滚动大小**  

- scrollHeight：在没有滚动条的情况下，元素内容的总高度。
- scrollWidth：在没有滚动条的情况下，元素内容的总宽度。
- scrollLeft：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
- scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。
- 示意图：  
![滚动条示意图](http://i.imgur.com/XqBerAc.png)
- 对于不包含滚动条的页面而言,`document.documentElement.scrollHeight`在每个浏览器中会有差别，具体百度；
- 可以通过`scrollToTop`来设置返回顶部的功能：  

		function scrollToTop(element){
			if (element.scrollTop != 0){
				element.scrollTop = 0;
			}
		}
        oBtn.onclick=function(){
			scrollToTop(document.body);
		}

4.确定元素大小  
`getBoundingClientRect()`方法：这个方法返回会一个矩形对象，包含 4 个属性： left、 top、 right 和 bottom。这些属性给出了元素在页面中相对于视口的位置。浏览器的实现稍有不同。 IE8 及更早版本认为文档的左上角坐标是(2, 2)，其他则认为是（0,0）。

### 4.3 二遍历   
**A) NodeIterator**  
 
- 使用document.createNodeIterator()方法创建它的新实例
- 通过nextNode()和 previousNode()方法遍历节点

**B) TreeWalker**   
TreeWalker 是 NodeIterator 的一个更高级的版本。除了包括 nextNode()和 previousNode()
在内的相同的功能之外，这个类型还提供了下列用于在不同方向上遍历 DOM 结构的方法。  

### 4.4 范围  
范围是选择 DOM 结构中特定部分，然后再执行相应操作的一种手段。如下所示HTML结构：
		
		<!DOCTYPE html>
		<html>
		<body>
		<p id="p1"><b>Hello</b> world!</p>
		</body>
		</html>

我们可以使用 createRange()来创建 DOM 范围： 

		var range1 = document.createRange();
		range2 = document.createRange();
		p1 = document.getElementById("p1");
		range1.selectNode(p1);//选择整个节点，包括其子节点
		range2.selectNodeContents(p1);//只选择节点的子节点
选择到节点后还可以对节点进行一系列操作:  

		range1.deleteContents();//删除
		range.insertNode(span);//插入
		range.collapse(true);//折叠
		比较；
		复制；
		清理范围等功能
更详细的部分参见书籍。

### 五. BOM  
BOM是指浏览器对象模型。描述了与浏览器进行交互的方法和接口。BOM 提供了很多对象，用于访问浏览器的功能。H5中已经规范了BOM的主要内容。  

### 5.1 window对象  
  
**A)** BOM 的核心对象是 window，在浏览器中， window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

**B)** 前面讲过，定义的全局变量其实就是window对象下的属性，但定义全局变量与直接在 window 对象上直接定义属性还有一点差别的：全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。    

		var age = 29;
		window.color = "red";
		//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 false
		delete window.age;
		//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 true
		delete window.color; //returns true 可以删除
		alert(window.age); //29
		alert(window.color); //undefined  

**C) 窗口位置**   
screenLeft 和 screenTop 属性：IE、 Safari、 Opera 和 Chrome支持  

screenX 和 screenY 属性： Firefox，Safari、和 Chrome支持

兼容处理的例子：  

		var leftPos = (typeof window.screenLeft == "number") ?
		window.screenLeft : window.screenX;
		var topPos = (typeof window.screenTop == "number") ?
		window.screenTop : window.screenY;
获得浏览器相对于显示器屏幕左上角的x,y方向距离；但这个值每个浏览器下的值不一致，不建议使用；        

**D) 窗口大小**  

1. 浏览器窗口大小  
outerWidth、 outerHeight：浏览器窗口大小  
innerWidth、 innerHeight：浏览器窗口大小（不含边框）  
区别：outerWidth和innerWidth在浏览器全屏模式下相等，非全屏模式：innerWidth+边框（十几px）=outerWidth。  
兼容：IE8以下不支持，用途不大；

2. 页面视口大小（viewPort）  
`document.documentElement.clientWidth` ，` document.documentElement.clientHeight` ：IE（IE6必须在标准模式下）、 Firefox、 Safari、 Opera 和 Chrome 支持；  
`document.body.clientWidth` ， `document.body.clientHeight`：IE6混杂模式支持；

3. 将上述两条针对各个浏览器做一个兼容处理，来获取视口（viewPort）的大小：（浏览器窗口各个浏览器差异较大，无法兼容处理）  

		var pageWidth = window.innerWidth,
			pageHeight = window.innerHeight;
		if (typeof pageWidth != "number"){
			if (document.compatMode == "CSS1Compat"){
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
				} else {
					pageWidth = document.body.clientWidth;
		k			pageHeight = document.body.clientHeight;
				}
		}

#####  对于移动设备情况的补充：<a href="./其他/移动端viewPort.md">移动端viewPort</a>  


**E) 导航和打开窗口**        
window.open()：接收4 个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览
器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情
况下使用。

	var wroxWin=window.open("http://www.w3school.com.cn","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");

    wroxWin.close();//关闭通过open打开的窗口
  
**F) 间歇调用和超时调用**   

1. setTimeout() 

		//设置超时调用
		var timeoutId = setTimeout(function() {
		alert("Hello world!");
		}, 1000);
		//注意：把它取消
		clearTimeout(timeoutId);

2. setInterval()    

		var timer=null;
		clearInterval(timer);
		timer=setInterval (function() {
		alert("Hello world!");
		}, 10000);
 
**G) 系统对话框**      

1. alert(字符串)   
显示一个系统对话框，其中包含指定的文本和一个OK（"确定"）按钮

2. confirm(字符串)   
对话框除了显示OK 按钮外，还会显示一个Cancel（"取消"）按钮   
![](http://i.imgur.com/wFUjq4z.jpg)

3. prompt(字符串，默认文本值)  
prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）。  
![](http://i.imgur.com/b2PTWuq.jpg)

**H) windows对象下的方法**  
resizeTo()和resizeBy()：调整浏览器窗口的大小，接受两个参数：  

		//调整到100×100
		window.resizeTo(100, 100);
		//调整到200×150
		window.resizeBy(100, 50);
		//调整到 300×300
		window.resizeTo(300, 300);  
但在高版本浏览器中，两个方法基本都已经无效；

### 5.2 location 对象   
location 是最有用的BOM对象之一。location 对象既是window对象的属性，也是document对象的属性。  
**A) 属性** 

	属 性 名 		例 子					说 明
	hash 		"#contents" 			返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，则返回空字符串
	host 		"www.wrox.com:80" 		返回服务器名称和端口号（如果有）
	hostname 	"www.wrox.com" 			返回不带端口号的服务器名称
	href 		"http:/www.wrox.com" 	返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值
	pathname 	"/WileyCDA/" 			返回URL中的目录和（或）文件名
	port 		"8080"					返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串
	protocol 	"http:"					返回页面使用的协议。通常是http:或https:
	search 		"?q=javascript" 		返回URL的查询字符串。这个字符串以问号开头  


**B) 方法**  
   
1. assign() : 打开新URL 并在浏览器的历史记录中生成一条记录。  
		
		location.assign("http://www.wrox.com");
		window.location = "http://www.wrox.com";
		location.href = "http://www.wrox.com";
		//此3种方法均可打开一个地址,效果都一样；
另外，修改location 对象的其他属性也可以改变当前加载的页面：

		//假设初始URL 为http://www.wrox.com/WileyCDA/
		//将URL 修改为"http://www.wrox.com/WileyCDA/#section1"
		location.hash = "#section1";
		//将URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"
		location.search = "?q=javascript";
		//将URL 修改为"http://www.yahoo.com/WileyCDA/"
		location.hostname = "www.yahoo.com";
		//将URL 修改为"http://www.yahoo.com/mydir/"
		location.pathname = "mydir";
		//将URL 修改为"http://www.yahoo.com:8080/WileyCDA/"
		location.port = 8080;
每次修改location 的属性（hash 除外），页面都会以新URL 重新加载，并产生历史记录（可通过前进后退按钮来切换页面）。
2. replace()：同assign()相同，只是不会产生历史记录；  
3. reload() ： 重新加载页面；

		location.reload(); //重新加载（有可能从缓存中加载）
		location.reload(true); //重新加载（从服务器重新加载）

### 5.3 navigator 对象   
navigator 对象的属性通常用于检测显示网页的浏览器类型

### 5.4 screen 对象  
该对象在编程中用处不大； 

### 5.5 history 对象    
history 对象保存着用户上网的历史记录。     
**A) 属性**   
length 属性：保存着历史记录的数量

**B) 方法**   
出于安全方面的考虑，开发人员无法得知用户浏览过的URL，但可以通过前进后退方法访问用户浏览过的页面；

1. go() : 可以在用户的历史记录中任意跳转，前进或者后退。该方法接收一个参数。
		
		//参数为负数，后退一页
		history.go(-1);
		//参数为正数，前进一页
		history.go(1);
		//参数为正2，前进两页
		history.go(2); 
		//跳转到最近的包含"wrox.com"字符的页面，若无，则什么都不做；
		history.go("wrox.com");
2. back()和forward()：这两个方法可以模仿浏览器的"后退"和"前进"按钮。  

		//后退一页
		history.back();
		//前进一页
		history.forward();

### 六. 客户端（浏览器）检测

 
### 6.1 能力检测  
通过确定浏览器支持特定的能力，来给出解决方案，推荐！。   
在可能的情况下，要尽量使用typeof 进行能力检测。 

### 6.2 怪癖检测  
怪癖检测（quirks detection）的目标是识别浏览器的特殊行为（bug）,它无法怪癖检测无法精确地检测特定的浏览器和版本。  

### 6.3 用户代理检测  
通过检测用户代理字符串（navigator.userAgent）来识别浏览器，但这最好作为第三个选择，因为一些历史原因浏览器厂商会在用户代理字符串中添加一些欺骗性信息，导致该字符串信息不一定准确。   

### 七. 事件  

### 7.1 事件流   

事件流描述的是从页面中接收事件的顺序。但有意思的是， IE 和 Netscape 开发团队居然提出了差不多是完全相反的事件流的概念。 IE 的事件流是事件冒泡流，而 Netscape Communicator 的事件流是事件捕获流。  

**A)事件冒泡**    

IE 的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。譬如点击事件click，点击事件会沿 DOM 树向上传播，在每一级节点上都会发生，直至传播到 document 对象。  

所有现代浏览器都支持事件冒泡，但在具体实现上还是有一些差别。

**B)事件捕获**  

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。同样对于点击事件，document 对象首先接收到 click 事件，然后事件沿 DOM 树依次向下，一直传播到事件的实际目标。  

事件捕获是 Netscape Communicator 唯一支持的事件流模型，但 IE9、 Safari、 Chrome、 Opera和 Firefox 目前也都支持这种事件流模型。

**C)DOM事件流**   

"DOM2级事件" 规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。   

IE9、 Opera、 Firefox、 Chrome 和 Safari 都支持 DOM 事件流； IE8 及更早版本不支持 DOM 事件流。  

### 7.2 事件处理程序  
**A) HTML 事件处理程序**  

1. 顾名思义，就是在HTML中添加事件：  
    
		<input type="button" value="Click Me" onclick="alert('Clicked')" />
2. 也可以在HTML中调用js代码中定义好的函数:   

	    <script type="text/javascript">
			function showMessage(){
				alert("Hello world!");
			}
		</script>
	    <input type="button" value="Click Me" onclick="showMessage()" />
3. 函数中有一个局部变量 event，可以查看事件类型： 

		<input type="button" value="Click Me" onclick="alert(event.type)">
4. 函数内部还有this指针，指向事件的目标元素：  
 	
		<input type="button" value="Click Me" onclick="alert(this.value)">
5. 通过with扩展函数作用域：  

		function(){
			with(document){
				with(this){
					//元素属性值
				}
			}
		}
        //相比上述方式调用更简洁了
		<input type="button" value="Click Me" onclick="alert(value)">

6. 缺点：和js代码紧紧耦合在一起  

**B) DOM0 级事件处理程序-赋值**   

1. 通过 JavaScript 指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性：  

		   var btn = document.getElementById("myBtn");
			btn.onclick = function(){
				alert("Clicked");
			};
2. 删除事件：  

			btn.onclick = null; //删除事件处理程序

3. 首先必须取得一个要操作的对象的引用，即获取元素。

4. 缺点：不能同时绑定多个相同事件（如click）

**C) DOM2 级事件处理程序-绑定**    

####标准浏览器下的事件处理  
1. `addEventListener()`和 `removeEventListener()`：用于处理指定和删除事件处理程序的操作。接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 `true`，表示在捕获阶段调用事件处理程序；如果是 `false`，表示在冒泡阶段调用事件处理程序。
2. 事件的删除：如果把handler函数作为匿名函数写在`addEventListener`中，是无法通过`removeEventListener`进行删除的，即便把匿名函数再写进去。因为两个匿名函数就不是同一个函数。  

		var btn = document.getElementById("myBtn");
		var handler = function(){
			alert(this.id);
		};
		btn.addEventListener("click", handler, false);
		btn.removeEventListener("click", handler, false); //有效！  
3. 可以绑定多个相同事件（如click）。        
4. 如果不是特别需要，我们不建议在事件捕获阶段注册事件处理程序。

####IE8浏览器下的事件处理  
1. 由于 IE8 及更早版本只支持事件冒泡，所有其时间绑定和函数函数为：`attachEvent()`和 `detachEvent()`  
2. 事件删除与标准浏览器类似，不可使用匿名函数：  

			var btn = document.getElementById("myBtn");
			var handler = function(){
				alert("Clicked");
			};
			btn.attachEvent("onclick", handler);
			btn.detachEvent("onclick", handler);
####兼容性写法  

	var EventUtil = {
		addHandler: function(element, type, handler){
			if (element.addEventListener){
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent){
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler: function(element, type, handler){
			if (element.removeEventListener){
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent){
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		}
	};
我们可以这样调用：  

		var btn = document.getElementById("myBtn");
		var handler = function(){
			alert("Clicked");
		};
		EventUtil.addHandler(btn, "click", handler);
		
		EventUtil.removeHandler(btn, "click", handler);

### 7.3 事件对象  
**A）DOM中的事件对象**    
兼容DOM 的浏览器会将一个event 对象传入到事件处理程序中,该对象包含如下属性和方法：  
  
		bubbles ：表明事件是否冒泡
		cancelable：表明是否可以取消事件的默认行为
		currentTarget：其事件处理程序当前正在处理事件的那个元素
		defaultPrevented ：为true 表示已经调用了preventDefault()（DOM3级事件中新增）
		detail 	： 与事件相关的细节信息
		eventPhase ： 调用事件处理程序的阶段：1表示捕获阶段，2表示“处于目标”，3表示冒泡阶段
		preventDefault() ：取消事件的默认行为。如果cancelable是true，则可以使用这个方法
		stopImmediatePropagation()：取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用（DOM3级事件中新增）
		stopPropagation() ：取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法
		target ：事件的目标
		trusted ：为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScript 创建的（DOM3级事件中新增）
		type ：被触发的事件的类型
		view ：与事件关联的抽象视图。等同于发生事件的window对象  
例如，阻止冒泡:  

		var btn = document.getElementById("myBtn");
		btn.onclick = function(event){
			alert("Clicked");
			event.stopPropagation();
		};
		document.body.onclick = function(event){
			alert("Body clicked");
		};

**B）IE中的事件对象**  
IE中的event 对象是作为window 对象的一个属性存在的：  

		var btn = document.getElementById("myBtn");
        //方式1，需要通过window.event来访问
		btn.onclick = function(){
			var event = window.event;
			alert(event.type); //"click"
		};
        //方式2，和dom事件相同，通过event传参来访问
	    btn.attachEvent("onclick", function(event){
			alert(event.type); //"click"
		});
IE中的event 对象包含如下属性和方法：  

		cancelBubble ：默认值为false，但将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation()方法的作用相同）
		returnValue ：默认值为true，但将其设置为false就可以取消事件的默认行为（与DOM中的preventDefault()方法的作用相同）
		srcElement：事件的目标（与DOM中的target属性相同）
		type： 被触发的事件的类型

例如：阻止冒泡

		var btn = document.getElementById("myBtn");
		btn.onclick = function(){
			alert("Clicked");
			window.event.cancelBubble = true;
		};
		document.body.onclick = function(){
			alert("Body clicked");
		};
**C）事件的兼容处理**  
将之前的EventUtil对象进行扩展： 

	var EventUtil = {
		addHandler: function(element, type, handler){
			//同上，省略
		},
		removeHandler: function(element, type, handler){
			//同上，省略
		},
		getEvent: function(event){
			return event ? event : window.event;
		},
		getTarget: function(event){
			return event.target || event.srcElement;
		},
		preventDefault: function(event){
			if (event.preventDefault){
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		stopPropagation: function(event){
			if (event.stopPropagation){
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	};

### 7.4 事件类型  
Web 浏览器中的几类事件：  

- UI（User Interface，用户界面）事件，当用户与页面上的元素交互时触发；
- 焦点事件，当元素获得或失去焦点时触发；
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
- 滚轮事件，当使用鼠标滚轮（或类似设备）时触发；
- 文本事件，当在文档中输入文本时触发；
- 键盘事件，当用户通过键盘在页面上执行操作时触发；
- 合成事件，当为IME（Input Method Editor，输入法编辑器）输入字符时触发；
- 变动（mutation）事件，当底层DOM 结构发生变化时触发。
- 变动名称事件，当元素或属性名变动时触发。此类事件已被废弃，没有任何浏览器实现它们，不再介绍。

**A) UI事件**  

1. load 事件  
最常用的一个事件就是load。当页面完全加载后（包括所有图像、JavaScript 文件、CSS 文件等外部资源），就会触发window 上面的load事件。  
	- 有两种定义onload 事件处理程序的方式。第一种方式是使用如下所示的JavaScript 代码：

			EventUtil.addHandler(window, "load", function(event){
				alert("Loaded!");
			});
	- 第二种是在HTML中，直接为<body\>元素添加一个onload 特性

			<body onunload="alert('Unloaded!')">
	- img图像上面也可以触发load 事件，但必须先绑定load事件，再添加src属性:新图像元素不一定要从添加到文档后才开始下载，只要设置了src 属性就会开始下载。  

			var image = new Image();
			EventUtil.addHandler(image, "load", function(event){
				alert("Image loaded!");
			});
			image.src = "smile.gif";
	- script脚本上面也可以触发load 事件，代码参上，与图像不同的是，只有在设置了<script\>元素的src 属性并将该元素添加到文档后，才会开始下载JavaScript 文件。
	- link样式标签也可以出发load事件。与<script\>节点类似，在未指定href 属性并将<link>元素添加到文档之前也不会开始下载样式表。
2. unload事件  
同onload事件一样，他有两种触发方式（参上）。ps:跳转，刷新和关闭页面都会触发事件。

3. resize 事件  
当浏览器窗口被调整到一个新的高度或宽度时，就会触发resize 事件。这个事件在window（窗
口）上面触发。
	- 可以通过<body/>元素中的onresize 特性来指定事件处理程序。 
	- 也可以通过js方式添加事件：
	
			EventUtil.addHandler(window, "resize", function(event){
				alert("Resized");
			});
4. scroll事件  
虽然scroll 事件是在window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混
杂模式下，可以通过<body\>元素的scrollLeft 和scrollTop 来监控到这一变化；而在标准模式下，
除Safari 之外的所有浏览器都会通过<html\>元素来反映这一变化。

**B) 焦点事件**  
焦点事件会在页面元素获得或失去焦点时触发。有以下几个主要的焦点事件:  

- blur：在元素失去焦点时触发。这个事件不会冒泡；所有浏览器都支持它。 
- focus：在元素获得焦点时触发。这个事件不会冒泡；所有浏览器都支持它。
- focusin：在元素获得焦点时触发。这个事件与HTML 事件focus 等价，但它冒泡。支持这个
事件的浏览器有IE5.5+、Safari 5.1+、Opera 11.5+和Chrome。
- focusout：在元素失去焦点时触发。这个事件是HTML 事件blur 的通用版本。支持这个事件
的浏览器有IE5.5+、Safari 5.1+、Opera 11.5+和Chrome。 

**C) 鼠标和滚轮事件**  
共有9个鼠标事件：  

- click：在用户单击主鼠标按钮（一般是左边的按钮）或者按下回车键时触发。
- dblclick：在用户双击主鼠标按钮（一般是左边的按钮）时触发。
- mousedown：在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。
- mouseenter：在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且
在光标移动到后代元素上不会触发。
- mouseleave：在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且
在光标移动到后代元素上不会触发。
- mousemove：当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件。
- mouseout：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另
一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件。
- mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触
发。不能通过键盘触发这个事件。
- mouseup：在用户释放鼠标按钮时触发。不能通过键盘触发这个事件。

只有在同一个元素上相继触发mousedown 和mouseup 事件，才会触发click 事件；如果
mousedown 或mouseup 中的一个被取消，就不会触发click 事件。  
点击事件的执行顺序：mousedown —— mouseup —— click —— mousedown —— mouseup —— click —— dblclick。

1. 客户区坐标位置 
鼠标事件都是在浏览器视口中的特定位置上发生的。这个位置信息保存在事件对象的clientX 和
clientY 属性中 ：

		var div = document.getElementById("myDiv");
		EventUtil.addHandler(div, "click", function(event){
			event = EventUtil.getEvent(event);
			alert("Client coordinates: " + event.clientX + "," + event.clientY);
		});
2. 页面坐标位置  
事件对象的pageX 和pageY 属性（IE8 及更早版本不支持），表示鼠标光标在页面中的位置，因此坐标是从页面本身而非视口的左边和顶边计算的。在页面没有滚动的情况下，pageX 和pageY 的值与clientX 和clientY 的值相等。
3. 屏幕坐标位置 
鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通过screenX 和screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。
4. 修改键  
修改键就是Shift、Ctrl、Alt 和Meta（Windows 键或mac的Cmd 键），DOM 为此规定了4 个属性，表示这些修改键的状态：shiftKey、ctrlKey、altKey 和metaKey。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true，否则值为false。点击事件被触发时，我们可以检测相应的按键是否被同时按下：  

		var div = document.getElementById("myDiv");
		EventUtil.addHandler(div, "click", function(event){
			event = EventUtil.getEvent(event);
			var keys = new Array();
			if (event.shiftKey){
				keys.push("shift");
			}
			if (event.ctrlKey){
				keys.push("ctrl");
			}
			if (event.altKey){
				keys.push("alt");
			}
			if (event.metaKey){
				keys.push("meta");
			}
			alert("Keys: " + keys.join(","));
		});
5. 相关元素  
DOM通过event 对象的relatedTarget 属性提供了相关元素的信息。这个属性只对于mouseover
和mouseout 事件才包含值，可以检测到鼠标移入/出时出发点和目标点元素信息。IE8下需要做兼容处理：  

		var EventUtil = {
			getRelatedTarget: function(event){
				if (event.relatedTarget){
					return event.relatedTarget;
				} else if (event.toElement){
					return event.toElement;
				} else if (event.fromElement){
					return event.fromElement;
				} else {
					return null;
				}
			},
		}
我们可以这样使用：  

		var div = document.getElementById("myDiv");
		EventUtil.addHandler(div, "mouseout", function(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			var relatedTarget = EventUtil.getRelatedTarget(event);
			alert("Moused out of " + target.tagName + " to " + relatedTarget.tagName);
		});
当鼠标从div移出来时会提示：Moused out of DIV to BODY
6. 鼠标按钮 
对于mousedown 和mouseup 事件来说，则在其event 对象存在一个button 属性，表示按下或释放的按钮。DOM的button 属性可能有如下3 个值：0 表示主鼠标按钮，1 表示中间的鼠标按钮（鼠标滚轮按钮），2 表示次鼠标按钮。IE8之前存在兼容性
7. 更多的事件信息  
“DOM2 级事件”规范在event 对象中还提供了detail 属性，不过该属性下的一些属性值用途不大，不再介绍。
8. 鼠标滚轮事件  
mousewheel 事件包含一个特殊的wheelDelta 属性。当用户向前滚动鼠标滚轮时，wheelDelta 是120 的倍数；当用户向后滚动鼠标滚轮时，wheelDelta 是-120 的倍数（Opera 9.5 之前正负号是颠倒的）

		EventUtil.addHandler(document, "mousewheel", function(event){
		event = EventUtil.getEvent(event);
		alert(event.wheelDelta);
		});
火狐支持的是DOMMouseScroll 事件，有关鼠标滚轮的信息则保存在detail 属性中，当向前滚动鼠标滚轮时，这个属性的值是-3 的倍数，当向后滚动鼠标滚轮时，这个属性的值是3 的倍数。  

		EventUtil.addHandler(document, "mousewheel", function(event){
		event = EventUtil.getEvent(event);
			alert(event.wheelDelta);
		});
兼容处理：  

		var EventUtil = {
			getWheelDelta: function(event){
			if (event.wheelDelta){
				return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
			} else {
				return -event.detail * 40;
			}
		}
9. 触摸设备   
iOS 和Android 设备的实现非常特别，因为这些设备没有鼠标：  
 
	- 不支持dblclick 事件。双击浏览器窗口会放大画面，而且没有办法改变该行为。
	- 轻击可单击元素会触发mousemove 事件。如果此操作会导致内容变化，将不再有其他事件发生；如果屏幕没有因此变化，那么会依次发生mousedown、mouseup 和click 事件。轻击不可单击的元素不会触发任何事件。可单击的元素是指那些单击可产生默认操作的元素（如链接），或者那些已经被指定了onclick 事件处理程序的元素。
	- mousemove 事件也会触发mouseover 和mouseout 事件。
	- 两个手指放在屏幕上且页面随手指移动而滚动时会触发mousewheel 和scroll 事件 

**D) 键盘和文本事件**   
有3 个键盘事件，简述如下：  

- keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
- keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。按下Esc 键也会触发这个事件。Safari 3.1 之前的版本也会在用户按下非字符键时触发keypress事件。
- keyup：当用户释放键盘上的键时触发。  

虽然所有元素都支持以上3 个事件，但只有在用户通过文本框输入文本时才最常用到。只有一个文本事件：textInput。如果用户按下的是一个非字符键，那么首先会触发keydown 事件，然后就是keyup 事件。

1. 键码   
在发生keydown 和keyup 事件时，event 对象的keyCode 属性中会包含一个代码，与键盘上一个特定的键对应。  

2. 字符编码  
发生keypress 事件意味着按下的键会影响到屏幕中文本的显示。IE9、Firefox、Chrome 和Safari 的event 对象都支持一个charCode 属性，这个属性只有在发生keypress 事件时才包含值，而且这个值是按下的那个键所代表字符的ASCII 编码。IE8 及之前版本和Opera 则是在keyCode 中保存字符的ASCII编码。做下兼容处理：  

		var EventUtil = {
			getCharCode: function(event){
				if (typeof event.charCode == "number"){
					return event.charCode;
				} else {
					return event.keyCode;
				}
			},
		}
我们可以这样使用：  

		var textbox = document.getElementById("myText");
		EventUtil.addHandler(textbox, "keypress", function(event){
			event = EventUtil.getEvent(event);
			console.log(EventUtil.getCharCode(event));
		});

**E) HTML5事件**  
 
1. contextmenu 事件    
contextmenu 事件属于鼠标事件，可以点击右键实现一个自定义菜单(需阻止默认事件)；其事件对象中包含与光标位置有关的所有属性。

		EventUtil.addHandler(div, "contextmenu", function(event){
			event = EventUtil.getEvent(event);
			EventUtil.preventDefault(event);
			var menu = document.getElementById("myMenu");//获取菜单dom
			menu.style.left = event.clientX + "px";
			menu.style.top = event.clientY + "px";
			menu.style.display = "block";//显示菜单
		});
支持contextmenu 事件的浏览器有IE、Firefox、Safari、Chrome 和Opera 11+。
2. beforeunload 事件  
这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。可以将event.returnValue 的值设置为要显示给用户的字符串：

		EventUtil.addHandler(window, "beforeunload", function(event){
			event = EventUtil.getEvent(event);
			var message = "I'm really going to miss you if you go.";
			event.returnValue = message;
			return message;
		})

3. DOMContentLoaded 事件  
window 的load 事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而颇费周折。而DOMContentLoaded 事件则在形成完整的DOM 树之后就会触发，不理会图像、JavaScript 文件、CSS 文件或其他资源是否已经下载完毕。这个事件始终都会在load 事件之前触发。  
为了兼容不支持该事件的浏览器（），我们建议在页面加载期间设置一个时间为0 毫秒的超时调用，如下面的例子所示：

		setTimeout(function(){
		//在此添加事件处理程序
		}, 0);
但仍然无法保证一定会在load时间之前就触发。

4. readystatechange 事件  
这个事件的目的是提供与文档或元素的加载状态有关的信息，但这个事件的行为有时候也很难预料。


5. pageshow 和pagehide 事件  
	- pageshow：这个事件在页面显示时触发，无论该页面是否来自bfcache。在重新加载的页面中，pageshow 会在load 事件触发后触发；而对于bfcache 中的页面，pageshow 会在页面状态完全恢复的那一刻触发。
	- pagehide: 该事件会在浏览器卸载页面的时候触发，而且是在unload 事件之前触发。 

6. hashchange 事件   
HTML5 新增了hashchange 事件，以便在URL 的参数列表（及URL 中“#”号后面的所有字符串）发生变化时通知开发人员。使用时必须要把hashchange 事件处理程序添加给window 对象，然后URL 参数列表只要变化就会调用它。此时的event 对象应该额外包含两个属性：oldURL 和newURL。这两个属性分别保存着参数列表变化前后的完整URL。例如：

		EventUtil.addHandler(window, "hashchange", function(event){
			alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
		}); 
但只有Firefox 6+、Chrome 和Opera 支持oldURL 和newURL 属性。为此，最好是使用location
对象来确定当前的参数列表。

		EventUtil.addHandler(window, "hashchange", function(event){
			alert("Current hash: " + location.hash);
		});

**F) 设别事件**  

1. **orientationchange 事件**   
检测移动设备是竖屏还是横屏。移动Safari 的window.orientation 属性中可能包含3 个值：
0 表示肖像模式，90 表示向左旋转的横向模式，-90 表示向右旋转的横向模式（“主屏幕”按钮在左侧）。180 表示iPhone 头朝下（尚未得到支持）。触发orientationchange 事件时，event对象下并没有保存什么有用的信息，信息需要从window.orientation 属性获取。
2. **MozOrientation 事件**   
只有带加速计的设备才支持MozOrientation 事件：当设备的加速计检测到设备方向改变时，就会触发这个事件。但这个事件与iOS 中的orientationchange 事件不同，该事件只能提供一个平面的方向变化。并且是在window 对象上触发的。（后续可能会被删除）
3. **deviceorientation 事件**   
deviceorientation 事件与MozOrientation 事件类似。它也是在加速计检测到设备方向变化时在window 对象上触发，而且具有与MozOrientation 事件相同的支持限制。不过，deviceorientation 事件的意图是告诉开发人员设备在空间中朝向哪儿，而不是如何移动。
4. **devicemotion 事件**   
这个事件是要告诉开发人员设备什么时候移动，而不仅仅是设备方向如何改变。例如，通过devicemotion 能够检测到设备是不是正在往下掉，或者是不是被走着的人拿在手里。 

**I) 触摸与手势事件**  

1. 触摸事件  
具体来说，有以下几个触摸事件：  

		 touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
		 touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动。
		 touchend：当手指从屏幕上移开时触发。
		 touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明
每个触摸事件的event 对象都提供了在鼠标事件中常见的属性：
bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey 和metaKey。  
除了常见的DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性：

		touches：表示当前跟踪的触摸操作的Touch 对象的数组。
		targetTouchs：特定于事件目标的Touch 对象的数组。
		changeTouches：表示自上次触摸以来发生了什么改变的Touch 对象的数组。
在触摸屏幕上的元素时，这些事件（包括鼠标事件）发生的顺序如下：touchstart——mouseover——mousemove（一次）——mousedown——mouseup——click——touchend
2. 手势事件   
有三个手势事件，分别介绍如下：  

		 gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
		 gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。
		 gestureend：当任何一个手指从屏幕上面移开时触发。

### 7.5 内存和性能  

1. 事件委托  
最适合采用事件委托技术的事件包括click、mousedown、mouseup、keydown、keyup 和keypress。事件委托的具体使用在其他文档中已经描述，此处不再赘述。
2. 移除事件处理程序  
有时候，内存中留有那些过时不用的“空事件处理程序”（dangling event handler），会造成Web 应用程序内存与性能问题。引起这个问题的原因主要有两种：  

	- 第一种情况就是通过纯粹的DOM操作，如removeChild()和replaceChild()方法，那么原来添加到元素中的事件处理程序极有可能无法被当作垃圾回收。解决办法就是删除节点的时候将事件也清空；
	- 另一种情况，就是卸载页面的时候（譬如IE8）。一般来说，最好的做法是在页面卸载之前，先通过onunload 事件处理程序移除所有事件处理程序。

### 7.6 模拟事件  

事件经常由用户操作或通过其他浏览器功能来触发。但很少有人知道，也可以使用JavaScript 在任意时刻来触发特定的事件，而此时的事件就如同浏览器创建的事件一样。大致需要以下三个步奏：  

- 第一，创建事件对象：在document 对象上使用createEvent()方法创建event 对象；  
- 第二，初始化事件对象：每种类型的event 对象都有一个特殊的方法，为它传入适当的数据就可以初始化该event 对象；  
- 第三，触发事件：dispatchEvent()方法，传入一个参数，即表示要触发事件的event 对象。  

**1.模拟鼠标事件**  

		var btn = document.getElementById("myBtn");
		//创建事件对象
		var event = document.createEvent("MouseEvents");
		//初始化事件对象，具体参数参见书籍
		event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0,
		false, false, false, false, 0, null);
		//触发事件
		btn.dispatchEvent(event);
**2.模拟键盘事件**  
这个例子模拟的是按住Shift 的同时又按下A 键。  

		var textbox = document.getElementById("myTextbox"),
		event;
		//以DOM3 级方式创建事件对象
		if (document.implementation.hasFeature("KeyboardEvents", "3.0")){
			event = document.createEvent("KeyboardEvent");
			//初始化事件对象
			event.initKeyboardEvent("keydown", true, true, document.defaultView, "a",0, "Shift", 0);
		}
		//触发事件
		textbox.dispatchEvent(event);
而在Firefox 中，调用createEvent()并传入"KeyEvents"就可以创建一个键盘事件。返回的事件对象会包含一个initKeyEvent()方法，此处不再赘述。

**3.模拟其他事件**   
虽然鼠标事件和键盘事件是在浏览器中最经常模拟的事件，但有时候同样需要模拟变动事件和HTML 事件。要模拟变动事件， 可以使用createEvent("MutationEvents") 创建一个包含
initMutationEvent() 方法的变动事件对象。这个方法接受的参数包括： type 、bubbles 、
cancelable、relatedNode、preValue、newValue、attrName 和attrChange。譬如下面这个例子：  

		var event = document.createEvent("MutationEvents");
		event.initMutationEvent("DOMNodeInserted", true, false, someNode, "","","",0);
		targ et.dispatchEvent(event);
以上代码模拟了DOMNodeInserted 事件。其他变动事件也都可以照这个样子来模拟，只要改一改
参数就可以了。

**4.自定义DOM 事件**  
要创建新的自定义事件，可以调用createEvent("CustomEvent")。返回的对象有一个名为initCustomEvent()的方法：  

		var div = document.getElementById("myDiv"),
		event;
		EventUtil.addHandler(div, "myevent", function(event){
			alert("DIV: " + event.detail);
		});
		EventUtil.addHandler(document, "myevent", function(event){
			alert("DOCUMENT: " + event.detail);
		});
		if (document.implementation.hasFeature("CustomEvents", "3.0")){
			event = document.createEvent("CustomEvent");
			event.initCustomEvent("myevent", true, false, "Hello world!");
			div.dispatchEvent(event);
		}

### 7.7 IE下的模拟事件    
IE下创建自定义事件也是三个步奏，只是在实现每个步骤时都采用了不一样的方式：

		var btn = document.getElementById("myBtn");
		//创建事件对象
		var event = document.createEventObject();
		//初始化事件对象
		event.screenX = 100;
		event.screenY = 0;
		event.clientX = 0;
		event.clientY = 0;
		event.ctrlKey = false;
		event.altKey = false;
		event.shiftKey = false;
		event.button = 0;
		//触发事件
		btn.fireEvent("onclick", event); 

### 八. 表单  

### 8.1 基础知识     

**A) 属性和方法**   
<form\>表单元素属于HTMLFormElement类型，它有自己独有的属性和方法：  

- acceptCharset：服务器能够处理的字符集；等价于 HTML 中的 accept-charset 特性。
- action：接受请求的 URL；等价于 HTML 中的 action 特性。
- elements：表单中所有控件的集合（HTMLCollection）。
- enctype：请求的编码类型；等价于 HTML 中的 enctype 特性。
- length：表单中控件的数量。
- method：要发送的 HTTP 请求类型，通常是"get"或"post"；等价于 HTML 的 method 特性。
- name：表单的名称；等价于 HTML 的 name 特性。
- reset()：将所有表单域重置为默认值。
- submit()：提交表单。
- target：用于发送请求和接收响应的窗口名称；等价于 HTML 的 target 特性。

**B) 获取表单元素**  

1. 通过getElementById()方法获取：

		var form = document.getElementById("form1");

2. 其次，通过 document.forms 可以取得页面中所有的表单。在这个集合中，可以通过数值索引或name值来取得特定的表单：

		var firstForm = document.forms[0]; //取得页面中的第一个表单
		var myForm = document.forms["form2"]; //取得页面中名称为"form2"的表单

**C) 提交表单**   

1. 使用<input\>或<button\>都可以定义提交按钮，只要将其type 特性的值设置为 `submit` 即可：  

		<!-- 通用提交按钮 -->
		<input type="submit" value="Submit Form">
		<!-- 自定义提交按钮 -->
		<button type="submit">Submit Form</button>
		<!-- 图像按钮 -->
		<input type="image" src="graphic.gif">  
只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可
以提交该表单。（textarea 例外，回车会换行）。  

2. 以上述方式提交表单时，浏览器会在将请求发送给服务器之前触发`submit事件`，这样我们就有机会进行表单校验，并决定是否提交表单：  

		var form = document.getElementById("myForm");
		EventUtil.addHandler(form, "submit", function(event){
			//取得事件对象
			event = EventUtil.getEvent(event);
			//阻止默认事件
			EventUtil.preventDefault(event);
		});

3. 调用`submit()方法`也可以提交表单，且无需表单包含提交按钮，任何时候都可以正常提交表单：

		var form = document.getElementById("myForm");
		//提交表单
		form.submit();
注意：此情况下不会触发submit 事件，因此要记得在调用此方法之前先验证表单数据。  

**D) 重置表单**   

1. 使用type 特性值为 `reset` 的<input\>或<button\>都可以创建重置按钮，如下面的例子所示。

		<!-- 通用重置按钮 -->
		<input type="reset" value="Reset Form">
		<!-- 自定义重置按钮 -->
		<button type="reset">Reset Form</button>

2. 用户单击重置按钮重置表单时，会触发`reset事件`。因此我们可以在必要时取消重置操作：

		var form = document.getElementById("myForm");
		EventUtil.addHandler(form, "reset", function(event){
		//取得事件对象
		event = EventUtil.getEvent(event);
		//阻止表单重置
		EventUtil.preventDefault(event);
		});
3. 调用`reset()方法`会像单击重置按钮一样触发reset 事件（同提交）。

		var form = document.getElementById("myForm");
		//重置表单
		form.reset();

**E) 表单字段**   

1.elements 属性 ：该属性是表单中所有表单元素（字段）的集合：  

		var form = document.getElementById("form1");
		//取得表单中的第一个字段
		var field1 = form.elements[0];
		//取得名为"textbox1"的字段
		var field2 = form.elements["textbox1"];
		//取得表单中包含的字段的数量
		var fieldCount = form.elements.length;
		//取得表单中name为color的所有元素
		var colorFields = form.elements["color"];
2. 共有的表单字段属性：  
 - disabled：布尔值，表示当前字段是否被禁用。  
	- form：指向当前字段所属表单的指针；只读。
	- name：当前字段的名称。
	- readOnly：布尔值，表示当前字段是否只读。
	- tabIndex：表示当前字段的切换（tab）序号。
	- type：当前字段的类型，如"checkbox"、"radio"，等等。
	- value：当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读的，包含着文件
	在计算机中的路径。

3. 共有的表单字段方法  
每个表单字段都有两个方法：得到焦点`focus()`和 失去焦点`blur()`。HTML5 为表单字段新增了一个autofocus 属性。只要设置这个属性，不用JavaScript 就能自动把焦点移动到相应字段：

		<input type="text" autofocus>
3. 共有的表单字段事件  
	- blur：当前字段失去焦点时触发。
	- change：对于<input\>和<textarea\>元素，在它们失去焦点且value 值改变时触发；对于
	<select\>元素，在其选项改变时触发。
	- focus：当前字段获得焦点时触发。
当用户改变了当前字段的焦点，或者我们调用了blur()或focus()方法时，都可以触发blur 和
focus 事件。

### 8.2 文本框脚本    

**A) 两种文本框**    
在HTML 中，有两种方式来表现文本框：一种是使用<input\>元素的单行文本框，另一种是使用
<textarea\>的多行文本框。两个控件虽然非常相似，但仍存在一些重要的区别。

1. 须将<input\>元素的`type` 特性设置为"text"。通过设置`size`特性，可以指定文本框中能够显示的字符数。通过`value` 特性，可以设置文本框的初始值，而`maxlength` 特性则用于指定文本框可以接受的最大字符数。例如：

		<input type="text" size="25" maxlength="50" value="initial value">

2. <textarea\>元素则始终会呈现为一个多行文本框。使用`rows` 和`cols` 特性指定文本框的大小。其中，rows 特性指定的是文本框的字符行数，而cols 特性指定的是文本框的字符列数
而初始值必须要放在标签之间：

		<textarea rows="25" cols="5">initial value</textarea>
注意：不能在HTML 中给<textarea\>指定最大字符数。

3. 无论这两种文本框在标记中有什么区别，但它们都会将用户输入的内容保存在value 属性中。我们可以通过value 属性读取或设置文本框的值，并且不建议使用标准的DOM方法。

**B) 选择文本**  

1. `select()`方法：用于选择文本框中的所有文本。在文本框获得焦点时选择其所有文本，这是一种非常常见的做法：  

		var opt=document.getElementById('inpt1');
		opt.onfocus=function(){
				opt.select();
			}  
2. 选择（select）事件    
与select()方法对应的，是一个select 事件。在选择了文本框中的文本时，就会触发select事件

3. 取得选择的文本  
HTML5 通过一些扩展方案用来更顺利地取得选择的文本。该规范采取的办法是添加两个属性：`selectionStart` 和`selectionEnd`。配合字符串的substring方法即可获得用户选择的字符：  

		var opt=document.getElementById('inpt1');
		opt.onselect=function(){
			console.log(opt.value.substring(opt.selectionStart, opt.selectionEnd));
		}
上述方法不适用用IE8以前版本；IE8 及更早的版本中有一个document.selection 对象，其中保存着用户在整个文档范围内选择的文本信息（详见书籍）；    

4. 选择部分文本  
`setSelectionRange()`方法。接收两个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的字符的索引（类似substring）;  

		textbox.value = "Hello world!"
		//选择所有文本
		textbox.setSelectionRange(0, textbox.value.length); //"Hello world!"
		//选择前3 个字符
		textbox.setSelectionRange(0, 3); //"Hel"
IE8 及更早版本不支持

C)自动切换焦点  
为了增强表单字段的易用性。其中，最常见的一种方式就是在用户填写完当前字段时，自动将焦点切换到下一个字段。这需要我们提前设置好input标签的 `maxlength` 属性：  

	opt1.onkeyup=function(){
      	if(opt1.value.length==opt1.maxLength){
      		opt2.focus();
      	}
      }  
D) HTML5 约束验证API  

1. 必填字段   
第一种情况是在表单字段中指定了`required` 属性，如下面的例子所示：

		<input type="text" name="username" required>

2. 其他输入类型  
HTML5 为<input\>元素的type 属性又增加了几个值。这些新的类型不仅能反映数据类型的信息，
而且还能提供一些默认的验证功能。其中，"email"和"url"是两个得到支持最多的类型：

		<input type="email" name ="email">
		<input type="url" name="homepage">
3. 数值范围
除了email和ul，还有几个元素都要求填写某种基于数字的值："number"、"range"、"datetime"、"datetime-local"、"date"、"month"、"week"，
还有"time"。
		
		<input type="number" min="0" max="100" step="5" name="count">  
4. 输入模式
HTML5 为文本字段新增了pattern 属性。这个属性的值是一个正则表达式，用于匹配文本框中的
值：

		<input type="text" pattern="\d+" name="count">
		//如果输入非数字浏览器不会任何提示，但在checkValidity()方法检测下会返回false
5. 检测有效性  
`checkValidity()`方法可以检测表单中的某个字段是否有效，有效返回true，否则返回false：  

		document.forms[0].elements[0].checkValidity()
也可以对整个form表单进行检测，如果所有表单字段都有效，这个方法返回true；即使有一个字段无效也会返回false。
		document.forms[0].checkValidity()
如果要想得到更具体的信息，就应该使用 `validity` 来检测表单的有效性，该属性对象下包含如下属性：  

		customError ：如果设置了setCustomValidity()，则为true，否则返回false。
		patternMismatch：如果值与指定的pattern 属性不匹配，返回true。
		rangeOverflow：如果值比max 值大，返回true。
		rangeUnderflow：如果值比min 值小，返回true。
		stepMisMatch：如果min 和max 之间的步长值不合理，返回true。
		tooLong：如果值的长度超过了maxlength 属性指定的长度，返回true。有的浏览器（如Firefox 4）
		会自动约束字符数量，因此这个值可能永远都返回false。
		typeMismatch：如果值不是"mail"或"url"要求的格式，返回true。
		valid：如果这里的其他属性都是false，返回true。checkValidity()也要求相同的值。
		valueMissing：如果标注为required 的字段中没有值，返回true。

6. 禁用验证  
通过设置`novalidate` 属性，可以告诉表单不进行验证。

		<form method="post" action="signup.php" novalidate>
		<!--这里插入表单元素-->
		</form>
在js中使用noValidate 属性也可以取得或设置这个值:  

		document.forms[0].noValidate = true; //禁用验证
如果一个表单中有多个提交按钮，为了指定点击某个提交按钮不必验证表单，可以在相应的按钮上
添加 `formnovalidate` 属性：  

		<form method="post" action="foo.php">
		<!--这里插入表单元素-->
		<input type="submit" value="Regular Submit">  
同样，也可以利用js设置这个属性。  

		//禁用验证
		document.forms[0].elements["btnNoValidate"].formNoValidate = true;

### 8.3 选择框脚本  
选择框是通过<select\>和<option\>元素创建的。该HTML除了继承所有表单字段共有的属性和方法外，还有许多特有的属性和方法：  

- add(newOption, relOption)：向控件中插入新<option>元素，其位置在相关项（relOption）
之前。
- multiple：布尔值，表示是否允许多项选择；等价于HTML 中的multiple 特性。
- options：控件中所有<option\>元素的HTMLCollection。
- remove(index)：移除给定位置的选项。
- selectedIndex：基于0 的选中项的索引，如果没有选中项，则值为-1。对于支持多选的控件，
只保存选中项中第一项的索引。
- size：选择框中可见的行数；等价于HTML 中的size 特性  

其中options属性对象下，还有一些特殊属性，可以很方便的读取和操作选择框元素（不推荐采用公有的DOM属性和方法）

- index：当前选项在options 集合中的索引。
- label：当前选项的标签；等价于HTML 中的label 特性。
- selected：布尔值，表示当前选项是否被选中。将这个属性设置为true 可以选中当前选项。
- text：选项的文本。
- value：选项的值（等价于HTML 中的value 特性）。

例如:
	
	var selectbox = document.forms[0]. elements["location"];
	//推荐
	var text = selectbox.options[0].text; //选项的文本
	var value = selectbox.options[0].value; //选项的值

对于选择框中每个option的value值：  

	<select name="location" id="selLocation">
	<!-- <select name="location" id="selLocation" multiple="multiple"> 多选-->
		<option value="Sunnyvale, CA">Sunnyvale</option>
		<option value="Los Angeles, CA">Los Angeles</option>
		<option value="Mountain View, CA">Mountain View</option>
		<option value="">China</option>
		<option>Australia</option>
	</select>
`value`值的获取遵循以下规则：  
  
- 如果没有选中的项，则选择框的value 属性保存空字符串。
- 如果有一个选中项，而且该项的value 特性已经在HTML 中指定，则选择框的value 属性等
于选中项的value 特性。即使value 特性的值是空字符串，也同样遵循此条规则。
- 如果有一个选中项，但该项的value 特性在HTML 中未指定，则选择框的value 属性等于该
项的文本。
- 如果有多个选中项，则选择框的value 属性将依据前两条规则取得第一个选中项的值。  

设置`multiple`属性后，单选框就会变化**多选框**  

		<select name="location" id="selLocation" multiple="multiple">
			<option value="Sunnyvale, CA">Sunnyvale</option>
			<option value="Los Angeles, CA">Los Angeles</option>
			<option value="Mountain View, CA">Mountain View</option>
			<option value="">China</option>
			<option>Australia</option>
		</select>  
**A) 选择选项**  

1. 单选框  
使用选择框的 `selectedIndex` 属性，即可获得用户选择的选项：

		var selectedOption = selectbox.options[selectbox.selectedIndex];



2. 多选框  
对于可以选择多项的选择框，selectedfIndex 属性就好像只允许选择一项一样。设置selectedIndex 会导致取消以前的所有选项并选择指定的那一项，而读取selectedIndex 则只会返回选中项中第一项的索引值。此时我们通过设置选项 `selected` 的属性来获取用户选择的选项：

		for(var i=0,len=selt.options.length;i<len;i++){
	     		console.log(selt.options[i].selected);
                //遍历选项的seltcted属性
	     	}

**B) 添加选项**  

1. 通用的DOM方法：createElement("option");

2. Option 构造函数，接受两个参数：文本（text）和值（value）；第二个参数可选。

		var newOption = new Option("Option text", "Option value");
		selectbox.appendChild(newOption); //在IE8 及之前版本中有问题
3. 选择框的add()方法： 接受两个参数：要添加的新选项和将位于新选项之后的选项，第二个参数在IE中是可选的。为null或undefined表示插入到最后。 

		var newOption = new Option("Option text", "Option value");
		selectbox.add(newOption, undefined); //插入到最后（最佳方案）

**C) 移除选项**  

1. 使用DOM 的removeChild()方法：

		selectbox.removeChild(selectbox.options[0]); //移除第一个选项
2. 使用选择框的remove()方法。这个方法接受一个参数，即要移除选项的索引：

		selectbox.remove(0); //移除第一个选项
3. 将相应选项设置为null。这种方式也是DOM 出现之前浏览器的遗留机制。

		selectbox.options[0] = null; //移除第一个选项

**D) 移动和重排选项**  

1. 移动：使用 `appendChild()` 方法：

		var selectbox1 = document.getElementById("selLocations1");
		var selectbox2 = document.getElementById("selLocations2");
		selectbox2.appendChild(selectbox1.options[0]);  
移动选项与移除选项有一个共同之处，即会重置每一个选项的index 属性

2. 重排： 使用 `insertBefore()` 方法（appendChild()方法只适用于将选项添加
到选择框的最后）：  

		var optionToMove = selectbox.options[1];
		selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index-1]);  

### 8.4 表单序列化  
表单提交期间，浏览器是通过下面步奏将数据发送给服务器的：  

- 对表单字段的名称和值进行URL 编码，使用和号（&）分隔。
- 不发送禁用的表单字段。
- 只发送勾选的复选框和单选按钮。
- 不发送type 为"reset"和"button"的按钮。
- 多选选择框中的每个选中的值单独一个条目。
- 在单击提交按钮提交表单的情况下，也会发送提交按钮；否则，不发送提交按钮。也包括type
为"image"的<input\>元素。
- <select\>元素的值，就是选中的<option\>元素的value 特性的值。如果<option\>元素没有
value 特性，则是<option\>元素的文本值。

### 8.5 富文本   

1. 富文本编辑功能是通过一个包含空HTML 文档的iframe 元素来实现的。通过将空文档的
designMode 属性设置为"on"，就可以将该页面转换为可编辑状态，此时其表现如同字处理软件。另外，也可以将某个元素设置为 `contenteditable`。将该属性应用给页面中的任何元素，然后用户立即就可以编辑该元素。

		<div class="editable" id="richedit" contenteditable></div>
该属性有三个值：："true"表示打开、"false"表示关闭，"inherit"表示从父元素那里继承。 
2. 富文本编辑器并不属于表单。不会被自动提交到服务器。

#### 第二部分 end
  
******

