学习笔记

## 1. 排版 | 根据浏览器属性进行排版 
### 整个CSS包含三代的排版技术
+ 第一代正常流 position display float 接近古典概型
+ 第二代 flex 接近设计软件的方式，填满剩余空间
+ 第三代 grid 更强大的排版模式
+ 第四代 CSS Houdini隐隐感受到第四代技术
### 宽高做一次抽象 主轴，交叉轴， 省了大量的if else
### 需要知道layout的时间，而flex布局需要知道子元素，所以时机选在标签结束的时候 endTag

## 2. 排版 | 收集元素进行
### 收集元素进行，后面计算元素位置一个重要的准备工作
+ flex item 收进各个行中
+ 父元素没有width ，会进入一个autoMainSize
+ 分行算法：根据主轴的尺寸把元素分进行，设置了no-wrap，强行分配进第一行

## 3. 排版 | 计算主轴
+ 主要是怎么分配mainSpace，以及根据flex属性去分配每一行剩余的mainSpace
## 4. 排版 | 计算交叉轴
+ 计算交叉轴方向
    + 根据每一行中最大元素的尺寸计算行高
    + 根据行高flex-align和item-align，确定元素的具体位置

## 5. 渲染 | 绘制单个元素