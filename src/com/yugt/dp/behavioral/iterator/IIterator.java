package com.yugt.dp.behavioral.iterator;

/**
 * 抽象迭代器
 * @author Administrator
 *
 */
public interface IIterator {
	boolean moveNext();

	Object currentItem();

	void first();

	void next();
}
