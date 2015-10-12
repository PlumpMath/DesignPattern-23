*定义：
避免大量拥有相同内容的小类的开销(如耗费内存),使大家共享一个类(元类).


*角色：
1)IFlyweight 抽象的享元（包含对象的"内部状态"）
2)ConcreteFlyweight 具体的共享享元类（由Factory来创建和维护）
3)UnsharedConcreteFlyweight 具体的不共享的享元类（）

*
享元模式的关键在于：Factory的内部设计上。


*
1.内部状态(intrinsic)：对象可以共享的状态，即可抽象出来的状态（如：word中的字符a-z）
     外部状态(extrinsic)：对象依赖的一个场景（如：word中字符的外形、大小）
2.Flyweight模式是一个提高程序效率和性能的模式
3.Flyweight模式中常出现Factory模式
4.Flyweight更多时候的时候一种底层的设计模式

*
应用场合：
1.文字处理程序
2.java的字符串常量池