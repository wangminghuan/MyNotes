<font face="微软雅黑" size="4" >
<font size="6">javascript浏览器端加载逻辑</font>

## 1 script标签的默认行为
1. script标签的会阻止文档渲染。相关脚本会立即下载并执行。注意：（不带defer或async属性）,
2. ie8+，ff，chrome，opera都是下载完html后，接着并行下载css和多个js，即使将script放在页面最后`</body>`之前也是如此。所以，html中资源的下载是异步，但是每个javascript执行的时候还是同步的，就是先出现的script标签一定是先执行，即使是并行下载它最后一个下载完成。
2. document.currentScript 可以获得当前正在运行的脚本(Chrome 29+, FF4+)。
3. 脚本执行顺序在默认情况下和script标签出现的顺序一致。
4. js有阻塞特性，即当浏览器在执行JS 代码时，不能同时做其他任何事情，无论其代码是内嵌的还是外部的。

## 2 async属性
async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。由脚本插入的script标签默认是async的。对內联脚本设置async属性是没有意义的，也不产生其他效果。其包含的脚本总是立即执行的。多个async脚本是不能保证加载顺序的


## 3 defer属性
defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；，如果有多个defer脚本，会按照它们在页面出现的顺序加载。  

注意，defer属性并不是每个浏览器支持，即便支持的浏览器，也会因为版本不一样导致具体行为不一致。可以通过将script标签放置到文档末尾这种简单的做法达到defer属性一样的效果。

## 4 小结

1. 仅有async属性，脚本会异步执行
2. 仅有defer属性，脚本会在文档解析完毕后执行
3. 两个属性都没有，脚本会被同步下载并执行，期间会阻塞文档解析

## 5 document.write

如果我们在html文件中直接写入：
    
	<!DOCTYPE html>
	<html lang="en">
	<head>
     //省略
	<script>document.write("hello world")</script>
    </head>
    <body>
	</body>
	</html>

在以上代码中，原来的文档内容并没有被清空，这是因为当前文档流是由浏览器所创建，并且document.wirte()函数身处其中，也就是执行此函数的时候文档流并没有被关闭，这个时候不会调用document.open()函数创建新文档流，所以也就不会被覆盖了。

	<!DOCTYPE html>
	<html lang="en">
	<head>
     //省略
	<script> 
	  window.onload=function(){
	    document.write("重温 JavaScript");
	  }
	</script>
    </head>
    <body>
	</body>
	</html>
	

window.onload事件是在文档内容完全加载完毕再去执行事件处理函数，当然文档流已经关闭了，这个时候执行doucment.writ()函数会自动调用document.open()函数创建一个新的文档流，并写入新的内容，再通过浏览器展现，这样就会覆盖原来的内容。

所以，如果一个延迟加载的脚本：
   
      <script src="js/3.js" defer></script>
      // 3.js 内容为：
	  //console.log("3.js",new Date().getTime())
	  //document.write("333333333333")

被延迟的脚本进行document.write写入时, 由于document已经关闭, 所以 document.write 没有效果


## 参考文章
1. [JS 中document.write()的用法和清空的原因浅析](https://www.jb51.net/article/129715.htm)
2. [Script标签和脚本执行顺序](https://www.jianshu.com/p/bda5266755a2)

</font>
