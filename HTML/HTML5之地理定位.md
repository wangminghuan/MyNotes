##HTML5之地理定位
**********
###一. 概述
 
1. HTML5 Geolocation API 用于获得用户的地理位置。  
 现在许多LBS（*Location Based Service 基于位置服务*）应用均是基于定位而来。


2. 位置信息从何而来？    
	a) IP地址  （不准确）  
	b) GPS全球定位系统  
	c) Wi-Fi无线网络  （不准确）  
	d) 基站  
******
###二. Geolocation 

 Geolocation API存在于navigator对象中，只包含3个方法：

<font size=3 color="RED"> 1) getCurrentPosition</font>  
<font size=3 color="RED"> 2) watchPosition</font>  
<font size=3 color="RED"> 3) clearWatch</font>  

**<font size=4 color="blue">1.单次定位请求**</font>：   
**getCurrentPosition**(请求成功，请求失败，数据收集方式)

<font size=4 color="DarkMagenta">请求成功后传递过来的信息: </font>
 
经度 :  coords.longitude  
纬度 :  coords.latitude  
准确度 :  coords.accuracy  
海拔 :  coords.altitude   
海拔准确度 :  coords.altitudeAcuracy  
行进方向 :  coords.heading    
地面速度 :  coords.speed  
时间戳 : new Date(position.timestamp)  

<font size=4 color="DarkMagenta">请求失败后传递过来的信息: </font>  
失败编号  ：code  
0  :  不包括其他错误编号中的错误  
1  :  用户拒绝浏览器获取位置信息  
2  :  尝试获取用户信息，但失败了  
3  :   设置了timeout值，获取位置超时了   
   
<font size=4 color="DarkMagenta">数据收集配置 : </font> （json的形式）    
enableHighAcuracy  :  更精确的查找，默认false（也就是多次请求）  
timeout  :  获取位置允许最长时间，默认infinity  
maximumAge :  位置可以缓存的最大时间，默认0	  

实例：
 
	if(navigator.geolocation){				
          var oBtn=document.getElementById('btn1');
          var oDiv=document.getElementById('div1');
          oBtn.onclick=function(){
          var positioner=navigator.geolocation.getCurrentPosition(localSucess,localError,{
		      	enableHighAcuracy: false,
		      	timeout : 5000,  
		        maximumAge:5000
               })
             } 
    	}else{
    		alert("您的设备不支持定位")
    	}

       //成功调用函数
    	function localSucess(position){
             var lon=position.coords.longitude;
             var lat=position.coords.latitude;       
          oDiv.innerHTML="经度："+lon+",纬度："+lat;   
        };

       //失败调用函数
        function localError(error){
            switch(error.code) {
        case 3:
            console.log(error.code+":A timeout occured! Please try again!");
            break;
        case 2:
            console.log(error.code+':We can\'t detect your location. Sorry!');
            break;
        case 1:
            console.log(error.code+':Please allow geolocation access for this to work.');
            break;
        case 0:
            console.log(error.code+':An unknown error occured!');
            break;
          }
        };


**<font size=4 color="blue">2.多次定位请求**</font>：     
**watchPosition**(请求成功，请求失败，数据收集方式)  

有点类似setInterval，但该方法在移动设备比较有用，在移动设备位置改变时才会触发。  
配置参数（多一个参数）：frequency 更新的频率

**<font size=4 color="blue">3.清除定位请求**</font>：     
**clearWatch**(watchID) 

配合watchPosition()使用，用于停止watchPosition()轮询。
watchPosition()需要定义一个watchID 

	var watchID = watchPosition(...)，
	navigator.geolocation.clearWatch(watchID);
    //使用方法类似setInterval
<font color="red">关于百度API的奇葩bug：
  	
	body, html,#div1{width:100%;height:400px;overflow: hidden;margin:0;}

此处必须使用#id设置样式，不然地图上不会出现位置信息的红色图标！！！