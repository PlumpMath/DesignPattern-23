package com.yugt.dp.structural.flyweight;

/**
 * 抽象享元
 * @author Administrator
 *
 */
public abstract class Charactor {
	// Fields
	protected char _symbol;

	protected int _width;

	protected int _height;

	protected int _ascent;

	protected int _descent;

	protected int _pointSize;

	// Method
	public abstract void SetPointSize(int size);

	public abstract void Display();
}
