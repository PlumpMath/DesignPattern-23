package com.yugt.dp.behavioral.interpreter;

import java.util.*;

/**
 * 被解析的内容（即：把需要解析的内容作为一个对象）
 * @author Administrator
 *
 */
public class Context {
	private StringTokenizer tokenizer;
	private String currentToken;

	public Context(String text) {
		tokenizer = new StringTokenizer(text);
		nextToken();
	}

	public String nextToken() {
		if (tokenizer.hasMoreTokens()) {
			currentToken = tokenizer.nextToken();
		} else {
			currentToken = null;
		}
		return currentToken;
	}

	public String currentToken() {
		return currentToken;
	}

	public void skipToken(String token) {
		if (!token.equals(currentToken)) {
			System.err.println("Warning: " + token + " is expected, but "
					+ currentToken + " is found.");
		}
		nextToken();
	}

	public int currentNumber() {
		int number = 0;
		try {
			number = Integer.parseInt(currentToken);
		} catch (NumberFormatException e) {
			System.err.println("Warning: " + e);
		}
		return number;
	}
}
