# 学习笔记

## 1. 组件的基本知识 | 组件的基本概念和基本组成部分

### 前端架构两个热门话题 组件化，架构模式

+ 组件化是我们怎么去扩展HTML标签，前端的架构体系，主要特点是复用，决定了前端团队的**复用率**
+ 架构体系：MVC MVVM 主要关心前端和数据逻辑层的交互

### 组件：和UI强相关，特殊的模块/对象，，以树形结构组合，有模版化的配置能力
### 对象与组件
+ 对象：三大要素，属性，方法，继承关系（javascript运行时采用的原型继承）
    + properties
    + Methods
    + inherit
+ 组件：properity 属性， attribute 特性
    + properties  翻译为属性
    + Methods
    + inherit
    + **Attribute**   翻译为特性
    + **Config(组件的配置)&State(组件的状态)**
    + **Event**
    + **LifeCycle**
    + **Children(树形结构的必要性)**
### Attribute VS Properity
#### Attribute强调描述关系  面对对象的一个概念
#### Properity强调从属关系  来源XML的里面概念


## 2. 组件的基本知识 | 为组件添加JSX语法
### 两种建立Markup的风格
+ jsx语法
+ vue标记语言的parser
### 搭建jsx环境步骤：
+ npm init
+ npm install -D webpack webpack-cli
+ npm install -D babel-loader
+ npm install --save-dev @babel/core @babel/preset-env
+ npm install --save-dev @babel/plugin-transform-react-jsx  识别jsx

### webpack能把不同的JavaScript的文件中的import或require打包到一起去
### babel新版本js编译成老版本的js

## 3. 组件的基本知识 | JSX的基本使用方法
+ npm install webpack-dev-server --save-dev
+ npm install webpack-cli --save-dev
+ webpack-dev-server
###  for in 遍历对象，for of遍历数组
### 反向操作，mountTo
