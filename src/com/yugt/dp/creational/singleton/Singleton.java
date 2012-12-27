package com.yugt.dp.creational.singleton;

public class Singleton {
	private static Singleton instance = null;

	private Singleton() {//构造函数为private，阻止外部实例化此类
	}

	public static Singleton getInstance() {//静态工厂（简单工厂模式）
		if (instance == null) {//双重检查加锁提高多进程下的性能（Double-check Locking的模式）即：实例化此类之后，不用再用多个线程同步去判断是否已经实例化此类
			synchronized (Singleton.class) {//加上同步，为了避免多进程下，多次实例化此类
				if (instance == null) {//实现懒加载（Lazy Initialization），即：第一次使用此类的时候才实例化此类
					instance = new Singleton();
				}
			}
		}
		return instance;
	}
}
