package com.yugt.dp.structural.composite;

/**
 * 简单元素
 * @author Administrator
 *
 */
public class Circle extends Graphics {
	public Circle(String name) {
		super(name);
	}

	public void Draw() {
		System.out.println("Draw a" + _name);
	}
}
