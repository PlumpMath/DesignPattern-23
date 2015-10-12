package com.yugt.dp.behavioral.chainOfResponsibility.handler;

/**
 * 抽象请求处理者
 * @author Administrator
 *
 */
public class Handler {
	private Handler successor;

	public void setSuccessor(Handler successor) {
		this.successor = successor;
	}

	public Handler getSuccessor() {
		return successor;
	}

	public void handleRequest(char c) {
		if (successor != null)
			successor.handleRequest(c);
	}
}