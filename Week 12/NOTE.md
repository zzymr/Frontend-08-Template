学习笔记
## 1. CSS排版 | 盒
### 文本节点，注释节点不是元素是节点 CDATA DTD都会存在节点不是元素
### 盒模型（怪异模型，标准模型）
+ content 
+ padding 主要影响盒内的排版，决定了里面可排布的content区域的大小
+ margin  主要影响盒本身的排版，决定了盒子周围至少存在的空白区域大小
+ box-sizing ： content-box；（只包含content）border-box；（包含content，padding，border）

## CSS排版：第一代基于正常流，第二代基于flex，第三代基于grid，第3.5代cssHudini，js干预的排版
## 2. CSS排版 | 正常流 Normal Flow 排版分 盒子，文字两种
### 正常流排版
+ 收集盒和文字进行
+ 计算盒和文字在行内的排布
+ 计算行的排布

### 块级 BFC 行级IFC

## 3. CSS排版 | 正常流的行级排布
### baseline 基线对齐
C++底层库 字体文件 freestyle
+ 文本和盒的混排列
+ 盒的先后顺序和盒的尺寸，都会影响line-top和line-bottom，盒是不会影响text-top和text-bottom
+ 盒子里面inline-block是随着自己里面的文字变化的

## 4. CSS排版 | 正常流的块级排布
+ float占据的区域会影响行盒的位置，行盒的宽度根据float占据的区域进行调整，float的一个显著的特征是会影响生成的行盒的尺寸
+ margin collapse只会发生在正常流BFC中，flex，grid中没有

## 5. CSS排版 | BFC合并
+ 所有里面能够容纳不是特殊display的默认都是正常流
### 什么样的盒会创建BFC呢 Establish BFC 默认能容纳正常流的盒都会创建BFC，只要一种特殊情况，Block-box里外都是BFC， oveeflow： visible，相当于没有BFC，发生BFC合并

+ float
+ 绝对定位的元素，里面会创建BFC
+ 

## 6. CSS排版 | Flex排版
复习
## 7. CSS动画与绘制 | 动画
CSS三种控制表现：1. 控制元素的位置和尺寸的信息， 2. 控制绘制和时间看到的渲染信息 3. 交互与动画的信息