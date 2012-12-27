/**
 * 类继承
 */
yugt.test = yugt.test || {};
yugt.test.dp = yugt.test.dp || {};
yugt.test.dp.behavioral = yugt.test.dp.behavioral || {};
//@import yugt.js

yugt.test.dp.behavioral.observer=function(){

};

/**
 * test
 */
yugt.test.dp.testBehavioral=function(){
	var _self=this.testBehavioral.prototype;
	_self.testObserver();
}

yugt.test.dp.testBehavioral.prototype={
	testObserver:function(){
		var observer=new yugt.dp.behavioral.observer.Observer();
		var publisher=new yugt.dp.behavioral.observer.Publisher();
		var observerList=publisher.getObserverList();
		Y.println('observerList.length:'+observerList.length);
		observer.observe(publisher);
		Y.println('observerList.length:'+observerList.length);
//		observer.unobserve(publisher);
		Y.println('observerList.length:'+observerList.length);
		publisher.deliver('this is pulisher message');
	}
}