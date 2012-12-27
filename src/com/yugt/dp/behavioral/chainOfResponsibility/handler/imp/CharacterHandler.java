package com.yugt.dp.behavioral.chainOfResponsibility.handler.imp;

import com.yugt.dp.behavioral.chainOfResponsibility.handler.Handler;

/**
 * 具体请求处理者
 * @author Administrator
 *
 */
public class CharacterHandler extends Handler {
	public void handleRequest(char c) {
		if (Character.isLetter(c)) {
			System.out.println("Character has been handled");
		} else {
			getSuccessor().handleRequest(c);
		}
	}
}