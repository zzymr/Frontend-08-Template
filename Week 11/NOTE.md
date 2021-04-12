学习笔记

## 1. CSS总论 | CSS语法的研究
### 建立完备性，语法作为入口了解编程语言，CSS标准比较分散，CSS2.1 所有内容在一个标准中，可以作为起点
 [CSS2.1的语法](https://www.w3.org/TR/CSS21/grammar.html#q25.0)
+ 产生式：[] 代表组的概念 ？可存在/不存在 ｜ 或  * 0个或者单个+

+ CDO CDC HTML注释的起点和止点 历史包袱 可以忽略
    + 旧的浏览器把CSS文本理解成HTML注释，新的浏览器把CSS文本理解成CSS规则
+ 找到CSS3中的 @ rules 再研究
### CSS总体结构
+ @charset
+ import
+ rules
    + @media
    + @page page主要用来打印相关
    + rule
### CSS整体结构 CSS规则
+ css @规则
+ css普通规则

## 2. CSS总论 | CSS @规则的研究
+ [@charset](https://www.w3.org/TR/css-syntax-3/)：声明CSS的字符集
+ [@import](https://www.w3.org/TR/css-cascade-4/)
+ [@media](https://www.w3.org/TR/css3-conditional/): madia query不是个新特性，类似于一个预置好的函数查询媒体的一个规范
+ [@page](https://www.w3.org/TR/css-page-3/): 分页媒体
+ [@counter-style](https://www.w3.org/TR/css-counter-styles-3)： 列表前面的黑点或者数字
+ [@keyframes](https://www.w3.org/TR/css-animations-1/)：定义动画的
+ [@fontface](https://www.w3.org/TR/css-fonts-3/)：web-font 定义字体
+ [@supports](https://www.w3.org/TR/css3-conditional/)：检查某些CSS的功能是否可用，不建议用，兼容性不高
+ [@namespace](https://www.w3.org/TR/css-namespaces-3/)：命名空间

## 3. CSS总论 | CSS规则的结构
+ 选择器 Selector 逗号优先级最低
+ 声明
    + Key
    + Value
### var 变量 attr： CSS值和元素上的某个属性值想绑定 calc计算属性
## 4. CSS总论 | 收集标准
### 零散的标准中收集共性的内容 利用自动化 爬虫
## 6. CSS选择器 | 选择器语法
### 简单选择器
+ *  通用选择器
+ div svg｜a  type selector  ｜ 命名空间分隔符  
+ .cls  class选择器 空白多个
+ #id   id选择器，严格匹配
+ [attr = value]  属性选择器 ～= 支持拿空格分隔的值的序列 ｜= 以这个值开头
+ :hover 伪类选择器 与HTML没关系，交互相关
+ :: before  伪元素选择器

### 复合选择器  几个简单选择器挨着写就变成了复合选择器
+ 语义：选中的选择器必须同时match几个简单的选择器，与的关系
+ <简单选择器><简单选择器><简单选择器>
+ *,div必须写在最前面，伪元素写在最后面

### 复杂选择器 复合选择器之间用连接符连接就可以形成，复杂选择器针对一个元素的结构进行选择
+ <复合选择器><sp><复合选择器>  子孙选择器， 当前元素必须左边有空格，祖先级
+ <复合选择器>">"<复合选择器>   父子选择器，直接父元素
+ <复合选择器>"~"<复合选择器>   邻接关系进行选择
+ <复合选择器>"+"<复合选择器>   邻接关系进行选择
+ <复合选择器>"||"<复合选择器>  table可以表示选中某一列

### ，相当于两个选择器

## 7. CSS选择器 | 选择器的优先级
+ 选择器优先级是针对一个选择器包含的所有简单选择器进行计数
+ N大部分浏览器选择了655536

## 8. CSS选择器 | 伪类
### 链接/行为
+ :any-link 可以匹配任何的超链接 link是匹配还没有访问过的超链接
+ :link:visited visited表示已经访问过的超链接，link + visited = any-link
+ :hover 鼠标移上去的行为
+ :active 激活状态
+ :focus  焦点状态
+ :target 链接到当前的目标 作为锚点的a标签

### 树结构
+ :empty 元素是否有子元素
+ :nth-child() 比较复杂，父元素的第几个，可以支持函数 3N+1
+ :nth-last-child() 父元素的第几个，从后往前  破坏CSS computed计算的时机
+ :first-child :last-child :only-child  破坏回溯原则

### 逻辑型
+ :not伪类  只支持写简单选择器的序列，即复合选择器，不支持带空格 > ,的结构
+ :where:has 

## 9. CSS选择器 | 伪元素
### 一旦应用了::before和::after属性，declaration里面可以写一个content，其他的不可写，写了content之后就可以像真正的dom一样生成盒参与后续的排版和渲染 1. 无中生有
+ ::before 元素的内容前插入伪元素
+ ::after  元素的内容后插入伪元素
### 下面两个已经存在了content  2. 有特定意义的文字括起来
+ ::first-line  选中第一行，第一行实际是已经完成排版之后的结构
+ ::first-letter 选中第一个字母 不是添加一个不存的元素 ，而是用一个不存的元素把一部分文括起来进行一些处理
