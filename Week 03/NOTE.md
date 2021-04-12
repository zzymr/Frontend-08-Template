<!--
 * @author: zzymr
 * @Date: 2020-12-18 18:29:29
 * @description: 
-->
### 学习笔记

编译原理字符串处理
代码在计算机语言的分析过程中
步骤：编程语言分词->词构成层层嵌套的语法树的一种树形结构->解析代码执行
### LL算法构建AST（抽象语法树）
### 构建AST的过程又叫语法分析算法
核心算法有两种 LL算法，和LR算法
L是Left的缩写

### 四则运算分析
词法分析
用javascript的产生式定义加法和乘法运算
终结符（TerminalSymbol）：直接从词法里面扫描出来的/非终结符：拿终结符的组合定义出来的
EOF（end of file）标示所有源代码的结束

### 代码实现：
空白支持空格和反斜杠t就是tab符两种
换行符号支持\r和\n两种

### 做判断：
 如果匹配出来的长度跟前进的长度不一样怎么办 取出来的和新生成的lastIndex长度做比较

### LL语法分析
基本结构：每个产生式对应一个函数
合并产生一个新的非终结符
AdditiveExpression包含了MultilicativeExpression的所有逻辑
### 产生式：
单独的Number看为零次的乘法 也会执行MultilicativeExpression
一个单独的乘法也视为一种特殊的加法 零次的加法
