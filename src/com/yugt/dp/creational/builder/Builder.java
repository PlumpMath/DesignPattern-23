package com.yugt.dp.creational.builder;

/**
 * 创建者（封装创建产品各个部分的创建过程，对外隐藏创建细节）
 * @author Administrator
 *
 */
public abstract class Builder {

	// 创建部件A 比如创建汽车车轮
	abstract void buildPartA();

	// 创建部件B 比如创建汽车方向盘
	abstract void buildPartB();

	// 创建部件C 比如创建汽车发动机
	abstract void buildPartC();

	// 返回最后组装成品结果 (返回最后装配好的汽车)
	// 成品的组装过程不在这里进行,而是转移到下面的Director类中进行.
	// 从而实现了解耦过程和部件
	abstract Product getResult();

}
