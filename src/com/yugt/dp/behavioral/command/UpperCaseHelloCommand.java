package com.yugt.dp.behavioral.command;

/**
 * 具体命令
 *
 * @author Administrator
 *
 */
public class UpperCaseHelloCommand implements ICommand {
	private Receiver receiver;

	public UpperCaseHelloCommand(Receiver receiver) {
		this.receiver = receiver;
	}

	public void execute() {
		System.out.println("UpperCaseHelloCommand, ");
		receiver.action();
	}
}