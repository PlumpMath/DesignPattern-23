*定义：
给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。


*角色：
AbstractExpress 即：node，抽象的文法节点
TerminalExpress 即：叶子节点
NonterminalExpress 即：非叶子节点
context 需要解析的内容

*
解释器模式的关键在于：定义多个节点，每个节点提供一个解析方法


*
Interpreter实现要点：
Interpreter模式的应用场合是interpreter模式应用中的难点，只有满足"业务规则频繁变化，且类似的模式不断重复出现，并且容易抽象为语法规则的问题"才适合使用Interpreter模式。
使用Interpreter模式来表示文法规则，从而可以使用面向对象技巧来方便地“扩展”文法。
Interpreter模式比较适合简单的文法表示，对于复杂的文法表示，Interpreter模式会产生比较大的类层次结构，需要求助于语法分析生成器这样的标准工具。
