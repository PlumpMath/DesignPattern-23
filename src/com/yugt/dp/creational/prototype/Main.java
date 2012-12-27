package com.yugt.dp.creational.prototype;

public class Main {
	public static void main(String[] args) throws Exception {
		Application application = new Application();
		application.setCircleTablePrototype(new CircleTable());//只把需要变动的部分暴露出来、或者说留给客户选择
		application.runAppExample();
	}
}
