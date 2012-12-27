yugt.dp = yugt.dp || {};
yugt.dp.behavioral = yugt.dp.behavioral || {};
yugt.dp.behavioral.observer = yugt.dp.behavioral.observer || {};
//@import yugt.js


/**
 * 观察者一般实现的接口
 */
yugt.dp.behavioral.observer.IObserver=yugt.Interface(
					'receive',//接收投递消息
					'observe',//观察
					'unobserve'//不观察
				);

/**
 * 观察者
 */
yugt.dp.behavioral.observer.Observer=yugt.Class();

/**
 * 接收投递消息
 * @type method
 * @param {} message
 */
yugt.dp.behavioral.observer.Observer.prototype.receive=function(message){
	Y.println('receive()');
	Y.println(message);
};
/**
 * 观察
 * @type method
 * @param {IPublisher} publisher
 * @return {Boolean}
 */
yugt.dp.behavioral.observer.Observer.prototype.observe=function(publisher){
	Y.println('observe()');
	publisher.register(this);
	return true;
};
/**
 * 不观察
 * @type method
 * @param {IPublisher} publisher
 * @return {Boolean}
 */
yugt.dp.behavioral.observer.Observer.prototype.unobserve=function(publisher){
	Y.println('unobserve()');
	publisher.unregister(this);
};



