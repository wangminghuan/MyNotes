### 获取URL的查询参数

	var q={};
    location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
    console.log(q);

### 创建特定大小的数组

	[...Array(10).keys()]


### 正则test方法的一个坑

    var reg=/^[0-9a-zA-Z]*$/g
    var str1="f75ff5168e634e109fd50b2741c23f1a";
    var str2="f75ff5168e634e109fd50b2741c23f1a";
    console.log(reg.test(str1));// true
    console.log(reg.test(str2));// false

WTF?百思不得其解，翻阅文档可知：每个正则表达式都有一个 lastIndex 属性，用于记录上一次匹配结束的位置，包括exec，test方法

解决方法：

    var reg=/^[0-9a-zA-Z]*$/g
    var str1="f75ff5168e634e109fd50b2741c23f1a";
    var str2="f75ff5168e634e109fd50b2741c23f1a";
    console.log(reg.test(str1));//true
    reg.lastIndex=0;
    console.log(reg.test(str2));//true

或去掉全局模式g
    
    var reg=/^[0-9a-zA-Z]*$/
    var str1="f75ff5168e634e109fd50b2741c23f1a";
    var str2="f75ff5168e634e109fd50b2741c23f1a";
    console.log(reg.test(str1));//true
    console.log(reg.test(str2));//true
## 参考文章
1. [JS无形装逼，最为致命](https://mp.weixin.qq.com/s?__biz=MjM5MzUxNTgyMg==&mid=2455602546&idx=1&sn=afa8cc2bdce30e2b8311d6da69667b1c&chksm=b13cf533864b7c25c68e5cb7795e82681a0e0ebe789d44a6fd59d16b8182ef2df9b7d3df2765&mpshare=1&scene=23&srcid=#rd)