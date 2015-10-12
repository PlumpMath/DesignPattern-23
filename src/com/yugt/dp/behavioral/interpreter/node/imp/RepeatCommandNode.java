package com.yugt.dp.behavioral.interpreter.node.imp;

import com.yugt.dp.behavioral.interpreter.Context;
import com.yugt.dp.behavioral.interpreter.node.INode;

/**
 * 重复命令节点
 * @author Administrator
 *
 */
public class RepeatCommandNode implements INode {
	private int number;
	private INode commandListNode;

	public void parse(Context context) {
		context.skipToken("REPEAT");
		number = context.currentNumber();
		context.nextToken();
		commandListNode = new CommandListNode();
		commandListNode.parse(context);
	}

	public void execute() {
		for (int i = 0; i < number; i++)
			commandListNode.execute();
	}

	public String toString() {
		return "[REPEAT " + number + " " + commandListNode + "]";
	}
}
