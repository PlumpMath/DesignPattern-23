package com.yugt.dp.behavioral.iterator;

/**
 * 具体迭代器
 * @author Administrator
 *
 */
public class ConcreteIterator implements IIterator {
	private ConcreteList list;

	private int index;

	public ConcreteIterator(ConcreteList list) {
		this.list = list;
		index = 0;
	}

	public boolean moveNext() {
		if (index < list.getLength())
			return true;
		else
			return false;
	}

	public Object currentItem() {
		return list.getElement(index);
	}

	public void first() {
		index = 0;
	}

	public void next() {
		if (index < list.getLength()) {
			index++;
		}
	}
}
