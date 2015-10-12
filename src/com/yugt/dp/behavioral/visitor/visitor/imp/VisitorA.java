package com.yugt.dp.behavioral.visitor.visitor.imp;

import com.yugt.dp.behavioral.visitor.element.imp.ElementA;
import com.yugt.dp.behavioral.visitor.element.imp.ElementB;
import com.yugt.dp.behavioral.visitor.element.imp.ElementC;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 具体访问者A
 * 注：对于每个ObjectStructure的元素，再此都有一个visit方法（其实也不一定一一对应，可以使用instanceof）
 * @author Administrator
 *
 */
public class VisitorA implements IVisitor {

	public void visit(ElementA element) {
		element.operationA();
	}

	public void visit(ElementB element) {
		element.operationB();
	}

	public void visit(ElementC element) {
		element.operationC();
	}
}