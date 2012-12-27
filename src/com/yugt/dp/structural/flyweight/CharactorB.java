package com.yugt.dp.structural.flyweight;

/**
 * 具体享元
 * @author Administrator
 *
 */
public class CharactorB extends Charactor {
	// Constructor
	public CharactorB() {
		this._symbol = 'B';
		this._height = 0;
		this._width = 0;
		this._ascent = 0;
		this._descent = 0;
	}

	// Method
	public void SetPointSize(int size) {
		this._pointSize = size;
	}

	public void Display() {
		System.out.println(this._symbol + "pointsize:" + this._pointSize);
	}
}
