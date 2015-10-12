package com.yugt.dp.behavioral.observer;

public class Main {
	@SuppressWarnings("unused")
	public static void main(String args[]) {
		ConcreteSubject center = new ConcreteSubject();
		ConcreteObserverA zhangLin = new ConcreteObserverA(center, "A.txt");//具体的观察者，订阅某个“主题”。（也可以写成：主题注册观察者的形式）
		ConcreteObserverB wangHao = new ConcreteObserverB(center, "B.txt");
		center.giveNewMess("腾辉公司需要10个java程序员。");
		center.notifyObservers();
		center.giveNewMess("海景公司需要8个动画设计师。");
		center.notifyObservers();
		center.giveNewMess("仁海公司需要9个电工。");
		center.notifyObservers();
		center.giveNewMess("仁海公司需要9个电工。");
		center.notifyObservers();
	}
}
