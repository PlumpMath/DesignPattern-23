package com.yugt.dp.creational.prototype;

import java.util.*;

/**
 * 房屋
 *
 * @author Administrator
 *
 */
public class House {
	private Vector<AbstractFurniture> vector;

	public House() {
		vector = new Vector<AbstractFurniture>();
	}

	public void addFurniture(AbstractFurniture furniture) {
		vector.addElement(furniture);
		System.out.println("现有家具....");
		Enumeration<AbstractFurniture> enumeration = vector.elements();
		while (enumeration.hasMoreElements()) {
			AbstractFurniture f = enumeration.nextElement();
			f.draw();
		}
		System.out.println();
	}
}
