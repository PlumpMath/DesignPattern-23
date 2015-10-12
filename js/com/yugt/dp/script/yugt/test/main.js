/**
 * 主函数
 * 与java的通信接口，被java调用
 */
yugt.test = yugt.test || {};//if(!yugt.test)yugt.test={}//不依赖
//@import yugt.js

yugt.test.main=function(){
//	yugt.test.testSuperClassA();
//	yugt.test.testSuperClassB();
//	yugt.test.testInterface();
//	yugt.test.testExtend();
	yugt.test.dp.testBehavioral();
}

//TODO 搭建持续集成环境，ant构建完，直接可以访问
//包括：合并js文件，压缩js文件，发布js文件
//TODO 类需要有查找到包路径的方法，因为目前无法根据某个类对象，获取他所在的包（对象）。