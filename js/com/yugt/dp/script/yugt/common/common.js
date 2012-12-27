//需求：
//1.类system.out.println函数
//2.模拟sleep
//3.common.js里的函数

/**
 * 通用包
 * @type package
 */
//if(!yugt.common)yugt.common={}//不依赖，即common包可多文件
yugt.common = yugt.common || {};
//@import yugt.js

yugt.common.println=function(str){
	if(yugt.CONFIG.isServer){
		Packages.java.lang.System.out.println(str);
	}else{
		//TODO 非服务器端输出
	}
};
Y.println=yugt.common.println;

yugt.common.print=function(str){
	if(yugt.CONFIG.isServer){
		Packages.java.lang.System.out.print(str);
	}else{
		//TODO 非服务器端输出
	}
}
Y.print=yugt.common.print;

/**
 * 打印对象的所有属性名
 * @type method
 * @param {Object} str
 */
yugt.common.printPro=function(obj){
	var ownProStr='';
	var protoProStr='';
	var pro;
	for(pro in obj){
		if(obj.hasOwnProperty(pro)){
			ownProStr=ownProStr+pro+',';
		}else{
			protoProStr=protoProStr+pro+',';
		}
	}
	ownProStr=ownProStr.replace(/,$/,'');
	protoProStr=protoProStr.replace(/,$/,'');
	yugt.common.println('all of this obj\'s sproperty name:ownProStr['+ownProStr+']; _proto_['+protoProStr+']');
}
Y.printPro=yugt.common.printPro;

/**
 * 克隆
 * 每个对象都应该有
 * @type method
 * @param {object} object
 * @return {object}
 */
yugt.common.clone=function(object){
	var F=function(){};
	F.prototype=object;
	return new F;
}
Y.clone=yugt.common.clone;

/**
 * 判断原型中是否有某个属性
 * in 无论属性在对象中还是原型中，都返回true
 * hasOwnProperty 指在对象自己中定义的属性，而非原型中的属性，返回true
 * @param {Object} obj
 * @param {String} name
 * @return {Boolean}
 */
yugt.common.hasPrototypeProperty=function(obj,name){
	return !obj.hasOwnProperty(name) && (name in obj);
}