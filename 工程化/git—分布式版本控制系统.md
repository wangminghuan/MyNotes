##Git-分布式版本管理系统

**<font size="4" color="red" face="微软雅黑">一. Git分支管理策略</font>**  
**<font size="3" color="blue" face="微软雅黑">1. 二级标题</font>**   
A) Git有很多优点。其中很显著的一点，就是版本的分支（branch）和合并（merge）十分方便。有些传统的版本管理软件，分支操作实际上会生成一份现有代码的物理拷贝，而Git只生成一个指向当前版本（又称"快照"）的指针，因此非常快捷易用。

B)  Git分支管理策略
  
******

**<font size="4" color="red" face="微软雅黑">一. 分支管理策略</font>**  
**<font size="3" color="blue" face="微软雅黑">1.  本地版本控制系统</font>**   
 RCS，无法不同系统上协同工作。

**<font size="3" color="blue" face="微软雅黑">2.  集中化的版本控制系统</font>**      
CVCS（Centralized Version Control Systems），例如 CVS、Subversion（SVN） 以及 Perforce 等
**特点**：都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。  
**缺点**：一旦宕机，都无法工作。  

**<font size="3" color="blue" face="微软雅黑">3.  分布式版本控制系统</font>**  
DVCS（Distributed Version Control System）,例如目前很火的git，Mercurial、Bazaar 以及 Darcs 等。    
**特点**：客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。 这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。  

Git有很多优点。其中很显著的一点，就是版本的分支（branch）和合并（merge）十分方便。有些传统的版本管理软件，分支操作实际上会生成一份现有代码的物理拷贝，而Git只生成一个指向当前版本（又称"快照"）的指针，因此非常快捷易用。  
 
******
**<font size="4" color="red" face="微软雅黑">一. Git的强大之处</font>**  
**<font size="3" color="blue" face="微软雅黑">1. 近乎所有操作都是本地执行</font>**   

**<font size="3" color="blue" face="微软雅黑">2. Git 保证完整性</font>**   

**<font size="3" color="blue" face="微软雅黑">3. Git 一般只添加数据</font>**   

 

  
******