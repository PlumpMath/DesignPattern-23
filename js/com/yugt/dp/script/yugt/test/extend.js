/**
 * 类继承
 */
yugt.test = yugt.test || {};
//@import yugt.js

//块作用域
(function(){
    var pro='pro1';//private static成员变量

    var methodA2=function(){//private static方法
      alert('method2');
      return 'method2';
    }

    yugt.test.ClassA=function(p1){//构造函数
        var pro2='pro2';//private 成员变量
    //get、set、pro2
    yugt.test.ClassA.prototype.getPro2=function(){
      alert(pro2);
      return pro2;
    };
    yugt.test.ClassA.prototype.setPro2=function(p2){
      pro2=p2;
    }

        this.pro3='pro3';//public 成员变量
        pro=p1;
    };

    yugt.test.ClassA.prototype.methodA1=function(){ //public static方法
      alert('method1');
      return 'method1';
    };
    yugt.test.ClassA.prototype.pro4='pro4';//public static成员变量
    //get、set、pro
    yugt.test.ClassA.prototype.getPro=function(){
      return pro;
    };
    yugt.test.ClassA.prototype.setPro=function(p2){
      pro=p2;
    }

})();


yugt.test.testClassA = function() {
	var a;
	var claA = new yugt.test.ClassA(2);
	var b = claA.getPro();
}


/**
 * 所有yugt类的基类
 * 注：标准类声明
 */
yugt.test.BaseClass=function(){
	var _this=this;
	_this.init.apply(_this, arguments);
}
yugt.test.BaseClass.prototype={//由于是基类，所以可以直接使用字面量{}。子类需要使用Extend获取一个prototype，从而继承基类。
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
 * 克隆
 * 每个对象都应该有
 * @param {} object
 * @return {object}
 */
yugt.test.clone=function(object){
	var F=function(){};
	F.prototype=object;
	return new F;
}

/**
 * 继承
 * 类似java的extend关键字
 * @type Key
 * @param {Class} subClass 子类
 * @param {Class} superClass 父类
 */
/*
yugt.test.Extend=function(subClass,superClass){
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
}
*/
/**
 * 增强Extend
 * @param {} superClass
 * @return {}
 */
yugt.test.Extend=function(superClass){
	/*
	var subClass=function(){
		var _this=this;
		_this.init.apply(_this, arguments);
	};
	*/
	//Function()中最后一个参数代表的是函数体，使用字符串定义body不会参数奇异，导致闭包内存问题
	//init是函数的构造函数，但是如果类定义没有定义此init构造函数，则不调用，相当于java的默认构造函数
	//TODO 是否把构造函数定义成函数名一样，而且应该是外部不能直接调用的（相当于私有的）
	var subClass=new Function('(this.init)?this.init.apply(this,arguments):null');
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	return subClass;
}
//extend的主要作用只是用来修改类的原型链，而非生成一个类，所有还是使用extend(subClass,superClass);这种方式
//而且这种方式也与implements统一了，extend是类定义的倒数第二句，implements是倒数第一句。
//TODO 需不需要调用父类的构造函数，以及控制构造函数，形成构造函数链，需要默认构造函数吗？（可以通过修改构造函数的方式实现）
/*
yugt.test.Extend=function(superClass,subInit){//此种方式问题：构造函数没法私有化
	var subClass=(function(){
		var init=subInit;
		var ret=function(){
			(this.init)?this.init.apply(this,arguments):null;
		};
		return ret;
	})();

	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	return subClass;
}
*/
yugt.test.Extend=function(subClass,superClass){
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
/*
	//每次调用extend都创建一个闭包，用来保存当前的subInit和superInit //不用这么做！！！
	//TODO 应该让原init内的代码复原，而不是间接调用
	var init=function(_subInit,_superInit){
		var ret;
		if(_subInit){
//			.println('subInit:'+_subInit.toString());
//			.println('superInit:'+_superInit.toString());
			ret=function(){
				_superInit.apply(this,arguments);
				_subInit.apply(this,arguments);
			}
		}else{
			ret=function(){
				_superInit.apply(this,arguments);
			};
		}
		return ret;
	}(subInit,superInit);
*/
	subClassPrototype.init=init;
	//拷贝子类原型中定义的方法
	for(var method in subClassPrototype){
		subClass.prototype[method]=subClassPrototype[method];
	}

}

//定义Class类，方便用来定义类,继承自Function
//还是不要了Class，使得够着函数更开放，可以定义各种类型的变量
yugt.test.Class=(function(){
	var Extend=function(subClass,superClass){
		var F=function(){};
		F.prototype=superClass.prototype;
		subClass.prototype=new F();
		subClass.prototype.constructor=subClass;
	};
	var ret=function(){
//		Function.prototype.constructor.call(this);
	};
//	ret=Function.prototype.constructor;
	Extend(ret,Function);
//	ret.prototype=Function.prototype;
	return ret;
})();

yugt.test.Class=function(){
	var ret=function(){
		(this.init)?init.apply(this,arguments):null;
	}
	return ret;
}

/**
 * 静态私有
 * @param {} clazz
 * @param {} pro1
 * @return {}
 */
yugt.test.StaticPrivate=function(clazz,proName){
	(function(){//为clazz创建一个闭包，用来存放私有变量
		var pro1;
		clazz.prototype['get'+proName]=function(){// TODO 把proName的第一个字母大写，按照java beans规范改写
			return pro1;
		};
		clazz.prototype['set'+proName]=function(proValue){// TODO 把proName的第一个字母大写，按照java beans规范改写
			pro1=proValue;
		};
	})();
}
/**
 * 非静态私有
 * @param {} clazz
 * @param {} pro1
 * @return {}
 */
yugt.test.Private=function(proName){
	var _this=this;//原函数
	// TODO toString得到原函数代码，字符串修改后用eval产生新的函数，目前简写如下
	var originalFunStr=_this.toString();
 	originalFunStr.lastIndexOf('}');
	Y.println(originalFunStr.lastIndexOf('}'));
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
	yugt.addKey(newConstructor);//TODO 考虑是否添加所以的key，是否为每个关键字后可使用的key定义规则
	return newConstructor;
}

//TODO 使用如下方式定义类
//var clazz=Class().extend(Class1).implments(Interface1)
//			.Private(proName)
//			.StaticPrivate(proName);


/**
 * test
 */
yugt.test.testExtend=function(){
	var _self=yugt.test.testExtend.prototype;
//	_self.test();
//	_self.testExtend();
//	_self.testExtend2();
//	_self.testThis();
//	_self.testInitLink();
//	_self.testClosure();
//	_self.testClass();
//	_self.testPrivate();
	_self.testNewKey();
}
yugt.test.testExtend.prototype={
	test:function(){
		var SuperClass=function(){};
		yugt.test.Extend(SuperClass,yugt.test.BaseClass);
		var SubClass=function(){};
		yugt.test.Extend(SubClass,SuperClass);
		var superObj=new SuperClass();
		var subObj=new SubClass();
		Y.println('subobj instanceof SuperClass:'+(subObj instanceof SuperClass));
		Y.println('subObj.Instanceof(SuperClass):'+(subObj.Instanceof(SuperClass)));
		Y.println('subObj.Instanceof(yugt.test.BaseClass):'+(subObj.Instanceof(yugt.test.BaseClass)));
	},
	testExtend:function(){
		var SuperClass=yugt.test.Extend(yugt.test.BaseClass);
		var SubClass=yugt.test.Extend(SuperClass);

		var superObj=new SuperClass();
		var subObj=new SubClass();
		Y.println('subObj instanceof SuperClass:'+(subObj instanceof SuperClass));
		Y.println('subObj.Instanceof(SuperClass):'+(subObj.Instanceof(SuperClass)));
		Y.println('subObj.Instanceof(yugt.test.BaseClass):'+(subObj.Instanceof(yugt.test.BaseClass)));
	},
	testExtend2:function(){
		var SuperClass=function(){};
		SuperClass.prototype.method1=function(){};
		yugt.test.Extend(SuperClass,yugt.test.BaseClass);
		var SubClass=(function(){
			var init=function(){
				Y.println('SubClass.init() strat...');
				this.option=arguments[0];
			};
			var ret=function(){
//				(this.init)?this.init.apply(this,arguments):null;
				init.apply(this,arguments);
			};
			return ret;
		})();
		yugt.test.Extend(SubClass,SuperClass);
		Y.println('SubClass:'+SubClass.toString());

		var superObj=new SuperClass();
		var subObj=new SubClass({pro1:1,pro2:2});
		Y.print('subObj.option:');Y.printPro(subObj.option);
		Y.println('subobj instanceof SuperClass:'+(subObj instanceof SuperClass));
		Y.println('subObj.Instanceof(SuperClass):'+(subObj.Instanceof(SuperClass)));
		Y.println('subObj.Instanceof(yugt.test.BaseClass):'+(subObj.Instanceof(yugt.test.BaseClass)));
	},
	testThis:function(){//结论：闭包中的this指代的是最内层的函数
		var fun1=(function(){
			var _this=this;
			Y.println('fun1\'s this:'+(this.constructor));
			var fun2=function fun22(){
				var _parentThis=_this;
				Y.println('fun1\'s this:'+(_parentThis.constructor));
				Y.println('fun2\'s this:'+(this.constructor));
			}
			return fun2;
		})();
		new fun1();//执行fun2
	},
	testInitLink:function(){
		var SuperClass=function(){
			(this.init)?this.init.apply(this,arguments):null;
		};
		SuperClass.prototype.method1=function(){};
		SuperClass.prototype.init=function(){
			Y.println('SuperClass.prototype.init()');
		}
		yugt.test.Extend(SuperClass,yugt.test.BaseClass);
		var SubClass=(function(){
			var init=function(){
				Y.println('SubClass.init() strat...');
				this.option=arguments[0];
			};
			var ret=function(){
				(this.init)?this.init.apply(this,arguments):null;
//				init.apply(this,arguments);
			};
			return ret;
		})();
		SubClass.prototype.init=function(){
			Y.println('SubClass.prototype.init()');
		}
		yugt.test.Extend(SubClass,SuperClass);

		Y.println('[SubClass初始化开始');
		var subObj=new SubClass({pro1:1,pro2:2});
		Y.println('SubClass初始化结束]');
		Y.println('');
		Y.println('[SuperClass初始化开始');
		var superObj=new SuperClass();
		Y.println('SuperClass初始化结束]');
		Y.println('');
		Y.println('[SubClass初始化开始');
		var subObj2=new SubClass({pro1:1,pro2:2});
		Y.println('SubClass初始化结束]');

	},
	//结论：外部传入的对象obj，如果是同一个对象，则closure函数访问的也就是同一个函数
	//closure中依赖的i.obj其实是传入的对象obj的obj属性
	/* 与下列代码不同。下列代码中的i是在一个函数中的变量，而非外部传入的不同对象，在函数执行完后，只有一种状态
	 * for(var i=0;i<10;i++){
		result[i]=function(){
		return i;
	  };
	*/
	testClosure:function(){
		var e=function(obj){
			var i=obj;
			var closure=function(){
				Y.println('i.obj:'+i.obj);
			}
			return closure;
		};
		var obj={obj:1};
		var closure1=e(obj);
//		obj={obj:2};
		obj.obj=2;
		var closure2=e(obj);
		closure1();
		closure2();

		for(var i=0;i<10;i++){

		}
	},
	testClass:function(){
		var fun1=new yugt.test.Class;
		var fun1Obj=new fun1();
		Y.println('fun1:'+typeof(fun1));
		Y.println('fun1Obj:'+typeof(fun1Obj));
		Y.println('fun1Obj instanceof Function:'+(fun1Obj instanceof Function));

		var fun2=new Function();
		var fun2Obj=new fun2();
		Y.println('fun2:'+typeof(fun2));
		Y.println('fun2Obj:'+typeof(fun2Obj));
		Y.println('fun2Obj instanceof Function:'+(fun2Obj instanceof Function));
	},
	testPrivate:function(){
		var clazz1=new yugt.test.Class();
		yugt.test.StaticPrivate(clazz1,'Pro1');
		var clazz1Obj1=new clazz1();
		var clazz1Obj2=new clazz1();
		clazz1Obj1.setPro1('clazz1Obj1.pro1');
		clazz1Obj2.setPro1('clazz1Obj2.pro1');
		Y.println('clazz1Obj1静态属性Pro1():'+clazz1Obj1.getPro1());
		Y.println('clazz1Obj2静态属性Pro1():'+clazz1Obj2.getPro1());

		var clazz2=new yugt.test.Class();
		clazz2=yugt.test.Private(clazz2,'Pro1');
		var clazz2Obj1=new clazz2();
		var clazz2Obj2=new clazz2();
		clazz2Obj1.setPro1('clazz2Obj1.pro1');
		clazz2Obj2.setPro1('clazz2Obj2.pro1');
		Y.println('clazz2Obj1非静态属性Pro1():'+clazz2Obj1.getPro1());
		Y.println('clazz2Obj2非静态属性Pro1():'+clazz2Obj2.getPro1());
	},
	testNewKey : function() {
		var Interfacss1 = yugt.Interface('method1', 'method2');// 接口1
		var Interfacss2 = yugt.Interface('method3');// 接口2
		var SupberClass = yugt.Class();// 父类
		SupberClass.prototype.init=function(){//定义构造函数，需要自己调用父类的构造，默认构造自己掉父类构造，同java
			SupberClass.prototype.Super();//不能使用this.Super()；this一直指向当前类，而不会逐层替换为父类，造成无限循环，导致堆栈溢出（超出函数调用栈的层级数，java不过2000+而已）
			Y.println('SupberClass.prototype.init()');
		}
		var supberClassObj1 = new SupberClass();

		// 子类
		var SubClass = yugt.Class().Extend(SupberClass).Implements(Interfacss1,Interfacss2)
						.PrivateStatic('staProName')
						.Private('proName');//PrivateStatic 与 Private无先后顺序要求
		SubClass.prototype.init=function(){
			SubClass.prototype.Super();
//			.println(this.Super.toString());
			Y.println('SubClass.prototype.init()');
		}
//		Y.println(SupberClass.toString());
//		Y.println(SupberClass.prototype.init.toString());
		Y.println(SubClass.toString());
		Y.println(SubClass.prototype.init.toString());
		var subClassObj1 = new SubClass();
		var subClassObj2 = new SubClass();
		Y.printPro(subClassObj1);
//		.println(SubClass.prototype.init.toString());
//		.println(subClassObj1.init.toString());
		subClassObj1.setStaProName('StaProName1');
		subClassObj2.setStaProName('StaProName2');
		Y.println('subClassObj1.StaProName='+subClassObj1.getStaProName());
		subClassObj1.setProName('ProName1');
		subClassObj2.setProName('ProName2');
		Y.println('subClassObj1.proName='+subClassObj1.getProName());
	}



}

//最保险的调用函数本身 arguments.callee
//怎么调用arguments 在匿名函数中需要that=this能访问外部的包含函数的this（直接调用是永远都访问不到的）
//继承（工厂模式）应该传ClassA而不是ClassA.prototype
//instanceof根据什么判断的 根据new了那个function