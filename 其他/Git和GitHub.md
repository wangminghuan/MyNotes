##<font face="微软雅黑">Git和GitHub

**<font size="4" color="red" >一. 基础</font>**  
<font size="3"> **<font size="3" color="blue">1.svn与git区别:</font>**  
git是分布式，svn是集成式。链接更多区别点击 [Git和SVN之间的五个基本区别](http://blog.jobbole.com/31444/)

<font size="3"> **<font size="3" color="blue">2.建立一个库:</font>**  
1）克隆gitHub上的一个仓库  
**git  clone  [url]**

2）设置贡献者  
**git config --global  user.name  “your name”**  
**git config --global user.email  “your email”**  

3）查看所有配置项  
**git config --list**


<font size="3"> **<font size="3" color="blue">3.git的三个区:</font>**

1）工作区:本地编写代码的文件区域

2）暂存区: （类似svn add添加到分区）   
作为过渡层  
避免误操作  
保护工作区(可以将未开发完的代码提交到暂存区)和版本区  
分支处理  

2）版本区（库） 

**<font size="4" color="red" >二. 常用基础命令</font>**  
<font size="3"> **<font size="3" color="blue">1.查询状态:</font>**  
**git status** &emsp;&emsp;&emsp;查看暂存区和 工作区   

<font size="3"> **<font size="3" color="blue">2.添加命令:</font>**   
**git add [name]** &emsp;&emsp;name文件添加到暂存区  
**git add .**      &emsp;&emsp;&emsp;所有文件添加到暂存区   

<font size="3"> **<font size="3" color="blue">3.提交命令:</font>**  
**git commit -m “log 日志”**    &emsp;&emsp;&emsp;提交到版本库的命令合并  
**git commit -a -m “log 日志”**  &emsp;&emsp;直接提交到将暂存区和版本库的命令合并  

<font size="3"> **<font size="3" color="blue">4.查看日志:</font>**  
**git log** &emsp;&emsp;&emsp;查看提交记录 

**<font size="3" color="blue">5.对比命令:</font>** 
  
**git diff**&emsp;  &emsp;  &emsp;  &emsp;  &emsp;  工作区和暂存区的差异对比  
**git diff --cached(--staged)** &emsp;&emsp; 暂存区和版本库的差异对比  
**git diff master**  &emsp;&emsp; 工作区和版本库的差异对比  

**<font size="3" color="blue">6.撤销命令:</font>**
              
**git reset HEAD  <file.name>** &emsp; &emsp; 暂存区撤销回工作区  
**git checkout  <file.name>**   &emsp;&emsp;还原版本(默认从暂存区还原)  
**git checkout origin/master <file.name>**   &emsp;&emsp;从远程仓强制更新某个文件    
**git commit --amend** &emsp;&emsp;&emsp;&emsp;撤销上次提交记录   

**<font size="3" color="blue">7.删除命令:</font>**
：  
**git rm <file.name>**   &emsp;&emsp;&emsp;删除暂存区文件,工作区文件已经被删除(前提)  
**git rm -f <file.name>** &emsp;&emsp; 删除工作区和暂存区文件  
**git rm --cached <file.name>** &emsp;&emsp;只删除暂存区，不操作工作区文件  

**<font size="3" color="blue">8.恢复命令:</font>**
  
**git checkout <commit_id> <file.name>**   &emsp;&emsp;对指定版本，特定文件的恢复  
**git reset --hard <commit_id>**  &emsp;&emsp; 对指定版本的恢复   
**git reset --hard HEAD^**  &emsp;&emsp;&emsp; 恢复到上一个版本   
**git reset --hard HEAD~<num>**&emsp;&emsp;&emsp; 恢复到上<num>个版本   
**git reflog**   &emsp;&emsp;&emsp; 显示操作记录，配合reset可以回滚丢失的log   

**<font size="3" color="blue">9.同步到远程仓库:</font>**


**git remote**  &emsp;&emsp;&emsp;&emsp;&emsp;获得远程仓名称(默认为origin)   
**git remote -v** &emsp;&emsp;&emsp;&emsp;查看提交路径地址   
**git push origin master** &emsp;推送到远程仓(期间会弹出账号密码出入框)   
</font>  

**<font size="4" color="red" >三. 多人协作</font>**    
<font size="3"> **<font size="3" color="blue">1.fetch:</font>**  
**git fetch**  &emsp;  将远程仓的内容拉取过来，但并不与本地代码进行合并(本地代码此时不会被修改)  
**git diff master origin/master**   &emsp; &emsp; &emsp;将本地代码与远程仓代码作比较，如果有差异的话将会打印出差异代码  
**Git merge orgin/master**   &emsp; &emsp; 将远程仓代码手动合并到本地代码中。编写者在本地代码中自行将冲突代码进行甄选。   

**<font size="3" color="blue">2.pull:</font>**   
**git pull**&emsp;  &emsp;  &emsp;  &emsp;  &emsp; 跳过中间步奏，直接进行拉取合并。  

</font>
**<font size="4" color="red" >四. 分支操作</font>**  
<font size="3"> **<font size="3" color="blue">1.Git分支:</font>**  
**git branch**     &emsp;  &emsp; 查看当前分支，'\*'表示当前选中分支  
**git branch <branch_name>**  &emsp; &emsp;创建新分支    
**git branch checkout <branch_name>**  &emsp; &emsp; 切换到指定分支  
**git checkout -b <branch_name>**  &emsp; &emsp; 创建新分支并切换到该分支  
**git merge <branch_name>**  &emsp; &emsp; &emsp;当前分支与<branch_name>进行合并    
**git branch --merged**   &emsp;  &emsp;查看与当前分支合并的分支  
**git branch --no-merged**   &emsp;  &emsp;查看未与当前分支合并的分支  
**git branch -d <branch_name>**   &emsp;删除已经与当前分支合并的分支(未合并无法删除)  
**git branch -D <branch_name>**   &emsp;删除任意一个分支(无论是否与主分支合并)   
//合并分支出现冲突时，会自动都加载到本地文件中，用户自行选择后，再进行提交


**<font size="3" color="blue">2.github上的分支:</font>** 
  
1）**git push origin <branch_name>**&emsp;通过git进行创建  
2）**github上直接创建** 

**<font size="3" color="blue">3.github上的标签:</font>**
              
1.**git tag**    &emsp;&emsp;&emsp;&emsp;&emsp;查看tag  
  **git tag <version>** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;创建tag  
  **git push origin <version>**&emsp;&emsp;tag推送到github     
2.github上直接创建

</font>  
**<font size="4" color="red" >五. 其他</font>**  

**CMD 常用命令**：  

cd ..  &emsp;  返回上一级  
ls &emsp;&emsp;查看文件夹结构  

### git bash 中文乱码问题
git config --global core.quotepath false

更多教程访问 [廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000) && [Pro Git 中文版](http://git.oschina.net/progit/)
******

