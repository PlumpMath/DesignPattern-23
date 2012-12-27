package com.yugt.dp.behavioral.visitor;

import com.yugt.dp.behavioral.visitor.element.IElement;

/**
 * 集合结构体：往往是包含同一类别的多种元素
 * @author Administrator
 *
 */
public class ObjectStructure {

	private IElement[] list;

	public ObjectStructure(IElement[] list){
		this.list=list;
	}

	public IElement[] getElements(){
		return this.list;
	}
}
