package com.yugt.dp.behavioral.visitor.visitor.imp;

import com.yugt.dp.behavioral.visitor.element.imp.ElementA;
import com.yugt.dp.behavioral.visitor.element.imp.ElementB;
import com.yugt.dp.behavioral.visitor.element.imp.ElementC;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;

/**
 * 具体访问者B
 * @author Administrator
 *
 */
public class VisitorB implements IVisitor {
	public void visit(ElementA element) {
		System.out.println("VisitorB is a hard worker....");
		element.operationA();
		System.out.println("I want to do some extra work on A....");
	}

	public void visit(ElementB element) {
		System.out.println("VisitorB is a hard worker....");
		element.operationB();
		System.out.println("I want to do some extra work on B....");
	}

	public void visit(ElementC element) {
		System.out.println("VisitorB is a hard worker....");
		element.operationC();
		System.out.println("I want to do some extra work on C....");
	}
}
