package com.yugt.dp.behavioral.templateMethod;


/**
 * 抽象类（包含模板方法，和一些需要具体类实现的方法，这些方法在模板方法中的调用已经写好）
 * @author Administrator
 *
 */
public abstract class AbstractClass {
	/**
	 * 模板方法
	 */
	public void templateMethod() {
		// step by step template to solve something
		// implementor should follow those step
		opStep1();
		opStep2();
		opStep3();
	}

	/**
	 * 钩子方法1
	 */
	public abstract void opStep1();
	/**
	 * 钩子方法2
	 */
	public abstract void opStep2();
	/**
	 * 钩子方法3
	 */
	public abstract void opStep3();
}
