*定义:
将产品实例化操作延迟到具体的子类工厂中完成（可以代替new来用）


*角色：
Product：抽象产品
ConcreteProduct：具体产品
Factory：抽象工厂
ConcreteFactory：具体工厂


*
工厂方法模式的关键在于：有多个具体工厂


*
1.工厂角色和产品角色的多态性设计是工厂方法模式的关键
2.又称为工厂模式、虚拟构造器(Virtual Constructor)模式、多态模式
3.优点：在系统中加入新产品时，而只要添加一个新的具体工厂和具体产品即可。 （符合开闭原则）
4.缺点：在系统中加入新产品时，需要加入新的工厂类，类成对增加


*
应用场合：
1.JDBC中的工厂方法（conn=DriverManager.getConnection("jdbc:microsoft:sqlserver://localhost:1433; DatabaseName=DB;user=sa;password=");）
2.java.net.URL类（url.openConnection()）
