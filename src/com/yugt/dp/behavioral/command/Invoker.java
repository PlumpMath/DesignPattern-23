package com.yugt.dp.behavioral.command;

import java.util.HashMap;
import java.util.Map;

/**
 * 存放命令对象，适时就调用
 * @author Administrator
 *
 */
public class Invoker {
	private Map<String,ICommand> commands;

	public Invoker() {
		commands = new HashMap<String,ICommand>();
	}

	public void addCommand(String commName, ICommand command) {
		commands.put(commName, command);
	}

	public void request(String commName) {
		ICommand command = (ICommand) commands.get(commName);
		command.execute();
	}
}
