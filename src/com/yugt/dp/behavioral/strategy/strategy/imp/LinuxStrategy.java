package com.yugt.dp.behavioral.strategy.strategy.imp;

import com.yugt.dp.behavioral.strategy.TextStrategy;

public class LinuxStrategy extends TextStrategy {
	public LinuxStrategy(String text) {
		super(text);
	}

	public String replace() {
		preOperation();
		System.out.println(text = text.replaceAll("@r@n", "@n"));
		postOperation();
		return text;
	}

	private void preOperation() {
		System.out.println("LinuxStrategy preOperation");
	}

	private void postOperation() {
		System.out.println("LinuxStrategy postOperation");
	}
}
