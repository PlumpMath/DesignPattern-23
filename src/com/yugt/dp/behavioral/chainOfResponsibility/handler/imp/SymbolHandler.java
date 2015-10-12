package com.yugt.dp.behavioral.chainOfResponsibility.handler.imp;

import com.yugt.dp.behavioral.chainOfResponsibility.handler.Handler;

/**
 * 具体请求处理者
 * @author Administrator
 *
 */
public class SymbolHandler extends Handler {
	public void handleRequest(char c) {
		System.out.println("Symbol has been handled");
	}
}
