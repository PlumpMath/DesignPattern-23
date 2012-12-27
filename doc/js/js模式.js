//Interface类
var Interface=function(name,methods){
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
//static class method
Interface.ensureImplements=function(object){
...
}

使用步骤
1.引入Interface（http://jsdesignpatterns.com/）
2.检查所有以对象为参数的方法
3.为每个不同的方法创建一个Interface对象
4.剔除所有针对构造器的显式检查
5.以Interface.ensureImplements取代原来的构造器检查


//extend函数
function extend(subClass,superClass){
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
}


//原型式继承，使用clone函数来继承和实例化
//clone函数
function clone(object){
	function F(){}
	F.prototype=object;
	return new F;
}


//命名空间
var GiantCorp = window.GiantCorp || {};


//单例模式-私有与公有
MyNamespace.Singleton=(function(){
	//private members
	var attr1=false;
	var attr2=[1,2,3];
	function mth1(){}
	function mth2(){}
	
	return {
		//public members
		attr1:true,
		attr2:10,
		mth1:function(){},
		mth2:function(){}
	};
})();


//单例模式-惰性加载
//Singleton.getInstance().methodName();
MyNamespace.Singleton=(function(){
	var uniqueInstance;//单例对象的句柄
	function constructor(){
		//单例模式正常的代码，构造器
	}
  
  return {
  	getInstance:function(){
  		if(!uniqueInstance){//只有当单例对象不存在的时候，才实例化一个
  			uniqueInstance=constructor();
  		}
  		return uniqueInstance;
  	}
  }
})();


//单例模式-分支
MyNamespace.Singleton=(function(){
	var obj1={};
	var obj2={};
	return (true)?obj1:obj2;
})();


//链式调用的API框架
//return this;
(function(){
	function _$(els){
		//...
	}
	_$.prototype={
		each:function(fn){
			//...
			return this;
		},
		setStyle:function(prop,val){
			//...
			return this;
		}
		//...
	};
	window.$=function(){
		return new _$(arguments);
	}
})();


//安装器
window.installHelper=function(scope,interface){
	scope[interface]=function(){
		return new _$(arguments);
	}
}

window.com=window.com || {};
com.example=com.example || {};
com.example.util=com.example.util || {};
installHelper(window,'$');//在全局范围window里，安装$函数