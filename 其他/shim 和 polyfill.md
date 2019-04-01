<font face="微软雅黑" size="4" >
<font size="6">shim 和 polyfill</font>

##  shim 

Shim 指的是在一个旧的环境中模拟出一个新 API ，而且仅靠旧环境中已有的手段实现，以便所有的浏览器具有相同的行为。主要特征：
1. 该 API 存在于现代浏览器中;
2. 浏览器有各自的 API 或 可通过别的 API 实现;
3. API 的所有方法都被重新实现；
4. 拦截 API 调用，并提供自己的实现；
5. 是一个优雅降级。

##  polyfill

polyfill 是一段代码(或者插件)，提供了那些开发者们希望浏览器原生提供支持的功能。程序库先检查浏览器是否支持某个API，如果不支持则加载对应的 polyfill。主要特征：

1. 是一个浏览器 API 的 Shim;
2. 与浏览器有关;
3. 没有提供新的API，只是在 API 中实现缺少的功能;
4. 以只需要引入 polyfill ，它会静静地工作;

##  二者区别
shim 是一个库,将不同 api封装成一种，比如 jQuery的 $.ajax 封装了 XMLHttpRequest和 IE用ActiveXObject方式创建xhr对象, 它将一个新的 API 引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现（没有遵循标准API规范，而是又实现了一套）

polyfill也是一个js库，它的做法通常是:先检查浏览器是否支持某个标准 API,如果不支持,就使用旧的技术对浏览器做兼容处理,这样就可以在旧的浏览器上使用新的标准 API。(polyfill 是 shim 的一种,它的 API 是遵循标准的)

这是处理js兼容性问题的两种思路，都可以解决实际问题，但polyfill的设计思想更优秀，首先，不需要额外的学习成本（譬如学习$.ajax的写法），其次，后续浏览器支持标准API后，移除polyfill相关js库即可，不需要做任何其他改动。

## 参考文献

1. [javascript术语shim 和 polyfill](https://www.html.cn/archives/8339)
2. [shim和polyfill](https://www.jianshu.com/p/ce84169a28f4)

</font>
