package com.yugt.dp.structural.proxy;

/**
 * 代理类
 * @author Administrator
 *
 */
public class Proxy {

	public Subject realSubject;

	public Proxy(Subject subject){
		this.realSubject=subject;
	}

	public void request(){
		System.out.println("before do something");
		realSubject.request();
		System.out.println("after do something");
	}
}
