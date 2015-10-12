package com.yugt.dp.behavioral.observer;

/**
 * 抽象观察者
 * @author Administrator
 *
 */
public interface Observer {
	/**
	 * update方法（用来响应“主题”状态变化）
	 * @param heardMess
	 */
	public void hearTelephone(String heardMess);
}
