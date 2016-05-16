##HTML之其他应用

**<font size="4" color="red">一.内容编辑</font>**   
  添加属性：**contenteditable="true"**
    
     <div **contenteditable="true">编辑内容</div>

******

**<font size="4" color="red">二.语音输入</font>**  
    
     <input type="text" x-webkit-speech />
 
ps:chrome新版浏览器已经不支持了 
  
******

**<font size="4" color="red">三.桌面提醒</font>**  
Notification生成的消息不依附于某个页面，仅仅依附于浏览器   
早期接口：

	<script type="text/javascript">
	
	window.webkitNotifications.requestPermission();
	statue = window.webkitNotifications.checkPermission();
	var notification =window.webkitNotifications.createNotification("[imgurl]","Title","Body");
	notification.show();
	
	</script>
 现在chrome已经不支持了，新接口极其简单：
    
    <script type="text/javascript">
    var notification = new Notification("我的消息",{
            body : '内容',
            iconUrl : 'https://dn-st.b0.upaiyun.com/v4.9.x/images/49751d86.touch-icon-ipad.png',
            tag : {} // 可以加一个tag
        });
    </script>

******