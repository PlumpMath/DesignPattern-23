package com.yugt.dp.structural.bridge;

/**
 * 定义实现部分的接口，可以与抽象部分接口的方法不一样
 * 注：此接口中的方法就是从Abstraction分离出来的，这部分的方法的复用方式是：使用组合/聚合代替了继承
 */
public interface Implementor {
	/**
	 * 示例方法，实现抽象部分需要的某些具体功能
	 */
	public void operationImpl();
}
