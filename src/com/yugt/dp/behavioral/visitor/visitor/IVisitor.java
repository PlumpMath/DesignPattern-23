package com.yugt.dp.behavioral.visitor.visitor;

import com.yugt.dp.behavioral.visitor.element.imp.ElementA;
import com.yugt.dp.behavioral.visitor.element.imp.ElementB;
import com.yugt.dp.behavioral.visitor.element.imp.ElementC;

/**
 * 抽象访问者
 * @author Administrator
 *
 */
public interface IVisitor {
	/**
	 * 封装具体的访问即操作过程的方法
	 * 注：个人觉得此方法没有必要每种元素对应一个，如果不是很复杂，可以使用instanceof代替多个方法
	 * @param element
	 */
	public void visit(ElementA element);

	public void visit(ElementB element);

	public void visit(ElementC element);
}