*定义:


*角色：
Singleton:单例类
ChildSingleton1:单例类的子类

*
注册单例模式的关键在于：向父类别注册子类的Singleton


*
1.Registry of Singleton的真正优点:
使用父类别来统一管理多个继承的子类别之Singleton实例，在需要的时候再向父类别注册子类 Singleton，必要时随时调整传回的子类别Singleton
2.缺点：
需要先注册子类，然后才能通过父类获取子类的单例

*
应用场合：

