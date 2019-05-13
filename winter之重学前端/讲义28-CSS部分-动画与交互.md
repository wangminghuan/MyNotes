
CSS 中跟动画相关的属性有两个：animation 和 transition。

### animation 属性

基本用法：

	@keyframes mykf
	{
	  from {background: red;}
	  to {background: yellow;}
	}
	
	div
	{
	    animation:mykf 5s infinite;
	}

实际上 animation 分成六个部分：

- animation-name 动画的名称，这是一个 keyframes 类型的值（产生一种数据，用于定义动画关键帧）；
- animation-duration 动画的时长；
- animation-timing-function 动画的时间曲线；
- animation-delay 动画开始前的延迟；
- animation-iteration-count 动画的播放次数；
- animation-direction 动画的方向。


### transition 属性
它有四个部分：

- transition-property 要变换的属性；
- transition-duration 变换的时长；
- transition-timing-function 时间曲线；
- transition-delay 延迟。

实际上，有时候我们会把 transition 和 animation 组合，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

	
	@keyframes mykf {
	
		
	  0% { top: 0; transition:top ease}
		
	  50% { top: 30px;transition:top ease-in }
	
	  75% { top: 10px;transition:top ease-out }
	
	  100% { top: 0; transition:top linear}
		
	}

###  timing-function-动画的时间曲线

CSS 的时间曲线选用的是（三次）贝塞尔曲线，贝塞尔曲线是一种被工业生产验证了很多年的曲线，它最大的特点就是“平滑”。时间曲线平滑，意味着较少突兀的变化，这是一般动画设计所追求的。

理论上，贝塞尔曲线可以通过分段的方式拟合任意曲线，但是有一些特殊的曲线，是可以用贝塞尔曲线完美拟合的，比如抛物线。