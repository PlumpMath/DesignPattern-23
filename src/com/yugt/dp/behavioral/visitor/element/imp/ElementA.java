package com.yugt.dp.behavioral.visitor.element.imp;

import com.yugt.dp.behavioral.visitor.element.IElement;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 具体元素A
 * @author Administrator
 *
 */
public class ElementA implements IElement {

	public void accept(IVisitor visitor) {
		visitor.visit(this);
	}

	/**
	 * 诸如：getXX()，operateionXX的方法，
	 * 意为：访问ElementA的属性，或者计算排列元素属性信息等操作
	 */
	public void operationA() {
		System.out.println("do A's job....such-and-such....");
	}
}