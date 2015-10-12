package com.yugt.dp.behavioral.interpreter.node;

import com.yugt.dp.behavioral.interpreter.Context;

/**
 * 节点
 * @author Administrator
 *
 */
public interface INode {
	public void parse(Context context);

	public void execute();
}
