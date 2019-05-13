### 获取URL的查询参数

	var q={};
    location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
    console.log(q);

### 创建特定大小的数组

	[...Array(10).keys()]


## 参考文章
1. [JS无形装逼，最为致命](https://mp.weixin.qq.com/s?__biz=MjM5MzUxNTgyMg==&mid=2455602546&idx=1&sn=afa8cc2bdce30e2b8311d6da69667b1c&chksm=b13cf533864b7c25c68e5cb7795e82681a0e0ebe789d44a6fd59d16b8182ef2df9b7d3df2765&mpshare=1&scene=23&srcid=#rd)