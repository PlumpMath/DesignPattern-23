package com.yugt.dp.behavioral.command;

/**
 * 具体命令
 * @author Administrator
 *
 */
public class LowerCaseHelloCommand implements ICommand {

	private Receiver receiver;

	public LowerCaseHelloCommand(Receiver receiver) {
		this.receiver = receiver;
	}

	public void execute() {
		System.out.println("LowerCaseHelloCommand, ");
		receiver.action();
	}
}