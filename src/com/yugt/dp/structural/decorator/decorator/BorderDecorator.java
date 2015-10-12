package com.yugt.dp.structural.decorator.decorator;

import com.yugt.dp.structural.decorator.IComponent;

/**
 * 装饰者二
 *
 * @author mouca.he
 *
 */
public class BorderDecorator extends Decorator {

	public BorderDecorator(IComponent component) {
		super(component);
		// TODO 自动生成构造函数存根
	}

	/**
	 * 根据需要重载模板类preSay()方法
	 */
	protected void preSay() {
		System.out.println("BorderDecorator.preSay():装饰者Border的preSay()方法！");
	}

	/**
	 * 根据需要重载模板类afterSay()方法
	 */
	protected void afterSay() {
		System.out.println("BorderDecorator.afterSay():装饰者Border的afterSay()方法！");
	}

}
