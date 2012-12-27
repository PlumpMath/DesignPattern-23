package com.yugt.dp.behavioral.observer;

/**
 * 抽象主题
 * @author Administrator
 *
 */
public interface Subject {
	/**
	 * 注册观察者
	 * @param o
	 */
	public void addObserver(Observer o);

	public void deleteObserver(Observer o);

	/**
	 * 通知观察者
	 * 注：当主题状态发生变化时，通知各个观察者。（即：调用观察者的update()方法）
	 */
	public void notifyObservers();
}
