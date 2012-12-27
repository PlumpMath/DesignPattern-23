package com.yugt.dp.behavioral.memento;

/**
 * 备忘维护者（用来维护备忘者对象）
 * @author Administrator
 *
 */
public class Caretaker {
	private Memento memento;

	public void setMemento(Memento memento) {
		this.memento = memento;
	}

	public Memento getMemento() {
		return memento;
	}
}
