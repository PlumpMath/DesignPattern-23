/**
 * 接口相关
 * @author gangtaoyu@gmail.com
 * @version 1.0
 */
yugt.test = yugt.test || {};
//@import yugt.js

/*//来自js设计模式
yugt.test.Interface=function(name,methods){
	if(arguments.length!=2){
		throw new Error("Interface constructor called with "+arguments.length+"arguments,but expected exactly 2.");
	}

	this.name=name;
	this.methods=[];
	for(var i=0,len=methods.length;i<len;i++){
		if(typeof methods[i]!=='string'){
			throw new Error("Interface constructor expects method names to be"+"passed in as a string.");
		}
		this.methods.push(methods[i]);
	}
};
*/

/**
 * 所以接口的父类，用来标示一个函数是否是接口
 */
yugt.test.InterfaceSuperObject=function(){}
/**
 * interface关键字
 * @param {} args 方法名
 * @return {}
 */
/*
yugt.test.Interface=function(args){//接口是一对象
	var interfaceObj={};
	for(var i=0,len=arguments.length;i<len;i++){
		if(typeof arguments[i]!=='string'){
			throw new Error("Interface constructor expects method names to be"+"passed in as a string.");
		}
		interfaceObj[arguments[i]]='';
	}

	return interfaceObj;
};
*/
yugt.test.Interface=function(args){//接口是一个函数
	var interfaceObj=new Function();
	/*
	var f=function(){};
  	f.prototype=InterfaceSuperObject.prototype;
//    interfaceObj.prototype.constructor=interfaceObj;//接口无构造函数
	interfaceObj.prototype=new f();
	*/
	//由于InterfaceSuperObject内无其他属性，不会对子类prototype造成污染，因此简写如下，而不使用clone函数
	interfaceObj.prototype=new yugt.test.InterfaceSuperObject;
//	interfaceObj.prototype.constructor=interfaceObj;
	interfaceObj.prototype.constructor=null;
	delete interfaceObj.prototype.constructor;//接口无构造函数
	for(var i=0,len=arguments.length;i<len;i++){
		if(typeof arguments[i]!=='string'){
			throw new Error("Interface constructor expects method names to be"+"passed in as a string.");
		}
		interfaceObj.prototype[arguments[i]]=arguments[i];
	}

	return interfaceObj;
};


/**
 * implements关键字
 * 使用implements声明类实现的接口，其实的一个重要作用就是对类是否实现接口中的方法做检查
 * 因此，Implements主要是用来做方法检查，不过要等到运行时才抛出异常（由于js是动态语言，可以理解）
 * 写一个js预编译器或是编译器，都能更好的模拟java的implements
 *
 * @param {} interfaceObj 接口名
 */
/*
yugt.test.Implements=function(interfaceObj){
	return;
}
//来自js设计模式
Interface.ensureImplements=function(object){
...
}
*/

/*
Function.prototype.Implements=function(InterfaceName){
	var _this=this;//这里的this指的是具体的类
	var msg='接口方法全部实现！';
	var proStr='';
	for(var pro in InterfaceName.prototype){
//		Y.println(pro+':'+(pro in _this.prototype));
		//只要继承的类里包含接口的方法，就算是实现了接口（prototype里的方法，类的实例对象才能直接访问）
		//TODO 提取一个方法hasProperty用来判断，提取到common中，但是不引用common中的
		if(!(pro in _this.prototype)){
			proStr=proStr+pro+',';
		}
	}
	if(proStr){
		msg='接口方法'+proStr+'未实现！';
	}else{
		var _interfaceList=_this._interfaceList;
		if(_interfaceList){
			_interfaceList.put(InterfaceName);
		}else{
			_this._interfaceList=[InterfaceName];
		}
	}
//	throw new Error(msg);
	Y.println(msg);
}
*/




/**
 * instanceof关键字
 * 此方法也是所有对象都需要的
 * 由于Function与function的实例对象，不同层次，只能把Instanceof加在Object里，而不是Function里
 * 这是由于function实例化出的对象，的_proto_最终都指向Object.prototype，而不是Function.prototype
 *
 * @param {} InterfaceName 接口名或类名
 */
/*
Object.prototype.Instanceof=function(InterfaceName){
	if(typeof(InterfaceName)=='object'){//接口
		//TODO 是否包含接口中定义的方法，如果是，则表明实现了此接口
		var interfaceList=this.constructor._interfaceList;
		if(interfaceList){
			interfaceList.has(InterfaceName);
			return true;
		}
	}else if(typeof(InterfaceName)=='function'){//类
		return this instanceof InterfaceName;
	}
	return false;
};
*/
/*//由于绝对不能污染Object，把Instanceof改为全局函数
Object.prototype.Instanceof=function(InterfaceName){
	if(typeof(InterfaceName)=='function'){
		if(InterfaceName.prototype instanceof yugt.test.InterfaceSuperObject){//接口
			var _interfaceList=this.constructor._interfaceList;
			if(_interfaceList){
				for(var i=0,len=_interfaceList.length;i<len;i++){
					if(_interfaceList[i]==InterfaceName){
						return true;
					}
				}
			}
		}else{
			return this instanceof InterfaceName
		}
	}
	return false;
};
*/


//TODO 为每个类加上getClassName方法，类似java。或者重写类的toString方法，或为Function重写toString方法
//TODO JDOM JavaWeb java模拟dom
//TODO Class.class属性可以不要，因为js可以直接传递函数，函数也是Object对象，而不是Class对象。Function对象对应Class对象
//Class.class在js中的实现=function.constructor=function 因此可以不要class属性
//建一套反射包，使用eval来实例化一个类
//可多实现接口、单继承；每个类应该记录下自己实现的接口和继承的父类，类似jvm中字节码实现规范的方式
//TODO 想清楚是否使用java的面相对象的思想，js是否可以更好

//json的序列化包；自己的加密算法
//看commonJs规范，找灵感
//
//检查接口的方法是否已实现
//接口不能使用原型链来继承，因为可能造成原有类的继承体系混乱，js的原型链就是给类继承的，接口只能彻底的自己模仿
//实现与接口相关的关键字：interface、implements、instanceof（不过与js原生instanceof关键字不同了，但意义是一样的）
//每个类都要记录自己实现的接口，这样才能准确的判断出类的类型
//对象的constructor可以等同obj.className

//每个函数定义的时候都有一个静态属性_interfaceList，用来保存自己实现的接口对象
//反射包作为一个插件，引入后，对象可以具有类似java的API的能力

//TODO 写一个原型链跟踪的打印函数

yugt.test.testInterface=function(){
	var _self=yugt.test.testInterface.prototype;
//	_self.testInterface();//此方法已失效

}

yugt.test.testInterface.prototype={
testFunName:function(){
	Y.println(arguments.callee.toString());
	var testName=function (){
	//	Y.println(arguments.callee.toString());
	//	Y.println(''+tsestName.caller);
	}
	var obj=new testName();
	Y.println(''+(obj.constructor==testName));
	Y.println(typeof(obj));
	Y.println(obj.constructor.toString());
	Y.println(typeof(testName));
},

testConstructor:function(){
	var t=function(){var a=1;}
	var tobj=new t;
	Y.println(tobj.constructor.toString());
//	t.prototype.constructor=null;
	tobj.constructor=null;
	Y.println('t.prototype.constructor:'+(tobj.constructor));
	Y.println('t.prototype.constructor:'+(tobj instanceof t));
//	delete tobj.constructor;
	Y.println(tobj.construct===undefined);

	Y.println('constructor in tobj:'+('constructor' in tobj));
//	Y.println(tobj.constructor);
	Y.println(tobj instanceof t);

	var t2=function(){};
	t2.prototype=tobj;
	delete t2.constructor;
	var t2obj=new t2;

//	delete t2obj.constructor;
//	for(var pro in t2){
//		Y.println('属性'+pro);
//	}
	Y.println(t2.prototype instanceof t);
},

testFunEqual:function(){
	var f1=function(){};
	var obj={f1:f1};
	Y.println('f1==obj.f1: '+(f1==obj.f1));
	Y.println('f1: '+f1);
	Y.println('obj.f1: '+obj.f1);
},

testInterface:function(){
/**
 * 由于在js中，一个方法的标示在于方法名，因此声明一个接口只需要方法的方法名
 * TODO 接口中是否需要模拟重载（暂时认为不需要，因为对参数类型检查会把动态语言退化成静态语言）
 * （其实动态语言的动态性，也就是OO的多态性，只是重载性是在一个函数中实现的。因为重载其实是对象对不同请求消息的接收能力）
 */
	var InterfaceName=yugt.test.Interface(//定义一个名为InterfaceName的接口
		'methodA',
		'methodB'
	);
	Y.printPro(InterfaceName);

	var TestClass=function(){
		var t;
	};
	TestClass.prototype.methodA=function(){

	};
	TestClass.Implements(InterfaceName);
	var objTestClass=new TestClass();
	Y.println('objTestClass.Instanceof(InterfaceName): '+objTestClass.Instanceof(InterfaceName));
	Y.println('objTestClass.Instanceof(TestClass): '+objTestClass.Instanceof(TestClass));
}


}

//记录：
//只有对象的非原生的属性才能通过 for in 语句迭代出来。因此不能污染Object等对象，可以改为单独的函数
//通过原型继承的类，怎么判断一个类的父类（只有java中的反射才有此工能，js需要同类似记录接口名的方法来模拟）
//delete tobj.constructor删除不了对象的constructor属性
//修改对象的constructor属性，不会影响到instanceof对对象的判断
//服务器端js打印：直接的Y.println(null)是会报错的；但是可以tobj.constructor=null;Y.println(tobj.constructor)
//直接复制undefined
//函数的应用比较，是可以相等的