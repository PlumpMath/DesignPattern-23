package com.yugt.dp.creational.builder;

/**
 * 指导者（用来按需指导组装产品的各个部件）
 * @author Administrator
 *
 */
public class Director {

	private Builder builder;

	public Director(Builder builder) {
		this.builder = builder;
	}

	// 将部件partA partB partC最后组成复杂对象
	// 这里是将车轮 方向盘和发动机组装成汽车的过程
	public void construct() {
		builder.buildPartA();
		builder.buildPartB();
		builder.buildPartC();
	}

}
