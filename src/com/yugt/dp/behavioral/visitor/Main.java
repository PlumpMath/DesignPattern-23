package com.yugt.dp.behavioral.visitor;

import com.yugt.dp.behavioral.visitor.element.IElement;
import com.yugt.dp.behavioral.visitor.element.imp.ElementA;
import com.yugt.dp.behavioral.visitor.element.imp.ElementB;
import com.yugt.dp.behavioral.visitor.element.imp.ElementC;
import com.yugt.dp.behavioral.visitor.visitor.IVisitor;
import com.yugt.dp.behavioral.visitor.visitor.imp.VisitorA;
import com.yugt.dp.behavioral.visitor.visitor.imp.VisitorB;

public class Main {
	public static void main(String[] args) {
		// ObjectStructure 元素集合结构体
		IElement[] list = { new ElementA(), new ElementB(), new ElementC() };
		ObjectStructure objectStructure=new ObjectStructure(list);

		System.out.println("visitorA is coming.......");
		IVisitor visitorA = new VisitorA();
		for (int i = 0; i < objectStructure.getElements().length; i++) {
			//1.为每个元素添加相同的访问者A（其实是在访问者A中添加所以元素）
			//2.然后调用visitorA中对当前元素的visit方法
			//3.visit方法中又可以调用元素中的方法operationA
			list[i].accept(visitorA);
		}

		System.out.println("\nvisitorB is coming.......");
		IVisitor visitorB = new VisitorB();
		for (int i = 0; i < objectStructure.getElements().length; i++) {
			list[i].accept(visitorB);
		}
	}
}