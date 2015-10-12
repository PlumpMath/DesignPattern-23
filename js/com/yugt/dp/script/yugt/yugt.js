/**
 *   yugt.js
 *
 *   Release 1.0.0
 *   Author: gangtao yu<gangtaoyu@gmail.com>
 *   License: http://www.gnu.org/licenses/gpl.html GPL
 *   Copyright (c) 2012.8-xxxx.x, gangtao yu, All Rights Reserved
 */

/**
 * 根包
 * 定义模拟关键字、全局变量、库的配置
 * @type package
 */
var yugt={};//yugt就是在这里定义，其他js中改为：if(!yugt)var yugt={};,这样可以消除对yugt.js的依赖

/**
 * 存放全局别名用（门面）
 * @type package
 */
var Y={}

/**
 * 全局配置
 * @type Object
 */
yugt.CONFIG={//CONFIG只适合作为静态成员，而不适合作为子包（因为CONFIG是被子包引用）
	/**
	 * 宿主是服务端
	 */
	isServer:true
};


/**
 * 所以接口的父类，用来标示一个函数是否是接口
 * @type interface
 */
yugt.InterfaceFlag=function(){}
/**
 * 接口
 * 类似java的interface关键字
 * @type Key
 * @param {variable} args 方法名（变元）
 * @return {Interface}
 */
yugt.Interface=function(args){//接口是一个函数
	var interfaceObj=new Function();
	//由于InterfaceFlag内无其他属性，不会对子类prototype造成污染，因此简写如下，而不使用clone函数
	interfaceObj.prototype=new yugt.InterfaceFlag;
//	interfaceObj.prototype.constructor=interfaceObj;
	interfaceObj.prototype.constructor=null;
//	delete interfaceObj.prototype.constructor;//接口无构造函数，这句没用
	for(var i=0,len=arguments.length;i<len;i++){
		if(typeof arguments[i]!=='string'){
			throw new Error("Interface constructor expects method names to be"+"passed in as a string.");
		}
		interfaceObj.prototype[arguments[i]]=arguments[i];
	}
	return interfaceObj;
};
Y.Interface=yugt.Interface;

/**
 * 实现
 * 类似java的implements关键字
 * TODO 修改消息信息、不用Y.println、使用throw Error
 * @type Key
 * @param {Class} clazz 类对象
 * @param {Interface} interfass 接口对象（变元） TODO 改成变元
 */
yugt.Implements=function(clazz,interfass){
	var _this=clazz;//这里的this指的是具体的类
	var msg='接口方法全部实现！';
	var proStr='';
	for(var pro in interfass.prototype){
//		.println(pro+':'+(pro in _this.prototype));
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
			_interfaceList.put(interfass);
		}else{
			_this._interfaceList=[interfass];
		}
	}
//	throw new Error(msg);
	Y.println(msg);
}
//版本2，Implements不是检查是否实现用，而是添加方法用的
yugt.Implements = function(interface1,interface2,interface3) {
	var _this = this;
	var _proto = _this.prototype;
	var _interfaceList = _this._interfaceList || [];//类似jvm,每个类记住自己实现的接口
	for (var i = 0, len = arguments.length; i < len; i++) {
		_interfaceList.push(arguments[i]);
		var _eProto = arguments[i].prototype;
//		.printPro(_eProto);
		for (var pro in _eProto) {
			_proto[pro] = new Function();
		}
	}
	_this._interfaceList=_interfaceList;
//	yugt.addKey(_this);//TODO 考虑是否添加所以的key，是否为每个关键字后可使用的key定义规则，此处应该删除部分key
	return _this;
}
Y.Implements=yugt.Implements;

/**
 * 为每个函数增加Implements方法，方便使用
 * TODO 再考虑是否污染Function，考虑到与关键字Extend统一，不加更好，因为不一定每个函数都是类
 * @type method
 * @link yugt.Implements
 * @param {Interface} interfass
 */
/*
Function.prototype.Implements=function(interfass){
	yugt.Implements(this,interfass);
}
*/

/**
 * 实例
 * 类似java的instanceof关键字
 * @type key
 * @param {Object} object
 * @param {Interface/Class} type类型对象（接口对象或类对象）
 * @return {Boolean} 是否是此类型的实例
 */
yugt.Instanceof=function(object,type){
	var _this=object;
	if(typeof(type)=='function'){
		if(type.prototype instanceof yugt.InterfaceFlag){//接口
			var _interfaceList=_this.constructor._interfaceList;
			if(_interfaceList){
				for(var i=0,len=_interfaceList.length;i<len;i++){
					if(_interfaceList[i]==type){
						return true;
					}
				}
			}
		}else{
			return _this instanceof type
		}
	}
	return false;
};
Y.Instanceof=yugt.Instanceof;

/**
 * 继承
 * 类似java的extend关键字
 * @type Key
 * @param {Class} superClass 父类
 * @return {Class} subClass 子类
 */
yugt.Extend=function(superClass){
	var subClass=new Function('(this.init)?this.init.apply(this,arguments):null;');
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	yugt.addKey(subClass);//TODO 考虑是否添加所以的key，是否为每个关键字后可使用的key定义规则
//	Y.print('subClass.prototype:');
//	Y.printPro(subClass.prototype);
	return subClass;
}

//版本2，支持init链
yugt.Extend=function(superClass){
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
	var init=function(){//改为链式调用后，子类申明时，肯定是没有init方法的
			superInit.apply(this,arguments);
		};
//	if(subInit){
//		init=function(){
//			superInit.apply(this,arguments);
//			subInit.apply(this,arguments);
//		}
//	}else{
//		init=function(){
//			superInit.apply(this,arguments);
//		};
//	}
	subClassPrototype.init=init;
	for(var method in subClassPrototype){
		subClass.prototype[method]=subClassPrototype[method];
	}
	/**
 	 * 父类构造
 	 * 类似java的super关键字
 	 * @type Key
	 */
	subClass.prototype.Super=superClass.prototype.init;//模拟Super关键字，用来执行父类的init方法，而避免了子类的init覆盖了父类的init的问题
//	Y.println(subClass.prototype.init.toString());
	return subClass;
}
Y.Extend=yugt.Extend;



/**
 * 所有yugt类的基类
 * 注：标准类声明
 */
yugt.BaseClass=function(){
	var _this=this;
	_this.init.apply(_this, arguments);//(_this.init)?_this.init.apply(_this, arguments):null;
}
yugt.BaseClass.prototype={//由于是基类，所以可以直接使用字面量{}。子类需要使用Extend获取一个prototype，从而继承基类。
	/**
	 * 构造初始化函数
	 * @type constructor
	 */
    init : function() {
        var _this=this;
//        _this.setOptions.apply(_this, arguments);
        var options = arguments[0] || {};//必选
//        _this.options=options;
//        _this.pro=options.pro || '1';//必选
        Y.println('BaseClass.prototype.init()');
    },
	/**
	 * 类似模拟关键字yugt.Instanceof
	 * @type method
 	 * @link yugt.Instanceof
	 * @param {Interface} Interfass
	 * @return {Boolean}
	 */
	Instanceof:function(Interfass){
		return yugt.Instanceof(this,Interfass);
	}
}

/**
 * 静态私有成员
 * 类似java的static private关键字
 * @type Key
 * @param {String} proNam
 * @return {Class} Class
 */
yugt.PrivateStatic=function(proName){
	var _this=this;
	proName=proName.replace(/^./,proName.charAt(0).toUpperCase());
	(function(){//为当前类创建一个闭包，用来存放私有变量
		var pro1;
		_this.prototype['get'+proName]=function(){// TODO 把proName的第一个字母大写，按照java beans规范改写
			return pro1;
		};
		_this.prototype['set'+proName]=function(proValue){
			pro1=proValue;
		};
	})();
//	yugt.addKey(_this);//TODO 考虑是否添加所以的key，是否为每个关键字后可使用的key定义规则，此处应该删除部分key
	return _this;
}

/**
 * 非静态私有成员
 * 类似java的private关键字
 * @type Key
 * @param {String} proNam
 * @return {Class} Class
 */
yugt.Private=function(proName){
	var _this=this;//原函数
	var originalFunStr=_this.toString();
//	var newFun=function(){//非私有成员必须定义在类的函数体中，于是需要修改函数体
//		var pro1;
//		this['get'+proName]=function(){
//			return pro1;
//		};
//		this['set'+proName]=function(proValue){
//			pro1=proValue;
//		};
//		(this.init)?init.apply(this,arguments):null;
//	};
	proName=proName.replace(/^./,proName.charAt(0).toUpperCase());
	var newFunStr=
		'var pro1;\n'+
		'this[\'get\'+\''+proName+'\']=function(){\n'+
		'	return pro1;\n'+
		'};\n'+
		'this[\'set\'+\''+proName+'\']=function(proValue){\n'+
		'	pro1=proValue;\n'+
		'};\n'+
		'(this.init)?this.init.apply(this,arguments):null;\n';
	originalFunStr=originalFunStr.replace('(this.init) ? this.init.apply(this, arguments) : null;',newFunStr);
//	.println(originalFunStr);
	var newFun=eval('('+originalFunStr+')');
//	.println('newFun:'+typeof(newFun));
	newFun.prototype=_this.prototype;
	newFun.prototype.constructor=newFun;
	yugt.addKey(newFun);//TODO 考虑是否添加所以的key，是否为每个关键字后可使用的key定义规则
	return newFun;
}

/**
 * 为类添加模拟的Key
 * @param {Class} clazz
 * @return {Class} clazz
 */
yugt.addKey=function(clazz){
	clazz.Extend=yugt.Extend;
	clazz.Implements=yugt.Implements;
	clazz.PrivateStatic=yugt.PrivateStatic;
	clazz.Private=yugt.Private;
	return clazz;
}

/**
 * 类
 * 模拟java关键字class
 * @type key
 * @return {Class} clazz
 */
yugt.Class=function(){
	var clazz=new Function('(this.init)?this.init.apply(this,arguments):null;');
	clazz.Extend=yugt.Extend;
	clazz=clazz.Extend(yugt.BaseClass);
	yugt.addKey(clazz);
	return clazz;
}