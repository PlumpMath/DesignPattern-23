package com.yugt.dp.behavioral.iterator;

/**
 * 具体容器
 * @author Administrator
 *
 */
public class ConcreteList implements IList {
	int[] list;

	public ConcreteList(int[] arr) {
		list = arr;
	}

	public IIterator getIterator() {
		return new ConcreteIterator(this);
	}

	public int getLength() {
		return list.length;
	}

	public int getElement(int index) {
		return list[index];
	}
}
