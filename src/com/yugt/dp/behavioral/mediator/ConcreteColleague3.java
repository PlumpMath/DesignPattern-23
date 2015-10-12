package com.yugt.dp.behavioral.mediator;

/**
 * 具体同事3
 * @author Administrator
 *
 */
public class ConcreteColleague3 extends Colleague {
	public ConcreteColleague3(Mediator m) {
		super(m);
	}

	public void getMsg(String msg) {
		System.out.println("Colleague3 has got  the message  -'" + msg + "'");
	}

	public void sendMsg() {
		System.out.println("Colleague3 has send the message '" + getMessage() + "'");
	}
}
