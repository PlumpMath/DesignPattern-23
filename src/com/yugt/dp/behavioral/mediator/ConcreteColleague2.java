package com.yugt.dp.behavioral.mediator;

/**
 * 具体同事2
 * @author Administrator
 *
 */
public class ConcreteColleague2 extends Colleague {
	public ConcreteColleague2(Mediator m) {
		super(m);
	}

	public void getMsg(String msg) {
		System.out.println("Colleague2 has got  the message  -'" + msg + "'");
	}

	public void sendMsg() {
		System.out.println("Colleague2 has send the message '" + getMessage() + "'");
	}
}
