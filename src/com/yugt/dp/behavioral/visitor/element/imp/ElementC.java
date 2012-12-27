package com.yugt.dp.behavioral.visitor.element.imp;

import com.yugt.dp.behavioral.visitor.element.IElement;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 具体元素C
 * @author Administrator
 *
 */
public class ElementC implements IElement {
	public void accept(IVisitor visitor) {
		visitor.visit(this);
	}

	public void operationC() {
		System.out.println("do C's job....such-and-such....");
	}
}