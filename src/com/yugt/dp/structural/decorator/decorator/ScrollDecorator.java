package com.yugt.dp.structural.decorator.decorator;

import com.yugt.dp.structural.decorator.IComponent;

/**
 * 装饰者一
 *
 * @author mouca.he
 *
 */
public class ScrollDecorator extends Decorator {

	public ScrollDecorator(IComponent component) {
		super(component);
		// TODO 自动生成构造函数存根
	}

	/**
	 * 根据需要重载模板类preSay()方法
	 */
	protected void preSay() {
		System.out.println("ScrollDecorator.preSay():装饰者Scroll的preSay()方法！");
	}

	/**
	 * 根据需要重载模板类afterSay()方法
	 */
	protected void afterSay() {
		System.out.println("ScrollDecorator.afterSay():装饰者Scroll的afterSay()方法！");
	}

}
