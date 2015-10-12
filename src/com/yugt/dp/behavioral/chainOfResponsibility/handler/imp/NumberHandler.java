package com.yugt.dp.behavioral.chainOfResponsibility.handler.imp;

import com.yugt.dp.behavioral.chainOfResponsibility.handler.Handler;

/**
 * 具体请求处理者
 * @author Administrator
 *
 */
public class NumberHandler extends Handler {
	public void handleRequest(char c) {
		if (Character.isDigit(c)) {
			System.out.println("Number has been handled");
		} else {
			getSuccessor().handleRequest(c);
		}
	}
}
