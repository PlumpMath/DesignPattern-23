//以下是我简化的框架模型，主要去掉了命名空间

//符合框架规范的所有类的基类
//主要是用来抽象出类似object中的方法
var BaseClass=function(){
	var _this=this;
	_this.init.apply(_this, arguments);
}
BaseClass.prototype={
    init : function() {//模拟构造函数链
        var _this=this;
        var options = arguments[0] || {};
    },
	Instanceof:function(Interfass){
		return yugt.Instanceof(this,Interfass);
	}
}

//模拟java关键字extend，用来继承一个类
var Extend=function(superClass){
	var subClass=this;
	var subClassPrototype=subClass.prototype;
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	//构造函数链（需要修改原构造函数的代码，类似java的AOP，因此需要使用到eval）
	//要形成构造函数链，就不能保证构造函数init是私有的
	var subInit=subClassPrototype.init;
	var superInit=superClass.prototype.init;
	var init;
	if(subInit){
		init=function(){
			superInit.apply(this,arguments);
			subInit.apply(this,arguments);
		}
	}else{
		init=function(){
			superInit.apply(this,arguments);
		};
	}
	subClassPrototype.init=init;
	for(var method in subClassPrototype){
		subClass.prototype[method]=subClassPrototype[method];
	}
	return subClass;
}

//模拟java关键字implements，用来实现多个接口
var Implements = function(interface1,interface2,interface3) {
	var _this = this;
	var _proto = _this.prototype;
	var _interfaceList = _this._interfaceList || [];//类似jvm,每个类记住自己实现的接口
	for (var i = 0, len = arguments.length; i < len; i++) {
		_interfaceList.put(interfass);
		var _e = arguments[i].prototype;
		for (var pro in _e) {
			_proto[_e] = new Function();
		}
	}
	_this._interfaceList=_interfaceList;
	return _this;
}

//模拟java关键字private static，用来定义一个静态私有成员
var PrivateStatic=function(proName){
	var _this=this;
	(function(){//为当前类创建一个闭包，用来存放私有变量
		var pro1;
		_this.prototype['get'+proName]=function(){// TODO 把proName的第一个字母大写，按照java beans规范改写
			return pro1;
		};
		_this.prototype['set'+proName]=function(proValue){
			pro1=proValue;
		};
	})();
	return _this;
}

//模拟java关键字private ,用来定义一个非静态私有成员
var Private=function(proName){
	var _this=this;//原函数
	// TODO toString得到原函数代码，字符串修改后用eval产生新的函数，目前简写如下
	var newConstructor=function(){//非私有成员必须定义在类的函数体中，于是需要修改函数体
		var pro1;
		this['get'+proName]=function(){
			return pro1;
		};
		this['set'+proName]=function(proValue){
			pro1=proValue;
		};
		(this.init)?init.apply(this,arguments):null;
	};
	newConstructor.prototype=_this.prototype;
	newConstructor.prototype.constructor=newConstructor;
	//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****
	return newConstructor;//*****修改不了原function的body，只能重新创建一个function
	//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****//*****
}

//模拟java关键字class，用来定义一个类
var Class=function(){
	var ret=Extend(BaseClass);
	ret.Extend=Extend;
	ret.Implements=Implements;
	ret.StaticPrivate=StaticPrivate;
	ret.Private=Private;
	return ret;
}

//模拟java关键字interface，用来定义一个接口
var Interface=function(method1,method2,method3){//接口是一个函数
	var interfaceObj=new Function();
	interfaceObj.prototype=new yugt.InterfaceFlag;
	interfaceObj.prototype.constructor=null;
	for(var i=0,len=arguments.length;i<len;i++){
		if(typeof arguments[i]!=='string'){
			throw new Error("Interface constructor expects method names to be"+"passed in as a string.");
		}
		interfaceObj.prototype[arguments[i]]=arguments[i];
	}
	return interfaceObj;
};

//使用例子
//var Interfacss1=Interface('method1','method2');//接口1
//var Interfacss2=Interface('method3');//接口2
//var SupberClass=Class();//父类
////子类
//var SubClass=Class().Extend(SupberClass).Implements(Interfacss1,Interfacss2)
//					.PrivateStatic('proName')
//					.Private('proName');


//以上代码大部分都做过单元测试，可以实现想要的功能
//其实您要是看懂了上面我写的这些，你就知道我问题来源了，注意加*号的部分的注释
//目前问题：Private函数中，怎么修改函数体，而不是重新定义一个Function，从而提高性能