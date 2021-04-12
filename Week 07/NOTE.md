## 学习笔记

## 表达式
### 语法树跟运算符优先级的关系 
Tree vs Priority
+ 构造语法树的时候：乘除会形成更小一级的语法结构，加减会形成更高级别的语法结构
1+2*3中 2*3是一颗子树
说明运算符的优先级会影响到语法树的构成
+ JavaScript标准中是用产生式来描述运算符的优先级
### Expression 优先级由高到底
 #### Member . [] 访问属性
 + a.b  成员访问 
 + a[b] 成员访问  b是字符串 [] 中写的b的形式可以支持运行时的字符串，静态语言不支持变量字符串
 以上两种区别b是不是一个字符串，
 + foo`string`  部分参数传递
 + super.b      class的构造函数中用
 + super[ 'b' ]
 + new.target   前后两个词是固定的，一个都不能换
 + new Foo()
 ### New
 + new Foo   new表达式   不带括号的优先级更低
 Example 
 new a()()
 new new a() 跟第二个new 
 带括号的new的优先级更高
 引用类型存在JavaScript运行时中，用引用类型在运行时处理删除或者赋值这样的写相关操作

 ### Reference 类型    a.b访问一个属性，取出来的是一个引用
 引用类型确实的存在于运行中，被称为JavaScript标准中的类型而不是语言中的类型  
 Reference取出来的可能是一个Object或Key，完全的记录了Member运算的前半部分和后半部分
 + Object                      
 + Key （string or symbol）   
  delete   assign 就会用到Reference类型， 做加法或减法运算把Reference直接解引用，像普通变量一样去适用
  Member表达式出来的，如果放在delete之后，需要用到引用的特性，要知道删除的哪个对象的哪个key assign也一样，把右边的表达式赋值给左边的哪一个对象的哪一个，这就是引用类型的关键特征
 JavaScript语言就是用引用类型在运行时处理删除，赋值写这样的相关操作
 ### call 函数调用 低于Member运算和new
 + foo()
 + super()
 + foo()['b']
 + foo().b
 + foo()`abc`
 后三种会让表达式降级为call Expression
 Example
 new a()['b']  先跟new先结合
 语法结构表达的内容要多于运算符优先级所能表达的，像点运算它本身就可以有不同的优先级，它前面的语法结构决定自己的优先级
 用优先级解释运算法其实不是一种严谨的说法，真正严谨的是使用产生式一级一级的语法结构来描述运算的优先顺序。
 
### 运算符左值和右值的区别 Left Handside & Right Handside
Left Handside 由来：能不能放到 = 左边而来
a.b = c; 可以  Left Handside
a + b = c; 不可以 Right Handside
所有的Expression 默认只要不属于Left Handside就属于Right Handside
### 不能放在等号左边的
### Update 自增 自减 后都是Right Handside（从Update Expression开始） 
+ Update
 + a++
 + a--
 + --a
 + ++a
++ a ++ 先和右边结合
++ （a++） 
这两个不论谁先，后面在运行时都是不合法的
### Unary 单目运算符
+ delete a.b   后面必须是一个Reference类型才能生效
+ void foo()   void不管把后面的什么都变成undefined 可以类似空白 换行，起到很好的改变语法结构的作用
+ typeof a     
+ +a
+ -a
+ ~a  位运算  把一个整数按位取反，如果不是整数会把它强制转换成整数
+ !a  非运算  针对布尔型的运算，有时候会用两个！！会把一个任何类型的数强制转换成布尔类型
+ await a  会对更大的语法造成一些影响
大部分运算都会发生一些类型转换，表达式是类型转换的大户，重度用户
### Exponental **  右结合
 Example  
 3 ** 2 ** 3   =   3^8
 3 ** (2 ** 3)
 大部分的运算是左结合的，唯有**运算符是右结合的
### 乘除运算
+ Multiplicative  * / %   所有数字都要求是Number类型 也会发生类型转换
+ Additive  + -           + 两个数字相加，两个字符串连接起来
+ Shift << >> >>>（带符号的右移）
+ Relationship（关系表达式） < > <= >= instanceof in
前面两种对两边数字有要求，JavaScript还设计到了字符串的比较，比较两个字符串的字典序，不介意用，容易出错
### Equality
+ == 类型相等的正常比较，类型不同的时候 boolean类型转变为Number 违反直觉，转换规则复杂，建议不用
+ !=
+ ===
+ !== 
### Bitwise 位运算
&  按位与 ^ 异或 | 按位或

### Logical 逻辑运算符 有短路原则， &&前边是false 后边就不会执行了 有时候会被代替if
+ &&
+ || 
### Conditional 唯一的三目运算符 某种情况也可以代替if esle 
+ <条件>? 真 : 假
最后两种有短路原则，不一定能保证每个子结构都能执行

## Type Convertion 运行时：类型转换，引用类型
### 类型转换
+ a+b 作用于两个数字或字符串 ,一旦a，b属于其他类型 字符串+ 数字 数字转字符串，其中一个是boolean类型要根据相加的关系进行转换
+ "false" == false;  不相等 
+ a[0] = 1; 
== 是最复杂的转换  类型相同可以比较，类型不同基本都转化为Number 然后再相互比较 
空格和false也是相等，推荐尽量适用=== 或者做过类型转换后再比较
Object中的Key也会发生类型转换
像位运算不仅要不类型转换为Number类型还必须把number转换为整数类型

undefined 和null不存在装箱操作，不能转化为Object
凡是Object转换为boolean都是true

### Unboxing 拆箱操作 Object转换为普通类型
+ ToPremitive 最主要的过程 加法运算 Object + Obect过程都会调用ToPremitive过程
1. 一个对象o有三个方法会影响ToPremitive toString valueOf [Symbol.toPremitive]() 一个symbol的key值
2. 如果定义了Symbol.toPremitive 会忽略其余两个，否则在进行不同的转换的时候会根据不同的提示决定调用 toString valueOf的先后 
3. 加法优先调用valueOf，即使调用字符串参与的加法也是优先调用valueOf
4. var x = {} x[o] = 1; 当o作为属性名的时候会优先调用toString方法
5. 只要有toPremitive就会优先调用
6. 位运算会先转Number就会先调用valueOf
7. 一定会用到字符串的场景会调用toString
### Boxing
对每个基础类型Object都提供了一个包装类
undefined 和null没有包装类
+ Number   new Number(1) 返回一个object    Number(1) 返回一个值
+ String   new String('1') 返回一个object   String("a") 返回一个值
+ Boolean  new Boolean(true) 返回一个object    Boolean(true) 返回一个值
+ Symbol   new Object(Symbol("a")) 返回一个object    Symbol("a") 返回一个值
1. new 我们称为装箱操作
2. 如果我们适用Member操作也就是. 或者[] 访问属性的时候，.或[]之前的是一个基础类型会自动调用装箱操作
3. Number类型和Number类不是一回事 可以通过typeof判断包装后对象还是包装前的值

### Exercise
+ StringToNumber  解析四种类型的String变成Number
+ NumberToString  传进制指定要转化成几进制的字符串
## js语句 Statement
语句完成控制流程
### 运行时相关概念 
+ Completion Record 语句执行的结果记录
+ Lexical Environment 作用域相关知识
#### Grammer
整个的JavaScript语言就是让计算机完成计算，并且完成一定的流程控制
##### 简单语句
+ ExpressionStatement 最核心的表达式语句 语句后面加分号就是个语句了
+ EmptyStatement 空语句 单独的一个分号，为了语言完备性 也没有改变语法结构的作用
+ DebuggerStatement debugger语句 debugger; 专门给调试的时候使用的语句
四个控制语句 流程控制
+ ThrowStatement Throw语句 抛出一个异常 用（Throw 表达式） 抛出异常
+ ContinueStatement 跟循环语句配合 结束本次
+ BreakStatement    跟循环语句配合 结束整个循环
+ ReturnStatement   函数中用，返回一个函数的值
+ 比较新的跟generator相关的yield
##### 组合语句 多用于控制简单语句的执行顺序 
+ BlockStatement 最重要的{ 语句列表 } 把所有需要单条语句的地方边城多条语句，完成语句的树状结构的重要的基础设施
    一般返回值是nomal value和target不明，里面有break continue这种东西 随时可以变成相应的值
    [[type]]: normal
    [[value]]: --
    [[target]]: --
+ IfStatement  条件语句，分支结构
+ SwithStatement 多分支的结构 不介意用 多个if else代替
+ IterationStatement while循环 do while 循环 for循环 for in 非常多
+ WithStatement  通过with 打开一个对象把对象的所有属性放到作用域里面，写法上节约空间，但是带来的不确定性比较高，不介意用
+ LabelledStatement 复合语句前加label 相当于给语句取个名字
+ TryStatement 三段结构 try catch Finally try里面不是BlockStatement 花括号是由try语句定义的不能省略花括号
return打断不了Finally的语句执行
for 里面用产生一个作用域 let 0-100
catch里面也可以产生一个作用域 可以有label    
##### 声明 Declaration 函数声明，类声明，变量声明（var声明的也会被归到语句声明中，const和let被归到LexicalDeclaration中）
凡是有对后续语句发生作用的这种语句归类为声明，这里分出的声明是概念上的区分，和标准不一致
一、
Function是一种特殊的声明有四种形态
+ FunctionDeclaration
+ GeneratorDeclaration Function后加* Generator声明
+ AsyncFunctionDeclaration 前加Async声明 异步函数声明
+ AsyncGeneratorDeclaration 异步的产生器
+ VariabelStatement 既有声明的作用，又有执行计算的能力 var 算声明还是语句 JavaScript标准中划分与语句s
+ ClassDeclaration 
+ LexicalDeclaration const let
老的function和var比较统一 新的LexicalDeclaration行为也比较统一
二、
    function                class                 
    functon *               const
    async function          let
    async functon *
    var var声明的 赋值刚开始没发生
    左边的作用范围只认Function Body，而且没有先后关系，永远会被当作出现在函数的第一行去处理，function写在最尾在前面也可以访问到
    右边声明前去使用报错
三、预处理（pre-process）指一段代码执行之间，JavaScript引擎它会对代码本身做一次预先处理的一种机制
var不管写在函数的哪一个位置 if return之后 catch Finally 都会被预处理机制挑选出来把变量声明到函数的作用级别
const也有预处理机制
所有的声明都是有预处理机制它都能把变量变成一个局部变量，区别是const在之前使用会报错，这个错误可以被try catch去处理
四、作用域 代码里面变量从哪到哪发生作用，没有在运行时说明这就是作用域
作用域链来自更早的标准 ECMA3.0
var前后都有的作用域是在它所在函数体
const的作用域就在所在的花括号block 循环语句中加const或者let它的作用域是整个循环语句，比循环语句的花括号范围要大，因为每次循环不产生新的 技巧把函数分节 {} 配合声明的作用域也会消除变量干扰
#### Runtime
+ Completion Record 语句执行的结果记录，组合语句是如何实现控制能力，决定了语句是继续向下执行还是停止执行，不同的组合语句会用不同的方式用Completion Record 最终达成想要的控制效果 不管是分支，循环，捕获异常，返回这些都是由Completion Record也就是语句的完成状态决定的
if(x == 1) 
  return 10;
需要一种数据结构存储完成的结果 即 Completion Record
 Completion Record组成
 + [[type]]: nomal,break,continue,return,or throw
 + [[value]]: 基本类型
 + [[target]]: label  语句前面加一个标识符或者冒号 语句变成了一个带label的语句 break和continue 可以会和带lable的语句发生交互，所以break和continue往往带一个target出来 
+ Lexical Environment 作用域相关知识

## JS结构化| 宏任务和微任务
### JS执行粒度（运行时）
+ 宏任务 传给JavaScript引擎的任务，JavaScript语言讨论的最大粒度的一个任务
对于JavaScript引擎来说，其实是一个静态库的概念
等待+获取代码+执行代码的过程
+ 微任务（Promise） JavaScript引擎内部的任务 微任务是由Promise产生
+ 函数调用（Execution Context）
+ 语句/声明（Completion Record）
+ 表达式（Reference）
+ 直接量/变量/this

## JS结构化| JS函数调用
#### 函数调用本身会形成stack，访问的变量也可以用stack来描述，每一个stack里面保存的东西称为 Execution Context 执行上下文，形成执行上下文栈 当前执行的栈顶元素称为 Running Execution Context
### Execution Context 包含什么 
有七大件，但是没有任何一个是全齐的
    + code evaluation state 用于async和generator函数，代码执行到哪的一个保存的信息
    + Function  由Function来初始化的
    + Script or Module 要么有Script，要么有Module
    + Generator 只有Generator函数会需要，不是Generator函数，是Generator函数每次执行所生成的隐藏背后的Generator
    + Realm  保存着所有内置对象的王国或领域
    + LexicalEnvironment   var声明变量，声明到哪个环境，函数的body预处理时候就会处理
    + VariabelEnvironment 声明时候存的变量也会存在
        this
        new.target
        super
        变量
    后两者分别代表了我们执行代码中所需要访问的环境，即保存变量，多数的后两者会重合
### Environment其实是会形成一个链式结构的，链式结构里面的每一个节点称为Environment Record，其也存在继承关系
+ Environment Records 
    + Declarative Environment Records  平时大量生成和产生的，不是抽象类，可以初始化 {}会产生 DER
        + Function Environment Records  Function会生成 FER
        + Module Environment Records    Module会生成MER
    + Global Environment Records Global只有一个
    + Object Environment Records Object提供为with用
### Function closure 
JavaScript中每个函数都会生成一个闭包
闭包：包含两个部分，包含代码部分和环境部分，JavaScript中每一个函数都会带一个它定义所在的 Environment Records，会把这个Environment Records保存到自己的函数对象上，变成一个属性
+ 环境部分：由一个object和一个变量的序列组成
+ 代码部分：每个函数都有自己的code 
闭包和作用域链机制

### Realm
+ 2018后纳入到标准中了
+ 执行一个表达式的过程中，除了变量this new target等之外，还需要其他的信息，比如对象直接量，花括号的对象直接量 方括号的数据直接量，这些东西都会产生object，产生的object需要原型，原型是哪一个对象，不同的iframe中创建的对象原型是不一样的，这个原型需要一个东西去记录，即Realm
+ 在一个JavaScript引擎的实例里面，它所有的内置对象都会放到一个Realm中，不同的Realm实例之间是完全相互独立的 用instanceof可能会失效，.做隐式转换的时候也会创建出对象，例如Number对象，会用到realm，有了Realm之后，可以去执行对象的表达式，描述他们的行为
+ JavaScript里面没有规定什么时候创建relam，有可能根据外部的条件创建不同的Realm Prototype是不一样的
#### 尝试找出JavaScript引擎里面Realm里面的所有对象，使用一个js数据可视化的框架 对象的可视化 G6（蚂蚁前端）
