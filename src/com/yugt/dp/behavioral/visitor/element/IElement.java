package com.yugt.dp.behavioral.visitor.element;

import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 抽象元素
 * 注：必须有accept方法，其他方法可选
 * @author Administrator
 *
 */
public interface IElement {

	/**
	 * 用来接收访问者（可以理解为：元素向访问者公开的访问接口）
	 * @param visitor
	 */
	public void accept(IVisitor visitor);
}