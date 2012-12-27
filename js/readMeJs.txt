1.js文件必须为UTF-8，这样java读取到的中文不会是乱码，因为，java也是UTF-8的字符串
      目前，工作空间，java，js都是UTF-8

2.com.yugt.dp.yugt下是框架根目录
     此包下的每个包都定义在yugt对象下
     每个包对应一个或多个js文件（根包无对应的js文件，在common中初定义）
     框架最好遵循commonJs规范——服务端js框架

3.common.js是基础js，其它js可能依赖于它（发布的时候，所有common目录下的文件（common包、子包、yugt根包）打包成一个文件，方便引用和提供性能）
  yugt根包：只用来包含其它包，不在根包下定义单个变量，全局变量放到common中去。即：common才有对应的js，而yugt根包没有单独的js，只是逻辑上的存在。
  common通用包：包含框架的基础设置、常用类、工具类、特殊功能类
  test测试包：包含非框架正式代码。每个测试文件中包含一个没main.js调用的测试方法，而这个测试方法再调用局部测试方法。

4.框架规范
     所有的类名都大写（注意不是所有的function类型都大写，只有可能使用new实例化的function才大写）（模拟关键字属于方法，应该小写，但是由于编辑器提示错误，暂时大写）
     方法小写，静态成员全大写，接口名大写
     顶部使用//@import注释标注当前js文件依赖的包（不标注间接依赖，类似java）
     可以在包下直接放静态成员，这算是js的简洁优势（如：全局配置对象、常用工具方法）
     框架里不可使用全局别名，全局别名只提供给客户使用（除yugt.test包）
     方法的别名在定义方法时定义
     所有在原生对象里加的方法都加载yugt下，如Object.yugt.method;（除为Function添加的关键字Implements）
     所以的关键字都模拟成全局函数（Interface、Implements、Instanceof、Extend），而不扩展Object.prototype
     每个函数内有_this变量，用来指代执行此函数的对象，方便变更函数执行环境后的重构。
     类定义extend是类定义的倒数第二句，implements是倒数第一句。
     类的继承：如果使用extend，需要注意，在构造函数统一定义为”(this.init)?this.init.apply(this,arguments):null;“，以保证模拟的构造链会被正确执行。

5.链式声明类
  Class().Extend().Implements().Private().PrivateStatic()
  Class：产生一个函数，并把函数继承BaseClass类
  Extend：修改Class生成的函数的prototype对象，继承指定的父类
  Implements：为Class生成的函数的prototype对象添加指定接口中包含的函数
  Private：生成一个新的函数，修改函数的构造函数init用来存放private变量，并为实例对象添加访问此private变量的方法，拷贝原Class生成的函数的prototype
  PrivateStatic：新建一个闭包，用来保存private变量，并且为已有的函数的prototype添加访问此闭包中private变量的方法
      注：Private与PrivateStatic无先后关系，而且可以多次出现

*
如何高效利用github
http://www.yangzhiping.com/tech/github.html
http://www.gitalytics.com/ : 通过它，可以找出你所在地区的程序员。
http://www.gitalytics.com/ ： 通过它，能评估某位程序员在GitHub、LinkedIn、StackOverflow、hackernews等多个网站的影响力
http://resume.github.com/ : GitHub简历生成器

*
git - 简易指南
http://rogerdudler.github.com/git-guide/index.zh.html

*
CommonJS
http://wiki.huihoo.com/wiki/CommonJS
http://wiki.commonjs.org/wiki/CommonJS
js的规范，即把js库模块化的规范
类似Java 的动态模块化系统 OSGi

*
CMD（Common Module Definition） 规范
https://github.com/seajs/seajs/issues/242

*
AraleJS
淘宝玉伯是是前端基础类库Arale的创始人
阿里旺旺群：66486486（加入密码：aralejs.org）
QQ 群：59443088

REST是架构的一种，可以用来支持”体验类的开发“类的应用的架构方案
Artery可是算是”功能类的开发“类的应用的架构方案

在github上问：怎么修改函数体；javascript的api，为什么只有jscript的api，有没有chrome的v8的api


*
腾讯讲座
http://v.qq.com/page/U/9/e/U0010zQxe9e.html

*
ECMA262规范地址
http://www.ecma-international.org/publications/standards/Ecma-262.htm
google的V8地址
http://code.google.com/p/v8/

*
分布式基础
http://www.cnblogs.com/duguguiyu/archive/2009/02/28/1400278.html

Drill

http://tv.sohu.com/20121010/n354554959.shtml?pvid=tc_video&a=&b=http%3A%2F%2Fi0.itc.cn%2F20121011%2F2b53_7d9871e6_950d_b147_4ddd_22d939eb314b_1.jpg