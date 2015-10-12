package com.yugt.dp.structural.composite;

public class Main {
	public static void main(String[] args) {
		Picture root = new Picture("Root");//把picture作为根元素，即：整个树结构至少包含一个picture

		root.Add(new Line("Line"));
		root.Add(new Circle("Circle"));

		Rectangle r = new Rectangle("Rectangle");
		root.Add(r);

		root.Draw();
	}
}
