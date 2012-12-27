package com.yugt.dp.behavioral.mediator;

import java.util.ArrayList;
import java.util.List;

/**
 * 具体中介者
 * @author Administrator
 *
 */
public class ConcreteMediator extends Mediator {

	private List<Colleague> colleagues = new ArrayList<Colleague>(0);

	public void addCollegue(Colleague colleague) {
		colleagues.add(colleague);
	}

	/**
	 * 此方法封装了：添加到colleagues中的“同事”对象的交互
	 */
	public void action(Colleague actor) {
		String msg = actor.getMessage();
		// send msg
		for (Colleague colleague : colleagues) {
			if (colleague.equals(actor)) {
				colleague.sendMsg();
				break;
			}
		}

		// got msg
		for (Colleague colleague : colleagues) {
			if (colleague.equals(actor))
				continue;

			colleague.getMsg(msg);
		}
	}
}
