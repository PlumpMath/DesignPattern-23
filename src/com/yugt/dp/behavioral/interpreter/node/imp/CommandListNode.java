package com.yugt.dp.behavioral.interpreter.node.imp;

import java.util.Iterator;
import java.util.Vector;

import com.yugt.dp.behavioral.interpreter.Context;
import com.yugt.dp.behavioral.interpreter.node.INode;

/**
 * 命令列表节点
 * @author Administrator
 *
 */
//<command list> ::= <command>* END
public class CommandListNode implements INode {
	private Vector<INode> list = new Vector<INode>();
	private INode commandNode;

	public void parse(Context context) {
		while (true) {
			if (context.currentToken() == null) {
				System.err.println("Missing 'END'");
				break;
			} else if (context.currentToken().equals("END")) {
				context.skipToken("END");
				break;
			} else {
				commandNode = new CommandNode();
				commandNode.parse(context);
				list.add(commandNode);
			}
		}
	}

	public void execute() {
		Iterator<INode> it = list.iterator();
		while (it.hasNext()) {
			((CommandNode) it.next()).execute();
		}
	}

	public String toString() {
		return "" + list;
	}
}
