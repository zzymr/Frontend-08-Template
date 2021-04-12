学习笔记

### Proxy 
用途：强大且危险的设计，应用了proxy的代码，预期性会变差，专门为底层库设计的特性

new Proxy 出来的对象才会被监听处理， 原对象没有直接被改变
特殊的对象，所有的行为都可以被改变

reactive
监听
effect
没有办法获得函数里面引了哪些变量  函数调用了object哪些属性
可以调用一下函数看看使用了哪些变量
引用普通变量无法监听，但是调用了reactive函数可以通过get方法查看
vue用了特殊技巧
调用reactive的get方法查看

reactive get是的时候注册进usedReactivties中，类似依赖收集
callbacks第一层放对象，第二次放属性
未考虑解除的效果 
proxy.a.b形式处理
增加缓存处理
reactive是无状态的

详细的处理参考vue3.0 的reactivity 实现

应用领域：数据到dom元素的监听 native


拖拽 range cssom
mousedown mouseup mousemove模拟实现
拖拽技巧
监听document的up和move事件 否则监听本身划出浏览器窗口外监听中断

文字不分节点，需要用Range找到空位
建立Range表，把能插的空隙列出来 
拿到了range，但是不知道位置，用到CSSOM API

range里面找到离point最近位置的点