学习笔记
同余特性：一维数组表示二维数组
1、先编写地图编辑器，1表示有墙  视觉上变成墙，逻辑上变成墙
e.which === 3 鼠标/键盘点击key值
参考文档：https://blog.csdn.net/wxz295682941/article/details/64443902
2、寻路问题，
第一步：上下左右都可以
数组可以作为天然的  队列push和shift、pop和unshift相对，栈 push和pop对应 shift和unshift同理，但是一般不用，考虑到javascript数组的实现，这样的性能会变低。

广度搜索优先： start周围四个点加入队列，再然后逐个把它周围的点都加进队列，一直到队列变空为止  queue
深度优先：stack
已经走过的点，标记特殊状态为2
3、可视化显示
4、找到前驱节点 把标记2的地方变为标记前驱节点的过程 找周边节点写为上一个前驱节点
pre传进去，pre写入table ，沿着pre链路找路径

5、启发式寻路：通过函数判断扩展点的优先级
   最终可以找到A*（A寻路的特例） 找不到叫A
   sorted 简单的数组、winner tree heap堆 二叉树
   每次都拿最小的一个数组  Array的sort保持一致
   最后一个交换然后pop 

   sorted 实现take和give  splice O(n)的时间复杂度 替换为交换到尾部pop

   实现distance函数，比较扩展出的点到终点的距离最短的点
二叉堆 取/插难点
最短路径