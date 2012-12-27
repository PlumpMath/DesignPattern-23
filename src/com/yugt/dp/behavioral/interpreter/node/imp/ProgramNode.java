package com.yugt.dp.behavioral.interpreter.node.imp;

import com.yugt.dp.behavioral.interpreter.Context;
import com.yugt.dp.behavioral.interpreter.node.INode;

/**
 * 根节点
 * @author Administrator
 *
 */
//<program> ::= PROGRAM <command list>
public class ProgramNode implements INode {
	private INode commandListNode;

	public void parse(Context context) {
		context.skipToken("PROGRAM");
		commandListNode = new CommandListNode();
		commandListNode.parse(context);
	}

	public void execute() {
		commandListNode.execute();
	}

	public String toString() {
		return "[PROGRAM " + commandListNode + "]";
	}
}