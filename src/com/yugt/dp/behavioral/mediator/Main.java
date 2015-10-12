package com.yugt.dp.behavioral.mediator;

/**
 * 中介者test
 * @author Administrator
 *
 */
public class Main {

	public static void main(String[] args) {
		// 生成中介者 并注入到各个Colleague对象中
		Mediator mediator = new ConcreteMediator();
		Colleague colleague1 = new ConcreteColleague1(mediator);
		Colleague colleague2 = new ConcreteColleague2(mediator);
		Colleague colleague3 = new ConcreteColleague3(mediator);

		// 注册对象到中介
		mediator.addCollegue(colleague1);
		mediator.addCollegue(colleague2);
		mediator.addCollegue(colleague3);

		// Colleague1 触发行为
		colleague1.sendMsg("Hi,it's time to lunch. Let's go!");
		System.out.println();
		// Colleague2 触发行为
		colleague2.sendMsg("Is anybody here!");
		System.out.println();
		// Colleague3 触发行为
		colleague3.sendMsg("Wait!I will lunch off right away.");
		System.out.println();

	}
}
