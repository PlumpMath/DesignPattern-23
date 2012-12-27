package com.yugt.dp.behavioral.visitor.element.imp;

import com.yugt.dp.behavioral.visitor.element.IElement;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 具体元素B
 * @author Administrator
 *
 */
public class ElementB implements IElement {
	public void accept(IVisitor visitor) {
		visitor.visit(this);
	}

	public void operationB() {
		System.out.println("do B's job....such-and-such....");
	}
}
