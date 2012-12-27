package com.yugt.dp.behavioral.iterator;

public class Main {
	public static void main(String[] args) {
		IIterator iterator;
		IList list = new ConcreteList(new int[]{1,2,3,4,5});//包含1,2,3,4,5的数据集合容器
		iterator = list.getIterator();
		while (iterator.moveNext()) {
			int i = (Integer) iterator.currentItem();
			System.out.println(i);
			iterator.next();
		}
	}
}
