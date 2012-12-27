package com.yugt.dp.structural.proxy;

/**
 * 具体被代理的类
 * @author Administrator
 *
 */
public class RealSubject implements Subject{
	public void request(){
		System.out.println("RealSubject.request()...");
	}
}
