//��������
(function(){
	var pro='pro1';//private static��Ա����
	
	var methodA2=function(){//private static����
	  alert('method2');
	  return 'method2';
	}
	
	ClassA=function(p1){//���캯��
		var pro2='pro2';//private ��Ա����
	//get��set��pro2
	ClassA.prototype.getPro2=function(){
	  alert(pro2);
	  return pro2;
	};
	ClassA.prototype.setPro2=function(p2){
	  pro2=p2;
	}
	
		this.pro3='pro3';//public ��Ա����
		pro=p1;
	};
	
	ClassA.prototype.methodA1=function(){ //public static����
	  alert('method1');
	  return 'method1';
	};
	ClassA.prototype.pro4='pro4';//public static��Ա����
	//get��set��pro
	ClassA.prototype.getPro=function(){
	  alert(pro);
	  return pro;
	};
	ClassA.prototype.setPro=function(p2){
	  pro=p2;
	}

})();

	
/*����*/
//����
ClassB=function(){
  this.pro=1;//public��Ա����
};
ClassB.prototype.methodB1=function(){//public static����
	alert('method1');
  return 'method1';
};
	
/*����*/
//���ܺ���
function copyProto(obj){
  var f=function(){};
  f.prototype=obj;
  return new f();
}
function entendSuperPrototype(superClass,subClass){
  subClass.prototype=copyProto(superClass.prototype);
  subClass.prototype.constructor=subClass;
}
//����
ClassC=function(){
	ClassB.call(this);//�̳и���public��Ա����
  this.pro1=2;
};
//ClassC.prototype=new ClassB();	//���������Ż�������proto���и���ĳ�Ա����
entendSuperPrototype(ClassB,ClassC);//�̳и���public static����
ClassC.prototype.methodC1=function(){
	alert('method1');
  return 'method1';
};
	
	
	
	
	
	
	
	
//��յĵ��ú������� arguments.callee
//��ô����arguments ��������������Ҫthat=this�ܷ����ⲿ�İ���������this��ֱ�ӵ�������Զ�����ʲ����ģ�
//�̳У�����ģʽ��Ӧ�ô�ClassA������ClassA.prototype
//instanceof����ʲô�жϵ� ����new���Ǹ�function