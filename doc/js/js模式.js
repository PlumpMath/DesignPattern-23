//Interface��
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

ʹ�ò���
1.����Interface��http://jsdesignpatterns.com/��
2.��������Զ���Ϊ�����ķ���
3.Ϊÿ����ͬ�ķ�������һ��Interface����
4.�޳�������Թ���������ʽ���
5.��Interface.ensureImplementsȡ��ԭ���Ĺ��������


//extend����
function extend(subClass,superClass){
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
}


//ԭ��ʽ�̳У�ʹ��clone�������̳к�ʵ����
//clone����
function clone(object){
	function F(){}
	F.prototype=object;
	return new F;
}


//�����ռ�
var GiantCorp = window.GiantCorp || {};


//����ģʽ-˽���빫��
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


//����ģʽ-���Լ���
//Singleton.getInstance().methodName();
MyNamespace.Singleton=(function(){
	var uniqueInstance;//��������ľ��
	function constructor(){
		//����ģʽ�����Ĵ��룬������
	}
  
  return {
  	getInstance:function(){
  		if(!uniqueInstance){//ֻ�е��������󲻴��ڵ�ʱ�򣬲�ʵ����һ��
  			uniqueInstance=constructor();
  		}
  		return uniqueInstance;
  	}
  }
})();


//����ģʽ-��֧
MyNamespace.Singleton=(function(){
	var obj1={};
	var obj2={};
	return (true)?obj1:obj2;
})();


//��ʽ���õ�API���
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


//��װ��
window.installHelper=function(scope,interface){
	scope[interface]=function(){
		return new _$(arguments);
	}
}

window.com=window.com || {};
com.example=com.example || {};
com.example.util=com.example.util || {};
installHelper(window,'$');//��ȫ�ַ�Χwindow���װ$����