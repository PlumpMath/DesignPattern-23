package com.yugt.dp.behavioral.mediator;

/**
 * 抽象中介者
 * @author Administrator
 *
 */
public abstract class Mediator {
	// Mediator针对Colleague的一个交互行为
	public abstract void action(Colleague sender);

	// 加入Colleague对象
	public abstract void addCollegue(Colleague colleague);
}
