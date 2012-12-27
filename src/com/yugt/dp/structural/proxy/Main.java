package com.yugt.dp.structural.proxy;

public class Main {
	public static void main(String[] args) {
		RealSubject subject = new RealSubject();
		Proxy proxy = new Proxy(subject);
		proxy.request();
	}

}
