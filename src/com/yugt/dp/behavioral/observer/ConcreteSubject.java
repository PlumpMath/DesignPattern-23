package com.yugt.dp.behavioral.observer;

import java.util.ArrayList;

/**
 * 具体主题
 * SeekJobCenter
 * @author Administrator
 *
 */
public class ConcreteSubject implements Subject {
	String mess;
	boolean changed;
	ArrayList<Observer> personList;

	public ConcreteSubject() {
		personList = new ArrayList<Observer>();
		mess = "";
		changed = false;
	}

	public void addObserver(Observer o) {
		if (!(personList.contains(o)))
			personList.add(o);
	}

	public void deleteObserver(Observer o) {
		if (personList.contains(o))
			personList.remove(o);
	}

	public void notifyObservers() {
		if (changed) {
			for (int i = 0; i < personList.size(); i++) {
				Observer observer = personList.get(i);
				observer.hearTelephone(mess);
			}
			changed = false;
		}
	}

	public void giveNewMess(String str) {
		if (str.equals(mess))
			changed = false;
		else {
			mess = str;
			changed = true;
		}
	}
}
