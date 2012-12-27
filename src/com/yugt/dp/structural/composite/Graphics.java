package com.yugt.dp.structural.composite;

/**
 * 抽象元素
 * @author Administrator
 *
 */
public abstract class Graphics {
	protected String _name;

	public Graphics(String name) {
		this._name = name;
	}

	public abstract void Draw();
}
