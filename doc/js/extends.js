//块作用域
(function(){
	var pro='pro1';//private static成员变量
	
	var methodA2=function(){//private static方法
	  alert('method2');
	  return 'method2';
	}
	
	ClassA=function(p1){//构造函数
		var pro2='pro2';//private 成员变量
	//get、set、pro2
	ClassA.prototype.getPro2=function(){
	  alert(pro2);
	  return pro2;
	};
	ClassA.prototype.setPro2=function(p2){
	  pro2=p2;
	}
	
		this.pro3='pro3';//public 成员变量
		pro=p1;
	};
	
	ClassA.prototype.methodA1=function(){ //public static方法
	  alert('method1');
	  return 'method1';
	};
	ClassA.prototype.pro4='pro4';//public static成员变量
	//get、set、pro
	ClassA.prototype.getPro=function(){
	  alert(pro);
	  return pro;
	};
	ClassA.prototype.setPro=function(p2){
	  pro=p2;
	}

})();

	
/*父类*/
//父类
ClassB=function(){
  this.pro=1;//public成员变量
};
ClassB.prototype.methodB1=function(){//public static方法
	alert('method1');
  return 'method1';
};
	
/*子类*/
//功能函数
function copyProto(obj){
  var f=function(){};
  f.prototype=obj;
  return new f();
}
function entendSuperPrototype(superClass,subClass){
  subClass.prototype=copyProto(superClass.prototype);
  subClass.prototype.constructor=subClass;
}
//子类
ClassC=function(){
	ClassB.call(this);//继承父类public成员变量
  this.pro1=2;
};
//ClassC.prototype=new ClassB();	//这样不够优化，导致proto中有父类的成员变量
entendSuperPrototype(ClassB,ClassC);//继承父类public static方法
ClassC.prototype.methodC1=function(){
	alert('method1');
  return 'method1';
};
	
	
	
	
	
	
	
	
//最保险的调用函数本身 arguments.callee
//怎么调用arguments 在匿名函数中需要that=this能访问外部的包含函数的this（直接调用是永远都访问不到的）
//继承（工厂模式）应该传ClassA而不是ClassA.prototype
//instanceof根据什么判断的 根据new了那个function