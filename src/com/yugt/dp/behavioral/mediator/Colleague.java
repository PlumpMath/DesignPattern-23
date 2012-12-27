package com.yugt.dp.behavioral.mediator;

/**
 * 抽象同事
 * @author Administrator
 *
 */
public abstract class Colleague {
	// 中介者
	private Mediator mediator;

	public Mediator getMediator() {
		return mediator;
	}

	public Colleague(Mediator m) {
		mediator = m;
	}

	// 消息
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	// 发送消息
	public abstract void sendMsg();

	// 收到消息
	public abstract void getMsg(String msg);

	// 发送消息
	public void sendMsg(String msg) {
		this.message = msg;
		mediator.action(this);
	}
}
