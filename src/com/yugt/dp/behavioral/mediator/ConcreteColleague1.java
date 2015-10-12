package com.yugt.dp.behavioral.mediator;

/**
 * 具体同事1
 * @author Administrator
 *
 */
public class ConcreteColleague1 extends Colleague {
	public ConcreteColleague1(Mediator m) {
		super(m);
	}

	public void getMsg(String msg) {
		System.out.println("Colleague1 has got  the message  -'" + msg + "'");
	}

	public void sendMsg() {
		System.out.println("Colleague1 has send the message '" + getMessage() + "'");
	}
}
