package com.yugt.dp.structural.composite;

/**
 * 简单元素
 * @author Administrator
 *
 */
public class Line extends Graphics {
	public Line(String name) {
		super(name);
	}

	public void Draw() {
		System.out.println("Draw a" + _name);
	}
}
