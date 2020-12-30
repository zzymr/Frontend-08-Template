学习笔记
TicTacToe

1、创建二维数据 
2、进行视图渲染绘制，增加样式 show()
3、添加点击事件，小技巧：对称   12 = 3-1/3-2  或 1*2/2*1
4、判断输赢 check()函数  横向，纵向，对角线（正、反）
   小技巧：块级作用域 {} 变量可以起同样的名字，反复使用 wins
5、检查下一步存在可以赢  clone函数pattern 不能破坏之前的pattern  初步Ai

6、bestChoice point result
-2 （1 -1）互为相反数  0 

我们走完看给对方留下的最差的局面是什么
win-lost 胜负剪枝(找到一个点赢就停止了) 不能保证赢的最多，但是全搜索可以保证赢的最多



采用一维数组 乘法区分行和列 X轴变3的倍数余数  Y轴变3的倍数 ij => i*3+j yx=>y*3+x
结束两层循环 用标记label

变为一维数据
多了一种方法 克隆对象减少占用内存空间
Object.create();


红绿灯实现
1、回调地狱，嵌套
2、promise 链式调用  .then .all .pace(竞争)

3、async/ await 更加友好的语义化代码实现，语法改进 和同步代码一样
   向同步代码一样进行异步编程，最终节点肯定有return new Promise的返回
4、gengerator模拟async函数
   gengerator函数会返回一个iterator迭代器
   模仿著名框架co
while(true)在异步变成中比较常用，事件循环中也有体现







