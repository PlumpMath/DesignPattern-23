package com.yugt.dp.creational.prototype;

import java.awt.*;

public class Application {
	private AbstractFurniture circleTablePrototype;

	public void setCircleTablePrototype(AbstractFurniture circleTablePrototype) {
		this.circleTablePrototype = circleTablePrototype;
	}

	public void runAppExample() throws Exception {
		House house = new House();
		CircleTable circleTable = null;
		// 从工具列选择一个家具加入房子中
		circleTable = (CircleTable) circleTablePrototype.clone();
		circleTable.setCenter(new Point(10, 10));
		house.addFurniture(circleTable);
		// 从工具列选择一个家具加入房子中
		circleTable = (CircleTable) circleTablePrototype.clone();
		circleTable.setCenter(new Point(20, 30));
		house.addFurniture(circleTable);
	}
}
