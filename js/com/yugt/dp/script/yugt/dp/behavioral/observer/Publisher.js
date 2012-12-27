yugt.dp = yugt.dp || {};
yugt.dp.behavioral = yugt.dp.behavioral || {};
yugt.dp.behavioral.observer = yugt.dp.behavioral.observer || {};
//@import yugt.js

/**
 * 发布者一般实现的接口
 */
yugt.dp.behavioral.observer.IPublisher=yugt.Interface(
					'register',//注册观察者
					'unregister',//注销观察者
					'deliver'//投递消息
				);
/**
 * 发布者
 */
yugt.dp.behavioral.observer.Publisher=yugt.Class().Implements(yugt.dp.behavioral.observer.IPublisher)
												  .Private('observerList');

yugt.dp.behavioral.observer.Publisher.prototype.init=function(){
	yugt.dp.behavioral.observer.Publisher.prototype.Super();
	this.setObserverList([]);
}
/**
 * 注册观察者
 * @type method
 * @param {IObserver} IObserver
 * @return {Boolean}
 */
yugt.dp.behavioral.observer.Publisher.prototype.register=function(observer){
	Y.println('register()');
	this.getObserverList().push(observer);
	return true;
};
/**
 * 注销观察者
 * @type method
 * @param {IObserver} IObserver
 * @return {Boolean}
 */
yugt.dp.behavioral.observer.Publisher.prototype.unregister=function(observer){
	Y.println('unregister()');
	this.getObserverList().pop(observer);
	return true;
};
/**
 * 投递消息
 * @type method
 * @param {String} message
 */
yugt.dp.behavioral.observer.Publisher.prototype.deliver=function(message){
	Y.println('deliver()');
	var observerList=this.getObserverList();
	for(var i=0,len=observerList.length;i<len;i++){
		observerList[i].receive(message);
	}
};