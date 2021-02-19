学习笔记
## 1. 浏览器总论 | 浏览器工作原理总论
### 实现一个Toy-Brower学习浏览器工作原理
### 浏览器完成渲染的流程
1. URL => HTTP  HTTP请求，解析HTTP回应过程，把URL中包含的HTML取出来
2. HTML => parse  对文本的HTML进行parse，即一般的文本分析或者编译的初级的技术，HTML变为熟悉的DOM树
3. DOM => css computing DOM树上对应的哪些CSS的规则，哪些CSS的规则会发生叠加，会发生覆盖，把最终的结果计算出来，最后得带CSS属性的DOM树，严格来说是带样式的DOM
4. DOM with css =>  Layout 布局/排版 通过Layout步骤，最终把这颗DOM树上面的所有元素产生的盒的位置计算出来。获得位置的不是DOM元素本身，而是CSS最后生成的核，Toy-Brower中仍然看成每个DOM生成一个盒子
5. DOM with position => render 渲染 DOM图有背景图，背景色等画到一张图片上，通过操作系统，硬件驱动提供的API接口把展现给我们
6. Bitmap 只有这个最后传递给显卡才能转化为人眼可识别的光信号 浏览器完全的架构图
#### 在计算机中最后显示在屏幕上的一定是图片形式，术语Bitmap，只有这个最后传递给显卡才能转化为人眼可识别的光信号。一个现代浏览器包含很多功能性的东西，比如收藏，历史等


## 2. 状态机 | 有限状态机
### 有限状态机处理字符串 处理字符串是整个Brower贯穿始终的一个技巧
### 平时代码表示状态，面向对象的设计模式里面也有状态模式，状态机的状态和与它们的差异还是比较大的
### 重点在机上，不在状态上，之所以用有限状态机去处理一些问题，是因为有限状态机里面的每一个机器都是解藕的，每个状态都是一个独立的机器的思想，让有限状态机变成了一个强有力的抽象机制，有限状态及最大的特点就是，每一个状态都是一个机器

+ 每一个状态都是一个机器
    + 在每一个机器里，我们可以做计算、存储、输出。意味着我们编写状态机的代码时候，可以完全忽略其他状态机的逻辑，只关心本状态要处理什么，游戏中广泛应用AI,用来简化逻辑。
    + 所有这些机器接受的输入是一致的； 要么都接受字符串，要么都接受整数
    + 状态机的每个机器本身是不能再有状态，如果用函数表示，这个状态机里面的这些函数都是纯函数，不能有副作用。比如针对其他的像输出，改变变量不属于副作用，这里的副作用指的的机器不能再收到外部的输入控制，输出是可以的。用函数表示状态机的时候，可以往外写，不能再从外边读变量进来，一旦读取影响状态机本身的状态切换逻辑
+每一个机器知道下一个状态 (经典的有限状态机理论有以下两种状态机)
    + 每个机器都有确定的下一个状态(Moore)  a不管接受什么输出都会进入b b...c，还可以有循环，c-b或者c-a 状态回到哪里由程序员编写代码的时候就决定好的，而不是受它的输入影响可以做分支的
    + 每个机器根据输入决定下一个状态(Mealy) 大多数比较实用的一种，带来了代码的复杂性，但同时也带来了非常强的表达能力
#### js实现 Mealy 状态机
+ js中的状态机的理想实现就是一系列返回状态函数的这样一批状态函数在调用的时候往往会用一个循环获取输入，然后通过 state = state(input) 这样的一种调用方式来让状态机接受输入，并且完成状态切换，这样这个state变量就是永远保持当前状态。不管用什么方式换取一个input，它就发生一次状态迁移，并且完成每个状态所需要完成的计算。 
+ Mealy 状态机 return几乎一定是根据input去在一系列if esle或者switch case里面
+ Moore型状态机return和input无关，返回一个固定的状态
## 3. 状态机 | 不使用状态机处理字符串（一）
## 4. 状态机 | 不使用状态机处理字符串（二）
不用正则表达式在一段字符串中找到ab
+ 是否找到a 用flag标示
+ flag为true继续找b 
## 5. 状态机 | 不使用状态机处理字符串（三）
不用正则表达式在一段字符串中找到abcdef
+ 多个flag，分别为true后继续进行查找，直到flagE && c === 'f'结束
## 6. 状态机 | 使用状态机处理字符串（一）
+ js中使用函数实现状态机
+ 小技巧：状态退出的时候，仍然想把状态交给下一个状态去处理的话，加上start(c),行为在状态机里面叫reConsume,相当于重新使用的逻辑。
## 6. 状态机 | 使用状态机处理字符串（二）
+ 状态机处理重复字符串的技巧
### 作业：状态机表达KMP算法
## 8. HTTP请求 | HTTP的协议解析
ISO七层网络模型
+ 4G/5G/WI-FI 目标是完成对数据的准确传输，点对点传输（必须两个之间有一个直接的连接）
    + 物理层
    + 数据链路层
+ Internet 
    + 网络层   Internet协议就是ip协议
+ TCP 对应到node代码里面是 tcp对应的是一个包 require('net')   完成HTTP的请求和HTTP的回应解析
    + 传输层   网页需要可靠传输TCP
+ HTTP 对应到node代码里面是 require('http')
    + 会话层
    + 表示层
    + 应用层
### 上网有两层意思
+ 网页所在的应用层的协议  外网 万维网 公司内网：intranet
+ 底层负责数据传输的 Internet网

### TCP和IP的基础知识
+ 流
+ 端口 TCP协议被计算机中的软件所使用，每个软件从网卡那数据，哪个数据是分配给哪个软件的，计算机通过端口把接到的数据分给各个应用 对应node require('net')
+ require('net')
+ 包
+ IP地址 根据地址找到包应该从哪到哪 唯一的表示标示了连入Internet的每一个设备
+ libnet(负责构造IP包并且发送)/libpcap(从网卡抓流经网卡的所有包)  node用到c++底层的两个包
### HTTP
+ Request
+ Response
像TCP这种全双工通道：两边都可以互相发，HTTP必须先由客户端发送一个Request，再由服务端响应一个Response 1:1

## 9. HTTP请求 | 服务端环境准备
### HTTP协议 纯文本协议 意味着协议里面所有内容都是字符串组成,文本型协议一般和二进制协议相对应
+ POST /HTTP/1.1        Request line
+ Host: 127.0.0.1                                  headers
+ Content-Type: application/x-www-form-urlencoded  headers
----------------
+ field=aaa&code=x%3D1       body
----------------
+ 字符串采用unicode 或者ASCII编码传递
+ HTTP在TCP的上层，流淌在TCP流中所有的内容都可以视为是字符
+ headers的结束是以一个空行为标志结束的 
+ body部分由Content-Type决定的，规定了什么格式 body就用什么格式，body也是一个kv 结构
+ 所有HTTP中的换行按照规定都是\r \n 两个字符组成的换行符，解析时候容易出错        
## 10. HTTP请求 | 实现一个HTTP的请求
+ 实现一个基础库，先从它的使用上去设计接口形式
+ method属性http的一部分，path也是http协议要求的，headers是http协议要求的，host属性来自IP层，port来自TCP层，headers内容和body的内容采用键值对的形式描述
+ http协议中一定要有Content-type，否则会让body无法解析
## 11. HTTP请求 | send函数的编写，了解response格式
+ 逐步收到信息，设计reponse parse 而不是Response类，parse通过逐步接收Response信息来构造Response的各个不同的部分
### response格式
+ HTTP/1.1 200(http的状态码) OK(http的状态文本)           status line
+ headers Content-type决定s
    + Content-Type:text/html    
    + Date: Mon,23 Dec 2021 22:00:00 GMT
    + Connection: keep-alive
    + Transfer-Enodeing: chunked
-------------
+ body  里面允许任何字符
    + 26 16进制的数字
    + `<html><body>hello word</body></html>`    内容
    + 0 16进制的数字， 0代表结束 得到空的chunk
## 12. HTTP请求 | 发送请求
+ send(connection) 接收connection参数小技巧，可以在已经建立好的TCP的连接上把请求发出去，这个连接没有传的话，自己根据传进来的host和port去创建新的TCP连接

## 13. HTTP请求 | response解析
+ status line 以\r \n 结束，所以是两个状态
+ header name的输入状态， header name的冒号后面等待空格的状态，header value的状态， header line end的状态， block end的状态（header之后要再等一个空行）+ body 状态
### 状态机写法有多种，本次采用常量 然后用if区分，但是性能的角度和代码管理的角度都不如函数的方法 常量写法变为函数写法

## 14. HTTP请求 | response body的解析
+ response body 不是一个固定格式的解析，需要用到一点技巧
+ node默认是chunked
+ ThunkedBody结构是一个长度后面跟着一个Thunk的内容被称为一个trunk，遇到长度为0的trunk整个body就结束了


