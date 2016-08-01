##<font face="微软雅黑" size="4" >DOM优化建议

**<font color="blue">1.1 节点操作与innerHTML</font>**   
chrome下：dom操作（如：appendChild等）性能比innerHTML方法好，其他浏览器则相反。  
**<font color="blue">1.2 节点克隆</font>**   
 element.cloneNode()；性能比每次都创建节点要好；  
**<font color="blue">1.3 元素节点</font>**   
尽量用只获取元素的节点方法  
**<font color="blue">1.4 元素选择器</font>**   
querySelector,querySelectorAll：性能比getElementById()等要好；    
**<font color="blue">1.5 cssTetx</font>**   
和innerHTML一样，cssText很快捷且所有浏览器都支持。此外当批量操作样式时，cssText只需一次reflow，提高了页面渲染性能；  

缺点：会覆盖之前的样式；  

解决：使用cssText时应该采用叠加的方式以保留原有的样式。（E6/7/8中cssText返回值会少了分号，需要做兼容处理 ）


</font>  
******

