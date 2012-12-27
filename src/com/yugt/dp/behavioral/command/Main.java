package com.yugt.dp.behavioral.command;

public class Main {
	public static void main(String[] args) {
		Receiver receiver = new Receiver();
		Invoker invoker = new Invoker();
		invoker.addCommand("JUSTIN", new UpperCaseHelloCommand(receiver));
		invoker.addCommand("momor", new LowerCaseHelloCommand(receiver));
		// simulate random request
		String[] req = { "JUSTIN", "momor" };
		while (true) {
			int i = (int) (Math.random() * 10) % 2;
			invoker.request(req[i]);
		}
	}
}