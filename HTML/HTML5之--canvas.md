##<font face="微软雅黑" size="4" >Canvas 绘图
canvas元素是为了客户端矢量图形而设计的。它自己没有行为，但却把一个绘图 API 展现给客户端 JavaScript 以使脚本能够把想绘制的东西都绘制到一块画布上。  
**<font size="5" color="red" >一. 初级</font>**  
**<font color="blue">1.1 标签</font>**
   
	<canvas height="400" width="400">
	    不支持canvas的浏览器可以看到的内容
	</canvas>
    //<!--默认：宽300px 高150px-->
    //canvas宽高在行间设置，css中设置的宽高只是按默认比例进行缩放
通过上述设置来兼容不支持canvas的浏览器  
**<font color="blue">1.2 绘制环境</font>**   
getContext('2d') : 该方法返回一个用于在画布上绘图的环境（目前支持2d的场景）
 
	var oGc=document.getElementById('cav1').getContext('2d');
之后的所有操作均是以这个**绘图环境**作为操作对象的；  
**<font color="blue">1.3 绘制方块</font>**   
**A) fillRect**(L,T,W,H) :   默认颜色是黑色；  
**B) strokeRect**(L,T,W,H) :  带边框的方块，默认一像素黑色边框，显示出来有时候会是2px（左右各占0.5px，但会被浏览器解析为1px；如果起点坐标为：[50.5，50.5]则会正常解析）；

**<font color="blue">1.4 设置绘图样式</font>**   
一般需要先设置绘图样式，再进行绘制，否则样式会不生效；  
**A)fillStyle**:   填充颜色(绘制canvas是有顺序的)，只针对通过fillxx方式绘制的图形有效；  
**B)lineWidth**:   线宽度，是一个数值；  
**C)strokeStyle**： 边线颜色；  

	var oGc=document.getElementById('cav1').getContext('2d');
	    oGc.fillStyle= "red";
	    oGc.strokeStyle = 'blue';
		oGc.lineWidth = 10;
		oGc.lineCap = 'round';
		oGc.fillRect(20,20,100,100); //绘制矩形
	    oGc.strokeRect(20,20,100,100);//绘制带边框的矩形，最后两条顺序不一致，结果也不一样，可以按PS中的图层来理解
**<font color="blue">1.5 边界绘制</font>**   
**A) lineJoin** : 边界连接点样式  
miter(默认) 、round(圆角)、bevel(斜角)  
**B)lineCap**  :   端点样式(指绘制直线的端点)  
butt(默认)、round(圆角)、square (高度多出为宽一半的值)

**<font color="blue">1.6 路径绘制</font>**   
**A) beginPath** :  开始绘制路径(不推荐略写)  
**B) closePath**  :  结束绘制路径(不推荐略写)  
**C) moveTo**  :  移动到绘制的新目标点  
**D) lineTo**  :  新的目标点  
**E) stroke**  :  画线，默认黑色  
**F) fill**  :  填充，默认黑色  

	    oGc.beginPath(); //开始绘制路径
		oGc.strokeStyle = 'blue';//边界颜色为蓝色，要提前说明
		oGc.moveTo(100,100); //设置起始点
		oGc.lineTo(200,200); //设置目标点
		oGc.lineTo(300,200); //设置目标点
		oGc.closePath();   //闭合路径
		oGc.stroke();   //划线绘制
       //oGc.fill();  填充绘制 
**G) rect**  :  矩形区域  
       
		//等同于fillRect(L,T,W,H) : 默认颜色是黑色； 
		oGc.beginPath();
	    oGc.rect(100,100,100,100);
	    oGc.closePath();
	    oGc.fill();

		//等同于strokeRect(L,T,W,H)； 
		oGc.beginPath();
	    oGc.rect(100,100,100,100);
	    oGc.closePath();
	    oGc.stroke();

**H) clearRect**  :   删除一个画布的矩形区域  
**I) save**  : 保存路径  
**J) restore**  :  恢复路径  
       
	oGc.save();  //保存路径
	oGc.fillStyle = 'red';
	oGc.beginPath();
	oGc.moveTo(100,100);
	oGc.lineTo(200,200);
	oGc.lineTo(300,200);
	oGc.closePath();
	oGc.fill();
	oGc.restore();//恢复路径，save-restore之前的代码形成一个作用域，使得fillstyle样式只能在该作用域中生效；
                 //若无这两句，上下两个三角形都会变成红色，而非现在的上红下黑	
	oGc.beginPath();
	oGc.moveTo(100,200);
	oGc.lineTo(200,300);
	oGc.lineTo(300,300);
	oGc.closePath();
	oGc.fill();


**<font color="blue">1.7 圆形绘制</font>**   
**arc(x, y, 半径, 起始弧度, 结束弧度, 旋转方向)**   
![arc图解](http://i.imgur.com/4brxQ7Y.jpg)   


**A)**x,y : 圆心坐标；  

**B)**起始弧度和结束弧度如图所示：其中弧度 = 角度\*Math.PI/180；

**C)**旋转方向：顺时针(默认：false)、逆时针(true);
 
	oGc.arc(200,200,150,0,90*Math.PI/180,true);
	oGc.stroke();

**<font color="blue">1.8 曲线绘制</font>**   
**A) arcTo(x1,y1,x2,y2,r)**  
第一组坐标、第二组坐标、半径    

	oGc.beginPath();
	oGc.moveTo(20,20);           // 创建开始点
	oGc.lineTo(100,20);          // 创建水平线
	oGc.arcTo(150,20,150,70,50); // 创建弧
	oGc.lineTo(150,120);         // 创建垂直线
	oGc.stroke();                // 进行绘制

**B) quadraticCurveTo(dx,dy,x1,y1)**  
贝塞尔曲线：第一组控制点、第二组结束坐标   

	oGC.moveTo(100,200);
	oGC.quadraticCurveTo(100,100,200,100);
	oGC.stroke();
**C) bezierCurveTo(dx1,dy1,dx2,dy2,x1,y1)**  
贝塞尔曲线：第一组控制点、第二组控制点、第三组结束坐标  

	oGC.moveTo(100,200);
	oGC.bezierCurveTo(100,100,200,200,200,100);
	oGC.stroke();
 
**<font color="blue">1.9 变换</font>**  
Canvas的变换与css3基本一致：     
**A) translate** 偏移：从起始点为基准点，移动当前坐标位置;  

**B) rotate** 旋转：参数为弧度;  

**C) scale** 缩放;  

**<font size="5" color="red" >二. 进阶</font>**  
**<font color="blue">2.1 插入图片操作</font>**   
**drawImage(oImg,x,y,w,h)**  
-oImg : 当前图片;  
-x,y : 图片放入画布的起始坐标;  
-w,h : 画布展示图片的宽高

	var oC =document.getElementById('c1');
	var oGC = oC.getContext('2d');
	var oImg = new Image();
	oImg.src = '2.png';
	yImg.onload = function(){ 
		draw(this);//图片加载完后在绘制在画布上
	};
	function draw(obj){	
    //插入图片
		oGC.drawImage(obj,0,0);
    //设置背景    
		var bg = oGC.createPattern(obj,'repeat');
		oGC.fillStyle = bg;
		oGC.fillRect(0,0,300,300);
	}
**<font color="blue">2.2 设置背景</font>**   
**createPattern(obj,平铺方式')**;  
平铺方式：repeat,repeat-x,repeat-y,no-repeat;  

	function draw(obj){	
    //设置背景    
	var bg = oGC.createPattern(obj,'repeat');
	oGC.fillStyle = bg;
	oGC.fillRect(0,0,300,300);
	}

**<font color="blue">2.3 渐变</font>**   
**A) 线性渐变：createLinearGradient(x1,y1,x2,y2)**  
-x1,y1:起始点坐标；  
-x2,y2:终点坐标；   
addColorStop(位置，颜色) 

	var oC =document.getElementById('c1');
	var oGC = oC.getContext('2d');
	var obj = oGC.createLinearGradient(150,100,250,200);
	//注意起点坐标,终点坐标要和绘图区域对应起来，否则渐变起始点就会不一致
	obj.addColorStop(0,'red');
	obj.addColorStop(0.5,'yellow');
	obj.addColorStop(1,'blue');
	
	oGC.fillStyle = obj;
	
	oGC.fillRect(150,100,100,100);
**B) 放射性渐变 createRadialGradient(x1,y1,r1,x2,y2,r2)** 
-x1,y1,r1:第一个圆的圆心坐标和半径；  
-x2,y2,r2:第二个圆的圆心坐标和半径；  

	var oC =document.getElementById('c1');
	var oGC = oC.getContext('2d');
	
	var obj = oGC.createRadialGradient(200,200,100,200,200,150);
	
	obj.addColorStop(0,'red');
	obj.addColorStop(0.5,'yellow');
	obj.addColorStop(1,'blue');
	
	oGC.fillStyle = obj;
	//渐变区域在两个圆环之间
	oGC.fillRect(0,0,oC.width,oC.height);
**<font color="blue">2.4 文本操作</font>**   
**A) strokeText(文字, x, y)：文字边框**   
-x,y为文字起点坐标；  
**B) fillText(文字, x, y)：文字填充**   
-x,y为文字起点坐标；   
**C) font：文字大小** 

**D) textBaseline：文字基线对齐方式**   
取值有：top，middle， bottom  

**E) textAlign：文字对齐方式**  
取值有：start(等同于left),left,right,end,center;

	oGC.font = '60px impact';
	oGC.textBaseline = 'top';
	oGC.textAlign='start';
	oGC.fillText('妙味课堂',0,0);
	oGC.strokeText('妙味课堂',0,200);  

**F) measureText(str).width：获取文字的宽度**  
没有对应的高度方法，高度即为字体大小；

**<font color="blue">2.5 阴影</font>**   
**A) shadowOffsetX**:X轴偏移； 

**B) shadowOffsetY**：Y轴偏移；  

**C) shadowBlur**：高斯模糊值；   

**D) shadowColor**：阴影颜色；  

     //阴影和字体宽度合在一起的例子	
	oGC.font = '60px impact';
	oGC.textBaseline = 'top';  //middle bottom
	oGC.shadowOffsetX = 10;
	oGC.shadowOffsetY = 10;
	oGC.shadowBlur = 3;

	//alert(oGC.shadowColor);  //默认颜色：黑色透明

	oGC.shadowColor = 'yellow';
	var w = oGC.measureText('妙味课堂').width;
	//文字居中（画布）显示
	oGC.fillText('妙味课堂',(oC.width - w)/2,(oC.height - 60)/2);  
**<font color="blue">2.2 二级标题</font>**   
**A)** 

**B)** 

**<font color="blue">2.2 二级标题</font>**   
**A)** 

**B)** 
	
**<font size="5" color="red" >三. 标题3</font>**  
**<font color="blue">3.1 二级标题</font>**   
**A)** 

**B)**   
**<font size="5" color="red" >四. 标题4</font>**  
**<font color="blue">4.. 二级标题</font>**   
**A)** 

**B)**   
</font>  
******

