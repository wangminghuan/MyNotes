<font face="微软雅黑" size="4" >
<font size="6">数组去重的几种方式</font>


## 1 ES6的set语法
1. ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
2. Set 本身是一个构造函数，用来生成 Set 数据结构
3. Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

		var arr=[1,2,3,4,5,2,4,7,1,6,2,8,9,6,8,9];
		var set = new Set(arr);
		var newArr = Array.from(set);
		var newArr2=[...set];
		console.log(newArr)// [1, 2, 3, 4, 5, 7, 6, 8, 9]
		console.log(newArr2)//[1, 2, 3, 4, 5, 7, 6, 8, 9]

## 2 两层循环

		var newArr3=[];
		for(var i=0;i<arr.length;i++){
		    for(var j=i+1;j<arr.length;j++){
		        if(arr[i] === arr[j]){
		            //i++会先将i的值赋给等号左边的变量然后i再加1,而++i则先加1再赋值.
		            j = ++i;
		            //可以这样理解，将数组第一项取出来，依次和后面的数组对比，
		            //如果遇到相同的，说明这一项有重复的，将第一层的索引往前推一下，（++i）,同时将j也往前推了一下
		            //如果没有遇到相同的，说明i可用，直接推到新数组内即可
		        }
		    }
		    newArr3.push(arr[i])
		}
		console.log(3,newArr3)//[3, 5, 4, 7, 1, 2, 6, 8, 9]
## 3 两层循环（数组剔除）

	var newArr4=[],len4=arr.length;
	for(var i=0;i<len4;i++){
	    for(var j=i+1;j<len4;j++){
	        if(arr[i] === arr[j]){
	            arr.splice(j,1);
	            j--;
	            len4--;
	          //取出第一项，与后面比较，遇到重复的就剔除掉后面的数据，同时将数据长度减1
	        }
	    }
	    newArr4.push(arr[i])
	}
	console.log(4,newArr4);//[1, 2, 3, 4, 5, 7, 6, 8, 9]

## 4 一层循环（对象属性不重复）

	var newArr5=[],len5=arr.length,obj5={};
	for(var i=0;i<len5;i++){
	    if(!obj5[arr[i]]){
	        obj5[arr[i]]=1;
	        newArr5.push(arr[i])
	    }
	}
	console.log(5,newArr5);//[1, 2, 3, 4, 5, 7, 6, 8, 9]
## 5 一层循环（map+indexOf）

	var newArr6=[],len6=arr.length;
	arr.map(function(item,index){
	    //indexOf：要查找的项和（可选的）表示查找起点位置的索引
	      if(arr.indexOf(item,index+1)==-1){
	        newArr6.push(item)
	      }
	})
	console.log(6,newArr6);//[1, 2, 3, 4, 5, 7, 6, 8, 9]

##  参考文献

1. [媒体查询](http://www.runoob.com/cssref/css3-pr-mediaquery.html)


